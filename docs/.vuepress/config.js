const { defaultTheme } = require("vuepress");

module.exports = {
  lang: "zh-CN",
  title: "NodeEditor3-vue",
  description: "基于 Vue.js 3.x 的前端可视化节点编辑器组件",
  base: "/",
  head: [],
  plugins: [],
  theme: defaultTheme({
    repo: "https://github.com/cambridgejames/NodeEditor3-vue",
    navbar: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/guide/" }
    ],
    sidebar: [
      { text: "介绍", link: "/" },
      {
        text: "开发指南",
        children: [
          { text: "快速开始", link: "/guide/quick-start.md" },
          { text: "从源码构建", link: "/guide/build.md" }
        ]
      }
    ],
    sidebarDepth: 2,
    lastUpdated: 'Last Updated'
  })
}
