<template>
  <g ref="ne-text" class="ne-node ne-text" :style="`--width: ${nodePanelConf.width}px; --height: ${nodePanelConf.height}px;`"
     :transform="`translate(${nodePanelConf.x},${nodePanelConf.y})`">
    <rect class="background" :transform="`translate(-0.5, -0.5)`"></rect>
    <g ref="input-title-group" class="title-group">
      <rect ref="text-title-back" class="title-back text-title-back"></rect>
      <text ref="text-title-text" class="title-text" x="4" y="14">{{ nodePanelConf.title }}</text>
      <circle ref="output-point" class="output-point" :cx="nodePanelConf.width - 6" cy="10" r="4"></circle>
    </g>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NeInputNode",
  components: {},
  props: {
    x: {
      type: Number,
      default: 0,
      required: true
    },
    y: {
      type: Number,
      default: 0,
      required: true
    }
  },
  setup(propsData) {
    const nodePanelConf = ref({
      x: propsData.x,
      y: propsData.y,
      width: 120,
      height: 40,
      title: "输入"
    });
    return {
      nodePanelConf
    };
  }
});
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
