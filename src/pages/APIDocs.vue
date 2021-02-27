<template>
  <div>
    <Header title="API Documentation" />
    <div v-if="docs">
      <p class="text-lg">Base URL: <span class="bg-gray-300 bg-opacity-20 rounded px-2 font-bold">{{ baseURL }}</span></p>
      <p class="text-lg">API Version: <span class="bg-gray-300 bg-opacity-20 rounded px-2 font-bold">v{{ docs.apiInfo.version }}</span></p>
      <p class="text-lg mb-2">Generated at: <span class="bg-gray-300 bg-opacity-20 rounded px-2 font-bold">{{ new Date(docs.apiInfo.generator.time).toLocaleString() }}</span></p>
      <p class="font-bold text-2xl">API Plans - <a href="/patreon" target="_blank" class="text-red-400">Buy now!</a></p>
      <div class="overflow-x-auto">
        <table class="table-auto w-full mt-2">
        <thead>
          <tr class="border-b border-white border-opacity-10">
            <th>Tier</th>
            <th>Plan</th>
            <th>Role</th>
            <th>Max. Requests</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="([name, plan]) in Object.entries(docs.plans)" :key="plan">
            <td class="text-center">{{ plan.tier }}</td>
            <td class="text-center capitalize">{{ name }}</td>
            <td class="text-center text-indigo-400 font-mono">{{ plan.role ? `&lt;@${plan.role}&gt;` : "@everyone" }}</td>
            <td class="text-center"><b>{{ plan.maxRequests }}</b> requests in <b>{{ plan.requestInterval / 1000 / 60 }}</b> min</td>
          </tr>
        </tbody>
      </table>
      </div>
      <br>
      <div class="flex flex-row justify-between">
        <p class="font-bold text-2xl mb-2">Endpoints</p>
        <div>
          <p class="flex flex-row items-center">
            <input type="checkbox" class="mr-2 h-4 w-4" @click="toggleShowNsfw()" :checked="!showNsfw"> Hide NSFW
          </p>
        </div>
      </div>
      <div v-for="ep in docs.docs" :key="ep">
        <div v-if="ep.name.includes('NSFW') ? showNsfw : true" class="bg-gradient-to-r from-indigo-700 to-purple-500 rounded-md px-5 py-3 text-white mb-4">
          <div class="flex flex-row justify-between">
            <p><span class="bg-white text-blue-700 uppercase px-1 rounded-sm mr-2 font-semibold">{{ ep.type }}</span>{{ ep.name.replace(/_/g, " ").replace(/(\(|\[)NSFW(\)|\])/g, "") }}</p>
            <p><span class="hidden md:inline">{{ baseURL }}</span>{{ ep.url }}</p>
          </div>
          <div v-if="ep.parameter && ep.parameter.fields && ep.parameter.fields['Parameter']">
            <hr class="my-2 opacity-30">
            <p class="font-bold mt-1">Parameters</p>
            <p v-for="param in ep.parameter.fields['Parameter']" :key="param">
              <font-awesome-icon icon="angle-right" class="mr-2"></font-awesome-icon><span v-html="getAPIField(param)"></span>
            </p>
          </div>
          <div v-if="ep.success && ep.success.fields && ep.success.fields['Success 200']">
            <hr class="my-2 opacity-30">
            <p class="font-bold mt-1">Response [JSON]</p>
            <p v-for="param in ep.success.fields['Success 200']" :key="param">
              <font-awesome-icon icon="angle-right" class="mr-2"></font-awesome-icon><span v-html="getAPIField(param)"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import API, { IAPIDocsResponse } from "../api";
import { getAxiosErrorMessage } from "../utils";

import Header from "../components/Header.vue";
import Loading from "../components/Loading.vue";

export default defineComponent({
  name: "API Documentation",
  components: {
    Header,
    Loading
  },
  async mounted() {
    try {
      await this.getAPIDocs();
    } catch (err) {
      this.$notify.push({
        type: "error",
        message: `Could not fetch API Docs due to ${getAxiosErrorMessage(err)}`
      });
    }
  },
  data() {
    const data: {
      docs: IAPIDocsResponse | null;
      baseURL: string;
      showNsfw: boolean;
    } = {
      docs: null,
      baseURL: API.APIBase,
      showNsfw: false
    };
    return data;
  },
  methods: {
    async getAPIDocs() {
      const res = await API.GetAPIDocs();
      this.docs = res.data;
    },
    stripHTML(html: string) {
      return html.replace(/(<([^>]+)>)/gi, "");
    },
    getAPIField(param: any) {
      let string = `<span class="font-mono bg-indigo-500 rounded px-1 bg-opacity-50">${param.field}</span> ${param.type}`;
      if (param.description) string += ` - <span class="font-bold">${this.stripHTML(param.description)}</span>`;
      return string;
    },
    toggleShowNsfw() {
      this.showNsfw = !this.showNsfw;
    }
  }
});
</script>