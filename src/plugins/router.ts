import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Logout from "../pages/Logout.vue";
import APIDocs from "../pages/APIDocs.vue";
import Profile from "../pages/Profile.vue";
import Redirect from "../pages/Redirect.vue";
import Page404 from "../pages/404.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/logout", component: Logout },
    { path: "/api/docs", component: APIDocs },
    { path: "/profile/:id", component: Profile },

    /* Redirects */
    getRedirectComponents("/discord", "https://discord.gg/8KV5zCg"),
    getRedirectComponents("/patreon", "https://www.patreon.com/zyrouge"),

    /* Error Pages */
    { path: '/:pathMatch(.*)*', component: Page404 }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;

function getRedirectComponents(from: string, to: string): RouteRecordRaw {
    return {
        path: from,
        component: Redirect,
        props: {
            url: to
        }
    }
}