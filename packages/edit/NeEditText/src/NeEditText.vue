<template>
  <ne-edit-base :title="title">
    <input class="edit-text-container" type="text" :placeholder="placeHolder" v-model="contentValue" @input="onChangeFunc"/>
  </ne-edit-base>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from "vue";
import NeEditBase from "@/edit/NeEditBase";

export default defineComponent({
  name: "NeEditText",
  components: {
    NeEditBase: NeEditBase
  },
  props: {
    title: {
      type: String,
      require: true,
      default: "输入"
    },
    placeHolder: {
      type: String,
      require: false,
      default: ""
    },
    value: {
      type: String,
      require: true,
      default: ""
    }
  },
  emits: {
    valueChange: null
  },
  setup(propsData, context: SetupContext) {
    const contentValue = ref(propsData.value);
    const onChangeFunc = (): void => {
      context.emit("valueChange", contentValue.value);
    };
    return {
      contentValue,
      onChangeFunc
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../../../css/index.scss";
@import "../../../css/edit.scss";

.edit-text-container {
  box-sizing: border-box;
  width: 100%;
  height: $ne-edit-line-height;
  border: 1px solid $default-border-color;
  border-radius: $border-radius;
  padding: 0 10px;
  outline: none;
  background-color: $text-background-color;
  color: $text-color;

  &:focus {
    border: 1px solid $active-border-color;
  }
}
</style>
