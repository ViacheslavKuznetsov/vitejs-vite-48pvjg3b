<template>
    <div class="image-upload-container">
      <label class="image-input-label">
        <input 
          type="file" 
          @change="handleFileChange" 
          class="image-input"
          accept="image/*"
        >
        <span class="image-input-button">{{ buttonLabel }}</span>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageUpload',
    props: {
      file: File
    },
    emits: ['file-selected'],
    computed: {
      buttonLabel() {
        if (!this.file) return 'Выбрать обложку'
        const fileName = this.file.name.split('.').slice(0, -1).join('.')
        return fileName || 'Файл без имени'
      }
    },
    methods: {
      handleFileChange(e) {
        const file = e.target.files[0]
        if (file && file.type.startsWith('image/')) {
          this.$emit('file-selected', file)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .image-upload-container {
    width: 100%;
    margin-bottom: 15px;
  }
  
  .image-input-label {
    display: block;
    width: 100%;
  }
  
  .image-input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
  
  .image-input-button {
    display: block;
    width: 100%;
    padding: 12px 24px;
    background-color: #646cff;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .image-input-button:hover {
    background-color: #535bf2;
  }
  
  @media (max-width: 480px) {
    .image-input-button {
      padding: 12px;
    }
  }
  </style>