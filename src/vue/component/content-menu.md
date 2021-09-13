# ContextMenu 右键菜单

## 基础用法

最常用的方式，通过 `menus` 定义菜单的数据

<ContextMenu :menus="menus" @menu-click="menuClick">

<p>在此区域内显示自定义右键菜单</p>
<p>在此区域内显示自定义右键菜单</p>
<p>在此区域内显示自定义右键菜单</p>
<p>在此区域内显示自定义右键菜单</p>
<p>在此区域内显示自定义右键菜单</p>
<p>在此区域内显示自定义右键菜单</p>
<p>在此区域内显示自定义右键菜单</p>
</ContextMenu>

```vue
<ContextMenu :menus="menus" @menu-click="menuClick">
    <p>在此区域内显示自定义右键菜单</p>
    <p>在此区域内显示自定义右键菜单</p>
    <p>在此区域内显示自定义右键菜单</p>
    <p>在此区域内显示自定义右键菜单</p>
    <p>在此区域内显示自定义右键菜单</p>
    <p>在此区域内显示自定义右键菜单</p>
    <p>在此区域内显示自定义右键菜单</p>
</ContextMenu>

<script setup>
import { ref } from "vue";

const menus = [
  {
    command: "copy",
    text: "复制",
  },
  {
    command: "paste",
    text: "粘贴",
  },
  {
    command: "move",
    text: "移动",
  },
];

const menuClick = (item) => {
  alert(`command：${item.command}；text：${item.text}`);
};
</script>
```

<script setup>
import { ref } from "vue";

const menus = [
    {
        command: 'copy',
        text: '复制'
    },
    {
        command: 'paste',
        text: '粘贴'
    },
    {
        command: 'move',
        text: '移动'
    }
]

const menuClick = item => {
    alert(`command：${item.command}；text：${item.text}`)
}
</script>

## 组件属性和事件

| 属性名        | 说明                                                   | 类型   | 默认值 |
| ------------- | ------------------------------------------------------ | ------ | ------ |
| menus         | 配置菜单的数组。例子:[{command: 'copy', text: '复制'}] | Array  | []     |
| menuWrapClass | 菜单容器的类名。                                       | String | -      |
| menuItemClass | 菜单子项的类名。                                       | String | -      |
| menu-click    | 点击菜单时触发的事件，默认参数是一个 Object。          | -      | -      |
