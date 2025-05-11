import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import GameView from "../views/GameView.vue";
import EventView from "../views/EventView.vue";
import RegisterView from "../views/RegisterView.vue";
import MyAccountView from "../views/MyAccountView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: '/game',
    name: 'Game',
    component: GameView
  },
  {
    path: '/event',
    name: 'Event',
    component: EventView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/myaccount',
    name: 'Myaccount',
    component: MyAccountView
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
