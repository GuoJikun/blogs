`Web Components` 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的web应用中使用它们。

# 概念和使用

作为开发者，我们都知道尽可能多的重用代码是一个好主意。这对于自定义标记结构来说通常不是那么容易 — 想想复杂的HTML（以及相关的样式和脚本），有时您不得不写代码来呈现自定义UI控件，并且如果您不小心的话，多次使用它们会使您的页面变得一团糟。

Web Components旨在解决这些问题 — 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。

- `Custom elements`（自定义元素）：一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。
- `Shadow DOM`（影子DOM）：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- `HTML templates`（HTML模板）：`<template>` 和 `<slot>` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

实现web component的基本方法通常如下所示：

1. 创建一个类或函数来指定web组件的功能(如果使用类，请使用 ECMAScript 2015 的类语法)。
2. 使用 `CustomElementRegistry.define()` 方法注册您的新自定义元素 ，并向其传递要定义的元素名称、指定元素功能的类、以及可选的其所继承自的元素。
3. 如果需要的话，使用`Element.attachShadow()` 方法将一个shadow DOM附加到自定义元素上。使用通常的DOM方法向shadow DOM中添加子元素、事件监听器等等。
4. 如果需要的话，使用 `<template>` 和`<slot>` 定义一个HTML模板。再次使用常规DOM方法克隆模板并将其附加到您的shadow DOM中。
5. 在页面任何您喜欢的位置使用自定义元素，就像使用常规HTML元素那样。


## 生命周期
定义在自定义元素的类定义中的特殊回调函数，影响其行为：
• `connectedCallback`: 当自定义元素第一次被连接到文档DOM时被调用。
• `disconnectedCallback`: 当自定义元素与文档DOM断开连接时被调用。
• `adoptedCallback`: 当自定义元素被移动到新文档时被调用。
• `attributeChangedCallback`: 当自定义元素的一个属性被增加、移除或更改时被调用。

> `attributeChangedCallback > connectedCallback > disconnectedCallback`

## 选择器
- `:defined`: 匹配任何已定义的元素，包括内置元素和使用`CustomElementRegistry.define()`定义的自定义元素。
- `:host`:   选择当前的自定义元素
- `:host()`: 选择 shadow DOM 的 shadow host ，()里的内容是它内部使用的 CSS （这样您可以从 shadow DOM 内部选择自定义元素）— 但只匹配给定方法的选择器的 shadow host 元素。例如：`:host(name="hello")`。
- `:host-context()`: 选择 shadow DOM 的 shadow host ，内容是它内部使用的 CSS （这样您可以从 shadow DOM 内部选择自定义元素）— 但只匹配给定方法的选择器匹配元素的子 shadow host 元素。

# 示例

了解基础知识后，下面我们将实现一个基础的下拉选择组件（包含select和option）
要实现的功能
1. 增加change事件
2. 显示/隐藏下拉框
3. 点击option时给input赋值
4. 点击其它区域隐藏下拉框

具体实现

**基础样式**
```js
class Select extends HTMLElement {
  constructor() {
    // 必须首先调用 super 方法
    super();
    // 元素的功能代码写在这里
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
            :host {
                position: relative;
                display: inline-block;
            }
            .select-inner {
                height: 34px;
                border: 1px solid #cdcdcd;
                box-sizing: border-box;
                font-size: 13px;
                outline: none;
                padding: 0 10px;
                border-radius: 4px;
            }
            .drop {
                position: absolute;
                top: 36px;
                left: 0;
                width: 100%;
                padding: 4px 0;
                border-radius: 2px;
                overflow: auto;
                max-height: 256px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                display: none;
            }
        </style>
        <input class="select-inner" readonly>
        <div class="drop">
            <slot></slot>
        </div>
      `;
    const shadowELe = this.attachShadow({ mode: "open" });
    const content = template.content.cloneNode(true);
    shadowELe.appendChild(content);
  }
}
class Option extends HTMLElement {
  constructor() {
    // 必须首先调用 super 方法
    super();
    // 元素的功能代码写在这里
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
            :host {
                position: relative;
            }
            .option {
                height: 32px;
                line-height: 32px;
                box-sizing: border-box;
                font-size: 13px;
                color: #333333;
                padding: 0 10px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .option:hover {
                background-color: #f4f4f4;
            }
        </style>
        <div class="option">
            <slot></slot>
        </div>
      `;
    const shadowELe = this.attachShadow({ mode: "open" });
    const content = template.content.cloneNode(true);
    shadowELe.appendChild(content);
  }
  static get observedAttributes() {
    return ["value"];
  }
}
customElements.define("ivy-select", Select);
customElements.define("ivy-option", Option);
```
**增加事件**
```js
class Select extends HTMLElement {
  constructor() {
    // 必须首先调用 super 方法
    super();
    // 元素的功能代码写在这里
    ...
    this.$input = shadowELe.querySelector(".select-inner");
    this.dropEle = shadowELe.querySelector(".drop");
    this.value === null;
    this.$input.addEventListener("click", () => {
      this.dropEle.style.display = "block";
    });
    this.dropEle.addEventListener("click", (ev) => {
      const target = ev.target;
      const nodeName = target.nodeName.toLowerCase();
      if (nodeName === "ivy-option") {
        this.value = target.getAttribute("value");
        this.$input.setAttribute("value", target.innerHTML);
        // 自定义事件
        this.dispatchEvent(
          new CustomEvent("change", {
            detail: {
              value: this.value,
            },
          })
        );
        this.dropEle.style.display = "none";
      }
    });
    this.BodyClick = () => {
      this.dropEle.style.display = "none";
    };
  }
  connectedCallback() {
    document.addEventListener("click", this.BodyClick, true);
  }
  disconnectedCallback() {
    document.removeEventListener("click", this.BodyClick);
  }
}
```
> 需要注意的是，如果需要在元素属性变化后，触发 `attributeChangedCallback()`回调函数，你必须监听这个属性。这可以通过定义`get observedAttributes()` 函数来实现，observedAttributes()函数体内包含一个 return语句，返回一个数组，包含了需要监听的属性名称：`static get observedAttributes() {return ['value']; }`

完整代码：[传送门](https://github.com/GuoJikun/webcomponent-select)
