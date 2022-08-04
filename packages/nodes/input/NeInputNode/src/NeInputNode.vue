<template>
  <g ref="ne-text" class="ne-node ne-text" :transform="`translate(${x},${y})`">
    <rect class="rect-content"></rect>
  </g>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../css/index.scss";

.rect-content {
  fill: #2DDE98;
  width: 120px;
  height: 240px;
  margin-left: 15px;
  line-height: 24px;
  outline: none;
  border: none;
}
</style>
