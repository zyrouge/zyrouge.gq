<template>
  <main>
    <NavBar />
    <div class="container mx-auto" id="main">
      <transition name="fade">
        <router-view class="text-gray-800 dark:text-gray-50 py-6 px-8" />
      </transition>
    </div>
    <Notification />
    <Footer />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import Title from "./components/Title.vue";
import Notification from "./components/Notification.vue";

import API, { getUserInfo } from "./api";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    Footer,
    Notification,
    Title
  },
  async mounted() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const user = getUserInfo((await API.GetBasicInfo()).data); // store.getUser()
        if (user) this.$user.value = user.user;
      } catch (err) {
        if (!err.response) this.$notify.push({
          type: "error",
          message: `Cannot fetch user information due to ${err}`
        });
      }
    },
  },
});
</script>