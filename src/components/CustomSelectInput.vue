<template>
  <div class="custom-select">
    <div class="selected-wrapper">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleInput"
        @keydown.down="moveDown"
        @keydown.up="moveUp"
        @keydown.enter="selectItem"
        placeholder="Выберите профиль"
      >
    </div>
    
    <ul v-if="showSuggestions" class="suggestions">
      <li 
        v-for="(item, index) in filteredItems"
        :key="item.id"
        :class="{ active: index === activeIndex }"
        @click="selectItem(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    modelValue: [String, Number]
  },
  emits: ['update:modelValue'],
  data() {
    return {
      searchQuery: '',
      showSuggestions: false,
      activeIndex: -1
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => 
        item.label.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    handleInput() {
      this.showSuggestions = true
    },
    moveDown() {
      this.activeIndex = Math.min(this.activeIndex + 1, this.filteredItems.length - 1)
    },
    moveUp() {
      this.activeIndex = Math.max(this.activeIndex - 1, -1)
    },
    selectItem(item) {
      if (!item) return
      this.$emit('update:modelValue', item.id)
      this.searchQuery = ''
      this.showSuggestions = false
    }
  }
}
</script>

<style scoped>
.custom-select {
  width: 100%;
  margin-bottom: 15px;
  position: relative;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.suggestions {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  background: white;
  z-index: 1000;
  margin-top: 4px;
  list-style: none;
  padding: 0;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li.active {
  background-color: #f0f0f0;
}

@media (prefers-color-scheme: dark) {
  .suggestions {
    background: #2a2a2a;
    border-color: #444;
  }
  
  .suggestions li.active {
    background-color: #333;
  }
}
</style>