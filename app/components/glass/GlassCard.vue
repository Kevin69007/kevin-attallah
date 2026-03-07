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
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.06),
      0 1px 3px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.7),
      inset 0 -1px 0 rgba(0, 0, 0, 0.02);
  }

  &--hoverable:hover {
    transform: translateY(-4px);
  }

  &--hoverable.glass-card-component--dark:hover {
    border-color: rgba(108, 43, 217, 0.3);
    box-shadow: $shadow-glow-purple;
  }

  &--hoverable.glass-card-component--light:hover {
    background: rgba(255, 255, 255, 0.55);
    border-color: rgba($purple, 0.25);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.08),
      0 2px 8px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 640px) {
    padding: 24px;
  }
}
</style>
