<template>
    <div class="profile-details">
      <div class="section-header">
        <h2>Данные профиля</h2>
      </div>
      
      <div v-if="selectedProfile" class="details-content">
        <div class="detail-item">
          <label>Название:</label>
          <p>{{ selectedProfile.name }}</p>
        </div>
        <div class="detail-item">
          <label>Имя пользователя:</label>
          <p>{{ selectedProfile.username }}</p>
        </div>
        <div class="detail-item">
          <label>ID владельца:</label>
          <p>{{ selectedProfile.ownerID }}</p>
        </div>
      </div>
      
      <div v-else class="empty-state">
        Выберите профиль для просмотра деталей
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedProfile: {
        type: Object,
        default: null
      }
    }
  }
  </script>
  
  <style scoped>
  .details-content {
    padding: 15px;
    background: var(--bg-light);
    border-radius: 8px;
  }
  
  .detail-item {
    margin-bottom: 12px;
  }
  
  .detail-item label {
    color: var(--text-secondary);
    font-size: 0.9em;
  }
  
  .empty-state {
    padding: 20px;
    text-align: center;
    color: var(--text-secondary);
  }
  </style>