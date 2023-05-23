# javascript 中的错误类型

:::tip javascript 中的错误类型：
*   SyntaxError
*   TypeError
*   ReferenceError
*   RangeError
*   URLError
*   Error
:::

## SyntaxError

语法错误

```js
// 当您在编写一个函数时忘记了括号 ,)来括起您的代码，您将收到一个SyntaxError错误
function say(text) {
    return text;
}

say('shark';

// output
Uncaught SyntaxError: missing ) after argument list

// 当函数参数和函数体内使用相同的变量名时，您也可能会遇到此错误。
function say1(text) {
    let text = '呱呱呱';
}

// output
 Uncaught SyntaxError: Identifier 'text' has already been declared
```

## TypeError

TypeError 表示类型错误。当您使用不打算以特定方式使用的东西时，就会发生类型错误。例如，用螺丝刀敲钉子，而不是用锤子。

```js
// a 不是一个函数却被当作函数调用
let a = 1
console.log(a()) 

//output
Uncaught TypeError: a is not a function

// 对一个常量进行复制赋值
const b = 1
b = 2 // you reassign a const type variable again

//output
TypeError: Assignment to constant variable.
```

## ReferenceError

ReferenceError 表示引用错误。当找不到变量的引用、在变量作用域范围之外使用变量、使用未声明的变量时、在暂时性死区期间使用变量时都会抛出此错误。

```js
// 使用未声明的变量
let a = 1
console.log(b) // undefined variable used

//output
Uncaught ReferenceError: b is not defined

// 在变量作用域外使用变量
const c = 2;
if (c > 1) {
    const d = 3;
}

console.log(d)
// output
Uncaught ReferenceError: d is not defined
```

## RangeError

RangeError 表示范围错误。将变量设置在其限定的范围之外、将值传递给超出范围的方法、调用一个不会终止的递归函数时就会抛出此错误。

![1.png](/images/basic/javascript-error-type/1.png)

## URLError

```
URIError: malformed URI sequence (Firefox)
URIError: URI malformed (Chrome)
```

URIError 表示 URI错误。当 URI 的编码和解码出现问题时，会抛出 URIError。JavaScript 中的 URI 操作函数包括：decodeURI、decodeURIComponent 等。如果使用了错误的参数（无效字符），就会抛出 URIError。

![2.png](/images/basic/javascript-error-type/2.png)

## Error

尝试访问无权访问的对象。这很可能出现在使用 [iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 元素时加载了一个不同域名下的页面，这在访问子页面时会违背[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)。

```html
<!DOCTYPE html>
<html>
  <head>
    <iframe id="myframe" src="http://www1.w3c-test.org/common/blank.html"></iframe>
    <script>
      console.log(document.getElementById('myframe').contentWindow.document);
      // Error: Permission denied to access property "document"
    </script>
  </head>
  <body></body>
</html>
```

::: tip 更多信息
更过关于error的信息，请查阅 [JavaScript 错误参考 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors)
:::
