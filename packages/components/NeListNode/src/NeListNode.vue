<template>
  <div ref="neListNode" class="list-node-container none-selective" :style="`--color:${configureData.color}`">
    <span>{{ configureData.title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Configure } from "@/js/interface/node/Configure";

export default defineComponent({
  name: "NeListNode",
  props: {
    node: {
      type: Object as PropType<Configure>,
      require: true
    }
  },
  setup(propsData) {
    const nodeData = { ...propsData.node } as Configure;
    const configureData = ref<Configure>(nodeData);
    return {
      configureData
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../../../css/index.scss";

.list-node-container {
  width: calc(100% - 2px);
  height: 20px;
  background-color: $node-background-color;
  border: 1px solid $detail-title-background-color;
  position: relative;

  span {
    margin-left: 22px;
    font-size: 14px;
    line-height: 20px;
    display: block;

    &:before {
      width: 18px;
      height: 18px;
      position: absolute;
      top: 1px;
      left: 1px;
      display: inline-block;
      content: "";
      background-color: var(--color);
    }
  }

  &:not(:first-child) {
    margin-top: 6px;
  }
}
</style>
