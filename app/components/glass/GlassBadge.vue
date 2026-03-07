<template>
  <span :class="['gbadge', `gbadge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'orange' | 'purple' | 'light' | 'orange-light' | 'purple-light'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
.gbadge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: $radius-full;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;

  // Dark background variants
  &--default {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: $text-white;
    animation: border-glow 6s ease-in-out infinite;
  }

  &--orange {
    background: rgba($orange, 0.15);
    border: 1px solid rgba($orange, 0.3);
    color: $orange-light;
    animation: border-glow 6s ease-in-out infinite;
  }

  &--purple {
    background: rgba($purple, 0.15);
    border: 1px solid rgba($purple, 0.3);
    color: $purple-light;
    animation: border-glow 6s ease-in-out infinite;
  }

  // Light background variants
  &--light {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: $text-body;
    animation: border-glow 6s ease-in-out infinite;
  }

  &--orange-light {
    background: rgba($orange, 0.08);
    border: 1px solid rgba($orange, 0.15);
    color: $orange;
    animation: border-glow 6s ease-in-out infinite;
  }

  &--purple-light {
    background: rgba($purple, 0.08);
    border: 1px solid rgba($purple, 0.15);
    color: $purple;
    animation: border-glow 6s ease-in-out infinite;
  }
}
</style>
