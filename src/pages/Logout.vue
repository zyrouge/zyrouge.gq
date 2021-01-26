<template>
  <div class="text-center content-center">
    <Header title="Logout" />
    <div v-if="$user.value">
      <p class="text-xl font-bold">Are you sure about logging out?</p>
      <div class="flex flex-row justify-center mt-2">
        <button class="bg-green-500 font-bold px-8 py-2 mx-1 rounded-lg text-white" @click="logOut()">Yes</button>
        <button class="bg-red-500 font-bold px-8 py-2 mx-1 rounded-lg text-white" @click="goBack()">No</button>
      </div>
    </div>
    <Loading icon="user-slash" message="You haven't logged in yet!" :dots="false" v-else />
    <br>
    <p><b>Note:</b> Refresh the page if your profile is not updated.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import API from "../api";
import { getAxiosErrorMessage } from "../utils";

import Header from "../components/Header.vue";
import Loading from "../components/Loading.vue";

export default defineComponent({
  name: "Logout",
  components: {
    Header,
    Loading
  },
  methods: {
    async logOut() {
      try {
        await API.Client.get(API.Logout);
        location.href = "/";
      } catch (err) {
        this.$notify.push({
          type: "error",
          message: `Couldn't fetch Profile due to ${getAxiosErrorMessage(err)}`
        });
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
});
</script>