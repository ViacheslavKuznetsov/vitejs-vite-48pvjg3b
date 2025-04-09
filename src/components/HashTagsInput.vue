<template>
    <div class="hashtags-container">
      <!-- Список существующих тегов -->
      <div v-if="tags.length > 0" class="tags-list">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="tag"
          @click="removeTag(index)"
        >
          #{{ tag }}
          <span class="remove-icon">×</span>
        </span>
      </div>
  
      <!-- Поле ввода новых тегов -->
      <input
        type="text"
        v-model="newTag"
        @keydown.space.prevent="addTag"
        placeholder="Добавьте хэш-теги"
        class="tag-input"
      >
    </div>
  </template>
  
  <script>
  export default {
    name: 'HashTagsInput',
    props: {
      modelValue: {
        type: Array,
        default: () => []
      }
    },
    emits: ['update:modelValue'],
    data() {
      return {
        newTag: ''
      }
    },
    computed: {
      tags() {
        return this.modelValue
      }
    },
    methods: {
      addTag() {
        const tag = this.newTag.trim()
        if (tag) {
          this.$emit('update:modelValue', [...this.tags, tag])
          this.newTag = ''
        }
      },
      removeTag(index) {
        const newTags = this.tags.filter((_, i) => i !== index)
        this.$emit('update:modelValue', newTags)
      }
    }
  }
  </script>
  
  <style scoped>
  .hashtags-container {
    width: 100%;
    margin-bottom: 15px;
  }
  
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    background-color: #f0f0f0;
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
  }
  
  .tag:hover {
    background-color: #e0e0e0;
  }
  
  .remove-icon {
    margin-left: 6px;
    font-weight: bold;
    color: #666;
  }
  
  .tag-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  @media (prefers-color-scheme: dark) {
    .tag {
      background-color: #333;
      color: white;
    }
    
    .tag:hover {
      background-color: #444;
    }
  
    .remove-icon {
      color: #aaa;
    }
  }

  .hashtags-container {
  width: 100%;
}

.tag-input {
  width: 100%;
}
  </style>