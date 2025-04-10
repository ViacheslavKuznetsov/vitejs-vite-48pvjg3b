<template>
    <div class="page-container">
      <h1 class="page-title">Менеджер вертикальных видео</h1>
      <div class="page-content">
        <!-- Заглушка для будущего описания -->
        <div class="description-placeholder">
          <p>Описание приложения появится здесь...</p>
          <router-link to="/sign-in" class="auth-link">Войти в систему</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .description-placeholder {
    text-align: center;
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .auth-link {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 24px;
    background-color: #42b983;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;
  }
  
  .auth-link:hover {
    background-color: #369f6e;
  }
  </style>