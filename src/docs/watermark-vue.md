# Watermark 水印组件

一个使用vue3开发水印组件

## 安装

```bash
npm i @jkun/watermark-vue
```

## 使用

```js
import watermark from '@jkun/watermark-vue'
import {createApp} from 'vue'
createApp().use(watermark)
```

> 如果引入是umd 模块则无需手动引入css（@jkun/watermark-vue/dist/watermark.umd.js）

<!-- Auto Generated Below -->

## 基础用法

只添加content即可使用水印组件

<watermark-vue content="测试水印" style="height: 400px" :font="{fontSize: 12}"></watermark-vue>


```vue
<watermark-vue content="测试水印" style="height: 400px" :font="{fontSize: 12}"></watermark-vue>
```

## 设置字体样式

通过修改`font`属性去更改字体相关的配置

<watermark-vue content="测试水印" style="height: 400px" :font="{fontSize: 16,color: 'rgba(100,108,255,0.4)',fontStyle: 'italic'}"></watermark-vue>


```vue
<watermark-vue content="测试水印" style="height: 400px" :font="{fontSize: 16,color: 'rgba(100,108,255,0.4)',fontStyle: 'italic'}" image="/images/docs/watermark.png"></watermark-vue>
```

## 图片水印

通过修改`image`属性去设置图片水印

<watermark-vue content="测试水印" style="height: 400px" :font="{fontSize: 16,color: 'rgba(100,108,255,0.4)',fontStyle: 'italic'}" :width="38" :height="45" image="/images/docs/watermark.png"></watermark-vue>


```vue
<watermark-vue content="测试水印" style="height: 400px" :font="{fontSize: 16,color: 'rgba(100,108,255,0.4)',fontStyle: 'italic'}" image="/images/docs/watermark.png"></watermark-vue>
```

:::tip 提示
为保证图片高清且不被拉伸，请设置 width 和 height, 并上传至少两倍的宽高的 logo 图片地址。
:::

## Api

### Props

| prop| 描述 | 类型| 默认值|
| ------------ | ----------- | -------- | ---------- |
| content    |内容| string|string[] | |
| font  |  [font](#font)   | object | rgba(0,0,0,0.15)|
| gap|间隔| array | [100, 100]|
| width|宽度| string | 100%|
| height|高度| string | 100%|
| offset|偏移| array | |
| rotate|水印的旋转角度| number | -22|
| zIndex|水印的层级| number | 9|
| image|图片url| string |  |

### font
| key     | 描述 | 类型| 默认值|
| ------------ | ----------- | -------- | --------- |
|fontFamily |字体，同css中的font-family| string | PingFang SC, sans-serif |
| fontSize   | 字体大小| number | 14|
| fontStyle  |字体样式，同css中的font-style| string | normal|
| color  |字体颜色| string | normal|
| fontWeight |字体粗细，同css中的font-weight| string | normal|

