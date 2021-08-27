# 工具函数

## 获取 url 中的参数

```js
// 方法1
function query(url) {
  return url.match(/([^?=&]+)(=([^&]*))/g).reduce((obj, v) => {
    const tmp = v.split("=");
    obj[tmp[0]] = tmp[1];
    return obj;
  }, {});
}
// 方法2
function params2json(url) {
  return new URL(url).searchParams;
}
// 方法3
function params2json(url) {
  return new URLSearchParams(url);
}
// 方法2和方法3的使用
const uri = "http://baidu.com?ie=10&b=c";
params2json(uri).get("ie"); // 10
```

## 颜色 HEX 转 RGB

```js
function hex2rgb(val) {
  const hexArr = val.match(/([a-zA-Z\d]{2})/g);
  let target = [];
  for (let i of tmp) {
    target.push(parseInt(`0x${i}`, 16));
  }
  return target.join();
}
```

## 获取 unix 时间戳

```js
function getUnixTimestamp() {
  return parseInt(new Date().getTime() / 1000);
}
```

## 颜色叠加算法

```js
/**
 * 颜色叠加
 * @param {String} c1 颜色1-HEX格式
 * @param {String} c2 颜色2-HEX格式
 * @param {Number} ratio 小数-c1:所占比重；1-ratio:c2所占比重
 * @returns {String} HEX格式
 */
const colorBlend = (c1, c2, ratio) => {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  const r1 = parseInt(c1.substring(1, 3), 16);
  const g1 = parseInt(c1.substring(3, 5), 16);
  const b1 = parseInt(c1.substring(5, 7), 16);
  const r2 = parseInt(c2.substring(1, 3), 16);
  const g2 = parseInt(c2.substring(3, 5), 16);
  const b2 = parseInt(c2.substring(5, 7), 16);
  let r = Math.round(r1 * ratio + r2 * (1 - ratio));
  let g = Math.round(g1 * ratio + g2 * (1 - ratio));
  let b = Math.round(b1 * ratio + b2 * (1 - ratio));
  r = "" + (r || 0).toString(16);
  g = "" + (g || 0).toString(16);
  b = "" + (b || 0).toString(16);
  return `#${r}${g}${b}`;
};
```

## 判断变量的类型

```js
/**
 * 判断参数的类型
 * @param {*} arg 被判断的参数
 * @returns {String} String类型
 */
function typeOf(arg) {
  if (Number.isNaN(arg)) {
    return "NaN";
  } else {
    const iniType = Object.prototype.toString.call(arg);
    return iniType.replace(/^(\[object\s)([a-zA-Z]+)\]$/, "$2");
  }
}
```

## 对象转 Map

```js
function object2map(obj) {
  return new Map(Object.entries(obj));
}
```

## 数组扁平化

```js
/**
 * @name flat
 * @description 数组扁平化
 * @param {Array} arr 要进行扁平化的数组
 * @param {Number} depth 深度
 */
export const flat = (arr, depth = 1) => {
  if (Array.prototype.flat) {
    return arr.flat(depth);
  } else {
    let res = [],
      depthNum = 0,
      flatMap = (item) => {
        item.map((element, index, array) => {
          if (
            Object.prototype.toString.call(element).slice(8, -1) === "Array"
          ) {
            if (depthNum < depth) {
              depthNum++;
              flatMap(element);
            } else {
              res.push(element);
            }
          } else {
            res.push(element);
            if (index === array.length - 1) depthNum = 0;
          }
        });
      };
    flatMap(arr);
    return res;
  }
};
```

## 变量的类型

```js
/**
 * 判断变量的类型
 * @param {*} arg 被判断的参数
 * @returns {String} String类型
 */
export function typeOf(arg) {
  if (Number.isNaN(arg)) {
    return "NaN";
  } else {
    const iniType = Object.prototype.toString.call(arg);
    return iniType.replace(/^(\[object\s)([a-zA-Z]+)\]$/, "$2");
  }
}
```

## element-ui table 合计

> `el-table-column` 必须有 `prop` 属性

```js
/**
 * 表格求和
 * @param {Array} data 求和的数据
 * @param {String} prop 求和的字段名
 * @param {Array} allowList 求和的字段
 * @param {String} prev 放在合计结果前后的字符
 * @param {String} type prev 的位置
 */
export const tableSum = (
  data = [],
  prop = "",
  allowList = [],
  prev = "",
  type = "prev"
) => {
  let sum = 0;
  if (allowList.includes(prop)) {
    const values = data.map((item) => Number(item[prop]));
    let dotLen = 0;
    sum = values.reduce((prev, curr) => {
      const value = Number(curr);
      if (!isNaN(value)) {
        const tmp = String(value);
        if (tmp.includes(".")) {
          const len = tmp.split(".")[1].length;
          dotLen = len > dotLen ? len : dotLen;
        }
        return prev + curr;
      } else {
        return prev;
      }
    }, 0);
    if (type === "prev") {
      sum = `${prev}${parseFloat(sum.toFixed(dotLen))}`;
    } else {
      sum += prev;
    }
  } else {
    return "";
  }
  return sum;
};
```
