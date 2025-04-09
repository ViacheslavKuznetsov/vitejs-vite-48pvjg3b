<template>
  <div 
    class="video-preview-container"
    :style="{ 'aspect-ratio': aspectRatio }"
    ref="container"
  >
    <video
      ref="videoElement"
      :src="videoUrl"
      :poster="posterUrl"
      class="video-element"
      playsinline
      @loadedmetadata="handleVideoLoad"
      @error="handleVideoError"
    ></video>

    <div v-if="loading" class="loading-overlay">
      <LoadingSpinner />
      <span class="loading-text">Загрузка видео...</span>
    </div>

    <div v-if="error" class="error-overlay" role="alert">
      {{ errorMessage }}
      <button @click="retryLoading" class="retry-button">
        Повторить
      </button>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  components: { LoadingSpinner },
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    aspectRatio: {
      type: Number,
      default: 16/9
    },
    posterUrl: String
  },
  data() {
    return {
      loading: true,
      error: null,
      observer: null
    }
  },
  computed: {
    errorMessage() {
      return this.error?.message || 'Ошибка загрузки видео'
    }
  },
  methods: {
    handleVideoLoad() {
      this.loading = false
      this.setupIntersectionObserver()
      this.$emit('duration', this.$refs.videoElement.duration)
    },
    
    handleVideoError() {
      this.loading = false
      this.error = new Error('Не удалось загрузить видео')
    },
    
    retryLoading() {
      this.error = null
      this.loading = true
      this.$refs.videoElement.load()
    },
    
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.$refs.videoElement.play().catch(() => {
              // Автовоспроизведение заблокировано
            })
          } else {
            this.$refs.videoElement.pause()
          }
        })
      }, {
        rootMargin: '0px',
        threshold: 0.5
      })

      this.observer.observe(this.$refs.container)
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
    URL.revokeObjectURL(this.videoUrl)
  }
}
</script>

<style scoped>
.video-preview-container {
  position: relative;
  background: var(--bg-dark);
  border-radius: 12px;
  overflow: hidden;
  contain: content;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 2;
}

.error-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.9);
  color: var(--error-color);
  padding: 1rem;
  text-align: center;
}

.retry-button {
  padding: 8px 16px;
  background: var(--primary-color);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .video-element {
    object-fit: contain;
  }
  
  .video-preview-container {
    border-radius: 0;
  }
}
</style>