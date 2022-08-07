<template>
  <g ref="nodePanel" class="ne-node ne-text" :style="`--width: ${nodePanelConf.width}px; --height: ${nodePanelConf.height}px;`"
     :transform="`translate(${nodePanelConf.x},${nodePanelConf.y})`"
     @mousedown.left.stop.prevent>
    <rect class="background" :x="-0.5" :y="-0.5"></rect>
    <g ref="input-title-group" class="title-group">
      <rect ref="text-title-back" class="title-back text-title-back"></rect>
      <text ref="text-title-text" class="title-text" x="4" y="14">{{ nodePanelConf.title }}</text>
      <circle ref="output-point" class="output-point" :cx="nodePanelConf.width - 6" cy="10" r="4"></circle>
    </g>
    <g ref="input-footer-group" class="footer-group" :transform="`translate(0,${nodePanelConf.height - 20})`">
      <rect class="resize" :x="nodePanelConf.width - 10" :y="10" :width="10" :height="10"
            @mousedown.left.stop.prevent="MouseEventProcessor.onResizeDown"></rect>
      <ne-comp-svg type="resize" class="resize" :x="nodePanelConf.width - 20" :width="20" :height="20"></ne-comp-svg>
    </g>
  </g>
</template>

<script lang="ts">
import NeInputNodeIndex from "./js/index";
export default NeInputNodeIndex;
</script>

<style lang="scss" scoped>
@import "../../../../css/index.scss";

.ne-text {
  width: 120px;
  height: 240px;

  .title-group {
    .text-title-back {
      fill: $node-title-input;
    }
  }
}
</style>
