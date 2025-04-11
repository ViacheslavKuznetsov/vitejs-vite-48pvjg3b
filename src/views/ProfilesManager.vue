<template>
  <div class="page-container">
    <h1 class="page-title">Мои профили</h1>
    
    <div class="content-wrapper">
      <!-- Левая колонка -->
      <div class="left-column">
        <ProfilesList 
          :groups="groups"
          @toggle-group="handleToggleGroup"
        />
        <AddProfileSection
        />
      </div>

      <!-- Правая колонка -->
      <ProfileDetails :selected-profile="selectedProfile" />
    </div>
  </div>
</template>

<script>
import ProfilesList from '@/components/ProfilesManager/ProfilesList.vue'
import AddProfileSection from '@/components/ProfilesManager/AddProfileSection.vue'
import ProfileDetails from '@/components/ProfilesManager/ProfileDetails.vue'

export default {
  components: {
    ProfilesList,
    AddProfileSection,
    ProfileDetails
  },
  data() {
    return {
      groups: [
      {
        id: 1,
        name: 'FXR LXVE',
        isOpen: false,
        profiles: [
          { id: 1, platform: 'vk', name: 'VK', username: '@fxr_lxve', ownerID: '2121412' },
          { id: 2, platform: 'instagram', name: 'Instagram', username: '@fxr.lxve', ownerID: '135325' }
        ]
      },
      {
        id: 2,
        name: 'dmitry.juda',
        isOpen: false,
        profiles: [
          { id: 1, platform: 'youtube', name: 'YouTube shorts', username: '@dmitry.juda', ownerID: '3413' },
          { id: 2, platform: 'instagram', name: 'Instagram reels', username: '@dmitry.juda', ownerID: '174' }
        ]
      }
    ],
      selectedProfile: null
    }
  },
  methods: {
    handleToggleGroup(groupId) {
      this.groups = this.groups.map(group => 
        group.id === groupId 
          ? { ...group, isOpen: !group.isOpen }
          : group
      )
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.left-column {
  display: grid;
  gap: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border-color);
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    padding: 10px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>