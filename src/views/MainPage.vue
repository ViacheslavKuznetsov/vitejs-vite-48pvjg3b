<template>
  <div class="page-container">
    <h1 class="page-title">Главная страница</h1>
    <div class="page-content">
      <FileUpload
        :file="file"
        :error-message="errorMessage"
        :show-error="showError"
        @file-selected="selectFile"
        @update:showError="showError = $event"
        @update:errorMessage="errorMessage = $event"
      />

      <InputField
        v-model="name"
        placeholder="Название"
        type="input"
      />
      
      <InputField
        v-model="description"
        placeholder="Описание"
        type="textarea"
      />

      <PlatformSelection v-model:selected-platforms="platforms" />

      <button @click="download" class="submit-button">Загрузить</button>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'
import PlatformSelection from '@/components/PlatformSelection.vue'
import InputField from '@/components/InputField.vue'

export default {
  name: 'MainPage',
  components: {
    FileUpload,
    PlatformSelection,
    InputField
  },
  data() {
    return {
      file: null,
      name: '',
      description: '',
      platforms: [],
      errorMessage: '',
      showError: false,
      errorTimeout: null,
      hideTimeout: null
    }
  },
  methods: {
    selectFile(file) {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
        this.hideTimeout = null
      }
      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout)
        this.errorTimeout = null
      }

      if (file && file.type.startsWith('video/')) {
        this.file = file
        this.showError = false
        this.errorMessage = ''
      } else {
        this.file = null
        this.errorMessage = 'Пожалуйста, выберите видеофайл (MP4, AVI, MOV и т.д.)'
        this.showError = true
        
        this.errorTimeout = setTimeout(() => {
          this.showError = false
          this.hideTimeout = setTimeout(() => {
            this.errorMessage = ''
          }, 300)
        }, 5000)
      }
    },
    download() {
      if (!this.file || !this.file.type.startsWith('video/')) {
        this.errorMessage = 'Необходимо выбрать видеофайл перед загрузкой'
        this.showError = true
        return
      }

      console.log('Отправка данных:', {
        file: this.file,
        name: this.name,
        description: this.description,
        platforms: this.platforms
      })

      this.resetForm()
    },
    resetForm() {
      this.file = null
      this.name = ''
      this.description = ''
      this.platforms = []
      this.errorMessage = ''
      this.showError = false
      document.querySelector('.file-input').value = ''
    }
  },
  beforeUnmount() {
    if (this.errorTimeout) clearTimeout(this.errorTimeout)
    if (this.hideTimeout) clearTimeout(this.hideTimeout)
  }
}
</script>

<style scoped>
@import '@/assets/styles/common.css';

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #369f6e;
}

@media (max-width: 480px) {
  .page-content {
    min-width: unset;
    padding: 0 15px;
  }
}
</style>