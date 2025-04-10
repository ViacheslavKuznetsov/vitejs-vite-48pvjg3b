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

     
    </div>
  </div>
</template>

<script>

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
  </style>