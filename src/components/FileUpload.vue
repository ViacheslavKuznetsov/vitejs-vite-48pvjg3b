<template>
    <div class="file-upload-container">
      <label class="file-input-label">
        <input 
          type="file" 
          @change="handleFileChange" 
          class="file-input"
          accept="video/*"
        >
        <span class="file-input-button">Выберите видеофайл</span>
        <span class="file-name">
          <transition name="error-fade">
            <span v-if="showError" class="error-message">{{ errorMessage }}</span>
          </transition>
          <span v-if="!showError">{{ file ? file.name : 'Файл не выбран' }}</span>
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
    emits: ['file-selected', 'update:showError', 'update:errorMessage'],
    methods: {
      handleFileChange(e) {
        const file = e.target.files[0]
        this.$emit('file-selected', file)
      }
    }
  }
</script>

<style scoped>

.error-fade-enter-active {
  animation: slideIn 0.3s;
}
.error-fade-leave-active {
  animation: slideOut 0.3s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(10px);
  }
}

.error-message {
  color: #ff4444;
  position: absolute;
  left: 0;
  right: 0;
}

.file-name {
  position: relative;
  display: block;
  min-height: 20px;
}

.file-upload-container {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 15px;
  position: relative;
}

.file-input-label {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.file-input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.file-input-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.file-input-button:hover {
  background-color: #369f6e;
}

.file-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
}

@media (max-width: 480px) {
  
  .file-upload-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .file-input-button {
    width: 100%;
    text-align: center;
  }
  
  .file-name {
    text-align: center;
    padding: 8px 0 0 0;
  }

  .error-message {
    position: static;
    margin-top: 8px;
  }
}

@media (prefers-color-scheme: dark) {
  .file-name {
    color: #aaa;
  }
  .file-upload-container {
    background-color: #2a2a2a;
  }
}

</style>