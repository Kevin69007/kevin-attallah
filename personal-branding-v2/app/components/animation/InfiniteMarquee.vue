<template>
  <div class="marquee" :class="{ 'marquee--paused': isPaused }" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
    <div class="marquee__track" ref="track">
      <div class="marquee__content">
        <slot />
      </div>
      <div class="marquee__content" aria-hidden="true">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  speed?: number
  direction?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  speed: 30,
  direction: 'left',
})

const isPaused = ref(false)
const track = ref<HTMLElement | null>(null)
</script>

<style lang="scss" scoped>
.marquee {
  overflow: hidden;
  width: 100%;

  &__track {
    display: flex;
    width: max-content;
    animation: marquee v-bind('`${60 / speed}s`') linear infinite;
  }

  &--paused &__track {
    animation-play-state: paused;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 48px;
    padding: 0 24px;
    white-space: nowrap;
  }
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
