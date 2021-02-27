<template>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title",
  props: {
    title: String,
    suffix: {
        type: Boolean,
        default: true
    }
  },
  mounted() {
    if (this.title) {
        let title = this.title;
        if (this.suffix) title += " - ZDev";
        document.title = title;
    }
  }
});
</script>