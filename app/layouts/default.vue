<template>
  <div class="app-layout">
    <BackgroundCanvas />
    <AnnouncementBar />
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
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
