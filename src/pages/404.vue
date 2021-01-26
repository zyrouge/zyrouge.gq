<template>
  <div>
    <Header title="404 - Not found" />
    <Loading class="mt-5" :icon="['far', 'dizzy']" message="Wizards are on a trip to the Fantasy world" :dots="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "../components/Header.vue";
import Loading from "../components/Loading.vue";

export default defineComponent({
  name: "Redirect",
  components: {
    Header,
    Loading
  }
});
</script>