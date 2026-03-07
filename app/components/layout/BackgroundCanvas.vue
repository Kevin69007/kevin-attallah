<template>
  <div class="bg-canvas" aria-hidden="true">
    <div class="bg-canvas__grid" />
    <div class="bg-canvas__beam" />
    <div class="bg-canvas__streak" />
    <div class="bg-canvas__glow bg-canvas__glow--top" />
    <div class="bg-canvas__glow bg-canvas__glow--mid" />
    <div class="bg-canvas__glow bg-canvas__glow--bottom" />
  </div>
</template>

<style lang="scss" scoped>
.bg-canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  background: $bg-page;

  // Grid pattern — subtle squares, masked to top-right area only
  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba($purple, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba($purple, 0.08) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at 75% 8%, rgba(0,0,0,0.6) 0%, transparent 40%);
    -webkit-mask-image: radial-gradient(ellipse at 75% 8%, rgba(0,0,0,0.6) 0%, transparent 40%);

    @media (max-width: 768px) {
      display: none;
    }
  }

  // Diagonal light beam — broad luminous band cutting across the page
  &__beam {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 25%,
      rgba($purple, 0.06) 35%,
      rgba($purple, 0.14) 44%,
      rgba($orange, 0.12) 50%,
      rgba($orange, 0.14) 56%,
      rgba($purple, 0.06) 65%,
      transparent 75%
    );

    @media (max-width: 768px) {
      opacity: 0.6;
    }
  }

  // Thin bright diagonal streak — the visible "light line"
  &__streak {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 46%,
      rgba(255, 255, 255, 0.08) 49%,
      rgba(255, 255, 255, 0.18) 50%,
      rgba(255, 255, 255, 0.08) 51%,
      transparent 54%
    );
    pointer-events: none;

    @media (max-width: 768px) {
      opacity: 0.5;
    }
  }

  // Flowing color glow blobs — organic color mixing
  &__glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(130px);
    pointer-events: none;

    // Purple glow — top-right area
    &--top {
      width: 800px;
      height: 800px;
      top: -250px;
      right: -200px;
      background: rgba($purple, 0.15);
      animation: float 20s ease-in-out infinite;

      @media (max-width: 768px) {
        width: 450px;
        height: 450px;
        background: rgba($purple, 0.12);
      }
    }

    // Orange glow — mid-left
    &--mid {
      width: 700px;
      height: 700px;
      top: 40%;
      left: -250px;
      background: rgba($orange, 0.10);
      animation: float 25s ease-in-out infinite reverse;

      @media (max-width: 768px) {
        width: 400px;
        height: 400px;
        background: rgba($orange, 0.08);
      }
    }

    // Purple glow — bottom area
    &--bottom {
      width: 900px;
      height: 700px;
      bottom: -200px;
      right: 10%;
      background: rgba($purple, 0.12);
      animation: float 22s ease-in-out infinite;

      @media (max-width: 768px) {
        width: 500px;
        height: 400px;
        background: rgba($purple, 0.10);
      }
    }
  }
}
</style>
