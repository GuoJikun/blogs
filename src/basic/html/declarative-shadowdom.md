# 声明式 Shadow DOM：简化 Web 组件开发的新工具

在现代 Web 开发中，Web 组件已经成为创建模块化、可复用 UI 组件的标准工具。而 **Shadow DOM** 是 Web 组件技术的核心部分，它允许开发人员封装组件的内部结构和样式，
避免组件的样式和行为影响全局页面。然而，传统的 Shadow DOM 实现方式需要通过 JavaScript 显式地创建和附加 Shadow DOM，这增加了开发复杂性。

为了简化 Web 组件开发，**声明式 Shadow DOM（Declarative Shadow DOM）** 提供了一种新的方法，允许开发人员直接通过 HTML 定义 Shadow DOM，
而无需过多依赖 JavaScript。这一特性特别适用于服务端渲染（SSR）和静态页面生成（SSG）场景，大大提高了页面的加载效率和开发体验。

本文将详细介绍声明式 Shadow DOM 的基础语法、与 Javascript 的结合使用以及其主要应用场景和优势。

---

## 一、什么是 Shadow DOM？

Shadow DOM 是 Web 组件的一个重要组成部分，它通过创建封装的 DOM 树，让组件的内部 DOM 和样式与外部页面隔离。这使得组件可以拥有独立的样式和功能，而不会与页面的其他部分发生冲突。

传统上，开发人员需要通过 JavaScript 调用 `attachShadow()` 方法来手动创建 Shadow DOM，并附加到自定义元素上。这样的方式增加了代码的复杂性，同时在服务端渲染和静态页面生成中也难以直接使用。

## 二、声明式 Shadow DOM 的基本语法

声明式 Shadow DOM 允许开发人员直接在 HTML 模板中定义 Shadow DOM，而无需通过 JavaScript 来创建。
这种方式依赖于 HTML 中的 `<template>` 标签，并通过 `shadowroot` 属性来指定 DOM 应作为 Shadow DOM 存在。

### 示例代码：

```html
<my-element>
    <template shadowrootmode="open">
        <style>
            p {
                color: blue;
            }
        </style>
        <p>这是声明式 Shadow DOM 内的内容！</p>
    </template>
</my-element>
```

在这个例子中，`<template>` 标签用于定义组件的内部结构和样式，而 `shadowrootmode="open"` 表示这是一个开放的 Shadow DOM，可以从外部访问。

相比传统的创建方式，这种声明式的语法更加简洁，也更利于服务器端预渲染。

## 三、声明式 Shadow DOM 与 Javascript 结合

虽然声明式 Shadow DOM 允许在 HTML 中直接声明组件结构，但自定义元素的行为和逻辑仍然需要通过 Javascript 来定义。
例如，如果需要为组件添加交互行为，我们仍然需要编写 JavaScript 代码来注册自定义元素。

### 示例：声明式 Shadow DOM + Javascript 实现计数按钮

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8" />
        <title>声明式 Shadow DOM 示例</title>
    </head>

    <body>
        <!-- 定义组件的模板 -->
        <count-button>
            <template shadowrootmode="open">
                <style>
                    button {
                        font-size: 16px;
                        padding: 10px 20px;
                    }
                </style>
                <button id="increment-btn">
                    点击次数：<span id="count">0</span>
                </button>
            </template>
        </count-button>
        <script>
            // 定义自定义元素类
            class CountButton extends HTMLElement {
                constructor() {
                    super();

                    // 获取按钮和计数显示元素
                    this.button =
                        this.shadowRoot.querySelector("#increment-btn");
                    this.countDisplay = this.shadowRoot.querySelector("#count");
                    this.count = 0; // 初始化计数

                    // 绑定事件处理程序
                    this.button.addEventListener("click", () => {
                        this.increment();
                    });
                }

                // 定义一个方法来增加计数
                increment() {
                    this.count++;
                    this.countDisplay.textContent = this.count;
                }
            }

            // 注册自定义元素
            customElements.define("count-button", CountButton);
        </script>
    </body>
</html>
```

### 预览

[查看演示代码](https://code.juejin.cn/pen/7412828000997244979)

### 代码解释

1.  **HTML 部分**：

    -   使用 `<template>` 标签定义了计数按钮组件的结构和样式，并通过 `shadowrootmode="open"` 声明为开放的 Shadow DOM。
    -   组件的样式和内容在 HTML 中声明，减少了 Javascript 中的 DOM 操作。

1.  **Javascript 部分**：

    -   使用 Javascript 定义了一个自定义元素 `CountButton`。
    -   添加了按钮点击事件，每次点击按钮时，计数器加一并更新显示。

1.  **自定义元素注册**：
    -   使用 `customElements.define` 方法注册了自定义元素 `<count-button>`。

## 四、声明式 Shadow DOM 的应用场景

**1. 服务端渲染（SSR）**

声明式 Shadow DOM 对服务端渲染非常友好。由于组件结构和样式已经声明在 HTML 中，服务端可以预先生成完整的组件，并将其直接发送给客户端。这不仅减少了页面的初始加载时间，还提高了搜索引擎的抓取能力，有利于 SEO。

**2. 静态页面生成（SSG）**

在静态页面生成中，声明式 Shadow DOM 允许开发人员将预定义的组件结构嵌入到静态 HTML 文件中，从而提升页面的加载速度，减少客户端的 Javascript 计算量。

## 五、声明式 Shadow DOM 的优势与限制

**优势：**

-   **简化开发流程**：通过 HTML 直接声明 Shadow DOM，减少了对 Javascript 的依赖，降低了开发难度。
-   **性能提升**：在 SSR 和 SSG 场景下，预渲染的组件可以直接发送给客户端，减少了首次渲染的时间。
-   **SEO 友好**：组件内容可以直接包含在 HTML 中，便于搜索引擎抓取。

**限制：**

-   **Javascript 仍不可或缺**：虽然组件的结构和样式可以声明式定义，但组件的交互和逻辑仍需通过 JavaScript 实现。
-   **浏览器兼容性**：目前声明式 Shadow DOM 已基本支持所有的浏览器，但是所需的浏览器的版本较新，需要开发者考虑兼容性问题。
    ![image.png](/images/basic/html/declarative-shadowdom.png)

---

## 六、总结

**声明式 Shadow DOM** 是 Web 组件开发的一项强大新功能，它通过简化 Shadow DOM 的创建过程，减少了 Javascript 的依赖，特别适用于服务端渲染和静态页面生成场景。
虽然其优势明显，但在实际开发中，开发者仍需结合 Javascript 来实现组件的交互和逻辑。

随着浏览器对这一新特性的支持逐步增加，声明式 Shadow DOM 将会成为 Web 组件开发中的主流方式之一。对于需要高性能、模块化的 Web 开发项目，声明式 Shadow DOM 是一个值得尝试的新工具。

## 参考资料

-   [Declarative Shadow DOM 介绍](https://web.dev/articles/declarative-shadow-dom?hl=zh-cn)
-   [Custom Elements 使用指南](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)
