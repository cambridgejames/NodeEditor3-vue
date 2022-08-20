<template>
  <NeEditText :title="title" @value-change="onChangeFunc" />
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";
import NeEditText from "@/edit/NeEditText";
import Configure from "./configure";

export default defineComponent({
  name: "NeInputDetail",
  components: {
    NeEditText
  },
  emits: {
    valueChange: null
  },
  setup(propsData, context: SetupContext) {
    const onChangeFunc = (...args: unknown[]): void => {
      context.emit("valueChange", ...args);
    };
    return {
      title: Configure.title,
      onChangeFunc
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
