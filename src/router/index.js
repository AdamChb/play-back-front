import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import GameView from "../views/GameView.vue";
import EventView from "../views/EventView.vue";
import EventsView from "../views/EventsView.vue";
import RegisterView from "../views/RegisterView.vue";
import MyAccountView from "../views/MyAccountView.vue";
import GamesView from "../views/GamesView.vue";
import CafeView from "../views/CafeView.vue";
import AccountView from "../views/AccountView.vue";
import CreateEventView from "../views/CreateEventView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/cafe",
    name: "Cafe",
    component: CafeView,
  },
  {
    path: "/game",
    name: "Game",
    component: GameView,
    meta: { requiresAuth: true }
  },
  {
    path: "/event",
    name: "Event",
    component: EventView,
    meta: { requiresAuth: true }
  },
  {
    path: "/events",
    name: "Events",
    component: EventsView,
    meta: { requiresAuth: true }
  },
  {
    path: "/games",
    name: "Games",
    component: GamesView,
    meta: { requiresAuth: true }
  },
  {
    path: "/myaccount",
    name: "Account",
    component: AccountView,
    meta: { requiresAuth: true }
  },
  {
    path: "/game/:id",
    name: "GameView",
    component: GameView,
    props: true,
    meta: { requiresAuth: true }
  },
  { 
    path:'/events/create', 
    name:'CreateEvent', 
    component:CreateEventView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 🚫 Protection d'accès
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isPublic = !to.meta.requiresAuth;

  if (!isPublic && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
