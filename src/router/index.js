import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from '../views/SignupPage.vue'
import LoginPage from '../views/LoginPage.vue'
import TheShop from '../views/TheShop.vue'
import TheCarousel from '../components/TheCarousel.vue'
import TheEvent from '../views/TheEvent.vue'
import TheAdmin from '../views/TheAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: TheShop
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
    
  ]
})

export default router
