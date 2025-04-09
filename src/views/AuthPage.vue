<template>
  <div class="page-container">
    <h1 class="page-title">Авторизация</h1>
    <div class="page-content">
      <form @submit.prevent="handleAuth">
        <div>
          <input
            type="tel"
            v-model="phone"
            placeholder="Номер телефона"
            required
          >
        </div>
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Пароль"
            required
          >
        </div>
        
        <button type="submit" :disabled="loading">
          {{ loading ? 'Загрузка...' : 'Войти' }}
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>

      <div class="social-auth">
        <button class="vk-id-button" @click="authVK">
          <span class="vk-id-button__icon"></span>
          <span class="vk-id-button__text">Войти с VK ID</span>
        </button>

        <button class="yandex-id-button" @click="authYandex">
          <span class="yandex-id-button__icon"></span>
          <span class="yandex-id-button__text">Войти с Яндекс ID</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase'

export default {
  name: 'AuthPage',
  data() {
    return {
      phone: '',
      password: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleAuth() {
      this.loading = true
      this.error = ''
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          phone: this.phone,
          password: this.password
        })

        if (error) throw error
        
        // Сохраняем сессию
        localStorage.setItem('sb_token', data.session.access_token)
        
        // Перенаправляем на главную
        this.$router.push('/main')
      } catch (err) {
        this.error = this.getErrorMessage(err)
      } finally {
        this.loading = false
      }
    },
    getErrorMessage(err) {
      switch (err.message) {
        case 'Invalid login credentials':
          return 'Неверный номер или пароль'
        case 'Email rate limit exceeded':
          return 'Слишком много попыток. Попробуйте позже'
        default:
          return 'Ошибка авторизации'
      }
    }
  }
}
</script>
  
<style scoped>
@import '@/assets/styles/common.css';

.error-message {
  color: #ff4444;
  margin-top: 1rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.social-auth {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
  
  .vk-id-button {

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 300px;
    height: 44px;
    margin: 10px auto;
    padding: 0 16px;
    background-color: #0077FF;
    color: white;
    border: none;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

  }

.vk-id-button:hover {

    background-color: #0066DD;

}

.vk-id-button__icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 12px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12.65 17.39c-5.59 0-8.65-3.82-8.84-10.23h2.98c.15 4.88 2.26 6.93 3.48 7.34V7.16h2.77v3.43c1.22-.13 2.51-2.15 2.95-3.43h2.77c-.39 1.65-1.96 3.13-3.13 3.68 1.17.49 3.04 1.89 3.56 4.55h-3.05c-.43-1.45-1.51-2.59-3.44-2.77v2.77c-1.3-.17-3.48-.91-3.48-3.56H6.8c0 3.82 3.13 5.9 5.85 5.9V17.39z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.vk-id-button__text {
  line-height: 1;
}


.yandex-id-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  height: 44px;
  margin: 10px auto;
  padding: 0 16px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.yandex-id-button:hover {
  background-color: #333;
}

.yandex-id-button__icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 12px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.04 12c0-5.523 4.468-10 9.982-10C17.52 2 22 6.477 22 12s-4.468 10-9.978 10C6.518 22 2.04 17.523 2.04 12z' fill='%23FC3F1D'/%3E%3Cpath d='M12.814 12l-3.54-6h3.205l2.276 3.953L17.22 6h3.192l-5.248 9 5.58 9h-3.182l-2.74-4.674L12.86 18H9.316l3.498-6z' fill='white'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.yandex-id-button__text {
  line-height: 1;
}

  
  </style>