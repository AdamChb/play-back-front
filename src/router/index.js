import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import GameView from "../views/GameView.vue";
import EventView from "../views/EventView.vue";
import EventsView from "../views/EventsView.vue";
import RegisterView from "../views/RegisterView.vue";
import GamesView from "../views/GamesView.vue";
import CafeView from "../views/CafeView.vue";
import AccountView from "../views/AccountView.vue";
import AdminView from "@/views/AdminView.vue";

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
  },
  {
    path: "/event",
    name: "Event",
    component: EventView,
  },
  {
    path: "/events",
    name: "Events",
    component: EventsView,
  },
  {
    path: "/games",
    name: "Games",
    component: GamesView,
  },
  {
    path: "/myaccount",
    name: "Account",
    component: AccountView,
    meta: { requiresAuth: true },
  },
  {
    path: "/game/:id",
    name: "GameView",
    component: GameView,
    props: true,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
  },
  {
    path: '/events/:id',
    name: 'EventView',
    component: () => import('@/views/EventView.vue'),
    props: true  
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
