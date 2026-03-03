<template>
  <div :class="['glass-card-component', `glass-card-component--${variant}`, { 'glass-card-component--hoverable': hoverable }]">
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
  border-radius: $radius-lg;
  transition: all 0.5s $ease-smooth;

  &--dark {
    background: $glass-bg;
    backdrop-filter: blur($glass-blur);
    -webkit-backdrop-filter: blur($glass-blur);
    border: 1px solid $glass-border;
    box-shadow: $shadow-glass;
  }

  &--light {
    background: $glass-bg-light;
    backdrop-filter: blur($glass-blur);
    -webkit-backdrop-filter: blur($glass-blur);
    border: 1px solid $glass-border-light;
    box-shadow: $shadow-md;
  }

  &--hoverable:hover {
    transform: translateY(-4px);
  }

  &--hoverable.glass-card-component--dark:hover {
    border-color: rgba(108, 43, 217, 0.3);
    box-shadow: $shadow-glow-purple;
  }

  &--hoverable.glass-card-component--light:hover {
    box-shadow: $shadow-lg;
  }

  @media (max-width: 640px) {
    padding: 24px;
  }
}
</style>
