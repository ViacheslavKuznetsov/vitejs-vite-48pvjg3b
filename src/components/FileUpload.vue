<template>
  <div class="file-upload-container">
    <label class="file-input-label">
      <input 
        type="file" 
        @change="handleFileChange" 
        class="file-input"
        accept="video/*"
      >
      <span class="file-input-button">
        {{ file ? 'Выбрать другое видео' : 'Выберите видеофайл' }}
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
    showError: Boolean
  },
  emits: ['file-selected'],
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0]
      this.$emit('file-selected', file)
    }
  }
}
</script>

<style scoped>
.file-upload-container {
  width: 100%;
  margin-bottom: 15px;
}

.file-input-label {
  display: block;
}

.file-input {
  display: none;
}

.file-input-button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}
</style>