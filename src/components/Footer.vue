<template>
  <footer>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style="display: block"
      viewBox="0 120 1440 200"
    >
      <path
        fill="#ef4444"
        fill-opacity="1"
        d="M0,160L48,149.3C96,139,192,117,288,144C384,171,480,245,576,250.7C672,256,768,192,864,176C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
    <div class="text-center bg-red-500 text-gray-100 px-4">
      <div class="mx-8 pb-8 pt-6 md:pt-0">
        <p class="text-lg mb-2">&copy; Zyrouge Development — 2021</p>
        <div class="flex flex-row justify-center items-center pt-2 md:pt-0 text-xl">
          <a href="mailto:dev@zyrouge.gq"><font-awesome-icon icon="at"></font-awesome-icon></a>
          <p class="ml-3"><a href="/patreon"><font-awesome-icon :icon="['fab', 'patreon']"></font-awesome-icon></a></p>
          <p class="ml-3"><a href="/discord"><font-awesome-icon :icon="['fab', 'discord']"></font-awesome-icon></a></p>
          <p class="ml-3"><a href="/twitter"><font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon></a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer"
});
</script>
