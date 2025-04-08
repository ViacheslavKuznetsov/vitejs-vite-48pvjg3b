<template>
  <div class="page-container">
    <h1 class="page-title">Главная страница</h1>
    <div class="page-content">
      <input type="file" @change="selectFile" class="file-input">
      <input v-model="name" placeholder="Название" class="text-input">
      <textarea v-model="description" placeholder="Описание"></textarea>
      
      <div class="platforms">
        <label v-for="platform in ['VK', 'Instagram', 'YouTube', 'TikTok']" :key="platform">
          <input type="checkbox" v-model="platforms" :value="platform">
          {{ platform }}
        </label>
      </div>
      
      <button @click="download" class="submit-button">Загрузить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
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
      console.log('Отправка данных:', {
        file: this.file,
        name: this.name,
        description: this.description,
        platforms: this.platforms
      })
    }
  }
}
</script>

<style scoped>
@import '@/assets/styles/common.css';

.file-input, .text-input, textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.platforms {
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.platforms label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.submit-button {
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