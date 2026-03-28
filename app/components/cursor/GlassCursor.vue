<template>
  <div
    v-if="!isTouch"
    ref="cursorEl"
    :class="['glass-cursor', { 'glass-cursor--visible': isVisible, 'glass-cursor--hover': isHovering }]"
    aria-hidden="true"
  >
    <div class="glass-cursor__circle" />
  </div>
</template>

<script setup lang="ts">
const { cursorEl, isVisible, isHovering, isTouch } = useCursorTracker()
</script>
