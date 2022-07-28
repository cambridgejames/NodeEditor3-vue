<template>
  <ne-panel />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BasicUsage",
  components: {},
  setup() {
    const initStr = "[{\"name\":\"NeInputNode\",\"transform\":{\"x\":100,\"y\":50}}]";
    const init = ref(JSON.parse(initStr));
    return {
      init
    };
  }
});
</script>

<style scoped>

</style>
