<template>
    <div class="notification-container">
      <TransitionGroup name="notification">
        <div 
          v-for="notification in notifications"
          :key="notification.id"
          class="notification"
          :class="notification.type"
          role="alert"
        >
          <span class="icon">
            <template v-if="notification.type === 'success'">✓</template>
            <template v-else-if="notification.type === 'error'">!</template>
          </span>
          <div class="content">
            <h4 v-if="notification.title" class="title">
              {{ notification.title }}
            </h4>
            <p class="message">{{ notification.message }}</p>
          </div>
          <button 
            class="close-button"
            @click="removeNotification(notification.id)"
            aria-label="Закрыть"
          >
            &times;
          </button>
        </div>
      </TransitionGroup>
    </div>
  </template>
  
  <script>
  import { useNotificationStore } from '@/stores/notification'
  
  export default {
    setup() {
      const store = useNotificationStore()
      return {
        notifications: store.notifications,
        removeNotification: store.remove
      }
    }
  }
  </script>
  
  <style scoped>
  .notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 400px;
    width: 90%;
  }
  
  .notification {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    border-radius: 8px;
    background: var(--bg-light);
    box-shadow: var(--shadow-md);
    border-left: 4px solid;
  }
  
  .notification.success {
    border-color: var(--success-color);
    background: #f0faf0;
  }
  
  .notification.error {
    border-color: var(--error-color);
    background: #fdf0f0;
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    font-weight: bold;
  }
  
  .success .icon {
    background: var(--success-color);
    color: white;
  }
  
  .error .icon {
    background: var(--error-color);
    color: white;
  }
  
  .content {
    flex: 1;
  }
  
  .title {
    font-size: 14px;
    margin-bottom: 4px;
    color: var(--text-primary);
  }
  
  .message {
    font-size: 13px;
    color: var(--text-secondary);
  }
  
  .close-button {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0 4px;
  }
  
  .notification-enter-active,
  .notification-leave-active {
    transition: all 0.3s ease;
  }
  
  .notification-enter-from,
  .notification-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  
  @media (prefers-color-scheme: dark) {
    .notification {
      background: var(--bg-dark);
    }
    
    .success {
      border-color: var(--success-color);
      background: #1a2e1a;
    }
  
    .error {
      border-color: var(--error-color);
      background: #2e1a1a;
    }
  }
  </style>