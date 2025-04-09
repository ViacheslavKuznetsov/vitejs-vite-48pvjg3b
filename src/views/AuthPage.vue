<template>
  <div class="page-container">
    <h1 class="page-title">Авторизация</h1>
    
    <form @submit.prevent="handleAuth" class="auth-form">
      <InputField
        v-model="login"
        placeholder="Email или номер телефона"
        type="text"
        :error="loginError"
        @input="validateLogin"
      />

      <InputField
        v-model="password"
        placeholder="Пароль"
        type="password"
        :error="passwordError"
      />

      <button 
        type="submit" 
        :disabled="loading"
        class="submit-button"
        aria-live="polite"
      >
        <span v-if="!loading">Войти</span>
        <LoadingSpinner v-else size="small" />
      </button>

      <div v-if="error" class="error-message" role="alert">
        {{ error }}
      </div>

      <div class="auth-links">
        <router-link to="/signup" class="auth-link">
          Нет аккаунта? Зарегистрироваться
        </router-link>
        <router-link to="/reset-password" class="auth-link">
          Забыли пароль?
        </router-link>
      </div>
    </form>

    <div class="oauth-providers">
      <button 
        class="oauth-button vk"
        @click="handleOAuth('vk')"
        aria-label="Войти через VK ID"
      >
        <VkIcon class="icon" />
        <span>VK ID</span>
      </button>

      <button 
        class="oauth-button yandex"
        @click="handleOAuth('yandex')"
        aria-label="Войти через Яндекс ID"
      >
        <YandexIcon class="icon" />
        <span>Яндекс ID</span>
      </button>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase'
import InputField from '@/components/InputField.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import VkIcon from '@/assets/icons/vk.svg?component'
import YandexIcon from '@/assets/icons/yandex.svg?component'

export default {
  name: 'AuthPage',
  components: { 
    InputField,
    LoadingSpinner,
    VkIcon,
    YandexIcon
  },
  data() {
    return {
      login: '',
      password: '',
      loading: false,
      error: '',
      loginError: '',
      passwordError: ''
    }
  },
  methods: {
    validateLogin() {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.login)
      const isPhone = /^\+?[1-9]\d{1,14}$/.test(this.login)
      this.loginError = (isEmail || isPhone) ? '' : 'Некорректный формат'
    },

    async handleAuth() {
      if (!this.validateForm()) return
      
      this.loading = true
      this.error = ''

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          [this.login.includes('@') ? 'email' : 'phone']: this.login,
          password: this.password
        })

        if (error) throw error
        
        this.$router.push('/main')
      } catch (err) {
        this.error = this.parseAuthError(err)
      } finally {
        this.loading = false
      }
    },

    async handleOAuth(provider) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { 
          redirectTo: window.location.origin
        }
      })

      if (error) {
        this.error = this.parseAuthError(error)
      }
    },

    validateForm() {
      let valid = true
      if (!this.login.trim()) {
        this.loginError = 'Обязательное поле'
        valid = false
      }
      if (!this.password) {
        this.passwordError = 'Введите пароль'
        valid = false
      }
      return valid
    },

    parseAuthError(err) {
      switch (err.message) {
        case 'Invalid login credentials':
          return 'Неверные данные для входа'
        case 'Email rate limit exceeded':
          return 'Слишком много попыток. Попробуйте позже'
        default:
          return 'Ошибка авторизации: ' + err.message
      }
    }
  }
}
</script>

<style scoped>
.page-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.auth-form {
  background: var(--bg-light);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.oauth-providers {
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
}

.oauth-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.2s;
}

.oauth-button.vk {
  background: #0077FF;
  color: white;
}

.oauth-button.yandex {
  background: #000;
  color: white;
}

.icon {
  width: 24px;
  height: 24px;
}

.error-message {
  color: var(--error-color);
  margin: 1rem 0;
  font-size: 0.9rem;
}

.submit-button {
  width: 100%;
  padding: 12px;
  margin-top: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.auth-links {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.auth-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
}
</style>