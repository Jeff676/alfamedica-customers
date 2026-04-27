import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase/client.js'

const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: ()=> import('@/views/NotFound.vue')
    },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!session) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})



export default router