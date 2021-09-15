# Barcode 条形码

## 基础用法

不用添加任何属性就可以生成一个条形码

<yak-barcode text="65556845641" tag="svg"></yak-barcode>

```html
<yak-barcode text="65556845641" tag="svg"></yak-barcode>
```

## 不显示文字

使用`options`中的`displayValue`来控制文字的显示/隐藏

<yak-barcode text="65556845641" tag="svg" :options="{displayValue:false}"></yak-barcode>

```html
<yak-barcode
  text="65556845641"
  tag="svg"
  :options="{displayValue:false}"
></yak-barcode>
```

## 更改条码的颜色

使用`options`中的`lineColor`来控制条码的颜色

<yak-barcode text="65556845641" tag="svg" :options="{lineColor: '#409eff'}"></yak-barcode>

```html
<yak-barcode
  text="65556845641"
  tag="svg"
  :options="{ lineColor: `#409eff`}"
></yak-barcode>
```
