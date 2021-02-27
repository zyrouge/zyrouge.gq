<template>
  <div v-if="user">
    <div class="flex flex-col md:flex-row justify-evenly mb-12">
        <div class="flex flex-col justify-center items-center">
          <img class="rounded-full" width="250" height="250" :src="user.details.avatar" alt="User Avatar">
        </div>
        <div class="flex flex-col justify-center items-center mt-6 md:mt-0">
          <p class="text-3xl">
            <input class="font-bold bg-transparent text-center outline-none" type="text" v-model="user.details.username" :readonly="!editing">
            <button v-if="editing" @click="save()">
              <font-awesome-icon class="text-2xl text-green-500" icon="check"></font-awesome-icon>
            </button>
            <button v-else @click="toggleEditing()">
              <font-awesome-icon class="text-2xl text-red-500" icon="pencil-alt"></font-awesome-icon>
            </button>
          </p>
          <p class="opacity-75">{{ user.details.userID }}</p>
          <p class="opacity-75 mt-2">Created on: <span class="font-bold">{{ new Date(user.details.createdAt).toLocaleString() }}</span></p>
          <hr class="w-full opacity-30 my-4">
          <div class="flex flex-row">
            <Tippy :content="badge.name" v-for="badge in user.details.badges" :key="badge.thresh">
              <img class="w-12 h-12 mx-1" :src="getBadgeImgUrl(badge.url)" :alt="badge.name">
            </Tippy>
          </div>
        </div>
    </div>
    <div class="flex flex-row justify-center items-center mb-4" v-if="!user.user.github || !user.user.discord">
      <p class="mr-2">Connect your</p>
      <a class="mr-2 text-3xl hover:text-gray-300" v-if="!user.user.github" href="/login"><font-awesome-icon :icon="['fab', 'github']" class="mr-2"></font-awesome-icon></a>
      <a class="text-3xl hover:text-indigo-300" v-if="!user.user.discord" href="/login"><font-awesome-icon :icon="['fab', 'discord']" class="mr-2"></font-awesome-icon></a>
    </div>
    <div :class="gradiantBox">
      <div :class="gradiantChildOne">
        API
      </div>
      <div :class="gradiantChildTwo">
        <div class="flex flex-col md:flex-row justify-between">
          <p>
            <span class="bg-white text-red-600 px-1 rounded font-bold mr-2">Tier {{ user.user.plan.tier }}</span>{{ user.user.plan.name.charAt(0).toUpperCase() + user.user.plan.name.slice(1) }}
          </p>
          <p>Max. <b>{{ user.user.plan.maxRequests }}</b> every <b>{{ user.user.plan.requestInterval / 1000 / 60 }}</b> min.</p>
        </div>
        <hr class="my-2 opacity-40">
        <p class="mb-2 md:mb-0">API Token: <span class="font-bold bg-gray-400 bg-opacity-20 px-1 rounded break-all">{{ user.user.api.token || "-" }}</span></p>
        <p class="mb-2">Used <b>{{ user.details.api.currentRequests.count }}</b> req. out of <b>{{ user.details.api.currentRequests.remaining }}</b> which was started at <b>{{ user.details.api.currentRequests.startTime ? new Date(user.details.api.currentRequests.startTime).toLocaleString() : "-" }}</b> that resets at <b>{{ user.details.api.currentRequests.resetAt ? new Date(user.details.api.currentRequests.resetAt).toLocaleString() : "-" }}</b></p>
        <p>
          <button class="text-red-400 mr-4" @click="regenToken()"><font-awesome-icon icon="redo-alt"></font-awesome-icon> Regenerate Token</button>
          <button class="text-red-400" @click="resetToken()"><font-awesome-icon icon="trash"></font-awesome-icon> Reset Token</button>
        </p>
      </div>
    </div>
    <br>
    <div v-if="user.user.discord" :class="gradiantBox">
      <div :class="gradiantChildOne">
        Discord
      </div>
      <div :class="gradiantChildTwo">
        <p class="text-xl font-bold">{{ user.user.discord.username }} <span class="opacity-50">#{{ user.user.discord.discrim }}</span></p>
        <p class="text-sm opacity-50">ID: {{ user.user.discord.id }}</p>
        <hr class="my-2 opacity-40">
        <p>
          <span class="mr-3">Level: <b class="text-red-400">{{ user.user.level?.level || "0" }}</b></span>
          <span class="mr-3">Points: <b class="text-red-400">{{ user.user.level?.points || "0" }}</b></span>
          <a class="text-red-400 font-bold" v-if="!user.user.inServer" href="/discord">Join our Discord Server</a>
        </p>
      </div>
    </div>
    <br>
    <div v-if="user.user.github" :class="gradiantBox">
      <div :class="gradiantChildOne">
        GitHub
      </div>
      <div :class="gradiantChildTwo">
        <p class="text-xl font-bold">{{ user.user.github.dispname }} <span class="opacity-50">- {{ user.user.github.username }}</span></p>
        <p class="text-sm opacity-50">ID: {{ user.user.github.id }}</p>
        <hr class="my-2 opacity-40">
        <p>
          Nothing much :)
        </p>
      </div>
    </div>
    <br>
  </div>
  <Loading v-else />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import API, { IDetailedInfo, IEditableUserInfo } from "../api";
import { getAxiosErrorMessage } from "../utils";

import Loading from "./Loading.vue";

export default defineComponent({
  name: "Profile",
  components: {
    Tippy,
    Loading
  },
  data() {
    const data: {
      user: IDetailedInfo | null,
      cachedUser: IDetailedInfo | null,
      editing: boolean;
      gradiantBox: string[];
      gradiantChildOne: string[];
      gradiantChildTwo: string[];
    } = {
      user: null,
      cachedUser: null,
      editing: false,
      gradiantBox: ["flex", "flex-col", "md:flex-row", "w-full", "rounded-lg", "overflow-hidden", "shadow-md"],
      gradiantChildOne: ["flex", "flex-col", "justify-center", "items-center", "bg-gradient-to-r", "from-pink-600", "to-red-500", "text-white", "w-full", "md:w-1/4", "text-2xl", "font-bold", "py-4", "md:py-10", "md:min-w-1/4"],
      gradiantChildTwo: ["flex-grow", "bg-gray-200", "dark:bg-gray-800", "text-dark", "dark:text-white", "px-4", "py-2", "md:min-w-3/4", "md:break-words", "text-center", "md:text-left"]
    }
    return data;
  },
  async mounted() {
    await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const { data } = await API.GetDetailedInfo();
        this.user = data;
        this.updateCache();
      } catch (err) {
        if (err.response.status === 401) return this.$router.push("/login");
        this.$notify.push({
          type: "error",
          message: `Couldn't fetch Profile due to ${getAxiosErrorMessage(err)}`
        });
      }
    },
    updateCache() {
      this.cachedUser = JSON.parse(JSON.stringify(this.user)) as any;
    },
    getBadgeImgUrl(url: string) {
      return `${API.BaseURL}${url}`;
    },
    async regenToken() {
      try {
        await API.ChangeAPIKey();
        this.$notify.push({
          type: "success",
          message: "Regenerated token"
        });
      } catch (err) {
        this.$notify.push({
          type: "error",
          message: `Couldn't reset the token due to ${getAxiosErrorMessage(err)}`
        });
      }
    },
    async resetToken() {
      try {
        await API.RemoveAPIKey();
        this.$notify.push({
          type: "success",
          message: "Resetted token"
        });
      } catch (err) {
        this.$notify.push({
          type: "error",
          message: `Couldn't regenerate token due to ${getAxiosErrorMessage(err)}`
        });
      }
    },
    toggleEditing() {
      this.editing = !this.editing;
    },
    async save() {
      const changes: IEditableUserInfo = {};
      if (this.user && this.cachedUser) {
        if (this.user.details.username !== this.cachedUser.details.username) changes.username = this.user.details.username;
      }
      if (Object.keys(changes).length === 0) return this.$notify.push({
        type: "warn",
        message: "There are zero changes to save"
      });
    
      try {
        await API.UpdateInfo(changes);
        this.$notify.push({
          type: "success",
          message: "Changes has been saved"
        });
        this.editing = false;
      } catch (err) {
        this.$notify.push({
          type: "error",
          message: `Couldn't save changes due to ${getAxiosErrorMessage(err)}`
        });
      }

      await this.fetchProfile();
    }
  }
});
</script>