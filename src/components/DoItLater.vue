<template>
  <div class="do-it-later">
    <label class="checkbox-label">
      <input 
        type="checkbox" 
        :checked="modelValue" 
        @change="$emit('update:modelValue', $event.target.checked)"
      >
      Отложенная публикация
    </label>
    
    <div v-if="modelValue" class="datetime-fields">
      <input 
        type="date" 
        :value="date" 
        @input="$emit('update:date', $event.target.value)"
      >
      <input 
        type="time" 
        :value="time" 
        @input="$emit('update:time', $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    date: String,
    time: String
  },
  emits: ['update:modelValue', 'update:date', 'update:time']
}
</script>

<style scoped>
.do-it-later {
  margin-bottom: 20px;
}

.checkbox-label {
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
}

.datetime-fields {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.datetime-fields input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .datetime-fields {
    flex-direction: column;
  }
}
</style>