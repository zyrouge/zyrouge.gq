<template>
  <div class="text-center content-center">
    <Title title="Home" />
    <img class="shadow-lg" src="../assets/zdev.png" alt="Logo" id="home-page-logo" />
    <h1 class="text-3xl font-bold mt-6">Greetings!</h1>

    <hr class="border-red-500 border my-6" />

    <h1 class="text-2xl font-bold">Who are we?</h1>
    <p>Small Community of Developers.</p>

    <h1 class="text-2xl font-bold mt-6">What do we do?</h1>
    <p>
      We make
      <a class="text-red-500" href="https://discord.com">Discord Bots</a>,
      <a class="text-red-500" href="https://npmjs.com">NPM Packages</a>,
      <a class="text-red-500" href="https://blog.zyrouge.gq">Guides</a> and
      <a class="text-red-500" href="/youtube">YouTube Tutorials</a>!
    </p>

    <h1 class="text-2xl font-bold mt-6">Make my day!</h1>
    <p>
      Help me buy a coffee by becoming a
      <a class="text-red-500" href="https://patreon.com/zyrouge">Patron</a>!
    </p>

    <h1 class="text-2xl font-bold mt-6">Need help?</h1>
    <p>Join our <a class="text-red-500" href="/discord">Discord Server</a>!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Title from "../components/Title.vue";

export default defineComponent({
  name: "Home",
  components: {
    Title
  }
});
</script>

<style>
#home-page-logo {
  border-radius: 50%;
  max-width: 250px;
  height: auto;
  margin: 0 auto;
}
</style>