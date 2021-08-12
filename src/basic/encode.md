# encodeURI 和 encodeURIComponent 的区别

`encodeURI()`和 `encodeURIComponent()`方法都可以对 URI 进行编码，以便发送给浏览器。有效的 URI 中不能包含某些字符，例如空格。而这 URI 编码方法就可以对 URI 进行编码，它们用特殊的 UTF-8 编码替换所有无效的字 符，从而让浏览器能够接受和理解。

> `encodeURI()`不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而 `encodeURIComponent()`则会对它发现的任何非标准字符进行编码

```js
const url = 'https://www.baidu.com?wd=ab c'
encodeURI(url) // "https://www.baidu.com?wd=ab%20c"
encodeURIComponent(url) // https%3A%2F%2Fwww.baidu.com%3Fwd%3Dab%20c"
```
