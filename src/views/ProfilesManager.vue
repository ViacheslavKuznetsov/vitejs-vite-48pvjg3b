<template>
    <div class="page-container">
      <h1 class="page-title">Мои профили</h1>
      
      <div class="content-wrapper">
        <!-- Левый блок - Список профилей -->
        <div class="profiles-list">
          <div class="section-header">
            <h2>Добавленные профили</h2>
          </div>
          
          <div class="profiles-grid">
            <div 
              v-for="profile in socialProfiles"
              :key="profile.id"
              class="profile-card"
            >
              <div class="profile-info">
                <h3>{{ profile.name }}</h3>
                <p>{{ profile.username }}</p>
              </div>
              <button class="delete-button">×</button>
            </div>
          </div>
          <!-- Нижний левый блок блок - Добавление нового профиля -->
          <div class="add-profile">
            <div class="section-header">
              <h2>Подключить новый профиль</h2>
            </div>
            
            <div class="platforms-grid">
                  <button 
                  v-for="platform in availablePlatforms"
                  :key="platform"
                  class="platform-button"
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
        </div>
        <!-- Правый блок - поля профиля -->
        <div class="profile-info">
            <div class="section-header">
              <h2>Данные профиля</h2>
            </div>
            
            Тут будут поля выбранного слева профиля

          </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        socialProfiles: [
          { id: 1, platform: 'vk', name: 'Основной профиль', username: '@fxr_lxve', ownerID: '2121412' },
          { id: 2, platform: 'yandex', name: 'Музыкальный блог', username: '@music_blog', ownerID: '135325' }
        ],
        availablePlatforms: ['vk', 'yandex', 'instagram', 'youtube'],
        platformLabels: {
          vk: 'ВКонтакте',
          yandex: 'Яндекс',
          instagram: 'Instagram',
          youtube: 'YouTube'
        }
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
    }
  }
  </script>
  
  <style scoped>
  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--border-color);
  }

 .platform-button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px 20px;
    justify-content: flex-start;
    }

 .platform-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    }
  .profiles-grid {
    display: grid;
    gap: 15px;
  }
  
  .profile-card {
    display: flex;
    align-items: center;
    padding: 15px;
    background: var(--bg-light);
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    justify-content: space-between;
  }
  
  .platform-icon {
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }
  
  .profile-info {
    flex: 1;
    min-width: 0;
  }
  
  .profile-info h3 {
    color: var(--text-primary);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .profile-info p {
    color: var(--text-secondary);
    font-size: 0.9em;
  }
  
  .delete-button {
    color: var(--error-color);
    font-size: 1.5em;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 8px;

    flex-shrink: 0;
    margin-left: auto; /* Выравниваем кнопку вправо */
    padding: 4px 10px;
    font-size: 1.8em;
    line-height: 1;
}
  
  .platforms-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .platform-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: var(--bg-light);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    transition: transform 0.2s;
  }
  
  .platform-button:hover {
    transform: translateY(-3px);
  }
  
  .platform-button img {
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 768px) {
    .content-wrapper {
      grid-template-columns: 1fr;
      padding: 10px;
    }
    
    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }
  </style>