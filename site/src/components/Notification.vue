<template>
  <div v-if="$notify.length" id="notification-box">
    <div id="notification-wrap">
      <div v-for="noti in $notify" :key="noti" :class="getNotiStyle(noti.type)" id="notification-tab" @click="hide(noti)">
        <font-awesome-icon :icon="getIcon(noti.type)" class="mr-2"></font-awesome-icon> {{ noti.message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Notification",
  methods: {
    getNotiStyle(type: string) {
      const classes: string[] = ["text-white", "shadow-lg"];
      switch (type) {
        case "success":
          classes.push("bg-green-400", "check");
          break;
          
        case "warn":
          classes.push("bg-yellow-400", "exclamation");
          break;
          
        case "error":
          classes.push("bg-pink-500", "times");
          break;
      
        default:
          classes.push("bg-blue-500", "info");
          break;
      }
      return classes;
    },
    getIcon(type: string) {
      if (type === "success") return "check";
      else if (type === "warn") return "exclamation";
      else if (type === "error") return "times";
      else return "info";
    },
    hide(noti: any) {
      this.$notify.splice(this.$notify.indexOf(noti), 1);
    }
  }
});
</script>

<style>
#notification-box {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  max-width: 85%;
}

#notification-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#notification-tab {
  margin-top: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  width: fit-content;
}
</style>