<template>
  <div class="edit-base-container ne-edit">
      <div class="edit-base-element">{{ title }}</div>
      <div class="edit-base-element">
        <slot>
          <span>None</span>
        </slot>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NeEditBase",
  props: {
    title: {
      type: String,
      require: true,
      default: "标题"
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../css/index.scss";
@import "../../../css/edit.scss";

.edit-base-container {
  width: 100%;
  font-size: 14px;
  line-height: 20px;
}
</style>
