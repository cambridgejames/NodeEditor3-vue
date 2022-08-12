<template>
  <div ref="detailPanel" class="detail-panel-container">
    <div class="detail-panel-element top" :style="`--height:${preConf.top}px`">
      <div class="title-bar">计算结果</div>
      <div class="contains-bar">
        <slot name="value"></slot>
      </div>
    </div>
    <div class="detail-panel-element bottom">
      <div class="title-bar">节点信息</div>
      <div class="contains-bar">
        <slot name="element"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NeDetailPanel",
  props: {
    top: {
      type: Number,
      required: false,
      default: 150
    }
  },
  setup(propsData) {
    const preConfParam = { ...propsData };
    const preConf = ref(preConfParam);
    return {
      preConf
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../../../css/index.scss";

.detail-panel-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .detail-panel-element {
    display: flex;
    flex-direction: column;

    &.top {
      height: var(--height);
      flex-shrink: 0;
    }

    &.bottom {
      height: 100%;
      margin-top: 6px;
    }

    .title-bar {
      height: 20px;
      flex-shrink: 0;
      padding: 3px 10px;
      color: white;
      font-size: 14px;
      line-height: 20px;
      overflow: hidden;
      background-color: $detail-title-background-color;
    }

    .contains-bar {
      height: 100%;
      margin-top: 6px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
