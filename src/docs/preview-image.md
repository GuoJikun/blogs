# fox-preview-image 图片预览

## 安装

```bash
npm i fox-preview-image #vue2.x 请使用 @1.x 版本
```

## 使用

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";

import foxPreviewImage from "fox-preview-image"; // 引入
import "fox-preview-image/lib/style.css";

const app = createApp(App);
// ...

app.use(foxPreviewImage); // 注册组件
```

```html
// App.vue
<script setup>
    import { ref } from "vue";
    const visible = ref(false);
    const visible = ref("");
</script>
<template>
    <for-preview-image v-model="visible" :src="src"></for-preview-image>
</template>
```

## Attrs

| 属性             | 说明                                       | 参数类型               | 默认值 |
| ---------------- | ------------------------------------------ | ---------------------- | ------ |
| src              | 预览图片的地址                             | String/Array\<string\> |
| visiable/v-model | 是否显示预览窗口                           | Boolean                | false  |
| initial-index    | 默认显示图片的下标(当有多张图片时可以设置) | Number                 | 0      |
| z-index          | 预览窗口的层级-css 的 zIndex               | Number                 | 9000   |

## 示例

### 单张图片

当图片只有一张时，不显示左右切换按钮

<el-button type="primary" @click="showModuleA">
点击查看预览界面-没有切换按钮
</el-button>
<ClientOnly>
<fox-preview-image v-model="moduleA.visible" :src="moduleA.src"></fox-preview-image>
</ClientOnly>

### 多张图片

通过 `initial-index` 属性设置默认显示第二张图片

<el-button type="primary" @click="showModuleB">点击查看预览界面</el-button>
<ClientOnly>
<fox-preview-image v-model="moduleB.visible" :src="moduleB.src" :initial-index="1"></fox-preview-image>
</ClientOnly>

## 和 elementPlus 公用 ZIndex

> `element-plus` 导出了 `useZIndex` hook

```vue
<script setup>
import { useZIndex } from "element";
const { currentZIndex, nextZIndex } = useZIndex();

const openFoxPreviewImage = () => {
    // ...
    nextZIndex();
};
</script>
<template>
    <fox-preview-image :z-index="currentZIndex"></fox-preview-image>
</template>
```

<script setup>
import { reactive } from 'vue'
import imgA from '/images/docs/preview-image-1.jpg'
import imgB from '/images/docs/preview-image-2.png'
import imgC from '/images/docs/preview-image-3.png'
import {FoxPreviewImage} from 'fox-preview-image'
import "fox-preview-image/lib/style.css";

const moduleA = reactive({
    visible: false,
    src: [imgA]
})

const moduleB = reactive({
    visible: false,
    src: [imgA,imgB,imgC]
})

const showModuleA = () => {
    moduleA.visible = true
}

const showModuleB = () => {
    moduleB.visible = true
}
</script>
