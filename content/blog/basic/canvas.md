# Canvas 画布

## 简介

Canvas API 提供了一个通过 `JavaScript` 和 `HTML` 的 `<canvas>` 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

Canvas API 主要聚焦于 2D 图形。而同样使用 `<canvas>` 元素的 `WebGL API` 则用于绘制硬件加速的 2D 和 3D 图形。

## 基础示例

<canvas id="canvas" width="170" height="120"></canvas>

```vue
<template>
  <canvas id="canvas" width="170" height="120"></canvas>
</template>
<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "green";
      ctx.fillRect(10, 10, 150, 100);
    },
  },
};
</script>
```

## 绘制矩形

<canvas id="canvas1" width="170" height="120"></canvas>

```vue
<template>
  <canvas id="canvas1" width="170" height="120"></canvas>
</template>
<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const canvas = document.getElementById("canvas1");

      let ctx = canvas.getContext("2d");

      ctx.fillRect(25, 25, 100, 100); // 绘制了一个边长为100px的黑色正方形
      ctx.clearRect(45, 45, 60, 60); // 从正方形的中心开始擦除了一个60*60px的正方形
      ctx.strokeRect(50, 50, 50, 50); // 在清除区域内生成一个50*50的正方形边框
    },
  },
};
</script>
```

## 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

- 首先，你需要创建路径起始点。
- 然后你使用画图命令去画出路径。
- 之后你把路径封闭。
- 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

#### 以下是所要用到的函数：

`beginPath()`
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

`closePath()`
闭合路径之后图形绘制命令又重新指向到上下文中。

`stroke()`
通过线条来绘制图形轮廓。

`fill()`
通过填充路径的内容区域生成实心的图形。

<canvas id="canvas2" width="170" height="120"></canvas>

```vue
<template>
  <canvas id="canvas1" width="170" height="120"></canvas>
</template>
<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const canvas = document.getElementById("canvas2");

      let ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(75, 50);
      ctx.lineTo(100, 75);
      ctx.lineTo(100, 25);
      ctx.fill();
    },
  },
};
</script>
```

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.init1();
            this.init2();
            this.init3()
        },
        init1() {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "green";
            ctx.fillRect(10, 10, 150, 100);
        },
        init2(){
            const canvas = document.getElementById('canvas1');

            let ctx = canvas.getContext('2d');

            ctx.fillRect(25, 25, 100, 100); // 绘制了一个边长为100px的黑色正方形
            ctx.clearRect(45, 45, 60, 60); // 从正方形的中心开始擦除了一个60*60px的正方形
            ctx.strokeRect(50, 50, 50, 50); // 在清除区域内生成一个50*50的正方形边框
        },
        init3(){
            const canvas = document.getElementById('canvas2');
  
            let ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.moveTo(75, 50);
            ctx.lineTo(100, 75);
            ctx.lineTo(100, 25);
            ctx.fill();
        }
    },
});
</script>
