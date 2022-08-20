<template>
  <ne-base-node :x="nodePanelConf.x" :y="nodePanelConf.y" :title="nodePanelConf.title" :color="nodePanelConf.color"
                @ne-left-click="onNeLeftClick"
                @ne-right-click="onNeRightClick"></ne-base-node>
</template>

<script lang="ts">
import NeInputNodeIndex from "./js/index";
export default NeInputNodeIndex;
</script>
