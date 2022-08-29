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
        nid: "f07edd03-6bc2-401d-bdae-4c08191a6873",
        name: "NeInputNode",
        transform: {
          x: 100,
          y: 50
        },
        date: "测试节点1"
      },
      {
        nid: "ecb6b328-66a0-4e10-af38-d8c8d9fcecb6",
        name: "NeInputNode",
        transform: {
          x: -220,
          y: -90
        },
        date: "测试节点2"
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
