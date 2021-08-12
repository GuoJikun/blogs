## 获取 url 中的参数

```js
// 方法1
function query(url) {
    return url.match(/([^?=&]+)(=([^&]*))/g).reduce((obj, v) => {
        const tmp = v.split('=')
        obj[tmp[0]] = tmp[1]
        return obj
    }, {})
}
// 方法2
function params2json(url) {
    return new URL(url).searchParams
}
// 方法3
function params2json(url) {
    return new URLSearchParams(url)
}
// 方法2和方法3的使用
const uri = 'http://baidu.com?ie=10&b=c'
params2json(uri).get('ie') // 10
```

## 颜色 HEX 转 RGB

```js
function hex2rgb(val) {
    const hexArr = val.match(/([a-zA-Z\d]{2})/g)
    let target = []
    for (let i of tmp) {
        target.push(parseInt(`0x${i}`, 16))
    }
    return target.join()
}
```

## 获取 unix 时间戳

```js
function getUnixTimestamp() {
    return parseInt(new Date().getTime() / 1000)
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
    ratio = Math.max(Math.min(Number(ratio), 1), 0)
    const r1 = parseInt(c1.substring(1, 3), 16)
    const g1 = parseInt(c1.substring(3, 5), 16)
    const b1 = parseInt(c1.substring(5, 7), 16)
    const r2 = parseInt(c2.substring(1, 3), 16)
    const g2 = parseInt(c2.substring(3, 5), 16)
    const b2 = parseInt(c2.substring(5, 7), 16)
    let r = Math.round(r1 * ratio + r2 * (1 - ratio))
    let g = Math.round(g1 * ratio + g2 * (1 - ratio))
    let b = Math.round(b1 * ratio + b2 * (1 - ratio))
    r = '' + (r || 0).toString(16)
    g = '' + (g || 0).toString(16)
    b = '' + (b || 0).toString(16)
    return `#${r}${g}${b}`
}
```
