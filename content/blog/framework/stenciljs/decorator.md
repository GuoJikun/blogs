# StencilJs 学习之装饰器

StencilJs 可以方便的构建交互式组件  
支持以下装饰器

-   component
-   state
-   prop
-   watch
-   method
-   element
-   event
-   listen

## Component 装饰器

`@Component` 是一个装饰器，它将 TypeScript 类指定为 `Stencil` 组件。 每个模板组件在构建时都会转换为 Web component。

```ts
import { Component } from "@stencil/core";

@Component({
    tag: "todo-list",
    styleUrl: "./todo-list.css",
    // additional options
})
export class TodoList {
    // implementation omitted
}
```

`@Component`装饰器还有其它的一些参数

-   assetsDirs: 是从组件到包含组件所需的静态文件（资产）的目录的相对路径数组。
-   scope：是否隔离 css 的作用域，如果启用了`shadow`则此项不能设置为 `true`。
-   shadow: 阴影 dom 用来隔离样式。
-   styleUrls：包含要应用于组件的样式的外部样式表的相对 URL 列表。
-   styles：内联 CSS 而不是使用外部样式表的字符串。

## State

`@State` 用于内部的状态管理，修改 `@State`装饰的变量会触发组件的重新渲染

```ts
import { Component, State, h } from "@stencil/core";

@Component({
    tag: "current-time",
})
export class CurrentTime {
    timer: number;

    // `currentTime` is decorated with `@State()`,
    // as we need to trigger a rerender when its
    // value changes to show the latest time
    @State() currentTime: number = Date.now();

    connectedCallback() {
        this.timer = window.setInterval(() => {
            // the assignment to `this.currentTime`
            // will trigger a re-render
            this.currentTime = Date.now();
        }, 1000);
    }

    disconnectedCallback() {
        window.clearInterval(this.timer);
    }

    render() {
        const time = new Date(this.currentTime).toLocaleTimeString();

        return <span>{time}</span>;
    }
}
```

## Prop

`@Prop` 是用于声明外部数据传入组件的装饰器。

支持的数据类型有 `number` `string` `boolean` `Object` `array`,可以使用 this 进行数据访问，在 html 设置需要使用 dash-case 方式;
在 jsx 中使用 camelCase 方式，默认 prop 是不可变的，使用添加 `mutable: true` 进行修改, 使用 `reflech` 可以保持 `prop` 和 `html属性` 同步

```ts
import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: "todo-list-item",
})
export class ToDoListItem {
    @Prop({
        mutable: true,
        reflect: false,
    })
    isComplete: boolean = false;
    @Prop({ reflect: true }) timesCompletedInPast: number = 2;
    @Prop({ reflect: true }) thingToDo: string =
        "Read Reflect Section of Stencil Docs";
}
```

## Watch

`@Watch()`是应用于模具组件方法的修饰器。 修饰器接受单个参数，即用 `@Prop()` 或 `@State()` 修饰的类成员的名称。 用 `@Watch()` 修饰的方法将在其关联的类成员更改时自动运行。

```ts
// We import Prop & State to show how `@Watch()` can be used on
// class members decorated with either `@Prop()` or `@State()`
import { Component, Prop, State, Watch } from "@stencil/core";

@Component({
    tag: "loading-indicator",
})
export class LoadingIndicator {
    // We decorate a class member with @Prop() so that we
    // can apply @Watch()
    @Prop() activated: boolean;
    // We decorate a class member with @State() so that we
    // can apply @Watch()
    @State() busy: boolean;

    // Apply @Watch() for the component's `activated` member.
    // Whenever `activated` changes, this method will fire.
    @Watch("activated")
    watchPropHandler(newValue: boolean, oldValue: boolean) {
        console.log("The old value of activated is: ", oldValue);
        console.log("The new value of activated is: ", newValue);
    }

    // Apply @Watch() for the component's `busy` member.
    // Whenever `busy` changes, this method will fire.
    @Watch("busy")
    watchStateHandler(newValue: boolean, oldValue: boolean) {
        console.log("The old value of busy is: ", oldValue);
        console.log("The new value of busy is: ", newValue);
    }

    @Watch("activated")
    @Watch("busy")
    watchMultiple(newValue: boolean, oldValue: boolean, propName: string) {
        console.log(`The new value of ${propName} is: `, newValue);
    }
}
```

## method

可以方便的导出函数，方便外部调用。

```ts
import { Method } from "@stencil/core";

export class TodoList {
    @Method()
    async showPrompt() {
        // show a prompt
    }
}

// used registered
el.showPrompt();
```

## Element

`@Element` 装饰器是如何访问类实例中的 host 元素。这将返回一个 `HTMLElement` 实例，因此可以在此处使用标准 DOM 方法/事件。

```ts
import { Element } from '@stencil/core';

...
export class TodoList {

  @Element() el: HTMLElement;

  getListHeight(): number {
    return this.el.getBoundingClientRect().height;
  }
}
```

## 其它

> Event 和 Listen 装饰器将在下一节 事件 中讲解。
