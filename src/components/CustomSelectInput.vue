<template>
  <div class="custom-select">
    <div class="selected-wrapper">
      <span 
        v-for="(item, index) in selectedItems" 
        :key="index"
        class="selected-item"
        @click="removeItem(index)"
      >
        {{ getItemLabel(item) }}
        <span class="remove">×</span>
      </span>

      <div class="input-wrapper">
        <input
          type="text"
          v-model="searchQuery"
          @input="handleInput"
          @keydown.down="moveDown"
          @keydown.up="moveUp"
          @keydown.enter="selectItem"
          @keydown.esc="handleEscape"
          @blur="handleBlur"
          placeholder="Выберите профиль"
          @focus="showSuggestions = true"
        >
        <button 
          class="toggle-button"
          @click="toggleList"
          type="button"
          :class="{ rotated: showSuggestions }"
        >
          ▼
        </button>
      </div>
    </div>

    <div v-if="showSuggestions" class="suggestions-container">
      <ul v-if="filteredItems.length > 0" class="suggestions">
        <li 
          v-for="(item, index) in filteredItems"
          :key="item.id"
          :class="{ active: index === activeIndex }"
          @click="selectItem(item)"
        >
          {{ item.label }}
        </li>
      </ul>
      <div v-else class="no-results">
        Нет подходящих профилей
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    modelValue: {
      type: Array,
      default: () => []
    }
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
    selectedItems() {
      return this.modelValue.map(id => 
        this.items.find(item => item.id === id)
      )
    },
    filteredItems() {
      return this.items.filter(item => 
        item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        !this.modelValue.includes(item.id)
      )
    }
  },
  methods: {
    getItemLabel(item) {
      return item?.label || 'Unknown'
    },
    handleInput() {
      this.showSuggestions = true
      this.activeIndex = -1
    },
    toggleList() {
      this.showSuggestions = !this.showSuggestions
    },
    moveDown() {
      if (!this.showSuggestions && this.filteredItems.length > 0) {
        this.showSuggestions = true
        this.activeIndex = 0 // Устанавливаем первый элемент активным
        return
      }
      
      if (this.filteredItems.length === 0) return
      
      this.activeIndex = Math.min(
        this.activeIndex + 1,
        this.filteredItems.length - 1
      )
    },
    moveUp() {
      this.activeIndex = Math.max(this.activeIndex - 1, -1)
    },
    selectItem() {
      if (this.filteredItems.length === 0) return
      
      // Берем элемент по активному индексу или первый элемент списка
      const item = this.activeIndex >= 0 
        ? this.filteredItems[this.activeIndex]
        : this.filteredItems[0]

      if (!item) return
      
      this.$emit('update:modelValue', [...this.modelValue, item.id])
      this.searchQuery = ''
      this.showSuggestions = false
      this.activeIndex = -1 // Сбрасываем активный индекс
    },
    removeItem(index) {
      const newValues = [...this.modelValue]
      newValues.splice(index, 1)
      this.$emit('update:modelValue', newValues)
    },
    handleEscape() {
      if (this.showSuggestions) {
        this.showSuggestions = false
        this.activeIndex = -1
      }
    },
    handleBlur() {
      // Небольшая задержка для обработки клика на элементы списка
      setTimeout(() => {
        this.showSuggestions = false
        this.activeIndex = -1
      }, 200)
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

.suggestions-container {
  position: absolute;
  width: 100%;
  z-index: 1000;
}

.no-results {
  padding: 12px;
  color: var(--text-secondary);
  font-style: italic;
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-top: 4px;
}

.input-wrapper {
  position: relative;
  flex: 1;
  min-width: 150px;
}

.toggle-button {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  transition: transform 0.2s;
  width: 24px;
  height: 24px;
  margin-top: 0;
}

.toggle-button.rotated {
  transform: translateY(-50%) rotate(180deg);
}

.toggle-button:hover {
  color: var(--text-primary);
}

.selected-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 8px;
  min-height: 42px;
}

.selected-item {
  background: var(--bg-grey);
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.selected-item:hover {
  background-color: var(--bg-hover);
}

.remove {
  margin-left: 6px;
  font-weight: bold;
  color: var(--text-secondary);
}

.suggestions {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  background: var(--bg-light);
  z-index: 1000;
  margin-top: 4px;
  list-style: none;
  padding: 0;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
  color: var(--text-primary);
  background: var(--bg-light);
}

.suggestions li.active {
  background-color: var(--bg-grey);
}

@media (prefers-color-scheme: dark) {
  .suggestions li.active {
    background-color: var(--bg-dark);
  }
}

input {
  border: none;
  outline: none;
  padding: 4px 30px 4px 4px;
  width: 100%;
  min-width: 120px;
  background: transparent;
  color: var(--text-primary);
}
</style>