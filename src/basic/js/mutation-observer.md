# MutationObserver API

## 1、概述

`MutationObserver`接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。

但是，它与 Mutation Events 事件有一个本质不同：事件是同步触发，也就是说，DOM 的变动立刻会触发相应的事件；Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。

Mutation Observer 有以下特点：

> - 异步触发方式
> - 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动。
> - 它既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动。

## 2、MutationObserver()构造函数

使用时，会使用`MutationObserver`构造函数创建并返回一个新的  `MutationObserver`实例，  它会在指定的 DOM 发生变化时被调用。

```js
const observer = new MutationObserver(callback);
```

上面代码中的`callback`函数，会在每次 DOM 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例，下面是一个例子。

```js
function callback(mutationList, observer) {
  mutationList.forEach((mutation) => {
    switch (mutation.type) {
      case "childList":
        /* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
           mutation.removedNodes */
        break;
      case "attributes":
        /* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中，
           该属性之前的值为 mutation.oldValue */
        break;
    }
  });
}
const observer = new MutationObserver(callback);
```

## 3、MutationObserver 实例的方法

### 3.1、 `observe()`

`observe`方法用来启动监听，它接受两个参数：

> - 第一个参数：所要观察的 DOM 节点
> - 第二个参数：一个配置对象，指定所要观察的特定变动

```js
// 得到要观察的元素
const elementToObserve = document.querySelector("#targetElementId");

// 创建一个叫 `observer` 的新 `MutationObserver` 实例，
// 并将回调函数传给它
const observer = new MutationObserver(function () {
  console.log("callback that runs when observer is triggered");
});

// 在 MutationObserver 实例上调用 `observe` 方法，
// 并将要观察的元素与选项传给此方法
const conf = {
  subtree: true,
  childList: true,
};
observer.observe(elementToObserve, conf);
```

上面代码中，`observe`方法接受两个参数，第一个是所要观察的 DOM 元素是`elementToObserve`，第二个是所要观察的变动类型（一个可选的[`MutationObserverInit`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)  对象）。

观察器所能观察的 DOM 变动类型（即上面代码的`conf`对象），有以下几种。

> - childList：子节点的变动（指新增，删除或者更改）。
> - attributes：属性的变动。
> - characterData：节点内容或节点文本的变动。

想要观察哪一种变动类型，就在`conf`对象中指定它的值为`true`。 提醒：三种类型必须有一个为 true，否则会抛出  `TypeError`  异常

下面时所有的`conf`配置项：

- `attributeFilter`可选：要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知。无默认值。

- `attributeOldValue`可选：当监视节点的属性改动时，将此属性设为  `true`  将记录任何有改动的属性的上一个值。有关观察属性更改和值记录的详细信息。无默认值。

- `attributes`  可选：设为  `true`  以观察受监视元素的属性值变更。默认值为  `false`。

- `characterData`可选：设为  `true`  以监视指定目标节点或子节点树中节点所包含的字符数据的变化。无默认值。

- `characterDataOldValue`可选：设为  `true`  以在文本在受监视节点上发生更改时记录节点文本的先前值。无默认值。

- `childList`可选：设为  `true`  以监视目标节点（如果  `subtree`  为  `true`，则包含子孙节点）添加或删除新的子节点。默认值为  `false`。

- `subtree`可选：设为  `true`  以将监视范围扩展至目标节点整个节点树中的所有节点。`MutationObserverInit`  的其他值也会作用于此子树下的所有节点，而不仅仅只作用于目标节点。默认值为  `false`。

### 3.2、 `disconnect()`

`disconnect`方法用来停止观察。调用该方法后，DOM 再发生变动，也不会触发观察器。

```js
observer.disconnect();
```

### 3.3、 `takeRecords()`

从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到\[`MutationRecord`\]

```js
observer.takeRecords();
```

## 4、MutationRecord 对象

DOM 每次发生变化，就会生成一条变动记录（MutationRecord 实例）。该实例包含了与变动相关的所有信息。Mutation Observer 处理的就是一个个`MutationRecord`实例所组成的数组。

`MutationRecord`对象包含了 DOM 的相关信息，有如下属性：

- `type`：观察的变动类型（`attribute`、`characterData`或者`childList`）。
- `target`：发生变动的 DOM 节点。
- `addedNodes`：新增的 DOM 节点。
- `removedNodes`：删除的 DOM 节点。
- `previousSibling`：前一个同级节点，如果没有则返回 `null`。
- `nextSibling`：下一个同级节点，如果没有则返回 `null`。
- `attributeName`：发生变动的属性。如果设置了 `attributeFilter` ，则只返回预先指定的属性。
- `oldValue`：变动前的值。这个属性只对 `attribute` 和 `characterData` 变动有效，如果发生`childList`变动，则返回`null`。

## 5、示例

监听文字变动

![企业微信截图_20210902172012.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cab0ef8c0d84ae7891ea06d02eebcff~tplv-k3u1fbpfcp-watermark.image)

## 6、参考链接

- [MutationObserver - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
- [MutationObserver.MutationObserver() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver)
- [MutationObserver.observe() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe)
- [MutationObserverInit - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)
- [MutationRecord - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord)
