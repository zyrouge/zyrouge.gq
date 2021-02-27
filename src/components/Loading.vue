<template>
  <div class="text-center">
    <font-awesome-icon :icon="icon" class="mr-2 text-9xl"></font-awesome-icon>
    <p class="text-lg font-bold mt-3">{{ sentence }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    message: {
      type: String,
      default: "Preparing a secret solution, please wait"
    },
    icon: {
      type: String,
      default: "hat-wizard"
    },
    dots: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sentence: `${this.message}${this.dots ? "." : ""}`
    }
  },
  mounted() {
    this.makeMessage();
  },
  methods: {
    makeMessage() {
        if (this.dots !== true) return;
        let count = 0;
        const inc = () => count > 2 ? count = 0 : count++;
        setInterval(() => {
            inc();
            this.sentence = `${this.message}${".".repeat(count)}`;
        }, 1000);
    }
  }
});
</script>