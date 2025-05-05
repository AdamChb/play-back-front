import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: 'game',
    name: 'Game',
    component: GameView
  },
  {
    path: 'event',
    name: 'Event',
    component: EventView
  },
  {
    path: 'register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: 'myaccount',
    name: 'Myaccount',
    component: MyAccountView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
