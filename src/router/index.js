import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../views/AuthPage.vue'
import MainPage from '../views/MainPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

const routes = [
  { path: '/', component: AuthPage },
  { path: '/main', component: MainPage },
  { path: '/settings', component: SettingsPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router