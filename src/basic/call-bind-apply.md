---
title: new，bind，call，apply的原理及自定义实现
---
# new，bind，call，apply的原理及自定义实现

> `Function`原型链中的 `apply`，`call` 和 `bind` 方法是 JavaScript 中相当重要的概念，与 `this` 关键字密切相关，相当一部分人对它们的理解还是比较浅显，所谓js基础扎实，绕不开这些基础常用的API，这次让我们来了解它们吧！

## 实现new运算符

### 原理

new 关键字会进行如下的操作：

1. 创建一个空的简单JavaScript对象（即{}）；
2. 链接该对象（设置该对象的`constructor`）到另一个对象 ；
3. 将步骤1新创建的对象作为`this`的上下文 ；
4. 如果该函数没有返回对象，则返回`this`。

### 实现代吗

```js
function _new(fn, ...args) {
    if (typeof fn !== "function") {
        throw TypeError("fn is not");
    }
    const obj = Object.create(fn.prototype);
    const res = fn.call(obj, ...args);
    const isObject = typeof res === "object" && res !== null;
    return isObject ? res : obj;
}
```

## 实现bind方法

### 语法

```js
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

#### 参数

`thisArg`

调用绑定函数时作为 `this` 参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。当使用 `bind` 在 `setTimeout` 中创建一个函数（作为回调提供）时，作为 `thisArg` 传递的任何原始值都将转换为 `object`。如果 `bind` 函数的参数列表为空，或者`thisArg`是`null`或`undefined`，执行作用域的 `this` 将被视为新函数的 `thisArg`。

`arg1, arg2, ...`

当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

#### 返回值

返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。

### 原理

`bind()` 函数会创建一个新的绑定函数（bound function，BF）。绑定函数是一个 exotic function object（怪异函数对象，ECMAScript 2015 中的术语），它包装了原函数对象。调用绑定函数通常会导致执行包装函数。
绑定函数具有以下内部属性：

- `[[BoundTargetFunction]]` - 包装的函数对象
- `[[BoundThis]]` - 在调用包装函数时始终作为 `this` 值传递的值。
- `[[BoundArguments]]` - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
- `[[Call]]` - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个this值和一个包含通过调用表达式传递给函数的参数的列表。

当调用绑定函数时，它调用 `[[BoundTargetFunction]]` 上的内部方法 `[[Call]]`，就像这样 Call(boundThis, args)。其中，boundThis 是 `[[BoundThis]]`，args 是 `[[BoundArguments]]` 加上通过函数调用传入的参数列表。

### 代码

有两种实现bind的方法，下面第一种不支持使用new调用新创建的构造函数，而第二种支持。

#### 方法一

```js
Function.prototype.myBind = function () {
    const thatFunc = this,
        thatArg = arguments[0],
        slice = Array.prototype.slice;
    let args = slice.call(arguments, 1);
    if (typeof thatFunc !== "function") {
        throw new TypeError(
            "Function.prototype.bind - what is trying to be bound is not callable"
        );
    }
    return function () {
        var funcArgs = args.concat(slice.call(arguments));
        return thatFunc.apply(thatArg, funcArgs);
    };
};

```

#### 方法二

```js
Function.prototype.myBind = function (otherThis) {
    if (typeof this !== "function") {
        throw new TypeError(
            "Function.prototype.bind - what is trying to be bound is not callable"
        );
    }
    const ArrayPrototypeSlice = Array.prototype.slice;
    let baseArgs = ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            baseArgs.length = baseArgsLength; // reset to default base arguments
            baseArgs.push.apply(baseArgs, arguments);
            return fToBind.apply(
                fNOP.prototype.isPrototypeOf(this) ? this : otherThis,
                baseArgs
            );
        };
    if (this.prototype) {
        fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();
    return fBound;
};
```

## 实现call方法

### 语法

```js
func.call([thisArg[, arg1, arg2, ...argN]])
```

#### 参数

`thisArg`

可选的。在 function 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。

`arg1, arg2, ...`

指定的参数列表。

#### 返回值

使用调用者提供的 `this` 值和参数调用该函数的返回值。若该方法没有返回值，则返回 `undefined`。

### 实现代码

```js
Function.prototype.myCall = function (ctx, ...arg) {
    if (ctx === null || ctx === undefined) {
        ctx = window
    } else if (typeof ctx !== 'object' || typeof ctx !== 'function') {
        ctx = Object(ctx)
    }
    const tmp = Symbol('tmp');
    ctx[tmp] = this;
    const result = ctx[tmp](...arg);
    delete ctx[tmp];
    return result;
};
```

## apply方法的实现

> 注意：`apply()`方法的作用和 `call()` 方法类似，区别就是`call()`方法接受的是参数列表，而`apply()`方法接受的是一个参数数组。

```js
Function.prototype.myApply = function (ctx, arg) {
    if (ctx === null || ctx === undefined) {
        ctx = window
    } else if (typeof ctx !== 'object' || typeof ctx !== 'function') {
        ctx = Object(ctx)
    }
    const tmp = Symbol('tmp');
    ctx[tmp] = this;
    const result = ctx[tmp](...arg);
    delete ctx[tmp];
    return result;
};
```

## 参考书籍

- [MDN-new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
- [MDN-Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [MDN-Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [MDN-Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
