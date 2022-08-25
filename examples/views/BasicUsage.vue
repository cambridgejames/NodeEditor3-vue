<template>
  <ne-panel :init="init"/>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BasicUsage",
  components: {},
  setup() {
    const init = ref([
      {
        nId: "f07edd03-6bc2-401d-bdae-4c08191a6873",
        name: "NeInputNode",
        transform: {
          x: 100,
          y: 50
        }
      }
    ]);
    return {
      init
    };
  }
});
</script>

<style scoped>

</style>
