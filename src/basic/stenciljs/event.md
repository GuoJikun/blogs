# StencilJs 学习之事件

其实并没有所谓的 stencil Event，相反 stencil 鼓励使用 DOM event。然而，Stencil 提供了一个 API 来指定组件可以触发的事件，以及组件监听的事件。
这是通过 Event()和 Listen()装饰器实现的。

## Event 装饰器

组件可以使用事件发射器装饰器发送数据和事件。

要将自定义 DOM 事件分发给其他组件处理，可以使用@Event()装饰器。

```ts
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

上面的代码将 dispatch 一个名为 `todoCompleted` 的自定义 DOM 事件。

### EventOptions

```ts
interface EventOptions {
    /**
     * 自定义事件名称
     */
    eventName?: string;
    /**
     * 表明事件是否允许冒泡
     */
    bubbles?: boolean;

    /**
     * 表明事件是否允许取消
     */
    cancelable?: boolean;

    /**
     * 表示事件是否可以跨越shadow DOM和regular DOM的边界
     */
    composed?: boolean;
}
```

## Listen 装饰器

`Listen()` 装饰器用于监听 `DOM` 事件，包括从 `@Events` 分发的事件。当组件从 DOM 中添加或删除时，事件监听器会自动添加或删除。

在下面的示例中，假设子组件 `TodoList` 使用 `EventEmitter` 触发 `todoCompleted` 事件。

```ts
import { Listen } from '@stencil/core';

...
export class TodoApp {

  @Listen('todoCompleted')
  todoCompletedHandler(event: CustomEvent<Todo>) {
    console.log('Received the custom todoCompleted event: ', event.detail);
  }
}
```

### ListenOptions

```ts
interface ListenOptions {
    target?: "body" | "document" | "window"; // 如果target属性不设置值，则默认监听host（宿主元素）
    capture?: boolean;
    passive?: boolean;
}
```

## 使用组件的自定义事件

### 在 jsx 中使用

```tsx
// 在stencilJs项目内使用
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

### 常规使用

```html
<todo-list></todo-list>
<script>
    const todoListElement = document.querySelector("todo-list");
    todoListElement.addEventListener("todoCompleted", (event) => {
        /* your listener */
    });
</script>
```

## 结束语

至此，我们已经基本把 [`StencilJs`](https://stenciljs.com/docs/events) 的相关基础知识已经学习的差不多了，由于 `stencilJs` 使用的 `tsx`
来开发的，所以在下一章节中将会学习如何使用 `tsx`。

<!----在下一个章节中将会使用之前学习到的知识来开发一个常用的组件。
由于我们只是使用 `StencilJs` 来开发 `web component` 组件，其它不想关的知识(router)便不再讲解-->
