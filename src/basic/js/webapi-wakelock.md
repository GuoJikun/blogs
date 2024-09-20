# 使用 Wake Lock API：保持设备唤醒的最佳实践

在现代 Web 应用中，尤其是涉及视频播放、实时通信、地图导航等长时间运行的任务时，用户常常希望设备不要因为空闲而自动进入睡眠模式或屏幕变暗。
为了解决这一问题，Web API 提供了一个名为 Wake Lock 的接口，允许开发者请求设备保持唤醒状态。

本文将详细介绍如何使用 Wake Lock API 来控制设备的唤醒状态，提供示例代码，并讨论一些常见的使用场景，尤其是如何确保网页隐藏或显示时自动管理唤醒锁。

## 什么是 Wake Lock API？

Wake Lock API 是一个用于防止设备进入睡眠或屏幕变暗的 Web API。通过 Wake Lock API，开发者可以请求设备保持活跃状态，防止因为电源管理机制导致任务中断。

目前，**Wake Lock API 只支持一种类型的唤醒锁：`screen`**，它用于保持屏幕亮起，防止屏幕自动关闭或调暗。

## 使用 Wake Lock API 的前提

-   **浏览器支持**：Wake Lock API 目前在大多数现代浏览器中都已经得到支持。
-   **HTTPS 环境**：该 API 需要通过 HTTPS 访问才能正常工作。

## 基本用例

以下是一个简单的示例，展示了如何使用 Wake Lock API 来保持屏幕唤醒：

```js
// 创建一个全局变量来存储 WakeLock 实例
let wakeLock = null;

// 请求屏幕保持唤醒的函数
async function requestWakeLock() {
    try {
        // 请求屏幕唤醒锁
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("屏幕唤醒锁已激活");

        // 监听唤醒锁的释放事件
        wakeLock.addEventListener("release", () => {
            console.log("屏幕唤醒锁已释放");
        });
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

// 释放唤醒锁的函数
function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
        console.log("屏幕唤醒锁手动释放");
    }
}

// 调用函数请求唤醒锁
requestWakeLock();

// 在页面关闭时释放唤醒锁
window.addEventListener("beforeunload", releaseWakeLock);
```

## 页面可见性处理：自动管理唤醒锁

由于当网页被隐藏或切换到后台时会自动释放唤醒锁，因此我们可以监听 `visibilitychange` 事件来确保网页重新可见时重新获取唤醒锁。当页面恢复显示时再次请求锁定，页面隐藏时则释放唤醒锁。

```js
// 创建一个全局变量来存储 WakeLock 实例
let wakeLock = null;

// 请求屏幕保持唤醒的函数
async function requestWakeLock() {
    try {
        // 请求屏幕唤醒锁
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("屏幕唤醒锁已激活");

        // 监听唤醒锁的释放事件
        wakeLock.addEventListener("release", () => {
            console.log("屏幕唤醒锁已释放");
        });
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

// 释放唤醒锁的函数
function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
        console.log("屏幕唤醒锁手动释放");
    }
}

// 处理页面可见性变化
function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
        // 页面重新可见时，重新请求唤醒锁
        requestWakeLock();
    } else {
        // 页面隐藏时，释放唤醒锁
        releaseWakeLock();
    }
}

// 监听页面可见性变化事件
document.addEventListener("visibilitychange", handleVisibilityChange);

// 页面加载时立即请求唤醒锁
requestWakeLock();

// 在页面关闭时释放唤醒锁
window.addEventListener("beforeunload", releaseWakeLock);
```

## 使用场景

Wake Lock API 在以下几种典型场景中非常有用：

### 1. 视频或音频播放

在播放视频或音频的应用中，用户希望屏幕保持亮起，以便可以随时调整播放进度或音量。通过 Wake Lock API，在媒体播放时保持屏幕唤醒，提供更好的用户体验。

```js
videoElement.addEventListener("play", requestWakeLock);
videoElement.addEventListener("pause", releaseWakeLock);
```

### 2. 实时通信应用

对于视频通话、会议等实时通信应用，屏幕关闭会影响用户的互动体验。使用 Wake Lock API，可以确保设备在通话期间保持活跃，防止通话中断。

```js
if (isInCall) {
    requestWakeLock();
} else {
    releaseWakeLock();
}
```

### 3. 导航和地图应用

在导航应用中，用户通常需要长时间查看屏幕来获取行进路线信息。使用 Wake Lock API，可以确保屏幕不会因为闲置而熄灭。

```js
navigator.geolocation.watchPosition(
    () => {
        requestWakeLock();
    },
    () => {
        releaseWakeLock();
    }
);
```

### 4. 游戏或全屏应用

网页游戏或需要长时间用户交互的全屏应用，也可以利用 Wake Lock API，避免游戏过程中屏幕突然熄灭。

```js
document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        requestWakeLock();
    } else {
        releaseWakeLock();
    }
});
```

## 错误处理和兼容性

虽然 Wake Lock API 提供了有用的功能，但它在某些设备上可能受到电源管理策略的限制。因此，开发者在请求唤醒锁时应当加入错误处理，以确保程序的健壮性。

```javascript
if ("wakeLock" in navigator) {
    requestWakeLock();
} else {
    console.error("当前浏览器不支持 Wake Lock API");
}
```

## 浏览器兼容性

| -          | Chrome | Edge | Firefox | Opera | Safari | Chrome Android | Firefox Android | Opera Android | Safari iOS | Samsung Internet | WebView Android |
| ---------- | ------ | ---- | ------- | ----- | ------ | -------------- | --------------- | ------------- | ---------- | ---------------- | --------------- |
| `WakeLock` | 84     | 84   | 126     | 70    | 16.4   | 84             | 126             | 60            | 16.4       | 14.0             | 84              |
| `request`  | 84     | 84   | 126     | 70    | 16.4   | 84             | 126             | 60            | 16.4       | 14.0             | 84              |

:::tip iOS 版 Safari

-   16.4 (Released 2023-03-27)
-   部分支持
-   在独立的主屏幕 Web 应用程序不生效。详情请看  [bug 254545](https://webkit.org/b/254545#c32)。

:::

## 总结

Wake Lock API 为 Web 开发者提供了控制设备唤醒状态的能力，尤其适合那些需要保持屏幕长时间活跃的应用，如视频播放、实时通信、导航等。通过监听 `visibilitychange` 事件，应用程序可以智能地管理唤醒锁的状态，在页面可见时重新获取锁定，隐藏时释放锁定。

随着更多浏览器对 Wake Lock API 的支持，它将会成为提升用户体验的重要工具。如果你的应用涉及到长时间的任务或需要保持屏幕亮起，建议集成这个 API 来优化用户体验。
