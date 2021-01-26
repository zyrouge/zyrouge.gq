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
    <div class="text-center bg-red-500 text-gray-100">
      <h3 class="text-xl font-bold">Contact Us</h3>
      <p><a href="mailto:dev@zyrouge.gq">dev@zyrouge.gq</a></p>

      <hr class="border-gray-100 mx-4 my-6 opacity-30" />
      <p class="pb-6">Zyrouge Development &copy; 2020</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer"
});
</script>