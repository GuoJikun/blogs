# 自定义浏览器滚动条

## `::-webkit-scrollbar`

::: warning 非标准
该特性是非标准的，请尽量不要在生产环境中使用它！
:::

### 描述

`::-webkit-scrollbar` CSS 伪类选择器影响了一个元素的滚动条的样式

> `::-webkit-scrollbar` 仅仅在支持 WebKit 的浏览器 (例如, 谷歌 Chrome, 苹果 Safari)可以使用.

### CSS 滚动条选择器

你可以使用以下伪元素选择器去修改各式 webkit 浏览器的滚动条样式:

- `::-webkit-scrollbar` — 整个滚动条.
- `::-webkit-scrollbar-button` — 滚动条上的按钮 (上下箭头).
- `::-webkit-scrollbar-thumb` — 滚动条上的滚动滑块.
- `::-webkit-scrollbar-track` — 滚动条轨道.
- `::-webkit-scrollbar-track-piece` — 滚动条没有滑块的轨道部分.
- `::-webkit-scrollbar-corner` — 当同时有垂直滚动条和水平滚动条时交汇的部分.
- `::-webkit-resizer` — 某些元素的 corner 部分的部分样式(例:textarea 的可拖动按钮).

### 示例

<div class="webkit-scrollbar">
    <div class="webkit-scrollbar-inner"></div>
    <div class="webkit-scrollbar-inner"></div>
</div>

```html
<div class="webkit-scrollbar">
  <div class="webkit-scrollbar-inner"></div>
  <div class="webkit-scrollbar-inner"></div>
</div>
```

```css
.webkit-scrollbar {
  width: 100%;
  height: 200px;
  overflow: auto;
}
.webkit-scrollbar::-webkit-scrollbar {
  width: 20px;
  height: 8px;
  background-color: green;
}
.webkit-scrollbar::-webkit-scrollbar-button {
  color: red;
  background-color: red;
  border-radius: 50%;
}
.webkit-scrollbar::-webkit-scrollbar-thumb {
  background-color: blue;
}
.webkit-scrollbar::-webkit-scrollbar-track {
  background-color: pink;
}
.webkit-scrollbar::-webkit-scrollbar-corner {
  color: white;
  background-color: purple;
}
.webkit-scrollbar-inner {
  height: 400px;
  width: 300%;
}
.webkit-scrollbar-inner:last-child {
  background-color: gray;
}
```

## CSS Scrollbar

::: warning 草案
该特性还处于 draft，目前只有 Firefox version > 64 支持
:::

> 单独写在 body 下不生效-原因未知

<div class="firefox-scrollbar">
    <div class="firefox-scrollbar-inner"></div>
    <div class="firefox-scrollbar-inner"></div>
</div>

```html
<div class="firefox-scrollbar">
  <div class="firefox-scrollbar-inner"></div>
  <div class="firefox-scrollbar-inner"></div>
</div>
```

```css
.firefox-scrollbar {
  width: 100%;
  height: 200px;
  overflow: auto;
  scrollbar-width: thin; /*thin-浏览器内置的较细的滚动条；none-隐藏滚动条但可滚动;revert-*/
  scrollbar-color: green blue; /*滑块颜色 滑轨颜色*/
}
.firefox-scrollbar-inner {
  height: 400px;
  width: 300%;
}
.firefox-scrollbar-inner:last-child {
  background-color: gray;
}
```

<style>
.webkit-scrollbar {
    width: 100%;
    height: 200px;
    overflow: auto;
    background-color: #cdcdcd;
}
.webkit-scrollbar::-webkit-scrollbar {
    width: 20px;
    height: 8px;
    background-color: green;
}
.webkit-scrollbar::-webkit-scrollbar-button {
    color: red;
    background-color: red;
    border-radius: 50%;
}
.webkit-scrollbar::-webkit-scrollbar-thumb {
    background-color: blue;
}
.webkit-scrollbar::-webkit-scrollbar-track {
    background-color: pink;
}
.webkit-scrollbar::-webkit-scrollbar-corner {
    color: white;
    background-color: purple;
}
.webkit-scrollbar-inner {
    height: 400px;
    width: 300%;
}
.webkit-scrollbar-inner:last-child {
    background-color: gray;
}
.firefox-scrollbar {
    width: 100%;
    height: 200px;
    overflow: auto;
    background-color: #cdcdcd;
    scrollbar-width: thin; /*thin-浏览器内置的较细的滚动条；none-隐藏滚动条但可滚动*/
    scrollbar-color: green blue; /*滑块颜色 滑轨颜色*/
}
.firefox-scrollbar-inner {
    height: 400px;
    width: 300%;
}
.firefox-scrollbar-inner:last-child {
    background-color: gray;
}
</style>
