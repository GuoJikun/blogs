# 栈

## 栈的介绍

栈就是和列表类似的一种数据结构，它可用来解决计算机世界里的很多问题。栈是一种高 效的数据结构，因为数据只能在栈顶添加或删除，所以这样的操作很快，而且容易实现。 栈的使用遍布程序语言实现的方方面面，从表达式求值到处理函数调用

栈是一种特殊的列表，栈内的元素只能通过列表的一端访问，这一端称为栈顶。咖啡厅内 的一摞盘子是现实世界中常见的栈的例子。只能从最上面取盘子，盘子洗净后，也只能摞 在这一摞盘子的最上面。栈被称为一种后入先出（LIFO，last-in-first-out）的数据结构。 

由于栈具有后入先出的特点，所以任何不在栈顶的元素都无法访问。为了得到栈底的元 素，必须先拿掉上面的元素。 

对栈的两种主要操作是将一个元素压入栈和将一个元素弹出栈。入栈使用 `push()` 方法，出 栈使用 `pop()` 方法。图 一演示了入栈和出栈的过程。 

![Stack.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b12458bf3974238997503aa151b5bf9~tplv-k3u1fbpfcp-watermark.image)

另一个常用的操作是预览栈顶的元素。`pop()` 方法虽然可以访问栈顶的元素，但是调用该方 法后，栈顶元素也从栈中被永久性地删除了。`peek()` 方法则只返回栈顶元素，而不删除它。

## 栈的实现

实现一个栈，当务之急是决定存储数据的底层数据结构。这里采用的是数组。 

我们的实现以定义 Stack 类开始：

```javascript
class Stack {
    constructor() {
        this.dataStore = [];
        this.top = 0;
    }
    push() { }
    pop() { }
    peek() { }
    clear() { }
    length() { }
    empty() { }
    toString(){ }
}
```

我们用数组 `dataStore` 保存栈内元素，构造函数将其初始化为一个空数组。变量 `top` 记录 栈顶位置，被构造函数初始化为 0，表示栈顶对应数组的起始位置 0。如果有元素被压入 栈，该变量的值将随之变化。

### 实现push方法

先来实现 `push()` 方法。当向栈中压入一个新元素时，需要将其保存在数组中变量 `top` 所对 应的位置，然后将 `top` 值加 `1`，让其指向数组中下一个空位置。代码如下所示：

```javascript
push(element) {
    this.dataStore[++this.top] = element;
}
```

这里要特别注意 `++` 操作符的位置，它放在 `this.top` 的后面，这样新入栈的元素就被放在 `top` 的当前值对应的位置，然后再将变量 `top` 的值加 `1`，指向下一个位置。

### 实现pop方法

`pop()` 方法恰好与 `push()` 方法相反——它返回栈顶(被删除的)元素，同时将变量 `top` 的值减 `1`：

```javascript
pop() {
    return this.dataStore[this.top--];
}
```

### 实现peek方法

`peek()` 方法返回数组的第 `top-1` 个位置的元素，即栈顶元素：

```javascript
peek() {
    return this.dataStore[this.top - 1];
}
```

如果对一个空栈调用 `peek()` 方法，结果为 `undefined`。这是因为栈是空的，栈顶没有任何 元素。

### 实现length方法

有时候需要知道栈内存储了多少个元素。`length()` 方法通过返回变量 `top` 值的方式返回栈内的元素个数：

```javascript
length() {
    return this.top
}
```

### 实现clear方法

可以将变量 `top` 的值设为 `0`，轻松清空一个栈：

```javascript
clear() {
    this.top = 0;
}
```

### 实现empty方法

`empty()`方法可以知道一个`Stack`是否是空的

```javascript
empty() {
    return this.top === 0;
}
```

## 使用Stack类解决问题

### 数制间的转化

可以利用栈将一个数字从一种数制转换成另一种数制。假设想将数字 n 转换为以 b 为基数 的数字，实现转换的算法如下。 

1. 最高位为 `n % b`，将此位压入栈。 
2. 使用 `n/b` 代替 `n`。 
3. 重复步骤 1 和 2，直到 n 等于 0，且没有余数。 
4. 持续将栈内元素弹出，直到栈为空，依次将这些元素排列，就得到转换后数字的字符 串形式

> 此算法只针对基数为2~9的情况

**代码实现**

```javascript
function mulBase(num, base=2) {
    let tmp = new Stack();
    while (num > 0) {
        tmp.push(num % base)
        num = Math.floor(num /= base);
    }
    let target = '';
    while(tmp.length() > 0) {
        target = target + tmp.pop();
    }
    return target;
}

console.log(mulBase(3,2)) // "11"
console.log(mulBase(3,6)) // "6"
```

### 回文字符串的判断

回文是指这样一种现象：一个单词、短语或数字，从前往后写和从后往前写都是一样的。 比如，单词“dad”、“racecar”就是回文；如果忽略空格和标点符号，下面这个句子也是回 文，“A man, a plan, a canal: Panama”；数字 1001 也是回文。 

使用栈，可以轻松判断一个字符串是否是回文。我们将拿到的字符串的每个字符按从左至 右的顺序压入栈。当字符串中的字符都入栈后，栈内就保存了一个反转后的字符串，最后 的字符在栈顶，第一个字符在栈底。

```javascript
function isPalindrome(word) {
    if (typeof word !== "string") {
        throw TypeError(`参数不是string类型`);
    }
    let tmp = new Stack();
    for (let element of word) {
        tmp.push(element)
    }

    let rword = '';
    while (tmp.length() > 0) {
        rword += tmp.pop()
    }
    console.log(rword);
    return word === rword;
}

console.log(isPalindrome("racecar")) // true
console.log(isPalindrome("hello")) // false
```

## 参考资料

- 数据结构与算法JavaScript描述