<template>
    <div class="add-profile">
      <div class="section-header">
        <h2>Подключить новый профиль</h2>
      </div>
      
      <div class="platforms-grid">
        <button 
          v-for="platform in platforms"
          :key="platform"
          class="platform-button"
          @click="$emit('add', platform)"
        >
          <img 
            :src="getPlatformIcon(platform)"
            class="platform-icon"
            :alt="platform"
          >
          {{ platformLabels[platform] }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      platforms: {
        type: Array,
        required: true
      },
      platformLabels: {
        type: Object,
        required: true
      }
    },
    methods: {
      getPlatformIcon(platform) {
        const icons = {
          vk: new URL('@/assets/icons/vk.svg', import.meta.url).href,
          yandex: new URL('@/assets/icons/yandex.svg', import.meta.url).href,
          instagram: new URL('@/assets/icons/instagram.svg', import.meta.url).href,
          youtube: new URL('@/assets/icons/youtube.svg', import.meta.url).href
        }
        return icons[platform]
      }
    },
    emits: ['add']
  }
  </script>
  
  <style scoped>
  .platforms-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .platform-button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px 20px;
    background: var(--bg-light);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    transition: transform 0.2s;
  }
  
  .platform-button:hover {
    transform: translateY(-3px);
  }
  
  .platform-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  </style>