import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/Game',
        name: 'Game',
        component: Game,
        meta:  {
            title: 'Home'
        }
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;