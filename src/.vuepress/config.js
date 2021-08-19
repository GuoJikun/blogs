module.exports = {
  lang: "zh-CN",
  title: "前端小栈",
  description: "这是我的第一个 VuePress 站点",

  themeConfig: {
    home: "/readme.md",
    logo: "https://vuejs.org/images/logo.png",
    sidebarDepth: 2,
    repo: "GuoJikun/blog-vuepress",
    repoLabel: "GITHUB",
    toggleDarkMode: "切换夜间模式",
    lastUpdatedText: "最后更新时间",
    contributors: false,
    contributorsText: "贡献者",
    editLinkText: "在 Github 上编辑",
    docsDir: "src",
    navbar: [
      // NavbarItem
      {
        text: "Basic",
        link: "/basic/filter.md",
      },
      // NavbarGroup
      {
        text: "Vue",
        link: "/vue/directives/copy.md",
      },
      {
        text: "数据结构与算法",
        link: "/data-structure/list.md",
      },
      {
        text: "其他",
        link: "/other/wsl.md",
      },
    ],
    sidebar: {
      "/basic/": [
        {
          text: "HTML & CSS",
          children: [
            {
              text: "Filter 滤镜",
              link: "/basic/filter.md",
            },
            {
              text: "Cursor 鼠标样式",
              link: "/basic/cursor.md",
            },
            {
              text: "Intersection Observer",
              link: "/basic/intersection-observer.md",
            },
            {
              text: "Canvas",
              link: "/basic/canvas.md",
            },
            {
              text: "WebComponent",
              link: "/basic/web-component.md",
            },
          ],
        },
        {
          text: "Javascript",
          children: [
            {
              text: "Cookie 缓存",
              link: "/basic/cookie.md",
            },
            {
              text: "Decorator 装饰器",
              link: "/basic/decorator.md",
            },
            {
              text: "编解码",
              link: "/basic/encode.md",
            },
            {
              text: "Utils 工具函数",
              link: "/basic/utils.md",
            },
          ],
        },
        {
          text: "ECMAScript 标准",
          children: [
            {
              text: "ECMA 2021",
              link: "/basic/ecma/2021.md",
            },
            {
              text: "ECMA 2020",
              link: "/basic/ecma/2020.md",
            },
            {
              text: "ECMA 2019",
              link: "/basic/ecma/2019.md",
            },
            {
              text: "ECMA 2018",
              link: "/basic/ecma/2018.md",
            },
            {
              text: "ECMA 2017",
              link: "/basic/ecma/2017.md",
            },
            {
              text: "ECMA 2016",
              link: "/basic/ecma/2016.md",
            },
          ],
        },
      ],
      "/vue/": [
        {
          text: "指令",
          children: [
            {
              text: "Copy 复制",
              link: "/vue/directives/copy.md",
            },
          ],
        },
        {
          text: "组件",
          link: "/vue/preview-image.vue",
        },
        {
          text: "env 配置文件",
          link: "/vue/env.md",
        },
      ],
      "/data-structure/": [
        {
          text: "数据结构",
          children: [
            {
              text: "List 列表",
              link: "/data-structure/list.md",
            },
            {
              text: "Queue 队列",
              link: "/data-structure/queue.md",
            },
            {
              text: "Stack 栈",
              link: "/data-structure/stack.md",
            },
            {
              text: "Set 集合",
              link: "/data-structure/set.md",
            },
            {
              text: "Linked List 链表",
              link: "/data-structure/linked-list.md",
            },
            {
              text: "Tree 树",
              link: "/data-structure/binary-search-tree.md",
            },
          ],
        },
        {
          text: "算法",
          children: [
            {
              text: "Sort 排序",
              link: "/data-structure/sort.md",
            },
          ],
        },
      ],
      "/other/": [
        {
          text: "win11安装wslg",
          link: "/other/wsl.md",
        },
      ],
    },
  },
  dest: "docs",
};
