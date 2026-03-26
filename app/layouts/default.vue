<template>
  <div class="app-layout">
    <AnnouncementBar />
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <AppFooter />
    <KitLancementModal
      :visible="kitIntent.triggered.value && !kitIntent.dismissed.value"
      @close="kitIntent.dismiss()"
    />
  </div>
</template>

<script setup lang="ts">
import KitLancementModal from '~/components/ui/KitLancementModal.vue'

const kitIntent = useExitIntent({
  delay: 6000,
  scrollThreshold: 0.6,
  storagePrefix: 'kit',
  cooldown: 5 * 60 * 1000,
  excludeRoutes: ['/paiement', '/remerciement', '/formation-gratuite', '/blog/*'],
  perRoute: true,
})
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
}

.main-content {
  flex: 1;
}
</style>
