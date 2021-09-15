---
title: CSS 之 contain 属性
lang: zh_CN
---

## CSS 之 `contain` 属性

CSS的`contain`属性允许作者指示元素及其内容尽可能‎‎独立于‎‎文档树的其余部分。这允许浏览器重新计算布局、样式、油漆、大小或它们的任何组合，以达到 DOM 的有限区域，而不是整个页面，从而产生明显的性能优势

这个属性在包含大量独立组件的页面非常实用，它可以防止某个小部件的 CSS 规则改变对页面上的其他东西造成影响。

::: tip Note: If applied (with value: paint, strict or content), this property creates:

A new [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block) (for the descendants whose position property is absolute or fixed).

A new [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context).

A new [block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context).
:::

## 语法(Syntax)

```css
/* Keyword values */
contain: none;
contain: strict;
contain: content;
contain: size;
contain: layout;
contain: style;
contain: paint;

/* Multiple keywords */
contain: size paint;
contain: size layout paint;

/* Global values */
contain: inherit;
contain: initial;
contain: unset;
```

> 属性值可以是一个，也可以是多个

## 各属性值的含义

`none`

表示元素将正常渲染，没有包含规则

`strict`

表示除了 `style` 外的所有的包含规则应用于这个元素。等价于 `contain: size layout paint`。

`content`

表示这个元素上有除了 `size` 和 `style` 外的所有包含规则。等价于 `contain: layout paint`。

`size`

表示这个元素的尺寸计算不依赖于它的子孙元素的尺寸。

`layout`

表示元素外部无法影响元素内部的布局，反之亦然。

`style`

::: details 表明，对于可能对多个元素及其后代产生影响的属性，这些影响不会逃脱包含的元素。(此值在规范中标记为"有风险"，可能并非在任何地方都得到支持。)

Indicates that, for properties that can have effects on more than just an element and its descendants, those effects don't escape the containing element. Note that this value is marked "at-risk" in the spec and may not be supported everywhere.

:::

`paint`

表示这个元素的子孙节点不会在它边缘外显示。如果一个元素在视窗外或因其他原因导致不可见，则同样保证它的子孙节点不会被显示。

Indicates that descendants of the element don't display outside its bounds. If the containing box is offscreen, the browser does not need to paint its contained elements — these must also be offscreen as they are contained completely by that box. And if a descendant overflows the containing element's bounds, then that descendant will be clipped to the containing element's border-box.
