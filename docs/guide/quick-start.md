# 快速开始

本章介绍如何在项目中引入并使用 NodeEditor3 组件。

## 安装

### npm安装

```shell
# 执行以下命令在当前项目中安装NodeEditor3
npm install node-editor3-vue --save
```

## 引入NodeEditor3

### 完整引入

```typescript
import { createApp } from "vue";
import App from "./App.vue";

import NodeEditor from "node-editor3-vue";
import "node-editor3-vue/lib/bundle.min.css";

createApp(App).use(NodeEditor).mount('#app');
```

以上代码便完成了NodeEditor的引入。需要注意的是，样式文件需要单独引入。

## 开始使用

完成上述步骤之后，基于 Vue.js 3.0 和 NodeEditor3 的环境已经搭建完毕，接下来可以编写代码了。

下面是一个 NodeEditor3 组件的使用示例。

```vue
<template>
  <ne-panel :init="init"/>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    const initStr = "[{\"name\":\"NeInputNode\",\"transform\":{\"x\":100,\"y\":50}}]";
    const init = ref(JSON.parse(initStr));
    return {
      init
    };
  }
});
</script>
```

需要注意的是，ne-panel组件、其父元素或其祖先元素中必须至少有一个元素拥有确定的宽度和高度，不能全都设置成`100%`，不然可能导致意料之外的问题。
