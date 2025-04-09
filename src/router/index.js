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
    meta: { requiresAuth: false } 
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

export default router