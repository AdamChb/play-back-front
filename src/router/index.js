import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: 'jeu',
    name: 'Jeu',
    component: JeuView
  },
  {
    path: 'evenement',
    name: 'Evenement',
    component: EvenementView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
