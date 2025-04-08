<template>
  <div class="page-container">
    <h1 class="page-title">Настройки</h1>
    <div class="page-content">
      <button 
        v-for="service in services" 
        :key="service.name"
        class="auth-button"
        :class="service.class"
        @click="service.method"
      >
        <span class="icon"></span>
        <span>{{ service.label }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  data() {
    return {
      services: [
        { name: 'vk', label: 'Авторизация VK', class: 'vk', method: this.authVK },
        { name: 'instagram', label: 'Авторизация Instagram', class: 'instagram', method: this.authInstagram },
        { name: 'youtube', label: 'Авторизация YouTube', class: 'youtube', method: this.authYouTube },
        { name: 'tiktok', label: 'Авторизация TikTok', class: 'tiktok', method: this.authTikTok }
      ]
    }
  },
  methods: {
    authVK() { console.log('VK auth') },
    authInstagram() { console.log('Instagram auth') },
    authYouTube() { console.log('YouTube auth') },
    authTikTok() { console.log('TikTok auth') }
  }
}
</script>

<style scoped>
@import '@/assets/styles/common.css';
.auth-button {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.auth-button .icon {
  width: 24px;
  height: 24px;
  background-size: contain;
}

/* Цвета кнопок */
.vk { background-color: #0077FF; }
.instagram { background: linear-gradient(45deg, #405DE6, #C13584); }
.youtube { background-color: #FF0000; }
.tiktok { background-color: #000000; }

/* Стили для конкретных кнопок */
.auth-button.vk {
  background-color: #0077FF;
  color: white;
}
.auth-button.vk .icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12.65 17.39c-5.59 0-8.65-3.82-8.84-10.23h2.98c.15 4.88 2.26 6.93 3.48 7.34V7.16h2.77v3.43c1.22-.13 2.51-2.15 2.95-3.43h2.77c-.39 1.65-1.96 3.13-3.13 3.68 1.17.49 3.04 1.89 3.56 4.55h-3.05c-.43-1.45-1.51-2.59-3.44-2.77v2.77c-1.3-.17-3.48-.91-3.48-3.56H6.8c0 3.82 3.13 5.9 5.85 5.9V17.39z'/%3E%3C/svg%3E");
}

.auth-button.instagram {
  background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
  color: white;
}
.auth-button.instagram .icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/%3E%3C/svg%3E");
}

.auth-button.youtube {
  background-color: #FF0000;
  color: white;
}
.auth-button.youtube .icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/%3E%3C/svg%3E");
}

.auth-button.tiktok {
  background-color: #000;
  color: white;
}
.auth-button.tiktok .icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'/%3E%3C/svg%3E");
}
</style>