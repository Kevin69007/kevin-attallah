<template>
  <div id="app-root">
    <GlassCursor />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? `${title} — Kevin Attallah` : 'Kevin Attallah — Formations Professionnelles',
})
</script>

<style scoped>
/* Removed Version Switcher Styles */
</style>
