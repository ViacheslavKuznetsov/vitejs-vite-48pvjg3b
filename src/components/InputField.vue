<template>
    <component
      :is="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="input-field"
      :class="{ 'textarea-field': type === 'textarea' }"
    />
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
        validator: (value) => ['input', 'textarea'].includes(value)
      }
    },
    emits: ['update:modelValue']
  }
  </script>
  
  <style scoped>
  .input-field {
    max-width: none;
  }
    .text-input, textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    }

    textarea {
    min-height: 100px;
    resize: vertical;
    }

  </style>