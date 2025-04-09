<template>
    <div class="loading-spinner" :style="{ width: size, height: size }">
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="4"/>
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      size: {
        type: String,
        default: '24px'
      }
    }
  }
  </script>
  
  <style scoped>
  .loading-spinner {
    display: inline-block;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  svg {
    width: 100%;
    height: 100%;
  }
  
  circle {
    stroke: currentColor;
    stroke-linecap: round;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  </style>