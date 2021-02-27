import { createApp, reactive, ref } from "vue";
import { RouteLocation } from "vue-router";

import Router from "./plugins/router";

import App from "./App.vue";
import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faBars, faTimes, faInfo, faCheck, faExclamation, faHatWizard, faAngleRight, faRedoAlt, faTrash, faPencilAlt, faBookDead, faUserSlash, faRunning, faAt } from "@fortawesome/free-solid-svg-icons";
import { faSadTear, faDizzy } from "@fortawesome/free-regular-svg-icons";
import { faDiscord, faGithub, faTwitter, faPatreon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { UserInfo } from "./api";

library.add(
    faSun, 
    faMoon, 
    faBars, 
    faTimes, // cross mark
    faInfo, 
    faCheck, // tick mark
    faExclamation, 
    faDiscord, 
    faGithub, 
    faHatWizard, 
    faAngleRight, // right arrow small
    faRedoAlt, // retry
    faTrash,
    faPencilAlt, // pencil
    faBookDead, 
    faUserSlash,
    faRunning,
    faSadTear, // sad cry,
    faDizzy, // dead guy,
    faTwitter,
    faPatreon,
    faAt
);

const Notification = reactive<{
    type: "info" | "success" | "warn" | "error";
    message: string;
}[]>([]);

const UserInfo = ref<UserInfo | null>(null);

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $router: typeof Router;
        $route: RouteLocation;
        $notify: typeof Notification;
        $user: typeof UserInfo;
    }
}

const app = createApp(App);

app.config.globalProperties.$notify = Notification;
app.config.globalProperties.$user = UserInfo;

app.use(Router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");