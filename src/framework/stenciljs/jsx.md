# StencilJs 学习之 JSX

Stencil 组件使用 `JSX` 渲染，这是一种流行的声明式模板语法。每个组件都有一个渲染函数，它返回在运行时渲染到 DOM 的组件树。

## 基础用法

`render` 函数用于输出将绘制到屏幕上的组件树。

```ts
class MyComponent {
    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <p>This is JSX!</p>
            </div>
        );
    }
}
```

在这个例子中，我们返回了一个 `div` ，它有两个子元素 `h1` 和 `p`。

## Host Element

如果你想修改宿主元素本身，比如向组件本身添加一个类或一个属性，可以使用 [`Host`](https://stenciljs.com/docs/host-element) 组件。

## 数据绑定

组件经常需要渲染动态数据。要在 `JSX` 中执行此操作，请使用 `{}`

```ts
render() {
  return (
    <div>Hello {this.name}</div>
  )
}
```

:::tip
如果你熟悉 ES6 模板变量，JSX 变量和 ES6 非常相似，只是没有 `$` 符号。
:::

```ts
//ES6
`Hello ${this.name}`

//JSX
Hello {this.name}
```

## 条件

如果你想根据不同的条件渲染不同的内容，可以使用 `if/else` 来实现

```ts
render() {
  if (this.name) {
    return ( <div>Hello {this.name}</div> )
  } else {
    return ( <div>Hello, World</div> )
  }
}
```

此外，可以使用 JavaScript 的三元运算符来创建内联条件

```ts
render() {
  return (
    <div>
    {this.name ? <p>Hello {this.name}</p> : <p>Hello World</p> }
    </div>
  );
}
```

请注意:Stencil 重用 DOM 元素以获得更好的性能。请看下面的代码:

```ts
{
    someCondition ? (
        <my-counter initialValue={2} />
    ) : (
        <my-counter initialValue={5} />
    );
}
```

上面的代码与下面的代码完全相同:

```ts
<my-counter initialValue={someCondition ? 2 : 5} />
```

因此，如果某些条件发生了变化，`my-counter`的内部状态不会被重置，它的生命周期方法(如 `componentWillLoad()`)也不会被触发。相反，条件语句只会触发同一个组件的更新。

如果你想在一个条件语句中销毁并重新创建一个组件，你可以指定 `key` 属性。这告诉 `Stencil`，这些组件实际上是不同的兄弟组件:

```ts
{
    someCondition ? (
        <my-counter key="a" initialValue={2} />
    ) : (
        <my-counter key="b" initialValue={5} />
    );
}
```

这样，如果某些条件发生变化，你会得到一个新的 `my-counter` 组件实例，它具有新的内部状态，同时也将会同步运行生命周期 `componentWillLoad()`和 `componentDidLoad()`。

## Slots

组件通常需要在其组件树的特定位置动态渲染子组件，允许开发人员在使用我们的组件时提供子内容，我们的组件将子组件放置在适当的位置。

要做到这一点，您可以在 `my-component` 中使用 `Slot` 标签。

```ts
// my-component.tsx
render() {
  return (
    <div>
      <h2>A Component</h2>
      <div><slot /></div>
    </div>
  );
}
```

然后，如果用户在创建组件 my-component 时传递子组件，那么 my-component 将把该组件放在上面第二层的 `div` 中:

```ts
render(){
  return(
    <my-component>
      <p>Child Element</p>
    </my-component>
  )
}
```

`slot` 可以增加 `name` 属性，来决定内容的输出位置:

```ts
// my-component.tsx

render(){
  return [
    <slot name="item-start" />,
    <h1>Here is my main content</h1>,
    <slot name="item-end" />
  ]
}

render(){
  return(
    <my-component>
      <p slot="item-start">I'll be placed before the h1</p>
      <p slot="item-end">I'll be placed after the h1</p>
    </my-component>
  )
}
```

## Dealing with Children

`JSX` 中节点的子节点在运行时对应于一个节点数组，无论它们是通过 `array.prototype.map` 跨数组创建的，还是直接在 `JSX` 中声明为兄弟节点。这意味着在运行时，下面两个顶级
`div` 的子元素(.Todo-one 和.todo-two)的表示方式相同:

```ts
render() {
  return (
    <>
      <div class="todo-one">
        {this.todos.map((todo) => (
          <span>{ todo.taskName }</span>
        )}
      </div>
      <div class="todo-two">
        <span>{ todos[0].taskName }</span>
        <span>{ todos[1].taskName }</span>
      </div>
    </>
  )
}
```

如果这个子元素数组是动态的，即任何节点都可以被添加、删除或重新排序，那么最好为每个元素设置一个唯一的 `key` 属性，如下所示:

```ts
render() {
  return (
    <div>
      {this.todos.map((todo) =>
        <div key={todo.uid}>
          <div>{todo.taskName}</div>
        </div>
      )}
    </div>
  )
}
```

当子数组中的节点被重新排列时，Stencil 会努力在渲染时保留 DOM 节点，但它不能在所有情况下都这样做。设置一个 `key` 属性可以让 Stencil 确保在渲染时能够匹配新旧子节点，从而避免
不必要地重新创建 DOM 节点。

:::warning 注意
不要使用数组索引或其他非唯一值作为键。尝试确保每个子节点都有一个不变的 `key`，并且在其所有兄弟节点中是唯一的。
:::

## 处理用户输入

Stencil 使用原生的 DOM 事件。

下面是一个处理按钮点击的例子。注意箭头函数的使用。

```ts
...
export class MyComponent {
  private handleClick = () => {
    alert('Received the button click!');
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click Me!</button>
    );
  }
}
```

这是另一个监听输入变化的例子。注意箭头函数的使用。

```ts
...
export class MyComponent {
  private inputChanged = (event: Event) => {
    console.log('input changed: ', (event.target as HTMLInputElement).value);
  }

  render() {
    return (
      <input onChange={this.inputChanged}/>
    );
  }
}
```

## 复杂的模板内容（Complex Template Content）

到目前为止，我们已经看到了如何只返回一个根元素的例子。我们也可以在根元素中嵌套元素

在组件有多个“顶级”元素的情况下，render 函数可以返回一个数组。注意 `div` 元素。

```ts
render() {
  return ([
  // first top level element
  <div class="container">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>,

  // second top level element, note the , above
  <div class="another-container">
    ... more html content ...
  </div>
  ]);
}
```

或者你可以使用 `Fragment` 函数组件，在这种情况下你不需要添加逗号:

```ts
import { Fragment } from '@stencil/core';
...
render() {
  return (<Fragment>
    // first top level element
    <div class="container">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>

    <div class="another-container">
      ... more html content ...
    </div>
  </Fragment>);
}
```

也可以使用 `innerHTML` 直接将内容内联到元素中。例如，当动态加载一个 `svg`，然后想要在 `div` 中渲染它时，这就很有用了。这就像在普通的 `HTML` 中一样:

```ts
<div innerHTML={svgContent}></div>
```

## 获取 DOM 元素的引用

在 `jsx` 中使用 ref 属性来获取 `dom` 的引用，示例如下

```ts
@Component({
    tag: "app-home",
})
export class AppHome {
    textInput!: HTMLInputElement;

    handleSubmit = (event: Event) => {
        event.preventDefault();
        console.log(this.textInput.value);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        ref={(el) => (this.textInput = el as HTMLInputElement)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
```

## 避免共享 JSX 节点

在 jsx 中应该避免共享 jsx 节点，每一个 jsx 节点应该都是唯一的，这是因为在再次渲染时会遇到问题。

```ts
@Component({
  tag: 'my-cmp',
})
export class MyCmp {

  render() {
-    const sharedNode = <div>Text</div>;
    return (
      <div>
-        {sharedNode}
-        {sharedNode}
+        <div>Text</div>
+        <div>Text</div>
      </div>
    );
  }
}
```

或者，可以创建一个工厂函数来返回一个通用的 JSX 节点，因为返回值将是一个唯一的实例。 示例如下:

```ts
@Component({
    tag: "my-cmp",
})
export class MyCmp {
    getText() {
        return <div>Text</div>;
    }

    render() {
        return (
            <div>
                {this.getText()}
                {this.getText()}
            </div>
        );
    }
}
```

## 结束语

至此，我们已经基本把 [`StencilJs`](https://stenciljs.com/docs/api) 的相关基础知识已经学习的差不多了，在下一个章节中将会使用之前学习到的知识来开发一个常用的组件。
由于我们只是使用 `StencilJs` 来开发 `web component` 组件，其它不想关的知识(router)便不再讲解。
