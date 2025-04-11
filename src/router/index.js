import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomePage.vue'),
    meta: { hideNav: true }
  },
  { 
    path: '/sign-in', 
    component: () => import('@/views/SignInPage.vue'),
    meta: { hideNav: true } 
  },
  { 
    path: '/video-upload',
    component: () => import('@/views/VideoUpload.vue'),
    meta: { requiresAuth: false } 
  },
  {
    path: '/profiles-manager',
    component: () => import('@/views/ProfilesManager.vue'),
    meta: { title: 'Мои профили' }
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