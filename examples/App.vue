<template>
  <basic-usage/>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import BasicUsage from "./views/BasicUsage.vue";

export default defineComponent({
  components: {
    BasicUsage
  }
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>