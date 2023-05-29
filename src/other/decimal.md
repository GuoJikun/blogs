# JavaScript的数学计算库：decimal.js

An arbitrary-precision Decimal type for JavaScript.

## 功能

- 整数和浮点数
- 简单但功能齐全的 API
- 复制JavaScript和对象的许多方法`Number.prototype` `Math`
- 还处理十六进制、二进制和八进制值
- 比Java的BigDecimal JavaScript版本更快，更小，也许更容易使用
- 无依赖关系
- 广泛的平台兼容性：仅使用 JavaScript 1.5 （ECMAScript 3） 功能
- 全面的[文档](https://mikemcl.github.io/decimal.js/)和测试集
- 在引擎盖下被[数学使用.js](https://github.com/josdejong/mathjs)
- 包括一个 TypeScript 声明文件：*decimal.d.ts*

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efcc7285db614fa8b0ded9b726878207~tplv-k3u1fbpfcp-watermark.image?)

## 安装

该库是单个JavaScript文件十*进制.js*或ES模块十*进制.mjs*。

浏览器：

```js
<script src='path/to/decimal.js'></script>

<script type="module">
import Decimal from './path/to/decimal.mjs';
...
</script>
```

Nodejs：

```js
npm install decimal.js
```

```js
const Decimal = require('decimal.js');

import Decimal from 'decimal.js';

import {Decimal} from 'decimal.js';
```

## 使用

*在下面的所有示例中，未显示分号和 `toString` 调用。 如果注释掉的值用引号引起来，则表示已在前面的表达式上调用了 `toString`。*

该库导出单个构造函数，该函数需要单个参数，即数字、字符串或十进制实例。`Decimal`

```js
x = new Decimal(123.4567)
y = new Decimal('123456.7e-3')
z = new Decimal(x)
x.equals(y) && y.equals(z) && x.equals(z)        // true
```

如果使用超过几个数字的值，建议传递字符串而不是数字，以避免潜在的精度损失。

```js
// Precision loss from using numeric literals with more than 15 significant digits.
new Decimal(1.0000000000000001)         // '1'
new Decimal(88259496234518.57)          // '88259496234518.56'
new Decimal(99999999999999999999)       // '100000000000000000000'

// Precision loss from using numeric literals outside the range of Number values.
new Decimal(2e+308)                     // 'Infinity'
new Decimal(1e-324)                     // '0'

// Precision loss from the unexpected result of arithmetic with Number values.
new Decimal(0.7 + 0.1)                  // '0.7999999999999999'
```

与 JavaScript 数字一样，字符串可以包含下划线作为分隔符以提高可读性。

```js
x = new Decimal('2_147_483_647')
```

如果包含适当的前缀，则也接受二进制、十六进制或八进制表示法的字符串值。

```js
x = new Decimal('0xff.f')            // '255.9375'
y = new Decimal('0b10101100')        // '172'
z = x.plus(y)                        // '427.9375'

z.toBinary()                         // '0b110101011.1111'
z.toBinary(13)                       // '0b1.101010111111p+8'

// Using binary exponential notation to create a Decimal with the value of `Number.MAX_VALUE`.
x = new Decimal('0b1.1111111111111111111111111111111111111111111111111111p+1023')
// '1.7976931348623157081e+308'
```

十进制实例是不可变的，因为它们不会通过其方法更改。

```js
0.3 - 0.1                     // 0.19999999999999998
x = new Decimal(0.3)
x.minus(0.1)                  // '0.2'
x                             // '0.3'
```

返回十进制的方法可以链接。

```js
x.dividedBy(y).plus(z).times(9).floor()
x.times('1.23456780123456789e+9').plus(9876.5432321).dividedBy('4444562598.111772').ceil()
```

许多方法名称具有较短的别名。

```js
x.squareRoot().dividedBy(y).toPower(3).equals(x.sqrt().div(y).pow(3))     // true
x.comparedTo(y.modulo(z).negated() === x.cmp(y.mod(z).neg())              // true
```

JavaScript 和对象的大多数方法都是复制的。`Number.prototype``Math`

```js
x = new Decimal(255.5)
x.toExponential(5)                       // '2.55500e+2'
x.toFixed(5)                             // '255.50000'
x.toPrecision(5)                         // '255.50'

Decimal.sqrt('6.98372465832e+9823')      // '8.3568682281821340204e+4911'
Decimal.pow(2, 0.0979843)                // '1.0702770511687781839'

// Using `toFixed()` to avoid exponential notation:
x = new Decimal('0.0000001')
x.toString()                             // '1e-7'
x.toFixed()                              // '0.0000001'
```

并且有 和 方法，因为 和 是有效值。`isNaN``isFinite``NaN``Infinity``Decimal`

```js
x = new Decimal(NaN)                                           // 'NaN'
y = new Decimal(Infinity)                                      // 'Infinity'
x.isNaN() && !y.isNaN() && !x.isFinite() && !y.isFinite()      // true
```

还有一个带有可选*最大分母*参数的方法。`toFraction`

```js
z = new Decimal(355)
pi = z.dividedBy(113)        // '3.1415929204'
pi.toFraction()              // [ '7853982301', '2500000000' ]
pi.toFraction(1000)          // [ '355', '113' ]
```

所有计算均根据指定的有效位数和舍入模式进行四舍五入 由十进制构造函数的 和 属性提供。`precision``rounding`

对于高级用法，可以创建多个 Decimal 构造函数，每个构造函数都有自己独立的构造函数 配置适用于从中创建的所有十进制数。

```js
// Set the precision and rounding of the default Decimal constructor
Decimal.set({ precision: 5, rounding: 4 })

// Create another Decimal constructor, optionally passing in a configuration object
Dec = Decimal.clone({ precision: 9, rounding: 1 })

x = new Decimal(5)
y = new Dec(5)

x.div(3)                           // '1.6667'
y.div(3)                           // '1.66666666'
```

十进制的值以其数字、指数和符号的浮点格式存储，但这些属性应被视为只读。

```js
x = new Decimal(-12345.67);
x.d                            // [ 12345, 6700000 ]    digits (base 10000000)
x.e                            // 4                     exponent (base 10)
x.s                            // -1                    sign
```

有关更多信息，请参阅 *doc* 目录中的 [API](http://mikemcl.github.io/decimal.js/) 参考。
