<template>
  <div 
    class="file-upload-container"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <label class="file-input-label">
      <input 
        type="file" 
        @change="handleFileChange" 
        class="file-input"
        accept="video/*"
        ref="fileInput"
      >
      <span class="file-input-button">
        <span class="file-name">
          {{ file ? file.name : 'Выберите видеофайл' }}
        </span>
        <transition name="fade">
          <span 
            v-if="file && hover"
            class="clear-icon"
            @click.stop="clearFile"
          >
            ×
          </span>
        </transition>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    file: File,
  },
  emits: ['file-selected', 'clear'],
  data() {
    return {
      hover: false
    }
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0]
      if (file) this.$emit('file-selected', file)
    },
    clearFile() {
      this.$refs.fileInput.value = ''
      this.$emit('clear')
      this.hover = false
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

.file-upload-container {
  position: relative;
}

.file-name {
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}

.clear-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.5em;
  color: #ff4444;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>