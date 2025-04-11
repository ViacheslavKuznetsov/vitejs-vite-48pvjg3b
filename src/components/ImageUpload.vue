<template>
  <div class="image-upload-container">
    <!-- Отделяем крестик от label -->
    <label class="image-input-label">
      <input 
        type="file" 
        @change="handleFileChange" 
        class="image-input"
        accept="image/*"
        ref="fileInput"
      >
      <div 
        class="button-content"
        :class="{ 'has-file': file }"
      >
        <span class="text">{{ buttonLabel }}</span>
      </div>
    </label>

    <!-- Крестик вынесен за пределы label -->
    <span 
      v-if="file" 
      class="clear-button"
      @click.stop.prevent="clearFile"
    >
      <span class="divider"></span>
      ×
    </span>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    file: File
  },
  emits: ['file-selected', 'clear'],
  computed: {
    buttonLabel() {
      return this.file 
        ? this.file.name.replace(/\.[^/.]+$/, "") 
        : 'Выбрать обложку'
    }
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0]
      if (file?.type.startsWith('image/')) {
        this.$emit('file-selected', file)
      }
    },
    clearFile() {
      this.$refs.fileInput.value = ''
      this.$emit('clear')
    }
  }
}
</script>

<style scoped>
.image-upload-container {
  width: 100%;
  margin-bottom: 15px;
  position: relative;
  display: flex;
  gap: 8px;
}

.image-input-label {
  flex: 1;
  cursor: pointer;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--image-upload-button-bg);
  border-radius: 4px;
  transition: all 0.3s ease;
  padding: 12px 24px;
}

.button-content.has-file {
  justify-content: flex-start;
  padding: 12px 16px;
}

.text {
  color: var(--button-text);
  transition: transform 0.3s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.clear-button {
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: var(--image-upload-button-bg);
  border-radius: 4px;
  cursor: pointer;
  color: var(--button-text);
  transition: background-color 0.3s;
}

.clear-button:hover {
  background-color: var(--image-upload-button-hover);
}

.divider {
  display: none;
}

.image-input {
  display: none;
}

@media (max-width: 480px) {
  .button-content {
    padding: 12px;
  }
  
  .clear-button {
    padding: 0 12px;
  }
}
</style>