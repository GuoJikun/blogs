# ContentMenus 右键菜单

## 基础用法

通过 menus 自定义菜单，通过 callback 来设置点击每个菜单执行的任务

<div v-contextmenu="contentMenuList" style="line-height: 34px">
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
<div v-contextmenu="{ options: contentMenuList.menus, onMenuClick: contentMenuList.callback }" style="line-height: 34px">
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

<script>
import { reactive, toRefs } from 'vue';
export default {
    setup() {
        const data = reactive({
            contentMenuList: {
                options: [
                    {
                        command: 'delete',
                        text: '删除',
                    },
                    {
                        command: 'person',
                        text: '个人中心',
                    },
                    {
                        command: 'logout',
                        text: '退出',
                    },
                    {
                        divider: true,
                    },
                    {
                        command: 'copy',
                        text: '复制',
                    },
                    {
                        command: 'cut',
                        text: '剪切',
                    },
                    {
                        command: 'paste',
                        text: '粘贴',
                    },
                ],
                onMenuClick(item) {
                    alert(JSON.stringify(item, null, 2), '鼠标右键菜单点击事件')
                },
                width: "300px"
            },
            contentMenuListCustom: {
                menus: [
                    {
                        command: 'delete',
                        text: '删除',
                    },
                    {
                        command: 'person',
                        text: '个人中心个人中心个人中心',
                    },
                    {
                        command: 'logout',
                        text: '退出',
                    },
                ],
                onMenuClick(item) {
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
}
</script>
