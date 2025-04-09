import { createApp } from 'vue'
import './style.css'
import './styles/global.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' 
const app = createApp(App)
app.use(createPinia())  // Добавьте эту строку
app.use(router)
app.mount('#app')
