import { createRouter, createWebHistory } from 'vue-router'
import { firebaseAppAuth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

function requireAuth(to, from, next ){
  const unsubscribe = onAuthStateChanged(firebaseAppAuth, user => {
    unsubscribe()
    if(!user){
      console.log("no user, route to login")
      next('/login')
    } else {
    user.getIdTokenResult().then(idTokenResult => {
        if(idTokenResult.claims.admin){
          next()
        } else {
          alert("no perms")
          next('/')
        }
    })
    }
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
    {
      path: '/product/:name',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    
    {
      path: '/event',
      name: 'event',
      component: () => import('../views/EventView.vue')
    }, 
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }, 
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
     beforeEnter: requireAuth,  
    },
     
  ]
})


export default router
