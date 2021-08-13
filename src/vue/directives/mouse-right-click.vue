<template>
    <div>
        <layout-item title="MouseRightClick 右键菜单"> </layout-item>
        <layout-item title="基础用法">
            <template v-slot:desc>
                <p>通过menus自定义菜单，通过callback来设置点击每个菜单执行的任务</p>
            </template>
            <div v-mouse-right-click="contentMenuList" style="line-height: 34px">
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
        </layout-item>
        <layout-item title="设置自定义菜单的样式" desc="可以使绑定指令的元素在页面加载后自动获得焦点">
            <div v-mouse-right-click="contentMenuListCustom" style="line-height: 34px">
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
        </layout-item>
    </div>
</template>

<script>
import MouseRightClick from '@/directives/mouse-right-click.js'

export default {
    directives: { MouseRightClick },
    data() {
        return {
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
            },
        }
    },
}
</script>
