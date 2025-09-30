# singleton 单例模式  <Badge text="WIP" type="warning" />

## 一、概述

单例模式是一种常见的设计模式，用于确保一个类只有一个实例，并提供一个全局访问点。在 JavaScript 中，单例模式广泛用于管理全局状态、日志记录或数据库连接等场景。通过单例模式，程序可以避免重复创建对象，从而提高性能和资源利用效率。

在支持并发操作的环境中，如 Node.js 的多线程（`worker_threads`）和 Web Workers，需要确保单例模式是线程安全的，以避免多个线程同时创建多个实例。本篇文章将详细介绍如何在这些场景下实现线程安全的单例模式。

## 二、JavaScript 单例模式的基本实现

在 JavaScript 中，单例模式的实现有多种方式，以下是最常见的两种：饿汉式和懒汉式。

1. **饿汉式**：程序启动时即创建单例对象，并全局维护该对象。

```javascript
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      this.data = "I am the instance";
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true，两个实例相同
```

**特点**：

-   实例在程序启动时即被创建。
-   提供了立即访问的全局对象，但可能会造成资源浪费，特别是当实例创建较重时。

2. **懒汉式**：实例在第一次被请求时才创建，避免程序启动时不必要的开销。

```javascript
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      this.data = "I am the instance";
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true，实例懒加载
```

**特点**：

-   只有在第一次调用 `getInstance()` 时才会创建实例。
-   避免了程序启动时的开销，但在并发环境中可能出现多个实例的问题。

## 三、线程安全的单例模式

在多线程环境中（如 Node.js 的 `worker_threads` 或 Web Workers），多个线程可能会同时尝试创建单例对象。如果没有正确的同步机制，可能会导致多个实例的产生，破坏单例模式的设计原则。因此，我们需要引入锁机制来确保线程安全。

### 1. **Node.js 线程安全的单例模式**

在 Node.js 环境下，可以使用 `worker_threads` 模块来实现多线程操作。为了确保线程安全，我们引入了互斥锁（`Mutex`），可以通过第三方库 `async-mutex` 实现。

首先，安装 `async-mutex`：

```bash
npm install async-mutex
```

**线程安全的单例模式实现：**

```javascript
// singleton.js (Node.js 版本)
const { Mutex } = require('async-mutex');

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      this.data = "I am the instance";
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  static async getInstance() {
    if (!this.instance) {
      const release = await Singleton.mutex.acquire(); // 获取锁
      try {
        if (!this.instance) {
          this.instance = new Singleton(); // 创建实例
        }
      } finally {
        release(); // 释放锁
      }
    }
    return this.instance;
  }
}

Singleton.mutex = new Mutex();
module.exports = Singleton;
```

**主线程创建多个 Worker：**

```javascript
// main.js
const { Worker, isMainThread, workerData } = require('worker_threads');
const Singleton = require('./singleton');

if (isMainThread) {
  for (let i = 0; i < 5; i++) {
    new Worker(__filename, { workerData: i });
  }
} else {
  (async () => {
    const instance = await Singleton.getInstance();
    console.log(`Worker ${workerData}:`, instance.data);
  })();
}
```

在上述实现中，`async-mutex` 互斥锁确保了多个线程不会同时创建实例。当一个线程获取锁后，其他线程必须等待锁释放才能继续执行 `getInstance()`，从而保证了线程安全。

### 2. **Web Workers 线程安全的单例模式**

在浏览器的 Web Workers 环境中，`SharedArrayBuffer` 和 `Atomics` 提供了原子操作和共享内存，帮助我们在并发环境中控制访问，实现线程安全的单例模式。

**线程安全的单例模式实现：**

```javascript
// singleton.js (Web Workers 版本)
let instance = null;
const sharedLock = new Int32Array(new SharedArrayBuffer(4)); // 使用共享锁

class Singleton {
  constructor() {
    if (!instance) {
      this.data = "I am the instance";
      instance = this;
    }
    return instance;
  }

  static getInstance() {
    Atomics.wait(sharedLock, 0, 1); // 等待解锁
    if (!instance) {
      Atomics.store(sharedLock, 0, 1); // 上锁
      instance = new Singleton();
      Atomics.store(sharedLock, 0, 0); // 解锁
      Atomics.notify(sharedLock, 0); // 通知其他线程
    }
    return instance;
  }
}

export default Singleton;
```

**在主线程中创建 Worker：**

```javascript
// main.js
if (window.Worker) {
  for (let i = 0; i < 5; i++) {
    const worker = new Worker('worker.js');
    worker.onmessage = (e) => {
      console.log(`Worker ${i}:`, e.data);
    };
  }
}
```

**Worker 线程中获取单例：**

```javascript
// worker.js
import Singleton from './singleton.js';

const instance = Singleton.getInstance();
postMessage(instance.data);
```

在这个实现中，`SharedArrayBuffer` 和 `Atomics` 实现了共享锁和原子操作，确保了多个 Worker 在并发环境下不会创建多个实例，达到了线程安全的效果。

## 四、总结

在并发操作环境中实现线程安全的单例模式是非常重要的。
在 Node.js 的多线程（`worker_threads`）中，我们使用 `async-mutex` 互斥锁确保线程安全；
在 Web Workers 中，我们通过 `SharedArrayBuffer` 和 `Atomics` 实现原子操作来确保多个 Worker 共享同一个单例对象。

通过这些机制，我们可以确保无论在何种并发环境中，单例模式都能保持全局唯一性，避免重复创建实例，从而提高程序的性能和资源利用效率。
