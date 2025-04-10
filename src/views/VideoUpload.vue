<template>
  <div class="page-container" :class="{ 'expanded': file }">
    <h1 class="page-title">Загрузить вертикальное видео</h1>
    <div class="content-wrapper">
      <div class="form-section">
        <CustomSelectInput 
          v-model="profileId"
          :items="userSocialProfiles"
        />

        <FileUpload
        :file="file"
          @file-selected="selectFile"
          @clear="clearVideoFile"
          :error-message="errorMessage"
          :show-error="showError"

        />

        <ImageUpload
          :file="coverImage"
          @file-selected="selectCoverImage"
          @clear="coverImage = null"
        />

        <HashTagsInput v-model="hashtags" />

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

        <DoItLater 
          v-model="isScheduled"
          v-model:date="scheduledDate"
          v-model:time="scheduledTime"
        />

        <button @click="download" class="submit-button">Загрузить</button>
      </div>

      <VideoPreview 
        v-if="file && !isMobile"
        :video-url="videoUrl" 
        :aspect-ratio="videoAspectRatio"
        class="video-section"
      />
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import PlatformSelection from '@/components/PlatformSelection.vue'
import InputField from '@/components/InputField.vue'
import VideoPreview from '@/components/VideoPreview.vue'
import HashTagsInput from '@/components/HashTagsInput.vue'
import CustomSelectInput from '@/components/CustomSelectInput.vue'
import DoItLater from '@/components/DoItLater.vue'

export default {
  name: 'MainPage',
  components: {
    FileUpload,
    ImageUpload,
    PlatformSelection,
    InputField,
    VideoPreview,
    HashTagsInput,
    CustomSelectInput,
    DoItLater
  },
  data() {
    return {
      file: null,
      coverImage: null,
      name: '',
      description: '',
      platforms: [],
      errorMessage: '',
      showError: false,
      videoUrl: '',
      videoAspectRatio: 16/9,
      hashtags: [],
      isMobile: window.innerWidth < 768,
      profileId: [],
      userSocialProfiles: [
        { label: 'FXR LXVE', id: '1' },
        { label: 'Lxzy Slxth', id: '2' },
        { label: 'Lxzy Dxzy', id: '3' }
      ],
      isScheduled: false,
      scheduledDate: '',
      scheduledTime: ''
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    clearVideoFile() {
    this.file = null
    this.videoUrl = ''
    URL.revokeObjectURL(this.videoUrl)
  },
    selectCoverImage(file) {
  this.coverImage = file
},
    handleResize() {
      this.isMobile = window.innerWidth < 768
    },
    selectFile(file) {
      if (file && file.type.startsWith('video/')) {
        this.file = file
        this.videoUrl = URL.createObjectURL(file)
      }
    },
    download() {
      console.log({
        file: this.file,
        coverImage: this.coverImage,
        profileId: this.profileId,
        hashtags: this.hashtags,
        schedule: this.isScheduled ? `${this.scheduledDate}T${this.scheduledTime}` : null
      })
    }
  }
}
</script>

<style scoped>

.page-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.content-wrapper {
  display: grid;
  gap: 40px;
}

.form-section {
  width: 100%;
  min-width: 400px;
  max-width: 400px;
  margin: 0 auto;
}

.video-section {
  display: none;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .form-section {
    max-width: 100%;
  }
  
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  
  .video-section {
    display: none !important;
  }
}
</style>