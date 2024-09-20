# 利用 Page Visibility API 优化网页性能与用户体验

在现代 Web 开发中，用户可能会频繁切换标签页，或让网页处于后台运行。为了避免不必要的资源浪费并提升用户体验，合理利用 **Page Visibility API** 可以在页面不可见时暂停或减少资源的消耗，并在页面重新可见时恢复正常操作。

在这篇博客中，我将展示如何通过 Page Visibility API 实现以下场景：

1. 当用户切换标签页时暂停视频或音频播放。
1. 当页面不可见时停止资源密集型的动画。
1. 页面不可见时停止 API 请求，并在页面可见时重新开始。
1. 当用户返回页面时恢复定时操作。

## 什么是 Page Visibility API？

Page Visibility API 是一个浏览器提供的 API，它可以告诉我们页面的可见性状态。当页面变为不可见时，我们可以暂停一些不必要的操作，比如动画或媒体播放。这个 API 提供了两个核心功能：

-   `document.hidden`：返回一个布尔值，指示页面当前是否隐藏。
-   `document.visibilityState`：返回页面的可见性状态，可以是 `'visible'`（页面可见）、`'hidden'`（页面隐藏）或 `'prerender'`（页面正在预渲染）。
-   `visibilitychange` 事件：当页面的可见性状态（`document.visibilityState`）改变时触发。

### `visibilityState` 的作用

`document.visibilityState` 提供比 `document.hidden` 更直观的信息。它不仅告诉你页面是否隐藏，还能进一步区分页面是否正在预渲染。例如，你可以根据不同的状态采取不同的优化措施。

### 浏览器兼容性

虽然 Page Visibility API 很有用，但它的兼容性在不同浏览器中略有差异。以下是各主流浏览器的支持情况：

#### `Document.hidden` 和 `document.visibilityState`

| 浏览器      | 支持情况 | 版本         |
| ----------- | -------- | ------------ |
| **Chrome**  | 支持     | 自 33 版本起 |
| **Firefox** | 支持     | 自 18 版本起 |
| **Safari**  | 支持     | 自 7 版本起  |
| **Edge**    | 支持     | 自 12 版本起 |
| **Opera**   | 支持     | 自 20 版本起 |

#### `visibilitychange` 事件

| 浏览器      | 支持情况 | 版本           |
| ----------- | -------- | -------------- |
| **Chrome**  | 支持     | 自 62 版本起   |
| **Firefox** | 支持     | 自 56 版本起   |
| **Safari**  | 支持     | 自 14.1 版本起 |
| **Edge**    | 支持     | 自 18 版本起   |
| **Opera**   | 支持     | 自 49 版本起   |

## 用户切换标签页时暂停视频播放

当用户切换标签页时，继续播放视频会浪费带宽和资源。通过 Page Visibility API，可以在页面不可见时暂停视频，等用户返回后再自动恢复播放。

```js
const videoElement = document.querySelector("video");

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        // 页面隐藏时暂停视频
        videoElement.pause();
        console.log("页面隐藏，视频暂停");
    } else if (document.visibilityState === "visible") {
        // 页面可见时恢复视频播放
        videoElement.play();
        console.log("页面可见，视频继续播放");
    }
});
```

## 页面不可见时停止资源密集型动画

动画可能是性能瓶颈，尤其是在页面不可见时运行动画毫无意义。通过 Page Visibility API，我们可以在页面不可见时暂停动画，减少 CPU 和 GPU 的消耗。

```js
let animationRunning = true;

function startAnimation() {
    if (!animationRunning) return;
    // 假设这里有动画逻辑
    console.log("动画正在运行...");
    requestAnimationFrame(startAnimation);
}

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        // 页面隐藏时停止动画
        animationRunning = false;
        console.log("页面隐藏，动画停止");
    } else if (document.visibilityState === "visible") {
        // 页面可见时恢复动画
        animationRunning = true;
        startAnimation();
        console.log("页面可见，动画恢复");
    }
});

startAnimation();
```

## 页面不可见时停止 API 请求

某些情况下，持续的数据获取可能会浪费带宽。通过检测页面的可见性，可以在页面不可见时停止数据请求，优化带宽使用。

```js
let requestInterval;

function startFetchingData() {
    requestInterval = setInterval(() => {
        // 模拟 API 请求
        console.log("正在获取数据...");
    }, 5000);
}

function stopFetchingData() {
    clearInterval(requestInterval);
    console.log("停止获取数据");
}

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        // 页面隐藏时停止数据获取
        stopFetchingData();
    } else if (document.visibilityState === "visible") {
        // 页面可见时恢复数据获取
        startFetchingData();
    }
});

startFetchingData();
```

## 页面可见时恢复定时操作

当页面不可见时，某些定时任务可以暂停，直到用户返回页面时再恢复执行。这有助于提升资源利用效率。

```js
let intervalId;

function startTimer() {
    intervalId = setInterval(() => {
        console.log("计时器正在运行...");
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    console.log("计时器停止");
}

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        // 页面隐藏时停止计时器
        stopTimer();
    } else if (document.visibilityState === "visible") {
        // 页面可见时恢复计时器
        startTimer();
    }
});

startTimer();
```

## 用户返回页面时恢复音频播放

与视频类似，音频在页面不可见时继续播放不仅对用户无意义，还会浪费系统资源。通过 Page Visibility API 可以在用户返回页面时恢复音频播放。

```js
const audioElement = document.querySelector("audio");

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        // 页面隐藏时暂停音频
        audioElement.pause();
        console.log("页面隐藏，音频暂停");
    } else if (document.visibilityState === "visible") {
        // 页面可见时恢复音频播放
        audioElement.play();
        console.log("页面可见，音频继续播放");
    }
});
```

## 结论

Page Visibility API 是一个简单但非常有效的工具，能够让开发者根据页面的可见性来动态优化资源的使用。结合 `document.visibilityState`，你可以进一步细化页面状态的控制，如在页面预渲染时暂停某些操作。

这种优化不仅提升了用户体验，还能显著减少系统资源的浪费。通过合理利用这个 API，我们可以暂停后台的视频、音频、动画、数据请求等操作，并在用户重新关注页面时迅速恢复，达到性能和体验的双重提升。

在开发过程中，别忘了考虑浏览器的兼容性问题，确保在所有平台上提供一致的用户体验。希望这篇文章能够帮助你更好地掌握 Page Visibility API 并将其应用到实际项目中。

## 参考内容

-   [页面可见性 API - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API)
-   [Document：visibilitychange 事件 - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)
-   [Document：hidden 属性 - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/hidden)
-   [Document.visibilityState - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilityState)
