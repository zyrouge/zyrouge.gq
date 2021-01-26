<template>
  <div>
    <Header title="Profile" />
    <DetailedProfileInfo v-if="isMe" />
    <CommonProfileInfo v-else-if="userID" :userID="userID" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "../components/Header.vue";
import Loading from "../components/Loading.vue";
import CommonProfileInfo from "../components/CommonProfileInfo.vue";
import DetailedProfileInfo from "../components/DetailedProfileInfo.vue";

export default defineComponent({
  name: "Profile",
  components: {
    Header,
    Loading,
    CommonProfileInfo,
    DetailedProfileInfo
  },
  data() {
    const data: {
      isMe: boolean;
      userID: string | null;
    } = {
      isMe: false,
      userID: null
    };
    return data;
  },
  async mounted() {
    await this.makeUserInfo();
  },
  methods: {
    async makeUserInfo() {
      const id = this.$route.params.id;
      if (!id) return this.$notify.push({
        type: "error",
        message: "Invalid User ID"
      });
      if (typeof id === "string") {
        this.userID = id;
        this.isMe = id === "me";
      }
    }
  }
});
</script>