import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    component: () => import('@/views/AuthPage.vue'),
    meta: { hideNav: true } 
  },
  { 
    path: '/main',
    component: () => import('@/views/MainPage.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/signup',
    component: () => import('@/views/SignUpPage.vue'),
    meta: { 
      hideNav: true,
      transition: 'fade' 
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { hideNav: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem('sb_token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/'
  }
})

export default router