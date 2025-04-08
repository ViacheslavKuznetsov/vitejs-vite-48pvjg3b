<template>
  <div 
    class="video-preview-container"
    :style="{ 'aspect-ratio': aspectRatio }"
  >
    <video
      ref="videoElement"
      :src="videoUrl"
      autoplay
      muted
      loop
      playsinline
      class="video-element"
      @loadedmetadata="handleVideoLoad"
    ></video>
    <div v-if="loading" class="loading-overlay">
      Загрузка видео...
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPreview',
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    aspectRatio: {
      type: Number,
      default: 16/9
    }
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    handleVideoLoad() {
      this.loading = false
      this.$nextTick(() => {
        this.$refs.videoElement.play().catch(() => {
          // Автовоспроизведение заблокировано браузером
        })
      })
    }
  },
  watch: {
    videoUrl() {
      this.loading = true
      this.$nextTick(() => {
        if (this.$refs.videoElement) {
          this.$refs.videoElement.load()
        }
      })
    }
  },
  beforeUnmount() {
    if (this.$refs.videoElement) {
      this.$refs.videoElement.pause()
      this.$refs.videoElement.removeAttribute('src')
    }
  }
}
</script>

<style scoped>
.video-preview-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1.2em;
  z-index: 2;
}

@media (max-width: 1199px) {
  .video-element {
    object-fit: contain;
  }
}

@media (prefers-color-scheme: dark) {
  .video-preview-container {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
}
</style>