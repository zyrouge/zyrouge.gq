<template>
  <div class="mt-5">
    <Loading v-if="failed" :icon="['far', 'sad-tear']" message="Magic didn't work for some reason" dots="false" />
    <Loading v-else icon="running" message="Redirecting you to the right place" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Loading from "../components/Loading.vue";

export default defineComponent({
  name: "Redirect",
  props: {
    url: {
      type: String
    }
  },
  components: {
    Loading
  },
  data() {
    return {
      failed: false
    }
  },
  mounted() {
    this.redirect();
  },
  methods: {
    redirect() {
      if (!this.url) this.failed = true;
      else location.href = this.url;
    }
  }
});
</script>