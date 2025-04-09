<template>
  <div class="page-container" :class="{ 'expanded': file }">
    <h1 class="page-title">Главная страница</h1>
    
    <div class="content-wrapper">
      <form class="form-section" @submit.prevent="handleSubmit">
        <CustomSelectInput
          v-model="selectedProfileIds"
          :items="userProfiles"
          label="Выберите профиль"
        />

        <FileUpload
          v-model:file="uploadData.file"
          :max-size="maxFileSize"
          @error="handleUploadError"
        />

        <ImageUpload
          v-model:file="uploadData.cover"
          @clear="uploadData.cover = null"
        />

        <HashTagsInput v-model="uploadData.tags" />

        <InputField
          v-model="uploadData.title"
          placeholder="Название видео"
          :max-length="100"
          required
        />

        <InputField
          v-model="uploadData.description"
          placeholder="Описание"
          type="textarea"
          :max-length="500"
        />

        <PlatformSelection
          v-model:selected-platforms="uploadData.platforms"
          :available-platforms="availablePlatforms"
        />

        <DoItLater
          v-model="uploadData.scheduled"
          v-model:date="uploadData.scheduleDate"
          v-model:time="uploadData.scheduleTime"
        />

        <button 
          type="submit" 
          class="submit-button"
          :disabled="uploading"
        >
          {{ uploading ? 'Загрузка...' : 'Опубликовать' }}
        </button>
      </form>

      <VideoPreview
        v-if="file && !isMobile"
        :video-url="previewUrl"
        :aspect-ratio="videoAspectRatio"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUploadStore } from '@/stores/upload'
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      maxFileSize: 1024 * 1024 * 500, // 500MB
      uploadData: {
        file: null,
        cover: null,
        title: '',
        description: '',
        tags: [],
        platforms: [],
        scheduled: false,
        scheduleDate: '',
        scheduleTime: ''
      },
      uploadError: null
    }
  },
  computed: {
    ...mapState(useUserStore, ['userProfiles']),
    ...mapState(useUploadStore, ['uploading', 'error']),
    
    isMobile() {
      return window.innerWidth < 768
    },
    
    previewUrl() {
      return this.uploadData.file ? URL.createObjectURL(this.uploadData.file) : ''
    }
  },
  methods: {
    ...mapActions(useUploadStore, ['uploadVideo']),
    
    async handleSubmit() {
      if (!this.validateForm()) return
      
      try {
        await this.uploadVideo({
          ...this.uploadData,
          profiles: this.selectedProfileIds
        })
        
        this.resetForm()
        this.$router.push('/success')
      } catch (error) {
        this.uploadError = this.parseError(error)
      }
    },
    
    validateForm() {
      let valid = true
      if (!this.uploadData.file) {
        this.uploadError = 'Выберите видео для загрузки'
        valid = false
      }
      return valid
    },
    
    handleUploadError(message) {
      this.uploadError = message
    },
    
    resetForm() {
      this.uploadData = {
        file: null,
        cover: null,
        title: '',
        description: '',
        tags: [],
        platforms: [],
        scheduled: false,
        scheduleDate: '',
        scheduleTime: ''
      }
    },
    
    parseError(error) {
      switch (error.code) {
        case 'storage/unauthorized':
          return 'Ошибка авторизации'
        case 'storage/limit-exceeded':
          return 'Превышен лимит размера файла'
        default:
          return 'Ошибка загрузки видео'
      }
    }
  },
  beforeUnmount() {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl)
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

.submit-button {
  margin-top: 1.5rem;
}
</style>