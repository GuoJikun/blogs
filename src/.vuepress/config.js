module.exports = {
  lang: "zh-CN",
  title: "前端小栈",
  description: "这是我的第一个 VuePress 站点",

  themeConfig: {
    home: "/readme.md",
    logo: "https://vuejs.org/images/logo.png",
    navbar: [
      // NavbarItem
      {
        text: "Basic",
        link: "/basic/cookie.md",
      },
      // NavbarGroup
      {
        text: "Components",
        link: "/components/preview-image",
      },
      {
        text: "数据结构与算法",
        link: "/data-structure/list.md",
      },
    ],
    sidebar: {
      "/basic/": [
        {
          text: "HTML & CSS",
          children: [
            {
              text: "Intersection Observer",
              link: "/basic/intersection-observer.md",
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
          ],
        },
      ],
      "/components/": [
        {
          text: "图片预览",
          link: "/components/preview-image.vue",
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
    },
  },
  markdown: {
    code: {
      lineNumbers: 12,
    },
  },
  dest: "docs",
};
