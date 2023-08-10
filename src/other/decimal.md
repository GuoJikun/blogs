# JavaScript 的数学计算库：decimal.js

An arbitrary-precision Decimal type for JavaScript.

## 功能

-   整数和浮点数
-   简单但功能齐全的 API
-   复制 JavaScript 和对象的许多方法`Number.prototype` `Math`
-   还处理十六进制、二进制和八进制值
-   比 Java 的 BigDecimal JavaScript 版本更快，更小，也许更容易使用
-   无依赖关系
-   广泛的平台兼容性：仅使用 JavaScript 1.5 （ECMAScript 3） 功能
-   全面的[文档](https://mikemcl.github.io/decimal.js/)和测试集
-   在引擎盖下被[数学使用.js](https://github.com/josdejong/mathjs)
-   包括一个 TypeScript 声明文件：_decimal.d.ts_

![image.png](/images/other/decimal/api.png)

## 安装

该库是单个 JavaScript 文件 _decimal.js_ 或 ES 模块 _decimal.mjs_。

浏览器：

```js
<script src='path/to/decimal.js'></script>

<script type="module">
import Decimal from './path/to/decimal.mjs';
...
</script>
```

Npm：

```js
npm install decimal.js
```

```js
const Decimal = require("decimal.js");

import Decimal from "decimal.js";

import { Decimal } from "decimal.js";
```

## 使用

该库导出单个构造函数`Decimal`，该函数需要单个参数，即数字、字符串或十进制实例。

```js
x = new Decimal(123.4567);
y = new Decimal("123456.7e-3");
z = new Decimal(x);
x.equals(y) && y.equals(z) && x.equals(z); // true
```

## 加减乘除

```js
const a = new Decimal(4);
const b = new Decimal(2);
a.add(b); // 6
a.sub(b); // 2
a.mul(b); // 8
a.div(b); // 2
```

## 超过 javascript 允许的数字

如果使用超过 javascript 允许的数字的值，建议传递字符串而不是数字，以避免潜在的精度损失。

```js
new Decimal(1.0000000000000001); // '1'
new Decimal(88259496234518.57); // '88259496234518.56'
new Decimal(99999999999999999999); // '100000000000000000000'

new Decimal(2e308); // 'Infinity'
new Decimal(1e-324); // '0'

new Decimal(0.7 + 0.1); // '0.7999999999999999'
```

## 可读性

与 JavaScript 数字一样，字符串可以包含下划线作为分隔符以提高可读性。

```js
x = new Decimal("2_147_483_647");
```

## 其它进制的数字

如果包含适当的前缀，则也接受二进制、十六进制或八进制表示法的字符串值。

```js
x = new Decimal("0xff.f"); // '255.9375'
y = new Decimal("0b10101100"); // '172'
z = x.plus(y); // '427.9375'

z.toBinary(); // '0b110101011.1111'
z.toBinary(13); // '0b1.101010111111p+8'

x = new Decimal(
    "0b1.1111111111111111111111111111111111111111111111111111p+1023"
);
// '1.7976931348623157081e+308'
```

有关更多信息，请参阅  *doc*  目录中的  [API](http://mikemcl.github.io/decimal.js/)  参考。
