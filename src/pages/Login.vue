<template>
  <div class="text-center content-center">
    <Header title="Login" />
    <p class="mb-6" v-if="$user.value && $user.value.discord">
      <font-awesome-icon icon="check" class="mr-2"></font-awesome-icon> Connected using <b>Discord</b>
    </p>
    <p class="mb-6" v-else>
      <a :href="logins.discord" target="_blank" class="text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-md">
        <font-awesome-icon :icon="['fab', 'discord']" class="mr-2"></font-awesome-icon> Connect using <b>Discord</b>
      </a>
    </p>
    <p class="mb-6" v-if="$user.value && $user.value.github">
      <font-awesome-icon icon="check" class="mr-2"></font-awesome-icon> Connected using <b>GitHub</b>
    </p>
    <p class="mb-6" v-else>
      <a :href="logins.github" target="_blank" class="text-white bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-md">
        <font-awesome-icon :icon="['fab', 'github']" class="mr-2"></font-awesome-icon> Connect using <b>GitHub</b>
      </a>
    </p>
    <br>
    <p><b>Note:</b> Refresh the page if your profile is not updated.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import API from "../api";

import Header from "../components/Header.vue";

export default defineComponent({
  name: "Login",
  components: {
    Header
  },
  data() {
    return {
      logins: {
        discord: API.DiscordLogin,
        github: API.GithubLogin
      }
    }
  }
});
</script>