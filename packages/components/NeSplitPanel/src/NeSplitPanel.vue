<template>
  <div ref="neSplitPanel" class="split-panel-content"
       @showleft.stop.prevent
       @hideleft.stop.prevent
       @showright.stop.prevent
       @hideright.stop.prevent>
    <div ref="leftPanel" class="split-panel-slot left" :style="`--left:${preConf.left}px`">
      <slot name="left"></slot>
    </div>
    <div ref="centerPanel" class="split-panel-slot center" :style="`--center:${preConf.center}px`">
      <slot name="center"></slot>
    </div>
    <div ref="rightPanel" class="split-panel-slot right" :style="`--right:${preConf.right}px`"
         @mousedown.left.stop.prevent="MouseEventProcessor.onRightResize">
      <div class="right-box" @mousedown.left.stop>
        <slot name="right" @mousedown.left.stop></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getMouseEventProcessor } from "@/components/NeSplitPanel/src/js/event/mouseEventProcessor";

export default defineComponent({
  name: "NeSplitPanel",
  props: {
    left: {
      type: Number,
      default: 300,
      required: false
    },
    center: {
      type: Number,
      default: 300,
      required: false
    },
    right: {
      type: Number,
      default: 500,
      required: false
    }
  },
  setup(propsData) {
    const neSplitPanel = ref<HTMLElement>();
    const leftPanel = ref<HTMLElement>();
    const rightPanel = ref<HTMLElement>();
    const preConfParam = { ...propsData };
    const preConf = ref(preConfParam);
    const MouseEventProcessor = getMouseEventProcessor(preConf, neSplitPanel, leftPanel, rightPanel);
    return {
      neSplitPanel,
      leftPanel,
      rightPanel,
      preConf,
      MouseEventProcessor
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../../../css/index.scss";

.split-panel-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  div.split-panel-slot {
    height: 100%;

    &.left {
      width: var(--left);
      flex-shrink: 0;
      overflow: hidden auto;
    }

    &.center {
      width: 100%;
      min-width: var(--center);
      overflow: hidden;
    };

    &.right {
      width: var(--right);
      min-width: 50px;
      flex-shrink: 0;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      background-color: $node-background-color;
      pointer-events: none;
      padding: 6px 0;

      &:before {
        width: 6px;
        flex-shrink: 0;
        content: "";
        cursor: ew-resize;
        pointer-events: auto;
      }

      .right-box {
        display: block;
        width: 100%;
        height: calc(100% - 12px);
        overflow: hidden auto;
        pointer-events: auto;
      }

      &:after {
        width: 6px;
        flex-shrink: 0;
        content: "";
        cursor: ew-resize;
        pointer-events: none;
      }
    }
  }
}
</style>
