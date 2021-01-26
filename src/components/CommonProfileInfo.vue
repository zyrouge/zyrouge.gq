<template>
  <div v-if="user" class="text-center">
    <div class="flex flex-col md:flex-row justify-evenly">
        <div class="flex flex-col justify-center items-center">
            <img class="rounded-full" width="250" height="250" :src="user.avatar" alt="User Avatar">
        </div>
        <div class="flex flex-col justify-center items-center mt-6 md:mt-0">
            <p class="text-3xl font-bold">{{ user.username }}</p>
            <p class="opacity-75">{{ user.id }}</p>
            <p class="opacity-75 mt-2">Created on: <span class="font-bold">{{ new Date(user.createdAt).toLocaleString() }}</span></p>
            <hr class="w-full opacity-30 my-4">
            <div class="flex flex-row">
              <Tippy :content="badge.name" v-for="badge in user.badges" :key="badge.thresh">
                <img class="w-12 h-12 mx-1" :src="getBadgeImgUrl(badge.url)" :alt="badge.name">
              </Tippy>
            </div>
        </div>
    </div>
  </div>
  <Loading icon="book-dead" message="Seems like no such user exists..." :dots="false" v-else-if="notSuchUser" />
  <Loading v-else />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import API, { IBasicUserInfo } from "../api";
import { getAxiosErrorMessage } from "../utils";

import Loading from "./Loading.vue";

export default defineComponent({
  name: "Profile",
  components: {
    Tippy,
    Loading
  },
  props: {
    userID: {
        type: String
    }
  },
  data() {
    const data: {
      user: IBasicUserInfo | null,
      notSuchUser: boolean
    } = {
      user: null,
      notSuchUser: false
    }
    return data;
  },
  async mounted() {
    if (this.userID) await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const { data } = await API.GetUserInfo(this.userID);
        this.user = data.userInfo;
      } catch (err) {
        if (err.response.status === 404) return this.notSuchUser = true;
        this.$notify.push({
          type: "error",
          message: `Couldn't fetch Profile due to ${getAxiosErrorMessage(err)}`
        });
      }
    },
    getBadgeImgUrl(url: string) {
      return `${API.BaseURL}${url}`;
    }
  }
});
</script>