<template>
  <Title v-if="title" :title="title" />
  <div class="text-center mb-4" id="header">
    <h1 class="text-3xl font-bold">{{ title }}</h1>
  </div>
  <hr class="mb-8 border-red-500">
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Title from "./Title.vue";

export default defineComponent({
  name: "Header",
  components: {
    Title
  },
  props: {
    title: String
  }
});
</script>