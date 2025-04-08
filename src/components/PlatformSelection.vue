<template>
    <div class="platforms">
      <label v-for="platform in platforms" :key="platform">
        <input 
          type="checkbox" 
          :value="platform" 
          :checked="selectedPlatforms.includes(platform)"
          @change="handlePlatformChange"
        >
        {{ platform }}
      </label>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlatformSelection',
    props: {
      platforms: {
        type: Array,
        default: () => ['VK', 'Instagram', 'YouTube', 'TikTok']
      },
      selectedPlatforms: Array
    },
    emits: ['update:selectedPlatforms'],
    methods: {
      handlePlatformChange(e) {
        const value = e.target.value
        const newPlatforms = e.target.checked
          ? [...this.selectedPlatforms, value]
          : this.selectedPlatforms.filter(p => p !== value)
        
        this.$emit('update:selectedPlatforms', newPlatforms)
      }
    }
  }
  </script>
  
  <style scoped>

.platforms {
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;
}

.platforms label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 6px;
  transition: background-color 0.2s;
  cursor: pointer;
}

.platforms label:hover {
  background-color: #eee;
}

.platforms input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: #42b983;
  cursor: pointer;
}

@media (prefers-color-scheme: dark) {

.platforms label {
  background-color: #2a2a2a;
}

.platforms label:hover {
  background-color: #333;
}

}

  </style>