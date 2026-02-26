<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? `${title} — Kevin Attallah` : 'Kevin Attallah — Formations Professionnelles',
})
</script>
