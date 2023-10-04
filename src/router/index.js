import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '../views/TheHome.vue'
import SignupPage from '../views/SignupPage.vue'
import LoginPage from '../views/LoginPage.vue'

import TheCarousel from '../components/TheCarousel.vue'
import TheEvent from '../views/TheEvent.vue'
import TheAdmin from '../views/TheAdmin.vue'
import TheCard from '../components/TheCard.vue'
import TodaysEvent from '../components/TodaysEvent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheHome
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    },
    
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/TheShop.vue')
    },
    {
      path: '/product/:name',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/car',
      name: 'car',
      component: TheCarousel
    },
    {
      path: '/event',
      name: 'event',
      component: TheEvent
    }, 
    {
      path: '/admin',
      name: 'admin',
      component: TheAdmin
    },
    {
      path: '/card',
      name: 'card',
      component: TheCard
    },
    {
      path: '/today',
      name: 'today',
      component: TodaysEvent
    },
    
  ]
})

export default router
