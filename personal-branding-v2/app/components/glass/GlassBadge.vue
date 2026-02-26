<template>
  <span :class="['gbadge', `gbadge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'orange' | 'purple'
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
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: $radius-full;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;

  &--default {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: $text-white;
  }

  &--orange {
    background: rgba($orange, 0.15);
    border: 1px solid rgba($orange, 0.3);
    color: $orange-light;
  }

  &--purple {
    background: rgba($purple, 0.15);
    border: 1px solid rgba($purple, 0.3);
    color: $purple-light;
  }
}
</style>
