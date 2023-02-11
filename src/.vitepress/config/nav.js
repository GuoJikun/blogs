export default [
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
    text: "组件文档",
    link: "/docs/readme.md",
    children: [
      {
        text: "watermark 水印",
        link: "/docs/watermark-vue.md",
      },
    ],
  },
  {
    text: "小工具",
    link: "/tools/readme.md",
  },
  {
    text: "其他",
    link: "/other/wsl.md",
  },
];
