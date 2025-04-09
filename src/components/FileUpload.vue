<template>
  <div class="file-upload-container">
    <div v-if="showError" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-if="file" class="file-info">
      <span class="file-name">{{ file.name }}</span>
      <span class="file-size">{{ formatSize(file.size) }}</span>
    </div>

    <label class="file-input-label">
      <input 
        type="file" 
        @change="handleFileChange" 
        class="file-input"
        accept="video/*"
      >
      <span class="file-input-button">
        {{ file ? 'Заменить файл' : 'Выберите видео' }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    file: File,
    errorMessage: String,
    showError: Boolean,
    maxSize: {
      type: Number,
      default: 1024 * 1024 * 500 // 500MB по умолчанию
    }
  },
  emits: ['file-selected', 'error'],
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0]
      if (!file) return

      if (!file.type.startsWith('video/')) {
        this.$emit('error', 'Допустимы только видеофайлы')
        return
      }

      if (file.size > this.maxSize) {
        this.$emit('error', `Максимальный размер: ${this.formatSize(this.maxSize)}`)
        return
      }

      this.$emit('file-selected', file)
    },
    formatSize(bytes) {
      return (bytes / 1024 / 1024).toFixed(1) + ' MB'
    }
  }
}
</script>

<style scoped>
.file-upload-container {
  width: 100%;
  margin-bottom: 1.5rem;
}

.file-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.error-message {
  color: var(--error-color);
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.file-input-label {
  display: block;
  position: relative;
}

.file-input {
  display: none;
}

.file-input-button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.file-input-button:hover {
  background-color: var(--primary-hover);
}
</style>