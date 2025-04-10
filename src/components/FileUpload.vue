<template>
  <div class="file-upload-container">
    <label class="file-input-label">
      <input 
        type="file" 
        @change="handleFileChange" 
        class="file-input"
        accept="video/*"
        ref="fileInput"
      >
      <span class="file-input-button">
        {{ file ? file.name : 'Выберите видеофайл' }}
      </span>
    </label>

    <span 
      v-if="file" 
      class="clear-button"
      @click.stop="clearFile"
    >
      ×
    </span>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    file: File,
  },
  emits: ['file-selected', 'clear'],
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0]
      if (file) this.$emit('file-selected', file)
    },
    clearFile() {
      this.$refs.fileInput.value = ''
      this.$emit('clear')
    }
  }
}
</script>

<style scoped>

.file-upload-container {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  gap: 8px;
}

.file-input-label {
  flex: 1;
  cursor: pointer;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.clear-button {
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #42b983; 
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;
}

.clear-button:hover {
  background-color: #369f6e;  
}
</style>