# ContentMenus 右键菜单

## 基础用法

通过 menus 自定义菜单，通过 callback 来设置点击每个菜单执行的任务

<div v-contentMenus="contentMenuList" style="line-height: 34px">
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
</div>

```vue
<div v-contentMenus="contentMenuList" style="line-height: 34px">
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
    <div>在此区域内可以显示自定义菜单</div>
</div>
```

## 自定义菜单的样式

可以使绑定指令的元素在页面加载后自动获得焦点

<div v-contentMenus="contentMenuListCustom" style="line-height: 34px">
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
</div>

```vue
<div v-contentMenus="contentMenuListCustom" style="line-height: 34px">
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
    <div>菜单撒付付付付付</div>
</div>
```

<script>
import {reactive, toRefs, defineComponent} from 'vue';

export default defineComponent({
    setup() {
        const data = reactive({
            contentMenuList: {
                menus: [
                    {
                        command: 'delete',
                        name: '删除',
                    },
                    {
                        command: 'person',
                        name: '个人中心个人中心个人中心',
                    },
                    {
                        command: 'logout',
                        name: '退出',
                    },
                ],
                callback(item) {
                    console.warn(item, '鼠标右键菜单点击事件')
                },
            },
            contentMenuListCustom: {
                menus: [
                    {
                        command: 'delete',
                        name: '删除',
                    },
                    {
                        command: 'person',
                        name: '个人中心个人中心个人中心',
                    },
                    {
                        command: 'logout',
                        name: '退出',
                    },
                ],
                callback(item) {
                    console.warn(item, '鼠标右键菜单点击事件')
                },
                hoverStyle: {
                    color: 'white',
                    backgroundColor: '#409EFF',
                },
            }
        })
        return {
            ...toRefs(data)
        }
    },
})
</script>
