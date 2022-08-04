# NodeEditor3-vue 组件开发构建指南

## 环境依赖

1. Node.js >=16.15.1 (npm >=8.11.0)
2. Vue.js >= 3.2.37

## 构建步骤

```shell
# 安装依赖包
npm install --legacy-peer-deps

# 运行示例
npm run serve

# 构建版本
npm run build

# 清理构建文件
npm run build:clean
```

**注意！**

由于ESlint存在大量的依赖冲突问题，安装依赖包时请加入`--legacy-peer-deps`参数以忽略依赖冲突

## 目录结构

本节介绍主要的文件及目录结构。

```text
node-editor3-vue - 项目根目录
    ├ build - 构建配置目录
    │   └ rollup.config.js - Rollup构建脚本
    ├ docs - 文档目录
    ├ examples - 演示组件，运行 npm run serve 时展示使用示例
    ├ lib - 组件构建的目标路径
    ├ packages - 节点编辑器组件源码目录
    │   ├ components - 通用组件目录
    │   │   └ NeCompSvg - SVG图标组件
    │   ├ css - 通用样式文件目录
    │   ├ js - 通用工具方法目录
    │   │   ├ animate - 动画引擎
    │   │   ├ browserFormat - 类型转换、通用数值计算工具方法
    │   │   ├ interface - 独立接口定义
    │   │   └ browser.ts - 浏览器及内核类型检测
    │   ├ NePanel - 面板组件
    │   ├ nodes - 节点组件目录
    │   │   ├ input - 输入组件目录
    │   │   │   └ NeInputNode - 通用输入组件
    │   │   └ index.ts - 节点组件汇总目录，提供动态加载功能的基础数据
    │   └ index.ts - 入口文件
    └ public - 演示用的HTML文件目录
```
