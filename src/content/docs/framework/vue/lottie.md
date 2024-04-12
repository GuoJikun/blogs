# lottie 动画在 vue 中的使用

## 前言

最近我所负责的项目中采用了动画，最开始使用 gif 来实现。然而，在实践过程中发现 gif 格式的动画在 git 中出现了明显的锯齿感，这让我非常困扰。
为了追求更完美的表现效果，我最终选择了 lottie 来实现我的动画需求。我深知动画效果的呈现对于用户体验至关重要，因此我非常认真地对待每一个细节，
希望通过我的努力，为用户带来更加流畅、自然的视觉体验。

## Lottie 简介

Lottie 是一个适用于 Android、iOS、Web 和 Windows 的库，它使用 Bodymovin 解析导出为 JSON 的 Adobe After Effects 动画，
并在移动设备和 Web 上原生渲染它们！

这是第一次，设计师可以创建和发布精美的动画，而无需工程师精心手工重新创建它们。他们说一图胜千言，请看示例：

![lottie 动画](/images/framework/vue/lottie/01.gif)

上述动画是在 After Effects 中创建的，可以使用简单的 JSON 文件在所有平台上进行本机渲染。

## lottie 的安装

```bash
# 由于在 web 端，所以安装的是 lottie-web
pnpm add lottie-web
```

## lottie 的使用

简单介绍 lottie 的使用

```js
import lottie from "lottie-web";
import animationData from "xx/xx/xx.json";

lottie.loadAnimation({
    animationData,
    loop: true,
    autoplay: true,
    renderer: "svg",
    container: document.querySelector("container"),
});
```

调用 `lottie.loadAnimation()` 以启动动画。它将一个对象作为唯一的参数，下面是对象中字段的解释说明：

-   animationData: 包含导出的动画数据的 Object。
-   path: 动画对象的相对路径。（animationData 和 path 互斥）
-   loop: 动画循环次数，可选值 `true/false/number`
-   autoplay: 准备就绪后自动开始播放，可选值 `true/false`
-   name: 动画名称，供将来参考
-   renderer: 设置渲染器，可选值 `svg/canvas/html`
-   container: 用于渲染动画的 DOM 元素

它返回您可以通过播放、暂停、setSpeed 等方式控制的动画实例。

## 动画实例中的常用方法

-   **anim.play()**：播放动画
-   **anim.stop()**：停止动画
-   **anim.pause()**：暂停动画
-   **anim.setLocationHref(locationHref)**： 一个参数通常作为 'location.href' 传递。当你在 safari 中遇到掩码问题时，它很有用，因为你的 url 没有 “#” 符号。
-   **anim.setSpeed(speed)**：设置动画速度(1 为正常速度)
-   **anim.goToAndStop(value, isFrame)**：跳到某个时刻并停止，第一个参数是数值，如果第二个参数为 true，则第一个参数为帧，如果为 false 则为时间(默认为 false)
-   **anim.goToAndPlay(value, isFrame)** 跳到某个时刻并播放，第一个参数是数值，如果第二个参数为 true，则第一个参数为帧，如果为 false 则为时间(默认为 false)
-   **anim.setDirection(direction)**：设置方向 (1 为正常.)
-   **anim.playSegments(segments, forceFlag)**：第一个参数是单个数组或多个数组，每个数组有两个值(fromFrame,toFrame)，第二个参数是一个布尔值，用于立即强制执行
-   **anim.setSubframe(flag)**：如果为 false，它将尊重原始 AE fps。如果为 true，它将尽可能多地更新。 (默认值为 true)
-   **anim.destroy()**：销毁动画实例

## Lottie 中常用的方法

-   **lottie.play()**：通过 `name` 来指定运行的动画
-   **lottie.stop()**：通过 `name` 来指定停止的动画
-   **lottie.setSpeed()**：通过 `name` 来指定动画的速度
-   **lottie.setDirection()**：通过 `name` 来指定动画的方向
-   **lottie.searchAnimations()**：查找 class 为 “lottie” 的元素
-   **lottie.loadAnimation()**：加载动画并返回要单独控制的动画实例
-   **lottie.destroy()**：销毁和释放资源，DOM 元素将被清空。
-   **lottie.registerAnimation()**：你可以直接用 registerAnimation 注册一个元素。它必须有 “data-animation-path” 属性指向 data.json 的 url
-   **lottie.setQuality()**：默认 'high'，设置 'high','medium','low'，或一个数字 >1 .提高播放器表现。在一些动画中，低至 2 不会显示任何差异。

> name 为 lottie.loadAnimation() 方法中设置的 name

## [Events](https://airbnb.io/lottie/#/web?id=events)

以下是可以直接使用 element.onXxxx 绑定的事件。

-   onComplete
-   onLoopComplete
-   onEnterFrame
-   onSegmentStart

你也可以使用 addEventListener 来处理以下事件:

-   complete：动画完成时触发
-   loopComplete：当 loop 为 true 时，每次加载完成时触发
-   enterFrame：每进入一帧就会触发，播放时每一帧都会触发一次
-   segmentStart：每开始进入一帧就会触发，播放时每一帧都会触发一次
-   config_ready：config 初始化时触发
-   data_ready：当动画的所有部分都加载完成时
-   DOMLoaded：当元素被添加到 DOM 中时
-   destroy：当动画被销毁时触发

## 封装基础组件

在 vue 中为了使用方便，可以封装为一个通用组件来使用。

```html
<template>
    <component :is="props.tag" ref="container">
        <slot></slot>
    </component>
</template>

<script>
    import lottie from "lottie-web";
    import { ref, onMounted, onUnmounted, shallowRef } from "vue";

    // 默认配置
    const defaultConfig = {
        renderer: "svg",
        loop: true,
        autoplay: true,
    };

    const props = defineProps({
        tag: {
            type: String,
            default: "div",
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    });

    const container = ref(null);
    const instance = shallowRef(null);

    // 处理配置 animationData 字段中 assets 部分的图片路径
    // 把 动画需要的图片资源，放到 public 目录下的 lotties目录下
    // 每个动画资源都在 lotties 下新建一个目录去存放
    const parseAssets = (assets) => {
        const assetsBaseURL = process.env.VUE_APP_ROUTE_BASE_URL + "/lotties";
        return assets.map((item) => {
            return {
                ...item,
                u: assetsBaseURL + item.u,
            };
        });
    };

    const init = () => {
        // 配置
        const conf = {
            ...defaultConfig,
            ...props.options,
        };
        const assets = parseAssets(conf.animationData.assets || []);
        if (conf.animationData) {
            conf.animationData = { ...conf.animationData, assets };
        }
        instance.value = lottie.loadAnimation({
            container: container.value,
            ...conf,
        });
    };

    onMounted(() => {
        init();
    });

    onUnmounted(() => {
        if (instance.value && instance.value.destroy) {
            instance.value.destroy();
        }
    });
</script>
```

## 参考

[Web (airbnb.io)](https://airbnb.io/lottie/#/web)
