<template>
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import {NMessageProvider, NButton} from "naive-ui";
export default defineComponent({
  name: "App",
  components: {NMessageProvider, NButton},
  setup(){
    return {}
  }
});
</script>

