const topic = {
    text: "力扣题解",
    collapsible: true,
    items: [
        {
            text: "回文数",
            link: "/data-structure/topic/2023-05-17",
        },
    ],
};

export default {
    "/basic/": [
        {
            text: "HTML & CSS",
            collapsible: true,
            items: [
                {
                    text: "Filter 滤镜",
                    link: "/basic/filter",
                },
                {
                    text: "Cursor 鼠标样式",
                    link: "/basic/cursor",
                },
                {
                    text: "Intersection Observer",
                    link: "/basic/intersection-observer",
                },
                {
                    text: "Canvas",
                    link: "/basic/canvas",
                },
                {
                    text: "WebComponent",
                    link: "/basic/web-component",
                },
                {
                    text: "Scss之extend和mixin",
                    link: "/basic/p2021091401",
                },
                {
                    text: "Css 之 contain",
                    link: "/basic/contain",
                },
                {
                    text: "自定义滚动条样式",
                    link: "/basic/scrollbar",
                },
            ],
        },
        {
            text: "Javascript",
            collapsible: true,
            items: [
                {
                    text: "Cookie 缓存",
                    link: "/basic/js/cookie",
                },
                {
                    text: "Decorator 装饰器",
                    link: "/basic/js/decorator",
                },
                {
                    text: "编解码",
                    link: "/basic/js/encode",
                },
                {
                    text: "Utils 工具函数",
                    link: "/basic/js/utils",
                },
                {
                    text: "浏览器多窗口通讯",
                    link: "/basic/js/multi-window-communication",
                },
                {
                    text: "MutationObserver API",
                    link: "/basic/js/mutation-observer",
                },
                {
                    text: "手写new,bind,call,apply",
                    link: "/basic/js/p2021091402",
                },
                { text: "获取滚动条宽度", link: "/basic/scrollbar-width" },
            ],
        },
        {
            text: "ECMAScript 标准",
            collapsible: true,
            items: [
                {
                    text: "ECMA 2022",
                    link: "/basic/ecma/2022",
                },
                {
                    text: "ECMA 2021",
                    link: "/basic/ecma/2021",
                },
                {
                    text: "ECMA 2020",
                    link: "/basic/ecma/2020",
                },
                {
                    text: "ECMA 2019",
                    link: "/basic/ecma/2019",
                },
                {
                    text: "ECMA 2018",
                    link: "/basic/ecma/2018",
                },
                {
                    text: "ECMA 2017",
                    link: "/basic/ecma/2017",
                },
                {
                    text: "ECMA 2016",
                    link: "/basic/ecma/2016",
                },
            ],
        },
    ],
    "/vue/": [
        {
            text: "指令",
            items: [
                {
                    text: "Copy 复制",
                    link: "/vue/directives/copy",
                },
            ],
        },
        {
            text: "组件",
            items: [
                {
                    text: "ContentMenu 右键菜单",
                    link: "/vue/component/content-menu",
                },
                {
                    text: "Barcode 条形码",
                    link: "/vue/component/barcode",
                },
            ],
        },
        {
            text: "其它",
            items: [
                {
                    text: "env 配置文件",
                    link: "/vue/env",
                },
                {
                    text: "vueCli项目添加vite支持",
                    link: "/vue/p202109101",
                },
            ],
        },
    ],
    "/data-structure/": [
        {
            text: "数据结构",
            collapsible: true,
            items: [
                {
                    text: "List 列表",
                    link: "/data-structure/list",
                },
                {
                    text: "Queue 队列",
                    link: "/data-structure/queue",
                },
                {
                    text: "Stack 栈",
                    link: "/data-structure/stack",
                },
                {
                    text: "Set 集合",
                    link: "/data-structure/set",
                },
                {
                    text: "Linked List 链表",
                    link: "/data-structure/linked-list",
                },
                {
                    text: "Tree 树",
                    link: "/data-structure/binary-search-tree",
                },
            ],
        },
        {
            text: "算法",
            items: [
                {
                    text: "Sort 排序",
                    link: "/data-structure/sort",
                },
                {
                    text: "Tween 缓动动画",
                    link: "/data-structure/tween",
                },
            ],
        },
        topic,
    ],
    "/tools/": [
        {
            text: "工具",
            items: [
                {
                    text: "阴影生成器",
                    link: "/tools/shadow",
                },
                {
                    text: "文件转Base64",
                    link: "/tools/file-to-base64",
                },
            ],
        },
    ],
    "/docs/": [
        {
            text: "组件文档",
            items: [
                {
                    text: "watermark 水印",
                    link: "/docs/watermark-vue",
                },
            ],
        },
    ],
    "/other/": [
        {
            text: "其它",
            items: [
                {
                    text: "win11安装 wslg",
                    link: "/other/wsl",
                },
                {
                    text: "搭建私有Npm仓库",
                    link: "/other/private-npm-repository",
                },
                {
                    text: "win10 激活",
                    link: "/other/activation-win10",
                },
                {
                    text: "Scoop 包管理器",
                    link: "/other/scoop",
                },
                {
                    text: "linux 禁止指定软件升级",
                    link: "/other/disabled-upgrade",
                },
                {
                    text: "Markdown 基础语法",
                    link: "/other/md",
                },
                {
                    text: "Windows终端代理",
                    link: "/other/terminal-proxy",
                },
                {
                    text: "更改wsl的安装位置",
                    link: "/other/move-wsl-install-dir",
                },
                {
                    text: "使用jenkins一键发布vue项目",
                    link: "/other/jenkins-vue",
                },
            ],
        },
    ],
};
