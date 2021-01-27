<template>
  <nav class="flex flex-row items-center justify-between py-6 px-8 pb-8">
    <div class="flex">
      <font-awesome-icon
        v-if="!isMenuOpen"
        icon="bars"
        class="text-red-500"
        id="nav-icon"
        @click="toggleMenu()"
      ></font-awesome-icon>
      <font-awesome-icon
        v-if="isMenuOpen"
        icon="times"
        class="text-red-500"
        id="nav-icon"
        @click="toggleMenu()"
      ></font-awesome-icon>

      <font-awesome-icon
        v-if="isDarkTheme"
        icon="moon"
        class="mx-5 text-red-500"
        id="nav-icon"
        @click="switchTheme()"
      ></font-awesome-icon>
      <font-awesome-icon
        v-if="!isDarkTheme"
        icon="sun"
        class="mx-5 text-red-500"
        id="nav-icon"
        @click="switchTheme()"
      ></font-awesome-icon>
    </div>

    <router-link to="/" class="text-red-500" id="navbar-logo"></router-link>

    <div class="bg-red-500 shadow-2xl" id="menu">
      <div class="py-5" id="menu-content">
        <p>
          <router-link class="text-gray-50" @click="minimizeMenu()" to="/"
            >Home</router-link
          >
        </p>
        <p v-if="$user.value">
          <router-link
            class="text-gray-50"
            @click="minimizeMenu()"
            to="/profile/me"
            >Profile</router-link
          >
        </p>
        <p>
          <router-link
            class="text-gray-50"
            @click="minimizeMenu()"
            to="/api/docs"
            >API</router-link
          >
        </p>
        <p>
          <a class="text-gray-50" @click="minimizeMenu()" href="/discord"
            >Discord</a
          >
        </p>
        <p>
          <a
            class="text-gray-50"
            @click="minimizeMenu()"
            href="/github"
            >GitHub</a
          >
        </p>
        <p>
          <a class="text-gray-50" @click="minimizeMenu()" href="/youtube"
            >YouTube</a
          >
        </p>
        <p>
          <a class="text-gray-50" @click="minimizeMenu()" href="/guides"
            >Guides</a
          >
        </p>
        <p v-if="!$user.value">
          <router-link class="text-gray-50" @click="minimizeMenu()" to="/login"
            >Login</router-link
          >
        </p>
        <p v-else>
          <a class="text-gray-50" @click="minimizeMenu()" href="/logout"
            >Logout</a
          >
        </p>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  data() {
    return {
      isDarkTheme: false,
      isMenuOpen: false,
      activeClass: "is-active",
    };
  },
  mounted() {
    this.loadTheme();
  },
  methods: {
    loadTheme() {
      const storedTheme = localStorage.getItem("theme");
      this.setTheme(storedTheme);
    },
    setTheme(theme: string | null) {
      if (!theme) {
        localStorage.removeItem("theme");
        document.querySelector("html")?.classList.remove("dark");
        this.isDarkTheme = false;
      } else {
        localStorage.setItem("theme", theme);
        document.querySelector("html")?.classList.add("dark");
        this.isDarkTheme = true;
      }
    },
    switchTheme() {
      const storedTheme = localStorage.getItem("theme");
      const lightTheme = "light";
      switch (storedTheme) {
        case lightTheme:
          this.setTheme(null);
          break;

        default:
          this.setTheme(lightTheme);
          break;
      }
    },
    toggleMenu() {
      const menu = document.getElementById("menu");
      const logo = document.getElementById("navbar-logo");
      if (!menu || !logo) return;
      this.isMenuOpen = !menu.classList.contains(this.activeClass);
      if (this.isMenuOpen) {
        menu.classList.add(this.activeClass);
        logo.classList.add(this.activeClass);
      } else {
        menu.classList.remove(this.activeClass);
        logo.classList.remove(this.activeClass);
      }
    },
    minimizeMenu() {
      this.toggleMenu();
    }
  },
});
</script>

<style scoped>
/* NavBar Logo */
#navbar-logo {
  font-size: 1.6rem;
  font-weight: bold;
  transition: 0.3s;
}

#navbar-logo::before {
  content: "Zyrouge Development";
}

@media screen and (max-width: 750px) {
  #navbar-logo::before {
    content: "ZDev";
  }
}

#navbar-logo.is-active {
  opacity: 0;
}

@media screen and (min-width: 750px) {
  #navbar-logo.is-active {
    opacity: 1;
    transform: translateX(-300px);
  }
}

/* Theme Icon */
#nav-icon {
  cursor: pointer;
  font-size: 2rem;
}

/* Burger */
#burger {
  width: 2.5rem;
  cursor: pointer;
}

#burger div {
  display: block;
  padding: 3px;
  margin: 3px 0;
  transition: 0.3s;
}

#burger.is-active div:nth-child(1) {
  transform: translateY(12px) rotate(45deg);
}

#burger.is-active div:nth-child(2) {
  opacity: 0;
}

#burger.is-active div:nth-child(3) {
  transform: translateY(-12px) rotate(-45deg);
}

/* Menu */
#menu {
  z-index: 69;
  position: fixed;
  top: 0;
  left: calc(100% + 300px);
  right: 0;
  bottom: 0;
  transition: 0.3s;

  text-align: right;
  font-size: 1rem;
  height: 100%;
}

#menu a,
#menu button {
  font-size: 1.5rem;
  font-weight: bold;
}

#menu.is-active {
  left: calc(100% - 300px);
}

#menu-content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  text-align: center;
  overflow-y: auto;
}

@media screen and (max-height: 350px) {
  #menu-content {
    display: block;
    justify-content: none;
  }
}
</style>