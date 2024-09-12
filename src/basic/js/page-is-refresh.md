# 在 Web 中判断页面是不是刷新

在 Web 开发中，我们经常需要区分用户是否通过刷新操作重新加载了页面。
这一操作可能是由用户手动刷新（如按下 F5 键或点击浏览器刷新按钮）或通过浏览器自动重新加载。
判断页面是否刷新有助于开发者优化用户体验，例如在使用 vue 的时候需要进行权限控制，就需要判断在刷新后根据登录者的权限去添加对应的路由。

本文将详细解析几种常见的判断页面是否刷新的技术方案，并探讨各自的适用场景、优缺点以及浏览器的兼容性。

## 1. 使用 `window.name`

`window.name` 是一个持久的窗口属性，它的值在页面刷新、甚至通过标签页导航到其他页面时也会保留，因此可以利用它来判断页面是否是通过刷新重新加载。

### 代码示例

```js
window.onload = function () {
    if (window.name === "isRefreshed") {
        console.log("页面被刷新");
    } else {
        console.log("首次加载页面");
        window.name = "isRefreshed";
    }
};
```

### 工作原理

-   首次加载时，`window.name` 是空字符串，通过设置它为 `'isRefreshed'` 来标记状态。
-   刷新页面后，`window.name` 仍保持为 `'isRefreshed'`，因此可以判断页面是通过刷新加载的。

### 优点

-   **简单易用**：不依赖外部存储机制或服务器端逻辑。
-   **跨页面持久性**：在页面间导航时，`window.name` 的值依然保持，适合跨页面场景。

### 缺点

-   **安全性问题**：`window.name` 的值在不同页面间共享，可能被其他页面读取。
-   **手动清理**：在某些场景下可能需要手动清除 `window.name`，例如页面关闭时。

### 兼容性

`window.name` 是一个非常老的 Web API，几乎在所有浏览器中都有广泛的支持，包括：

![1.png](/images/basic/js/page-is-refresh/1.png)

## 2. 使用 `sessionStorage`

`sessionStorage` 是 Web 存储 API 的一部分，它为每个标签页维护独立的存储空间，并且其数据在标签页关闭后会被清空。我们可以利用 `sessionStorage` 来判断页面是否被刷新：

```js
window.onload = function () {
    if (sessionStorage.getItem("isRefreshed")) {
        console.log("页面被刷新");
    } else {
        console.log("首次加载页面");
    }
    sessionStorage.setItem("isRefreshed", true);
};
```

### 工作原理

-   当页面首次加载时，`sessionStorage` 中没有 `isRefreshed` 条目，因此可以判断这是首次加载。
-   通过设置 `sessionStorage.setItem('isRefreshed', true);`，标记页面已加载。
-   当页面刷新后，`sessionStorage` 中的 `isRefreshed` 条目依然存在，因此可以检测到页面的刷新操作。

### 优点

-   简单且不依赖服务器端逻辑。
-   只对当前标签页有效，适合单个页面或 SPA（单页应用）场景。

### 缺点

-   关闭标签页或浏览器窗口后，`sessionStorage` 会被清空，无法保存状态。

### 兼容性

`sessionStorage` 是广泛支持的 API，适用于以下浏览器：

![2.png](/images/basic/js/page-is-refresh/2.png)

## 3. 使用 `performance.navigation` API

浏览器的 `performance.navigation` API 提供了页面加载的详细信息，包括是否是通过刷新操作加载的页面。通过检查 `performance.navigation.type` 属性可以判断页面的加载方式。

```js
window.onload = function () {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        console.log("页面被刷新");
    } else {
        console.log("首次加载页面");
    }
};
```

### 属性解释

-   `performance.navigation.TYPE_RELOAD`: 表示页面通过刷新加载。
-   其他类型（如 `TYPE_NAVIGATE`）表示正常导航。

### 优点

-   直接提供了判断页面刷新与否的接口，较为精确。
-   不需要手动存储状态。

### 缺点

-   该 API 正在逐步弃用，未来的浏览器可能不会支持。
-   不适合未来长期维护的项目，应考虑迁移到更新的 API，比如下文中的 `performance.getEntriesByType`。

### 兼容性

`performance.navigation` API 在大多数浏览器中都被支持，但该 API 已逐步被弃用：

![3.png](/images/basic/js/page-is-refresh/3.png)

## 4. 使用 `beforeunload` 事件

`beforeunload` 事件在用户离开页面之前触发，无论是页面刷新、关闭还是导航到其他页面。在此事件中，我们可以设置一个标志位来判断用户是否通过刷新离开当前页面。

```js
window.addEventListener("beforeunload", function () {
    localStorage.setItem("isRefreshed", "true");
});

window.onload = function () {
    if (localStorage.getItem("isRefreshed") === "true") {
        console.log("页面被刷新");
        localStorage.removeItem("isRefreshed"); // 刷新后清除标志位
    } else {
        console.log("首次加载页面");
    }
};
```

### 工作原理

-   在页面卸载时（包括刷新），通过 `beforeunload` 事件设置一个标志位。
-   页面重新加载时，根据该标志位判断页面是否通过刷新操作加载。

### 优点

-   灵活，可以处理不同类型的页面离开操作。
-   `localStorage` 的数据不会在页面关闭时清除，因此可以用于判断跨页面的刷新。

### 缺点

-   `beforeunload` 事件在部分浏览器（尤其是移动端）可能表现不一致。
-   如果用户清除了浏览器缓存或 `localStorage`，则无法正确判断。

### 兼容性

`beforeunload` 事件在大多数现代浏览器中都有广泛支持，但可能在一些移动端浏览器上表现不一致：

![4.png](/images/basic/js/page-is-refresh/4.png)

## 5. 使用 `performance.getEntriesByType`

`performance.getEntriesByType("navigation")` 是一个现代 Web 性能 API，用于获取页面导航的详细信息。
通过这个方法，我们可以获取一个包含导航信息的对象，并通过检查该对象的 `type` 属性，判断页面是通过刷新加载还是其他方式进入的。

### 示例代码

```js
window.onload = function () {
    const [navigationEntry] = performance.getEntriesByType("navigation");

    if (navigationEntry && navigationEntry.type === "reload") {
        console.log("页面被刷新");
    } else {
        console.log("首次加载页面");
    }
};
```

### 工作原理

-   `performance.getEntriesByType('navigation')` 返回一个 `PerformanceNavigationTiming` 对象数组，其中包含页面导航的详细信息。
-   通过检查 `navigationEntry.type`，可以确定页面加载的类型：
    -   `type === 'reload'`: 页面通过刷新加载。
    -   `type === 'navigate'`: 页面通过正常导航进入。
    -   `type === 'back_forward'`: 页面通过浏览器的前进或后退按钮加载。
    -   `type === 'prerender'`: 页面通过预渲染加载（这个状态通常不常见）。

### 优点

-   **现代性**：`performance.getEntriesByType` 是较新的 API，能够在现代浏览器中准确区分页面的导航方式。
-   **详细信息**：除了判断页面刷新，还可以获取更多关于页面加载性能的数据，如 DNS 解析时间、请求时间等，有助于调优页面性能。
-   **无状态管理**：无需依赖 `sessionStorage`、`localStorage` 等外部状态，避免了状态同步问题。

### 缺点

-   **浏览器兼容性**：虽然大多数现代浏览器支持此 API，但 Internet Explorer 不支持（现在已不是问题）。
-   **不适用于多次刷新**：如果需要在用户进行多次刷新的情况下进行追踪，单次判断可能不足。

### 使用场景

`performance.getEntriesByType` 适合那些只需要快速判断页面是否是刷新加载的场景，并且同时有进一步性能优化需求的应用。对于现代 Web 开发，这是一个较为精确且无需额外存储或会话管理的解决方案。

### 监控页面加载性能示例

```js
window.onload = function () {
    const [navigationEntry] = performance.getEntriesByType("navigation");

    if (navigationEntry) {
        console.log(`页面加载类型: ${navigationEntry.type}`);
        console.log(
            `页面加载时间: ${
                navigationEntry.loadEventEnd - navigationEntry.startTime
            } ms`
        );
    }
};
```

这种方式不仅能帮助判断页面加载类型，还能帮助开发者优化页面性能，提供更多性能数据来分析页面加载瓶颈。

### 兼容性

`performance.getEntriesByType` 是较新的 API，在现代浏览器中得到广泛支持，但较旧浏览器不支持。

![5.png](/images/basic/js/page-is-refresh/5.png)

## 总结

判断页面是否刷新是一个常见的需求，本文介绍了五种技术方案。每种方案都有其特定的适用场景和优缺点。总结如下：

| 方案                             | 优点                 | 缺点                           | 浏览器兼容性         |
| -------------------------------- | -------------------- | ------------------------------ | -------------------- |
| _`window.name`_                  | 简单、跨页面保持状态 | 安全性问题，需手动清理         | 适用于现代浏览器     |
| _`sessionStorage`_               | 简单、不依赖复杂逻辑 | 关闭标签页时清空               | 支持现代浏览器       |
| _`performance.navigation`_       | 直接提供页面刷新判断 | API 正被弃用                   | 广泛支持，但已被废弃 |
| _`performance.getEntriesByType`_ | 精确判断加载类型     | 较新，旧版浏览器不支持         | 仅支持现代浏览器     |
| _`beforeunload`_                 | 可处理离开页面的操作 | 部分浏览器不支持，尤其是移动端 | 大多数现代浏览器支持 |

不同的方案各有优劣，开发者应根据应用的目标用户群体、性能需求和浏览器支持情况灵活选择。
如果需要简单、跨页面的刷新判断，`window.name` 是一个不错的选择；而在需要更精确、现代化的判断方式时，`performance.getEntriesByType` 提供了更高的灵活性。
