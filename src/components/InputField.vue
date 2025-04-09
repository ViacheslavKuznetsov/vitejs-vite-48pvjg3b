<template>
  <div class="input-container">
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="input-field"
      :type="inputType"
    />
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    modelValue: [String, Number],
    placeholder: String,
    type: {
      type: String,
      default: 'input',
      validator: (value) => ['input', 'textarea', 'password'].includes(value)
    },
    error: String
  },
  computed: {
    inputType() {
      return this.type === 'input' ? 'text' : this.type
    }
  }
}
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 16px;
}

.input-field:focus {
  outline: none;
  border-color: #646cff;
  box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
}

textarea.input-field {
  min-height: 100px;
  resize: vertical;
}
.input-container {
  margin-bottom: 1rem;
}

.error-message {
  color: #ff4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  min-height: 1rem;
}
</style>