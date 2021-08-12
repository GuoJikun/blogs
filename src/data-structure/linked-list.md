# 数组的缺点

在很多编程语言中，数组的长度是固定的，所以当数组已被数据填满时，再要加入新的元素就会非常困难。在数组中，添加和删除元素也很麻烦，因为需要将数组中的其他元素向前或向后平移，以反映数组刚刚进行了添加或删除操作。然而，JavaScript 的数组并不存在上述问题，因为使用 `split()` 方法不需要再访问数组中的其他元素了。

avaScript 中数组的主要问题是，它们被实现成了对象，与其他语言（比如 C++ 和 Java）的数组相比，效率很低。

#  定义链表

链表是由一组节点组成的集合。每个节点都使用一个对象的引用指向它的后继。指向另一个节点的引用叫做链。下图展示了一个链表。

![企业微信截图_20210429090547.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1db262a0ba5c4f4194410db0bd0d3836~tplv-k3u1fbpfcp-watermark.image)
数组元素靠它们的位置进行引用，链表元素则是靠相互之间的关系进行引用。在上图中，我们说 `李四` 跟在 `张三` 后面，而不说 `李四` 是链表中的第二个元素。遍历链表，就是跟着链接，从链表的首元素一直走到尾元素（但这不包含链表的头节点，头节点常常用来作为链表的接入点）。图中另外一个值得注意的地方是，链表的尾元素指向一个 `null` 节点。

然而要标识出链表的起始节点却有点麻烦，许多链表的实现都在链表最前面有一个特殊节点，叫做头节点。经过改造之后，上图中的链表成了下面的样子。

![企业微信截图_20210429091827.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71d956d7d85b4305a016184efa18d976~tplv-k3u1fbpfcp-watermark.image)

#  设计一个基于对象的链表

## Node类
`Node` 类包含两个属性：`element` 用来保存节点上的数据，`next` 用来保存指向下一个节点的
链接。我们使用一个`class`来创建节点：
```javascript
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}
```
##  LinkedList类
LList 类提供了对链表进行操作的方法。该类的功能包括插入删除节点、在列表中查找给
定的值。该类也有一个构造函数，链表只有一个属性，那就是使用一个 Node 对象来保存该
链表的头节点。
该类如下所示
```javascript
class LinkedList {
    constructor() {
        this.head = new Node("head");
    }
    find() { }
    insert() { }
    findPrevious() { }
    remove() { }
    display() { }
}
```
> `head` 节点的 `next` 属性被初始化为 `null`，当有新元素插入时，`next` 会指向新的元素，所以在这里我们没有修改 `next` 的值。

## 插入新节点

该方法向链表中插入一个节点。向链表中插入新节点时，需要明确指出要在哪个节点前面或后面插入。首先介绍如何在一个已知节点后面插入元素。

在一个已知节点后面插入元素时，先要找到“后面”的节点。为此，创建一个辅助方法`find()`，该方法遍历链表，查找给定数据。如果找到数据，该方法就返回保存该数据的节点。`find()` 方法的实现代码如下所示：
```javascript
find(element) {
    let current = this.head;
    while (current.element !== element) {
        current = current.next;
    }
    return current;
}
```
`find()` 方法演示了如何在链表上进行移动。首先，创建一个新节点，并将链表的头节点赋给这个新创建的节点。然后在链表上进行循环，如果当前节点的 `element` 属性和我们要找的信息不符，就从当前节点移动到下一个节点。如果查找成功，该方法返回包含该数据的节点；否则，返回 `null`。

一旦找到`“后面”`的节点，就可以将新节点插入链表了。首先，将新节点的 `next` 属性设置为`“后面”`节点的 `next` 属性对应的值。然后设置`“后面”`节点的 `next` 属性指向新节点。

`insert()` 方法的定义如下：
```javascript
insert(element) {
    const newNode = new Node(element);
    const curNode = this.find(element);

    newNode.next = cur.next;
    curNode.next = newNode;
}
```

## 移除节点

在之前我们已经可以实现插入节点了，有添加自然就有移除。现在让我们来实现`remove()`方法。

从链表中删除节点时，需要先找到待删除节点前面的节点。找到这个节点后，修改它的
`next` 属性，使其不再指向待删除节点，而是指向待删除节点的下一个节点。我们可以定义
一个方法 `findPrevious()`，来做这件事。该方法遍历链表中的元素，检查每一个节点的下
一个节点中是否存储着待删除数据。如果找到，返回该节点（即“前一个”节点），这样
就可以修改它的 `next` 属性了。`findPrevious()` 方法的定义如下：
```javascript
findPrevious(item) {
    let curNode = this.head;
    while (curNode.next !== null && curNode.next.element !== item) {
        curNode = curNode.next;
    }
    return curNode;
}
```
现在就可以开始写 `remove()` 方法了：
```javascript
remove(item) {
    const prevNode = this.findPrevious(item);
    if (prevNode.next !== null) {
        prevNode.next = prevNode.next.next;
    }
}
```
## 查看链表内的元素
现在已经可以开始测试我们的链表实现了。然而在测试之前，先来定义一个 `display()` 方法，该方法用来显示链表中的元素：
```javascript
display() {
    let target = [];
    let curNode = this.head;
    while (curNode.next !== null) {
        target.push(curNode.next.element);
        curNode = curNode.next;
    }
    return target.join();
}
```
## 测试代码

![测试代码.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30c2532d43c842b7a377d36f52ff4fa5~tplv-k3u1fbpfcp-watermark.image)

# 双向链表
尽管从链表的头节点遍历到尾节点很简单，但反过来，从后向前遍历则没那么简单。通过给 `Node` 对象增加一个属性，该属性存储指向前驱节点的链接，这样就容易多了。此时向链表插入一个节点需要更多的工作，我们需要指出该节点正确的前驱和后继。但是在从链表中删除节点时，效率提高了，不需要再查找待删除节点的前驱节点了。下图演示了双向链表的工作原理。

![企业微信截图_20210429093227.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5b416a6d6c64dacb57a0dee6455a5db~tplv-k3u1fbpfcp-watermark.image)

## 修改Node类
首当其冲的是要为 Node 类增加一个 previous 属性：
```javascript
class Node {
    constructor(element) {
        this.element = element;
        this.previous = null;
        this.next = null;
    }
}
```
## 修改`insert()`方法
双向链表的 `insert()` 方法和单向链表的类似，但是需要设置新节点的 `previous` 属性，使其指向该节点的前驱。该方法的定义如下：
```javascript
insert(element, item) {
    const newNode = new Node(element);
    const curNode = this.find(item);
    newNode.next = curNode.next;
    newNode.previous = curNode; // 令新节点的previous指向当前节点
    curNode.next = newNode;
}
```
双向链表的 `remove()` 方法比单向链表的效率更高，因为不需要再查找前驱节点了。首先需要在链表中找出存储待删除数据的节点，然后设置该节点前驱的 `next` 属性，使其指向待删除节点的后继；设置该节点后继的 `previous` 属性，使其指向待删除节点的前驱。下图直观地展示了该过程。

![企业微信截图_20210430141546.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dca2d30acbd47bc9fcadda3178f2ab1~tplv-k3u1fbpfcp-watermark.image)

## 新的remove() 方法的定义

```javascript
remove(item) {
    const curNode = this.find(item);
    if (curNode.next !== null) {
        curNode.previous.next = curNode.next;
        curNode.next.previous = curNode.previous;
        curNode.previous = null;
        curNode.next = null;
    }
}
```
## 反向显示链表中的元素

为了完成以反序显示链表中元素这类任务，需要给双向链表增加一个工具方法，用来查找最后的节点。`findLast()` 方法找出了链表中的最后一个节点，同时免除了从前往后遍历链表之苦：
```javascript
findLast() {
    let curNode = this.head;
    while (curNode.next !== null) {
        curNode = curNode.next;
    }
    return curNode;
}
```
有了这个工具方法，就可以写一个方法，反序显示双向链表中的元素。`dispReverse()` 方法如下所示：
```javascript
displayReverse() {
    let target = [];
    let currNode = this.findLast();
    while (currNode.previous !== null) {
        target.push(currNode.element);
        currNode = currNode.previous;
    }
    return target.join();
}
```
## 完整的双向链表实现及测试代码
```javascript
class Node {
    constructor(element) {
        this.element = element;
        this.previous = null;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = new Node("head");
    }
    find(item) {
        let current = this.head;
        while (current.element !== item) {
            current = current.next;
        }
        return current;
    }
    insert(element, item) {
        const newNode = new Node(element);
        const curNode = this.find(item);
        newNode.next = curNode.next;
        newNode.previous = curNode;
        curNode.next = newNode;
    }
    findLast() {
        let curNode = this.head;
        while (curNode.next !== null) {
            curNode = curNode.next;
        }
        return curNode;
    }
    remove(item) {
        const curNode = this.find(item);
        if (curNode.next !== null) {
            curNode.previous.next = curNode.next;
            curNode.next.previous = curNode.previous;
            curNode.previous = null;
            curNode.next = null;
        }
    }
    display() {
        let target = [];
        let curNode = this.head;
        while (curNode.next !== null) {
            target.push(curNode.next.element);
            curNode = curNode.next;
        }
        return target.join();
    }
    displayReverse() {
        let target = [];
        let currNode = this.findLast();
        while (currNode.previous !== null) {
            target.push(currNode.element);
            currNode = currNode.previous;
        }
        return target.join();
    }
}

// test code

const linkedList = new LinkedList();
linkedList.insert("张三", "head");
console.log(linkedList.display()); // 张三
linkedList.insert("李四", "张三");
console.log(linkedList.display()); // 张三,李四
linkedList.insert("王五", "李四");
console.log(linkedList.display()); // 张三,李四,王五
linkedList.remove("李四");
console.log(linkedList.display()); // 张三,王五
console.log(linkedList.displayReverse()); // 王五,张三

```

# 循环链表
循环链表和单向链表相似，节点类型都是一样的。唯一的区别是，在创建循环链表时，让其头节点的 `next` 属性指向它本身，即：
```javascript
head.next = head
```
这种行为会传导至链表中的每个节点，使得每个节点的 next 属性都指向链表的头节点。换句话说，链表的尾节点指向头节点，形成了一个循环链表，如图 6-7 所示。


![企业微信截图_20210429092257.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3a6898a292645c6b06bb4a5f49b2184~tplv-k3u1fbpfcp-watermark.image)

创建循环链表，只需要修改 `LinkedList` 类的构造方法(`constructor`)：

```javascript
class LinkedList {
    constructor() {
        this.head = new Node("head");
        this.head.next = this.head;
    }
    find() { }
    insert() { }
    findPrevious() { }
    remove() { }
    display() { }
}
```
只需要修改一处，就将单向链表变成了循环链表。但是其他一些方法需要修改才能工作正常。比如，`display()` 就需要修改，原来的方式在循环链表里会陷入死循环。`while` 循环的循环条件需要修改，需要检查`head`节点，当循环到`head`节点时退出循环。

循环链表的`display()`方法如下：
```javascript
display() {
    let target = [];
    let curNode = this.head;
    while (curNode.next !== null && curNode.next.element !== "head") {
        target.push(curNode.next.element);
        curNode = curNode.next;
    }
    return target.join();
}
```
## 完整的循环链表实现及测试代码

```javascript
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = new Node("head");
        this.head.next = this.head;
    }
    find(item) {
        let current = this.head;
        while (current.element !== item) {
            current = current.next;
        }
        return current;
    }
    insert(element, item) {
        const newNode = new Node(element);
        const curNode = this.find(item);
        newNode.next = curNode.next;
        curNode.next = newNode;
    }
    findPrevious(item) {
        let curNode = this.head;
        while (curNode.next !== null && curNode.next.element !== item) {
            curNode = curNode.next;
        }
        return curNode;
    }
    remove(item) {
        const prevNode = this.findPrevious(item);
        if (prevNode.next !== null) {
            prevNode.next = prevNode.next.next;
        }
    }
    display() {
        let target = [];
        let curNode = this.head;
        while (curNode.next !== null && curNode.next.element !== "head") {
            target.push(curNode.next.element);
            curNode = curNode.next;
        }
        return target.join();
    }
}

// test code

const linkedList = new LinkedList();
linkedList.insert("张三", "head");
console.log(linkedList.display()); // 张三
linkedList.insert("李四", "张三");
console.log(linkedList.display()); // 张三,李四
linkedList.insert("王五", "李四");
console.log(linkedList.display()); // 张三,李四,王五
linkedList.remove("李四");
console.log(linkedList.display()); // 张三,王五

```

# 参考资料
- 数据结构与算法JavaScript描述
- 学习JavaScript数据结构与算法 第3版

> 如果觉得对您有帮助,动动小手点个赞；您的点赞就是对我最大的认可。
