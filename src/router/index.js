import { createRouter, createWebHistory } from 'vue-router'
import FlightsMain from '../views/FlightsMain.vue'

const routes = [
  {
    path: '/',
    name: 'FlightsMain',
    component: FlightsMain
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
