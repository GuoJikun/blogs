# 数据结构之 List

## 列表[List]的定义

列表是一组有序的数据。每个列表中的数据项称为元素。在 JavaScript 中，列表中的元素 可以是任意数据类型。列表中可以保存多少元素并没有事先限定，实际使用时元素的数量 受到程序内存的限制。

不包含任何元素的列表称为空列表。列表中包含元素的个数称为列表的 `length`。在内部实 现上，用一个变量 `listSize` 保存列表中元素的个数。可以在列表末尾 `append` 一个元素， 也可以在一个给定元素后或列表的起始位置 `insert` 一个元素。使用`remove` 方法从列表中 删除元素，使用 `clear` 方法清空列表中所有的元素。

还可以使用 `toString()` 方法显示列表中所有的元素，使用 `getElement()` 方法显示当前元素。列表拥有描述元素位置的属性。列表有前有后（分别对应 front 和 end）。使用 `next()` 方 法可以从当前元素移动到下一个元素，使用 `prev()` 方法可以移动到当前元素的前一个元 素。还可以使用 `moveTo(n)` 方法直接移动到指定位置，这里的 n 表示要移动到第 n 个位置。 `curPos` 属性表示列表中的当前位置。

列表的抽象数据类型定义

| 属性/方法          | 描述                               |
| ------------------ | ---------------------------------- |
| listSize           | 列表的元素个数                     |
| pos                | 列表的当前位置                     |
| length             | 返回列表中元素的个数               |
| clear（方法）      | 清空列表中的所有元素               |
| toString（方法）   | 返回列表的字符串形式               |
| getElement（方法） | 返回当前位置的元素                 |
| insert（方法）     | 在现有元素后插入新元素             |
| append（方法）     | 在列表的末尾添加新元素             |
| remove（方法）     | 从列表中删除元素                   |
| front（方法）      | 将列表的当前位置设移动到第一个元素 |
| end（方法）        | 将列表的当前位置移动到最后一个元素 |
| prev（方法）       | 将当前位置后移一位                 |
| next（方法）       | 将当前位置前移一位                 |
| curPos（方法）     | 返回列表的当前位置                 |
| moveTo（方法）     | 将当前位置移动到指定位置           |
| contains（方法）   | 判断给定值是否在列表中             |
| getElement（方法） | 显示当前值                         |

## 实现列表类

根据上面定义的列表抽象数据类型，可以直接实现一个 List 类。让我们从定义构造函数开 始，虽然它本身并不是列表抽象数据类型定义的一部分：

```javascript
class List {
    constructor() {
        this.dataSource = []
        this.listSize = 0
        this.pos = 0
    }
    clear() {}
    find() {}
    toString() {}
    insert() {}
    append() {}
    remove() {}
    front() {}
    end() {}
    prev() {}
    next() {}
    length() {}
    curPos() {}
    moveTo() {}
    getElement() {}
    contains() {}
}
```

### append：给列表添加元素

```javascript
append(element) {
    this.dataStore[this.listSize++] = element;
}
```

当新元素就位后，变量 `listSize` 加 1。

### find：在列表中查找某一元素

`find()` 方法通过对数组对象 `dataStore` 进行迭代，查找给定的元素。如果找到，就返回该 元素在列表中的位置，否则返回 -1，这是在数组中找不到指定元素时返回的标准值。我们 可以在 remove() 方法中利用此值做错误校验。

```javascript
find(element) {
    for (let i = 0, len = this.dataStore.length; i < len; ++i) {
        if (this.dataStore[i] == element) {
            return i;
        }
    }
    return -1;
}
```

### remove：从列表中删除元素

`remove()` 方法是 `List` 类中较难实现的 一个方法。首先，需要在列表中找到该元素，然后删除它，并且调整底层的数组对象以填 补删除该元素后留下的空白。好消息是，可以使用数组的 `splice()` 方法简化这一过程。

```javascript
remove(element) {
    const index = this.find(element);
    if (index === -1) {
        return false
    }
    this.dataStore.splice(index, 1);
    --this.listSize;
    return true;
}
```

### length：列表中有多少个元素

`length()` 方法返回列表中元素的个数：

```javascript
length() {
    return this.listSize;
}
```

### toString：显示列表中的元素

现在是时候创建一个方法，用来显示列表中的元素了。

```javascript
toString() {
    return this.dataStore.toString();
}
```

### insert：向列表中插入一个元素

接下来要讨论的方法是 `insert()`。如果在 List 中间位置删除了一个元素，但是现在又想将 它放回原来的位置，该怎么办？ `insert()` 方法需要知道将元素插入到什么位置，因此现在 我们假设插入是指插入到列表中某个元素之后。

```javascript
insert(element, index) {
    const index = this.find(element);
    if (index === -1) {
        return false;
    }
    this.dataStore.splice(index + 1, 0, element);
    ++this.listSize;
    return true;
}
```

### clear：清空列表中所有的元素

```javascript
clear() {
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
}
```

### contains：判断给定值是否在列表中

当需要判断一个给定值是否在列表中时，`contains()`方法就变得很有用。

```javascript
contains(element) {
    for (let i = 0, len = this.dataStore.length; i < len; ++i) {
        if (this.dataStore[i] == element) {
            return true;
        }
    }
    return false;
}
```

> 也可以使用之前实现的 find 方法

### 遍历列表

最后的一组方法允许用户在列表上自由移动

```javascript
front() {
    this.pos = 0;
}
end() {
    this.pos = this.listSize - 1;
}
prev() {
    if (this.pos > 0) {
        --this.pos;
    }
}
next() {
    if (this.pos < this.listSize - 1) {
        ++this.pos;
    }
}
curPos() {
    return this.pos;
}
moveTo(position) {
    this.pos = position;
}
getElement() {
    return this.dataStore[this.pos];
}
```

## 使用迭代器访问列表

使用迭代器，可以不必关心数据的内部存储方式，以实现对列表的遍历。前面提到的方法 `front()`、`end()`、`prev()`、`next()` 和`curPos` 就实现了 List 类的一个迭代器。以下是和使 用数组索引的方式相比，使用迭代器的一些优点。

访问列表元素时不必关心底层的数据存储结构。

当为列表添加一个元素时，索引的值就不对了，此时只用更新列表，而不用更新迭代器。

可以用不同类型的数据存储方式实现 List 类，迭代器为访问列表里的元素提供了一种 统一的方式。 了解了这些优点后，来看一个使用迭代器遍历列表的例子：

```javascript
for (lists.front(); lists.curPos() < lists.length(); lists.next()) {
    console.log(lists.getElement())
}
```

在 for 循环的一开始，将列表的当前位置设置为第一个元素。只要 `curPos` 的值小于列表 的长度，就一直循环，每一次循环都调用 `next()` 方法将当前位置向前移动一位。

同理，还可以从后向前遍历列表，代码如下：

```javascript
for (lists.end(); lists.curPos() >= 0; lists.prev()) {
    console.log(lists.getElement())
}
```

循环从列表的最后一个元素开始，当当前位置大于或等于 0 时，调用 `prev()` 方法后移 一位。

迭代器只是用来在列表上随意移动，而不应该和任何为列表增加或删除元素的方法一起 使用。

## 完整代码

```javascript
class List {
    constructor() {
        this.dataStore = []
        this.listSize = 0
        this.pos = 0
    }
    clear() {
        delete this.dataStore
        this.dataStore = []
        this.listSize = this.pos = 0
    }
    find(element) {
        for (let i = 0, len = this.dataStore.length; i < len; ++i) {
            if (this.dataStore[i] == element) {
                return i
            }
        }
        return -1
    }
    toString() {
        return this.dataStore.toString()
    }
    insert(element, index) {
        const index = this.find(element)
        if (index === -1) {
            return false
        }
        this.dataStore.splice(index + 1, 0, element)
        ++this.listSize
        return true
    }
    append(element) {
        this.dataStore[this.listSize++] = element
    }
    remove(element) {
        const index = this.find(element)
        if (index === -1) {
            return false
        }
        this.dataStore.splice(index, 1)
        --this.listSize
        return true
    }
    length() {
        return this.listSize
    }
    contains(element) {
        for (let i = 0, len = this.dataStore.length; i < len; ++i) {
            if (this.dataStore[i] == element) {
                return true
            }
        }
        return false
    }
    front() {
        this.pos = 0
    }
    end() {
        this.pos = this.listSize - 1
    }
    prev() {
        if (this.pos > 0) {
            --this.pos
        }
    }
    next() {
        if (this.pos < this.listSize - 1) {
            ++this.pos
        }
    }
    curPos() {
        return this.pos
    }
    moveTo(position) {
        this.pos = position
    }
    getElement() {
        return this.dataStore[this.pos]
    }
}
```
