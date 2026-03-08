<template>
  <div
    v-if="!isTouch"
    ref="cursorEl"
    :class="['glass-cursor', { 'glass-cursor--visible': isVisible, 'glass-cursor--hover': isHovering }]"
    aria-hidden="true"
  >
    <!-- SVG liquid distortion filter -->
    <svg width="0" height="0" style="position:absolute">
      <filter id="liquid-distortion" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
        <feTurbulence type="turbulence" baseFrequency="0.015 0.015" numOctaves="3" seed="2" result="turbulence" />
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="18" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>

    <!-- Invisible liquid distortion area -->
    <div class="glass-cursor__ripple" />
    <!-- Visible glass circle -->
    <div class="glass-cursor__circle" />
  </div>
</template>

<script setup lang="ts">
const { cursorEl, isVisible, isHovering, isTouch } = useCursorTracker()
</script>
