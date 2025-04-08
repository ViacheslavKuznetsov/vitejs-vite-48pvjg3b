<template>
    <div class="main-page">
      <h1>Главная страница</h1>
      <input type="file" @change="selectFile">
      <input v-model="name" placeholder="Название">
      <textarea v-model="description" placeholder="Описание"></textarea>
      
      <div class="checkboxes">
        <label><input type="checkbox" v-model="platforms" value="VK"> VK</label>
        <label><input type="checkbox" v-model="platforms" value="Instagram"> Instagram</label>
        <label><input type="checkbox" v-model="platforms" value="YouTube"> YouTube</label>
        <label><input type="checkbox" v-model="platforms" value="TikTok"> TikTok</label>
      </div>
      
      <button @click="download">Загрузить</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        file: null,
        name: '',
        description: '',
        platforms: []
      }
    },
    methods: {
      selectFile(e) {
        this.file = e.target.files[0]
      },
      download() {
        const data = {
          file: this.file,
          name: this.name,
          description: this.description,
          platforms: this.platforms
        }
        console.log('Отправка данных:', data)
      }
    }
  }
  </script>