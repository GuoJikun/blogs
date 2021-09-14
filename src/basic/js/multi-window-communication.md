# 浏览器多标签页通信

## 前言

最近在做一个项目的时候，项目中每个模块都要能开多个窗口，而原生的 `localStorage` 在多窗口下的同步不及时会导致登录信息和 `token` 不一致，所以研究了下多窗口间的通讯。

## Storage 事件

由于是 localStorage 同步不及时的原因，所以第一时间想到了 Storage 事件，但是使用这个事件会导致不同的窗口间多次触发的问题，影响性能。

::: tip 注意
两个页面要同源（URL 的协议、域名和端口相同）
:::

```js
// page1
localStorage.setItem(
  "message",
  JSON.stringify({
    message: "消息",
    date: new Date().getTime(),
  })
);

// Page 2
// 在page1中改变localStorage中key为message的值，则可以在page2中监听ev.key等于message来通信
window.addEventListener("storage", function (e) {
  console.log(e.key, e.newValue, e.oldValue);
  if (ev.key === "message") {
    // do something
  }
});
```

`ev`中各个属性的详细介绍

| 属性名      | 类型          | 描述                                                                                              |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------- |
| key         | DOMString     | 该属性代表被修改的键值。当被 clear()方法清除之后该属性值为 null。（只读）                         |
| newValue    | DOMString     | 该属性代表修改后的新值。当被 clear()方法清理后或者该键值对被移除，newValue 的值为 null 。（只读） |
| oldValue    | DOMString     | 该属性代表修改前的原值。在设置新键值对时由于没有原始值，该属性值为 null。（只读）                 |
| storageArea | nsIDOMStorage | 被操作的 storage 对象。（只读）                                                                   |
| url         | DOMString     | key 发生改变的对象所在文档的 URL 地址。（只读）                                                   |

## window.postMessage

### 语法

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

### 参数

- otherWindow：
  其他窗口的一个引用，比如 `iframe` 的 `contentWindow` 属性、执行 `window.open` 返回的窗口对象、或者是命名过或数值索引的 `window.frames`。
- message：
  将要发送到其他 `window` 的数据。它将会被结构化克隆算法序列化。这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化。
  -targetOrigin：
  通过窗口的 `origin` 属性来指定哪些窗口能接收到消息事件，其值可以是字符串""（表示无限制）或者一个 URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配 `targetOrigin` 提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口；例如，当用 `postMessage` 传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的 `origin` 属性完全一致，来防止密码被恶意的第三方截获。如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的 `targetOrigin`，而不是。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。
- transfer 可选：
  是一串和 `message` 同时传递的 `Transferable` 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

### 示例

示例来自于 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage#example)

```js
/*
 * A窗口的域名是<http://example.com:8080>，以下是A窗口的script标签下的代码：
 */

var popup = window.open(...popup details...);

// 如果弹出框没有被阻止且加载完成

// 这行语句没有发送信息出去，即使假设当前页面没有改变location（因为targetOrigin设置不对）
popup.postMessage("The user is 'bob' and the password is 'secret'", "https://secure.example.net");

// 假设当前页面没有改变location，这条语句会成功添加message到发送队列中去（targetOrigin设置对了）
popup.postMessage("hello there!", "http://example.org");

function receiveMessage(event){
  // 我们能相信信息的发送者吗?  (也许这个发送者和我们最初打开的不是同一个页面).
  if (event.origin !== "http://example.org")
    return;

  // event.source 是我们通过window.open打开的弹出页面 popup
  // event.data 是 popup发送给当前页面的消息 "hi there yourself!  the secret response is: rheeeeet!"
}
window.addEventListener("message", receiveMessage, false);
```

## BroadcastChannel

BroadcastChannel 接口代理了一个命名频道，可以让指定 `origin` 下的任意 `browsing context` 来订阅它。它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档之间相互通信。通过触发一个 `message` 事件，消息可以广播到所有监听了该频道的 `BroadcastChannel` 对象。

::: tip 特殊说明
此特性在 Web Worker 中可用
:::

### 用法

```js
// page1
const channel = new BroadcastChannel("BroadcastChannel");
channel.addEventListener("message", function (ev) {
  console.log(ev.data);
});

// page2
const channel = new BroadcastChannel("BroadcastChannel");
channel.postMessage("Hello, BroadcastChannel!");

/**
 * 在page1中创建一个频道BroadcastChannel，并监听其message事件
 * 在page2中也创建一个频道BroadcastChannel，通过其发送postMessage消息
 * 在page1中便可以接收到page2中的消息
 **/
```

更多详细信息可以查看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel)

## 更多方法

- websocket：多个窗口监听同一个 websocket 服务。
- cookie：通过定时器监听 cookie 的变化。
- sharedWork：这是 Web Worker 之后出来的共享的 Worker，不通页面可以共享这个 Worker。[MDN 上的例子](https://github.com/mdn/simple-shared-worker)。
- MessageChannel：Channel Messaging API 的 MessageChannel 接口允许我们创建一个新的消息通道，并通过它的两个 MessagePort 属性发送数据。
