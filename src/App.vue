<template>
  <div id="app">
    <!-- Навигация будет скрыта на странице авторизации -->
    <nav v-if="showNavigation && $route.meta.hideNav !== true">
      <router-link to="/video-upload">Загрузка видео</router-link> |
      <router-link to="/profiles-manager">Мои профили</router-link> |
      <router-link to="/logout">Выйти</router-link>
    </nav>
    
    <!-- Здесь отображаются страницы -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    showNavigation() {
      const hiddenPaths = ['/', '/sign-in']
      return this.$route && !hiddenPaths.includes(this.$route.path)
    }
  }
}
</script>

<style>
/* Базовые стили */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Стили навигации */
nav {
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: var(--primary-color);
}

/* Общие стили элементов форм */
input, textarea, button {
  margin: 10px auto;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  display: block;
}

button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: var(--primary-hover);
}
</style>