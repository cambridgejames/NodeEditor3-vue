<template>
  <div ref="ne-panel" class="ne-panel">
    Ne Panel Test
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ne-panel"
});
</script>

<style lang="scss" scoped>
.ne-panel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
