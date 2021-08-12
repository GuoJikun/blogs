# Queue 队列

## 队列的概况

队列是一种列表，不同的是队列只能在队尾插入元素，在队首删除元素。队列用于存储按顺序排列的数据，先进先出，这点和栈不一样，在栈中，最后入栈的元素反而被优先处理。可以将队列想象成在银行前排队的人群，排在最前面的人第一个办理业务，新来的人只能在后面排队，直到轮到他们为止。

队列是一种先进先出（First-In-First-Out，FIFO）的数据结构。队列被用在很多地方，比如提交操作系统执行的一系列进程、打印任务池等，一些仿真系统用队列来模拟银行或杂货店里排队的顾客。

## 基础队列

队列的两种主要操作是：向队列中插入新元素和删除队列中的元素。插入操作也叫做入队，删除操作也叫做出队。入队操作在队尾插入新元素，出队操作删除队头的元素。下图演示了这两个操作。

![queue.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faf0c46989b7414b84d9bd8f5dc704a0~tplv-k3u1fbpfcp-watermark.image)
队列的另外一项重要操作是读取队头的元素。这个操作叫做 `peek()`。该操作返回队头元素，但不把它从队列中删除。除了读取队头元素，我们还想知道队列中存储了多少元素，可以使用 `length` 属性满足该需求；要想清空队列中的所有元素，可以使用 `clear()` 方法来实现。

使用数组来实现队列看起来顺理成章。JavaScript 中的数组具有其他编程语言中没有的优点，数组的 `push()` 方法可以在数组末尾加入元素，`shift()` 方法则可删除数组的第一个元素。

### 构建Queue类

```js
class Queue {
    constructor() {
        this.dataStore = [];
    }
    enqueue(element) {
        this.dataStore.push(element);
    }
    dequeue() {
        return this.dataStore.shift();
    }
    front() {
        return this.dataStore[0];
    }
    back() {
        return this.dataStore[this.dataStore.length - 1];
    }
    empty() {
        return this.dataStore.length === 0;
    }
    toString() {
        return this.dataStore.toString();
    }
    length() {
        return this.dataStore.length;
    }
}
```

## 优先队列

在一般情况下，从队列中删除的元素，一定是率先入队的元素。但是也有一些使用队列的应用，在删除元素时不必遵守先进先出的约定。这种应用，需要使用一个叫做优先队列的数据结构来进行模拟。

从优先队列中删除元素时，需要考虑优先权的限制。比如医院急诊科的候诊室，就是一个采取优先队列的例子。当病人进入候诊室时，分诊护士会评估患者病情的严重程度，然后给一个优先级代码。高优先级的患者先于低优先级的患者就医，同样优先级的患者按照先来先服务的顺序就医。

先来定义存储队列元素的对象，然后再构建我们的优先队列系统：

```js
class Patient {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}
```

变量 `code` 是一个整数，表示患者的优先级或病情严重程度(code越小代表病情越严重)。

下面需要重新定义`Queue`类的`dequeue`方法，使其删除队列中拥有最高优先级的元素。新的 `dequeue()`方法遍历队列的底层存储数组，从中找出优先码最低的元素，然后使用数组的 `splice()`方法删除优先级最高的元素。新的`dequeue()`方法定义如下所示：

```js
dequeue() {
    let priority = this.dataStore[0];
    for (const i = 0, len = this.dataStore.length; i < len; i++){
        if (this.dataStore[i].code < priority) {
            priority = i;
        }
    }
    return this.dataStore.splice(priority, 1);
}
```

最后，需要定义 `toString()` 方法来显示 `Patient` 对象。

```js
toString() {
    let retStr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
        retStr += `${this.dataStore[i].name} code: ${this.dataStore[i].code}\n`;
    }
    return retStr;
}
```

**测试优先队列**

![企业微信截图_20210426173457.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3007a4b2142d414d89332732fb170bd9~tplv-k3u1fbpfcp-watermark.image)

## 双端队列

双端队列（deque，或称double-ended queue）是一种允许我们同时从前端和后端添加和移除元素的特殊队列。

在计算机科学中，双端队列的一个常见应用是存储一系列的撤销操作。每当用户在软件中进行了一个操作，该操作就会被存在双端队列中。当用户点击撤销按钮时，该操作会从双端队列中弹出，表示它被从后端移除了一个了。在进行了一定数量的操作后，最先进行的操作会被从双端队列的前端移除。由于双端队列同时遵循了先入先出和后入先出的原则，可以说是它是把队列和栈相结合的一种数据结构。

### 创建Deque类

```js
class Deque {
    constructor() {
        this.dataStore = [];
    }
    addFront(element) {
        if(this.empty()){
            this.addBack(element)
        }else{
            this.dataStore.unshift(element);
        }
    }
    addBack(element) {
        this.dataStore.push(element);
    }
    removeFront() {
        return this.dataStore.shift();
    }
    removeBack() {
        return this.dataStore.pop();
    }
    front() {
        return this.dataStore[0];
    }
    back() {
        return this.dataStore[this.dataStore.length - 1];
    }
    empty() {
        return this.dataStore.length === 0;
    }
    toString() {
        return this.dataStore.toString();
    }
    length() {
        return this.dataStore.length;
    }
}
```

### 测试Deque类的代码

![QQ20210426-202023@2x.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73bc49b87d3648138d5f8114362fad9b~tplv-k3u1fbpfcp-watermark.image)

### 实际应用-->回文字符串的判断

回文是指这样一种现象：一个单词、短语或数字，从前往后写和从后往前写都是一样的。 比如，单词“dad”、“racecar”就是回文；如果忽略空格和标点符号，下面这个句子也是回 文，“A man, a plan, a canal: Panama”；数字 1001 也是回文。

在之前的文章中是使用栈(Stack)这一数据结构，其实回文字符串字号的判断方法是使用双端队列(Deque)来实现。

```js
function isPalindrome(word) {
    if (typeof word !== "string") {
        throw TypeError(`参数不是string类型`);
    }
    let tmp = new Deque();
    for (let element of word) {
        tmp.addBack(element);
    }
    while (tmp.length() > 1) {
        if (tmp.removeFront() !== tmp.removeBack()) {
            return false;
        }
    }
    return true;
}

console.log(isPalindrome("racecar")) // true
console.log(isPalindrome("hello")) // false
```

## 参考资料

- 数据结构与算法JavaScript描述
- 学习JavaScript数据结构与算法 第3版
