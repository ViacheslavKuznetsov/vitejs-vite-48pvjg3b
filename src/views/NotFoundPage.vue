<template>
    <div class="not-found-page">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <router-link to="/" class="home-link">На главную</router-link>
    </div>
  </template>
  
  <style scoped>
  .not-found-page {
    text-align: center;
    padding: 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--error-color);
  }
  
  .home-link {
    margin-top: 2rem;
    color: var(--primary-color);
    text-decoration: none;
  }
  </style>