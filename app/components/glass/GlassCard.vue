<template>
  <div :class="[
    'glass-card-component',
    variant === 'light' ? 'glass-card-light' : 'glass-card',
    { 'glass-card-component--no-hover': !hoverable }
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'dark' | 'light'
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'dark',
  hoverable: true,
})
</script>

<style lang="scss" scoped>
.glass-card-component {
  padding: 32px;

  &--no-hover:hover {
    transform: none;
  }

  @media (max-width: 640px) {
    padding: 24px;
  }
}
</style>
