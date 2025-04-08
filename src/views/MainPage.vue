<template>
  <div class="page-container" :class="{ 'expanded': file }">
    <h1 class="page-title">Главная страница</h1>
    <div class="content-wrapper">
      <!-- Левая секция с формой -->
      <div class="form-section">
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

      <!-- Правая секция с превью видео -->
      <VideoPreview 
        v-if="file" 
        :video-url="videoUrl" 
        :aspect-ratio="videoAspectRatio"
        class="video-section"
      />
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'
import PlatformSelection from '@/components/PlatformSelection.vue'
import InputField from '@/components/InputField.vue'
import VideoPreview from '@/components/VideoPreview.vue'

export default {
  name: 'MainPage',
  components: {
    FileUpload,
    PlatformSelection,
    InputField,
    VideoPreview
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
      hideTimeout: null,
      videoUrl: '',
      videoAspectRatio: 16/9
    }
  },
  watch: {
    file(newFile) {
      if (newFile) {
        this.videoUrl = URL.createObjectURL(newFile)
      } else {
        this.cleanupVideoUrl()
      }
    }
  },
  methods: {
    async selectFile(file) {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
        this.hideTimeout = null
      }
      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout)
        this.errorTimeout = null
      }

      if (file && file.type.startsWith('video/')) {
        try {
          this.videoAspectRatio = await this.getVideoAspectRatio(file)
          this.file = file
          this.showError = false
          this.errorMessage = ''
        } catch (error) {
          this.handleFileError(file)
        }
      } else {
        this.handleFileError(file)
      }
    },

    async getVideoAspectRatio(file) {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video')
        video.src = URL.createObjectURL(file)
        
        video.onloadedmetadata = () => {
          const ratio = video.videoWidth / video.videoHeight
          URL.revokeObjectURL(video.src)
          resolve(ratio || 16/9)
        }
        
        video.onerror = () => {
          URL.revokeObjectURL(video.src)
          reject(new Error('Ошибка загрузки видео'))
        }
        
        setTimeout(() => {
          URL.revokeObjectURL(video.src)
          reject(new Error('Таймаут загрузки видео'))
        }, 5000)
      })
    },

    handleFileError(file) {
      this.file = null
      this.errorMessage = 'Пожалуйста, выберите видеофайл (MP4, AVI, MOV и т.д.)'
      this.showError = true
      if (file) URL.revokeObjectURL(file)
      
      this.errorTimeout = setTimeout(() => {
        this.showError = false
        this.hideTimeout = setTimeout(() => {
          this.errorMessage = ''
        }, 300)
      }, 5000)
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
        platforms: this.platforms,
        aspectRatio: this.videoAspectRatio
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
      this.cleanupVideoUrl()
      const fileInput = document.querySelector('.file-input')
      if (fileInput) fileInput.value = ''
    },

    cleanupVideoUrl() {
      if (this.videoUrl) {
        URL.revokeObjectURL(this.videoUrl)
        this.videoUrl = ''
      }
    }
  },
  beforeUnmount() {
    if (this.errorTimeout) clearTimeout(this.errorTimeout)
    if (this.hideTimeout) clearTimeout(this.hideTimeout)
    this.cleanupVideoUrl()
  }
}
</script>

<style scoped>
.page-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0 20px;
  box-sizing: border-box;
}

.page-container.expanded {
  max-width: 100%;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}

.form-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.page-container.expanded .content-wrapper {
  grid-template-columns: minmax(400px, 800px) minmax(400px, 1fr);
}

.video-section {
  position: sticky;
  top: 20px;
  height: calc(100vh - 100px);
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 1599px) {
  .content-wrapper {
    max-width: 1200px;
  }
  
  .page-container.expanded .content-wrapper {
    grid-template-columns: minmax(350px, 600px) minmax(350px, 1fr);
  }
}

@media (max-width: 1199px) {
  .content-wrapper {
    max-width: 100%;
  }
  
  .video-section {
    aspect-ratio: 16/9;
    height: auto;
    max-width: 800px;
  }
}

.submit-button {
  width: 100%;
  margin-top: 10px;
  align-self: center;
  max-width: none;
}
</style>