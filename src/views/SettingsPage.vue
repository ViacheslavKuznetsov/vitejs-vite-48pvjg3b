<template>
    <div class="settings-page">
      <h1>Настройки</h1>
      <button @click="authVK">Авторизация VK</button>
      <button @click="authInstagram">Авторизация Instagram</button>
      <button @click="authYouTube">Авторизация YouTube</button>
      <button @click="authTikTok">Авторизация TikTok</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      authVK() { console.log('Авторизация VK') },
      authInstagram() { console.log('Авторизация Instagram') },
      authYouTube() { console.log('Авторизация YouTube') },
      authTikTok() { console.log('Авторизация TikTok') }
    }
  }
  </script>