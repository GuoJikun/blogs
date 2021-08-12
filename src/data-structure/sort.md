---
title: 常见的7中排序算法
description: 冒泡排序，选择排序，插入排序，希尔排序，堆排序，快速排序，归并排序
multiselectOptions:
    - VuePress
    - Gridsome
    - Nuxt
---

# 常见的 7 中排序算法

> 所谓排序算法，即通过特定的算法因式将一组或多组数据按照既定模式进行重新排序。这种新序列遵循着一定的规则，体现出一定的规律，因此，经处理后的数据便于筛选和计算，大大提高了计算效率。对于排序，我们首先要求其具有一定的稳定性，即当两个相同的元素同时出现于某个序列之中，则经过一定的排序算法之后，两者在排序前后的相对位置不发生变化。换言之，即便是两个完全相同的元素，它们在排序过程中也是各有区别的，不允许混淆不清。

## 冒泡排序

冒泡排序是入门级的算法，但也有一些有趣的玩法。通常来说，冒泡排序有三种写法：

一边比较一边向后两两交换，将最大值 / 最小值冒泡到最后一位；
经过优化的写法：使用一个变量记录当前轮次的比较是否发生过交换，如果没有发生交换表示已经有序，不再继续排序；

### 基础算法

> 空间复杂度为 $O(1)$，时间复杂度为 $O(n^2)$

```js
const sort = (arr) => {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
```

最外层的 for 循环每经过一轮，剩余数字中的最大值就会被移动到当前轮次的最后一位，中途也会有一些相邻的数字经过交换变得有序。总共比较次数是 (n-1)+(n-2)+(n-3)+…+1(n−1)+(n−2)+(n−3)+…+1。

### 第二种写法是在基础算法的基础上改良而来的：

```js
const sort = (arr) => {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        let isSwap = false
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                isSwap = true
            }
        }
        if (!isSwap) {
            break
        }
    }
    return arr
}
```

> 空间复杂度为$O(1)$;时间复杂度为 $O(n^2)$-最好为 O(n);

最外层的 for 循环每经过一轮，剩余数字中的最大值仍然是被移动到当前轮次的最后一位。这种写法相对于第一种写法的优点是：如果一轮比较中没有发生过交换，则立即停止排序，因为此时剩余数字一定已经有序了。

## 选择排序

选择排序的思想是：双重循环遍历数组，每经过一轮比较，找到最小元素的下标，将其交换至首位。

### 基础算法

```js
const sort = (arr) => {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                minIndex = j
            }
        }
        ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}
```

### 二元选择排序-优化

选择排序算法也是可以优化的，既然每轮遍历时找出了最小值，何不把最大值也顺便找出来呢？这就是二元选择排序的思想。

使用二元选择排序，每轮选择时记录最小值和最大值，可以把数组需要遍历的范围缩小一倍。

```js
const sort = (arr) => {
    for (let i = 0, len = arr.length; i < len / 2; i++) {
        let minIndex = i
        let maxIndex = i
        for (let j = i + 1; j < len - i; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j
            }
            if (arr[maxIndex] < arr[j]) {
                maxIndex = j
            }
        }
        if (minIndex === maxIndex) break
        ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        if (maxIndex === i) {
            maxIndex = minIndex
        }
        const lastIndex = len - i - 1
        ;[arr[maxIndex], arr[lastIndex]] = [arr[lastIndex], arr[maxIndex]]
    }
    return arr
}
```

## 插入排序

插入排序的思想非常简单，生活中有一个很常见的场景：在打扑克牌时，我们一边抓牌一边给扑克牌排序，每次摸一张牌，就将它插入手上已有的牌中合适的位置，逐渐完成整个排序。

插入排序有两种写法：

-   交换法：在新数字插入过程中，不断与前面的数字交换，直到找到自己合适的位置。
-   移动法：在新数字插入过程中，与前面的数字不断比较，前面的数字不断向后挪出位置，当新数字找到自己的位置后，插入一次即可。

### 交换法插入排序

```js
const sort = (arr) => {
    for (let i = 1, len = arr.length; i < len; i++) {
        let j = i
        while (j >= 1 && arr[j] < arr[j - 1]) {
            ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
            j--
        }
    }
    return arr
}
```

当数字少于两个时，不存在排序问题，当然也不需要插入，所以我们直接从第二个数字开始往前插入。

### 移动法

我们发现，在交换法插入排序中，每次都要交换数字。但实际上，新插入的这个数字并不一定适合与它交换的数字所在的位置。也就是说，它刚换到新的位置上不久，下一次比较后，如果又需要交换，它马上又会被换到前一个数字的位置。

由此，我们可以想到一种优化方案：让新插入的数字先进行比较，前面比它大的数字不断向后移动，直到找到适合这个新数字的位置后再插入。

这种方案我们需要把新插入的数字暂存起来，代码如下：

```js
const sort = (arr) => {
    for (let i = 1, len = arr.length; i < len; i++) {
        let j = i - 1
        let cur = arr[i]
        while (j >= 0 && cur < arr[j]) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = cur
    }
    return arr
}
```

## 希尔排序

1959 年 77 月，美国辛辛那提大学的数学系博士 Donald Shell 在 《ACM 通讯》上发表了希尔排序算法，成为首批将时间复杂度降到$O(n^2)$以下的算法之一。虽然原始的希尔排序最坏时间复杂度仍然是$O(n^2)$，但经过优化的希尔排序可以达到$O(n^{1.3})$甚至 $O(n^{7/6})$。

希尔排序本质上是对插入排序的一种优化，它利用了插入排序的简单，又克服了插入排序每次只交换相邻两个元素的缺点。它的基本思想是：

-   将待排序数组按照一定的间隔分为多个子数组，每组分别进行插入排序。这里按照间隔分组指的不是取连续的一段数组，而是每跳跃一定间隔取一个值组成一组
-   逐渐缩小间隔进行下一轮排序
-   最后一轮时，取间隔为 11，也就相当于直接使用插入排序。但这时经过前面的「宏观调控」，数组已经基本有序了，所以此时的插入排序只需进行少量交换便可完成
    举个例子，对数组`[8, 3, 34, 6, 4, 1, 44, 45, 43, 2, 23]`进行希尔排序的过程如下：

第一遍（5 间隔排序）：按照间隔 5 分割子数组，共分成五组，分别是`[8, 1, 23],[3, 44],[34, 45],[6, 43],[4, 2]`。对它们进行插入排序，排序后它们分别变成：`[1, 8, 23],[3, 44],[34, 45],[6, 43],[2, 4]`，此时整个数组变成 `[1, 3, 34, 6, 2, 8, 44, 45, 43, 4, 23]`

第二遍（2 间隔排序）：按照间隔 2 分割子数组，共分成两组，分别是`[1, 34, 2, 44, 43, 23],[3, 6, 8, 45, 4]`。对他们进行插入排序，排序后它们分别变成：`[1, 2, 23, 34, 43, 44],[3, 4, 6, 8, 45]`，此时整个数组变成`[1, 3, 2, 4, 23, 6, 34, 8, 43, 45, 44]`。这里有一个非常重要的性质：当我们完成 2 间隔排序后，这个数组仍然是保持 5 间隔有序的。也就是说，更小间隔的排序没有把上一步的结果变坏。

第三遍（11 间隔排序，等于直接插入排序）：按照间隔 1 分割子数组，分成一组，也就是整个数组。对其进行插入排序，经过前两遍排序，数组已经基本有序了，所以这一步只需经过少量交换即可完成排序。排序后数组变成`[1, 2, 3, 4, 6, 8, 23, 34, 43, 44, 45]`，整个排序完成。

```js
const sort = (arr) => {
    const len = arr.length
    if (len < 2) {
        return arr
    }
    let gap = Math.floor(len / 2)
    while (gap > 0) {
        for (let i = gap; i < len; i++) {
            let j = i
            let cur = arr[i]
            while (j >= 0 && cur < arr[j - gap]) {
                arr[j] = arr[j - gap]
                j -= gap
            }
            arr[j] = cur
        }
        gap = Math.floor(gap / 2)
    }
    return arr
}
```

## 堆排序

堆排序过程如下：

1. 用数列构建出一个大顶堆，取出堆顶的数字(放到待排序数组的最后)；
2. 调整剩余的数字，构建出新的大顶堆，再次取出堆顶的数字；
3. 循环往复，完成整个排序。

```js
function sort(arr) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        adjustHeap(arr, i, arr.length)
    }
    for (let j = arr.length - 1; j > 0; j--) {
        ;[arr[0], arr[j]] = [arr[j], arr[0]]
        adjustHeap(arr, 0, j)
    }
}

function adjustHeap(arr, i, length) {
    let tmp = arr[i]
    for (let k = i * 2 + 1; k < length; k = k * 2 + 1) {
        if (k + 1 < length && arr[k] < arr[k + 1]) {
            k++
        }
        if (arr[k] > tmp) {
            arr[i] = arr[k]
            i = k
        } else {
            break
        }
        arr[i] = tmp
    }
}
```

## 快速排序

快速排序算法由 C. A. R. Hoare 在 1960 年提出。它的时间复杂度也是 $O(nlogn)$，但它在时间复杂度为 $O(nlogn)$ 级的几种排序算法中，大多数情况下效率更高，所以快速排序的应用非常广泛。再加上快速排序所采用的分治思想非常实用，使得快速排序深受面试官的青睐，所以掌握快速排序的思想尤为重要。

快速排序算法的基本思想是：

-   从数组中取出一个数，称之为基数（pivot）

-   遍历数组，将比基数大的数字放到它的右边，比基数小的数字放到它的左边。遍历完成后，数组被分成了左右两个区域

-   将左右两个区域视为两个数组，重复前两个步骤，直到排序完成

-   事实上，快速排序的每一次遍历，都将基数摆到了最终位置上。第一轮遍历排好 1 个基数，第二轮遍历排好 2 个基数（每个区域一个基数，但如果某个区域为空，则此轮只能排好一个基数），第三轮遍历排好 4 个基数（同理，最差的情况下，只能排好一个基数），以此类推。总遍历次数为 $logn$～$n$ 次，每轮遍历的时间复杂度为 $O(n)$，所以很容易分析出快速排序的时间复杂度为 $O(nlogn)$ ～$O(n^2)$，平均时间复杂度为 $O(nlogn)$。

```js
const partition = (arr, start, end) => {
    let pivot = arr[start] // 取第一个数为基数
    let left = start + 1 // 从第二个数开始分区
    let right = end // 右边界
    // left、right 相遇时退出循环
    while (left < right) {
        // 找到第一个大于基数的位置
        while (left < right && arr[left] <= pivot) left++
        // 交换这两个数，使得左边分区都小于或等于基数，右边分区大于或等于基数
        if (left != right) {
            ;[arr[left], arr[right]] = [arr[right], arr[left]]
            right--
        }
    }
    // 如果 left 和 right 相等，单独比较 arr[right] 和 pivot
    if (left == right && arr[right] > pivot) right--
    // 将基数和中间数交换
    if (right != start) [arr[left], pivot] = [pivot, arr[left]]
    // 返回中间值的下标
    return right
}

const quickSort = (arr, start, end) => {
    if (start >= end) return
    const middle = partition(arr, start, end)
    quickSort(arr, start, middle - 1)
    quickSort(arr, middle + 1, end)
}

const sort = (arr) => {
    quickSort(arr, 0, arr.length - 1)
}
```

## 归并排序

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为 2-路归并。

### 算法描述

-   把长度为 n 的输入序列分成两个长度为 n/2 的子序列；
-   对这两个子序列分别采用归并排序；
-   将两个排序好的子序列合并成一个最终的排序序列。

```js
const merge = (left, right) => {
    let result = []
    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    while (left.length) result.push(left.shift())
    while (right.length) result.push(right.shift())
    return result
}

const sort = (arr) => {
    let len = arr.length
    if (len < 2) {
        return arr
    }
    const middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle)
    return merge(sort(left), sort(right))
}
```
