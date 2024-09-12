# 计算滚动条的宽度

## 原理

1. 创建两个 div 嵌套在一起
2. 外层的 div 设置固定宽度和 overflow：scroll
3. 滚动条的宽度=外层 div 的 offsetWidth-内层 div 的 offsetWidth

![1.png](/images/basic/js/scrollbar-width/1.png)

## 实现代码

```js
/**
 * 获取滚动条的宽度
 * @params {HTMLElement} element
 */
function getScrollWidth(element) {
    const wrapEle = element || document.body;
    const scroll = document.createElement("div");
    const scrollIn = document.createElement("div");
    scroll.appendChild(scrollIn);
    scroll.style.width = "100px";
    scroll.style.height = "50px";
    scroll.style.overflow = "scroll";
    scroll.style.marginLeft = "-100000px";
    wrapEle.appendChild(scroll);
    const scrollInWidth = scrollIn.offsetWidth;
    const scrollWidth = scroll.offsetWidth;
    const tmp = setTimeout(() => {
        wrapEle.removeChild(scroll);
        clearTimeout(tmp);
    }, 10);
    return scrollWidth - scrollInWidth;
}
```
