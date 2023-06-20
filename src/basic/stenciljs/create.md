# StencilJs 学习之搭建项目

## 框架介绍

`StencilJs` 是用于构建可重用、可扩展的设计系统的工具链。生成在每个浏览器中运行的小型、超快且 100% 基于标准的 Web Component。

更对介绍请参考[官方网站](https://stenciljs.com/)

## 创建项目

### 使用脚手架创建项目

```bash
pnpm create stencil #如下图
```

![create-1.png](/images/basic/stenciljs/create-1.png)

![create-2.png](/images/basic/stenciljs/create-2.png)

![create-3.png](/images/basic/stenciljs/create-3.png)

:::tip 使用其它的包管理器
npm init stencil <br>
yarn create stencil
:::

### 项目目录

![create-4.png](/images/basic/stenciljs/create-4.png)

## 创建组件

```bash
pnpm generate web-text #web-text是组件名
```

命令执行后，如下图

![create-5.png](/images/basic/stenciljs/create-5.png)

确定后，如下图

![create-6.png](/images/basic/stenciljs/create-6.png)

创建组建后的目录如下图

![create-7.png](/images/basic/stenciljs/create-7.png)

## 构建和测试

```bash
pnpm run start #包含运行测试
pnpm run build #构建组件
```

### pnpm run start 之后的样子

![create-8.png](/images/basic/stenciljs/create-8.png)

## 组件说明

使用 tsx 进行开发，类似 react 的生命周期模型,类似 ng 的开发方式（装饰器，注解。。。）

```tsx
import { Component, Prop, h } from "@stencil/core";
import { format } from "../../utils/utils";

@Component({
    tag: "my-component", // 组件名称
    styleUrl: "my-component.css",
    shadow: true,
})
export class MyComponent {
    /**
     * The first name
     */
    @Prop() first: string;

    /**
     * The middle name
     */
    @Prop() middle: string;

    /**
     * The last name
     */
    @Prop() last: string;

    private getText(): string {
        return format(this.first, this.middle, this.last);
    }

    render() {
        return <div>Hello, World! I'm {this.getText()}</div>;
    }
}
```

### Css 样式

```css
div {
    display: block;
    font-size: 30px;
    background-color: blueviolet;
    color: white;
}
```

### 改后的效果

![create-9.png](/images/basic/stenciljs/create-9.png)

## 结束语

第一部分至此结束了。
