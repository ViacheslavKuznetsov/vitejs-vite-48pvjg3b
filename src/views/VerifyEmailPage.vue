<template>
    <div class="page-container">
      <h1 class="page-title">Подтверждение Email</h1>
      
      <div class="verification-content">
        <template v-if="loading">
          <LoadingSpinner size="large" />
          <p>Проверяем данные...</p>
        </template>
  
        <template v-else>
          <div v-if="isVerified" class="verification-success">
            <p>Email успешно подтверждён!</p>
            <router-link to="/" class="auth-link">На главную</router-link>
          </div>
  
          <div v-else class="verification-message">
            <template v-if="!isProcessingToken">
              <p>Пожалуйста, проверьте вашу почту и перейдите по ссылке для подтверждения</p>
              <button 
                @click="resendVerification"
                class="resend-button"
                :disabled="resendCooldown > 0"
              >
                Отправить повторно {{ resendCooldown > 0 ? `(${resendCooldown})` : '' }}
              </button>
            </template>
  
            <div v-else class="verification-error">
              <p>Ошибка подтверждения: {{ errorMessage }}</p>
              <router-link to="/signup" class="auth-link">Попробовать снова</router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script>
import { supabase } from '@/supabase'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'VerifyEmailPage',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      loading: true,
      isVerified: false,
      errorMessage: '',
      isResending: false
    }
  },
  async mounted() {
    const { token_hash, type, email } = this.$route.query
    
    if (token_hash && type === 'email') {
      await this.verifyEmail(token_hash)
    } else if (email) {
      this.loading = false
    } else {
      this.errorMessage = 'Неверная ссылка подтверждения'
      this.loading = false
    }
  },
  methods: {
    async verifyEmail(token) {
      try {
        const { error } = await supabase.auth.verifyOtp({
          type: 'email',
          token_hash: token
        })

        if (error) throw error
        
        this.isVerified = true
      } catch (err) {
        this.errorMessage = this.parseError(err)
      } finally {
        this.loading = false
      }
    },
    async resendVerification() {
      this.isResending = true
      this.errorMessage = ''
      
      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: this.$route.query.email
        })

        if (error) throw error
        
        this.errorMessage = 'Новое письмо отправлено! Проверьте почту.'
      } catch (err) {
        this.errorMessage = this.parseError(err)
      } finally {
        this.isResending = false
      }
    },
    parseError(err) {
      switch (err.message) {
        case 'Token has expired or is invalid':
          return 'Ссылка подтверждения устарела'
        case 'Email rate limit exceeded':
          return 'Слишком много попыток. Попробуйте позже'
        default:
          return 'Ошибка сервера: ' + err.message
      }
    }
  }
}
</script>

  
  <style scoped>
  .verification-content {
    max-width: 500px;
    margin: 2rem auto;
    text-align: center;
  }
  
  .success-icon,
  .error-icon,
  .info-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
  }
  
  .success-icon {
    color: var(--success-color);
  }
  
  .error-icon {
    color: var(--error-color);
  }
  
  .info-icon {
    color: var(--warning-color);
  }
  
  .verification-message p {
    margin: 1rem 0;
    color: var(--text-secondary);
  }
  
  .resend-button {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
  }
  
  .resend-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .auth-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--primary-color);
    text-decoration: none;
  }
  </style>