# 基于 Vue.js 3.x 的可视化节点编辑器组件

![](./imgs/ne-panel.png)

## 安装和使用

### npm安装

```shell
# 执行以下命令在当前项目中安装NodeEditor3
npm install vue-node-editor3 --save
```

### 引入NodeEditor3

#### 完整引入

```typescript
import { createApp } from 'vue'
import App from './App.vue'

import NodeEditor from "vue-node-editor3";
import "vue-node-editor3/lib/bundle.min.css";

createApp(App).use(NodeEditor).mount('#app')
```

以上代码便完成了NodeEditor的引入。需要注意的是，样式文件需要单独引入。

## 构建

### 环境依赖

1. NodeJs v16.15.1 (npm 8.11.0)
2. Vue 3.2.37

### 构建步骤

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

## 版权说明

项目地址：

- GitHub [https://github.com/cambridgejames/vue-node-editor3](https://github.com/cambridgejames/vue-node-editor3)
- Gitee [https://gitee.com/powerinv/vue-node-editor3](https://gitee.com/powerinv/vue-node-editor3)

该项目签署了MIT授权许可，详情请参阅 [LICENSE](LICENSE) 文件
