<template>
  <div class="page-container">
    <h1 class="page-title">Регистрация</h1>
    
    <form @submit.prevent="handleSignUp" class="auth-form">
      <InputField
        v-model="fullName"
        placeholder="Полное имя"
        type="text"
        :error="fullNameError"
        @input="validateFullName"
      />

      <InputField
        v-model="email"
        placeholder="Email"
        type="email"
        :error="emailError"
        @input="validateEmail"
      />

      <InputField
        v-model="password"
        placeholder="Пароль"
        type="password"
        :error="passwordError"
      />

      <InputField
        v-model="confirmPassword"
        placeholder="Повторите пароль"
        type="password"
        :error="confirmPasswordError"
      />

      <div class="password-rules">
        <p>Пароль должен содержать:</p>
        <ul>
          <li :class="{ valid: hasMinLength }">Минимум 8 символов</li>
          <li :class="{ valid: hasUpperCase }">Заглавную букву</li>
          <li :class="{ valid: hasNumber }">Хотя бы одну цифру</li>
        </ul>
      </div>

      <button 
        type="submit" 
        class="submit-button"
        :disabled="!isFormValid || loading"
      >
        <span v-if="!loading">Зарегистрироваться</span>
        <LoadingSpinner v-else size="small" />
      </button>

      <div v-if="error" class="error-message" role="alert">
        {{ error }}
      </div>

      <div class="auth-links">
        <router-link to="/login" class="auth-link">
          Уже есть аккаунт? Войти
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { supabase } from '@/supabase'
import InputField from '@/components/InputField.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'SignUpPage',
  components: {
    InputField,
    LoadingSpinner
  },
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      error: '',
      fullNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    }
  },
  computed: {
    hasMinLength() {
      return this.password.length >= 8
    },
    hasUpperCase() {
      return /[A-Z]/.test(this.password)
    },
    hasNumber() {
      return /\d/.test(this.password)
    },
    isFormValid() {
      return (
        this.fullNameValid &&
        this.emailValid &&
        this.passwordsMatch &&
        this.hasMinLength &&
        this.hasUpperCase &&
        this.hasNumber
      )
    },
    fullNameValid() {
      return this.fullName.trim().length >= 2
    },
    emailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    },
    passwordsMatch() {
      return this.password === this.confirmPassword
    }
  },
  methods: {
    validateFullName() {
      this.fullNameError = this.fullNameValid ? '' : 'Минимум 2 символа'
    },
    validateEmail() {
      this.emailError = this.emailValid ? '' : 'Некорректный email'
    },
    async handleSignUp() {
      if (!this.validateForm()) return
      
      this.loading = true
      this.error = ''

      try {
        const { data, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: {
            data: { full_name: this.fullName.trim() },
            emailRedirectTo: window.location.origin + '/verify-email'
          }
        })

        if (error) throw error

        if (data.user) {
          this.$router.push({
            path: '/verify-email',
            query: { email: this.email }
          })
        }
      } catch (err) {
        console.error('Registration error:', err)
        this.error = this.parseError(err)
      } finally {
        this.loading = false
      }
    },
    validateForm() {
      let valid = true
      
      if (!this.fullNameValid) {
        this.fullNameError = 'Введите ваше имя'
        valid = false
      }
      
      if (!this.emailValid) {
        this.emailError = 'Обязательное поле'
        valid = false
      }
      
      if (!this.passwordsMatch) {
        this.confirmPasswordError = 'Пароли не совпадают'
        valid = false
      }
      
      return valid
    },
    parseError(err) {
      switch (err.message) {
        case 'User already registered':
          return 'Пользователь уже существует'
        case 'Password should be at least 6 characters':
          return 'Пароль слишком короткий'
        case 'new row violates row-level security policy':
          return 'Ошибка безопасности. Попробуйте позже'
        default:
          return 'Ошибка регистрации: ' + err.message
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

.password-rules {
  margin: 1rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.password-rules ul {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  list-style: none;
}

.password-rules li {
  position: relative;
  color: var(--error-color);
  transition: color 0.3s;
}

.password-rules li::before {
  content: '✖';
  position: absolute;
  left: -1.3em;
}

.password-rules li.valid {
  color: var(--success-color);
}

.password-rules li.valid::before {
  content: '✓';
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
  transition: background-color 0.3s;
}

.submit-button:hover {
  background: var(--primary-hover);
}

.auth-link {
  display: block;
  margin-top: 1.5rem;
  text-align: center;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
}

.auth-link:hover {
  text-decoration: underline;
}
</style>