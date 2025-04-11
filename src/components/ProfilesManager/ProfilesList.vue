<template>
  <div class="profiles-list">
    <div class="section-header">
      <h2>Группы профилей</h2>
    </div>

    <div class="groups-container">
      <div 
        v-for="group in groups"
        :key="group.id"
        class="group-item"
      >
        <div class="group-header" @click="toggleGroup(group.id)">
          <div class="icon-title-wrapper">
            <img 
              src="@/assets/icons/folder.svg" 
              class="folder-icon"
              alt="Группа"
            >
            <span class="group-title">{{ group.name }}</span>
          </div>
          <span class="group-toggle">{{ group.isOpen ? '−' : '+' }}</span>
        </div>

        <div v-show="group.isOpen" class="group-profiles">
          <div 
            v-for="profile in group.profiles"
            :key="profile.id"
            class="profile-item"
          >
            <img 
              src="@/assets/icons/user.svg" 
              class="profile-icon"
              alt="Профиль"
            >
            <div class="profile-info">
              <h3 class="profile-name">{{ profile.name }}</h3>
              <p class="profile-username">{{ profile.username }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleGroup(groupId) {
      this.$emit('toggle-group', groupId)
    }
  },
  emits: ['toggle-group']
}
</script>

<style scoped>
.groups-container {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px;
}

.group-item {
  margin-bottom: 12px;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--bg-grey);
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 44px;
}

.group-header:hover {
  background-color: var(--bg-light-grey);
}

.icon-title-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.folder-icon {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
}

.group-title {
  font-weight: 500;
  color: var(--text-primary);
}

.group-toggle {
  font-weight: bold;
  color: var(--text-secondary);
  font-size: 1.2em;
}

.group-profiles {
  padding-left: 32px;
  margin-top: 8px;
}

.profile-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  height: 44px;
  background: var(--bg-light);
  border-radius: 6px;
  margin: 4px 0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.profile-item:hover {
  background-color: var(--bg-grey)
}

.profile-icon {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.profile-info {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.profile-name {
  font-size: 0.95em;
  color: var(--text-primary);
  margin: 0;
  min-width: 120px;
}

.profile-username {
  font-size: 0.85em;
  color: var(--text-secondary);
  margin: 0;
  font-family: monospace;
}





</style>