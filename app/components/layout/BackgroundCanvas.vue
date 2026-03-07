<template>
  <div class="bg-canvas" aria-hidden="true">
    <div class="bg-canvas__grid" />
    <div class="bg-canvas__glow bg-canvas__glow--1" />
    <div class="bg-canvas__glow bg-canvas__glow--2" />
    <div class="bg-canvas__glow bg-canvas__glow--3" />
    <div class="bg-canvas__glow bg-canvas__glow--4" />
    <div class="bg-canvas__glow bg-canvas__glow--5" />
    <div class="bg-canvas__glow bg-canvas__glow--6" />
    <div class="bg-canvas__glow bg-canvas__glow--7" />
    <div class="bg-canvas__glow bg-canvas__glow--8" />
    <div class="bg-canvas__glow bg-canvas__glow--9" />
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
      linear-gradient(rgba($purple-light, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba($purple-light, 0.05) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at 75% 8%, rgba(0,0,0,0.45) 0%, transparent 30%);
    -webkit-mask-image: radial-gradient(ellipse at 75% 8%, rgba(0,0,0,0.45) 0%, transparent 30%);

    @media (max-width: 768px) {
      display: none;
    }
  }

  // Flowing glow blobs — warm purple + orange blend, clearly visible
  &__glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    // Top-right — strong purple-orange blend (hero area)
    &--1 {
      width: 1100px;
      height: 1000px;
      top: -250px;
      right: -150px;
      background: radial-gradient(ellipse, rgba($purple-light, 0.28) 0%, rgba($orange-light, 0.12) 45%, transparent 70%);
      filter: blur(100px);
      animation: float 22s ease-in-out infinite;

      @media (max-width: 768px) {
        width: 600px;
        height: 550px;
        background: radial-gradient(ellipse, rgba($purple-light, 0.20) 0%, rgba($orange-light, 0.08) 45%, transparent 70%);
      }
    }

    // Top-left — visible clair purple wash
    &--2 {
      width: 800px;
      height: 750px;
      top: -50px;
      left: -200px;
      background: radial-gradient(ellipse, rgba($purple-light, 0.22) 0%, rgba($purple, 0.08) 50%, transparent 75%);
      filter: blur(110px);
      animation: float 28s ease-in-out infinite reverse;

      @media (max-width: 768px) {
        width: 450px;
        height: 420px;
        background: radial-gradient(ellipse, rgba($purple-light, 0.15) 0%, transparent 70%);
      }
    }

    // Mid-right — warm orange accent, clearly visible
    &--3 {
      width: 850px;
      height: 800px;
      top: 18%;
      right: -120px;
      background: radial-gradient(ellipse, rgba($orange, 0.18) 0%, rgba($orange-light, 0.08) 40%, transparent 65%);
      filter: blur(100px);
      animation: float 24s ease-in-out infinite;
      animation-delay: -8s;

      @media (max-width: 768px) {
        width: 480px;
        height: 450px;
        background: radial-gradient(ellipse, rgba($orange, 0.12) 0%, transparent 60%);
      }
    }

    // Mid-left — strong clair purple with warm edge
    &--4 {
      width: 900px;
      height: 800px;
      top: 28%;
      left: -280px;
      background: radial-gradient(ellipse, rgba($purple-light, 0.24) 0%, rgba($orange-light, 0.06) 50%, transparent 72%);
      filter: blur(110px);
      animation: float 26s ease-in-out infinite reverse;

      @media (max-width: 768px) {
        width: 480px;
        height: 430px;
        background: radial-gradient(ellipse, rgba($purple-light, 0.16) 0%, transparent 65%);
      }
    }

    // Center — visible warm purple-orange diffusion
    &--5 {
      width: 1000px;
      height: 600px;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: radial-gradient(ellipse, rgba($purple-light, 0.16) 0%, rgba($orange, 0.06) 40%, transparent 68%);
      filter: blur(120px);
      animation: float 30s ease-in-out infinite;
      animation-delay: -12s;

      @media (max-width: 768px) {
        width: 500px;
        height: 350px;
        background: radial-gradient(ellipse, rgba($purple-light, 0.10) 0%, transparent 60%);
      }
    }

    // Lower-right — orange-warm accent, clearly visible
    &--6 {
      width: 800px;
      height: 750px;
      bottom: 22%;
      right: -80px;
      background: radial-gradient(ellipse, rgba($orange-light, 0.18) 0%, rgba($purple-light, 0.06) 45%, transparent 68%);
      filter: blur(100px);
      animation: float 23s ease-in-out infinite;
      animation-delay: -6s;

      @media (max-width: 768px) {
        width: 430px;
        height: 400px;
        background: radial-gradient(ellipse, rgba($orange-light, 0.12) 0%, transparent 60%);
      }
    }

    // Lower-left — strong clair purple
    &--7 {
      width: 900px;
      height: 850px;
      bottom: 12%;
      left: -200px;
      background: radial-gradient(ellipse, rgba($purple, 0.20) 0%, rgba($purple-light, 0.10) 40%, transparent 68%);
      filter: blur(110px);
      animation: float 20s ease-in-out infinite;
      animation-delay: -5s;

      @media (max-width: 768px) {
        width: 480px;
        height: 450px;
        background: radial-gradient(ellipse, rgba($purple, 0.14) 0%, transparent 60%);
      }
    }

    // Bottom-right — warm purple-orange blend
    &--8 {
      width: 1050px;
      height: 800px;
      bottom: -280px;
      right: 5%;
      background: radial-gradient(ellipse, rgba($purple-light, 0.22) 0%, rgba($orange, 0.10) 40%, transparent 68%);
      filter: blur(110px);
      animation: float 25s ease-in-out infinite reverse;
      animation-delay: -10s;

      @media (max-width: 768px) {
        width: 520px;
        height: 420px;
        background: radial-gradient(ellipse, rgba($purple-light, 0.15) 0%, transparent 60%);
      }
    }

    // Bottom-left — warm accent
    &--9 {
      width: 700px;
      height: 600px;
      bottom: -80px;
      left: 10%;
      background: radial-gradient(ellipse, rgba($orange, 0.14) 0%, rgba($purple-light, 0.06) 45%, transparent 68%);
      filter: blur(110px);
      animation: float 27s ease-in-out infinite;
      animation-delay: -15s;

      @media (max-width: 768px) {
        width: 400px;
        height: 340px;
        background: radial-gradient(ellipse, rgba($orange, 0.09) 0%, transparent 60%);
      }
    }
  }
}
</style>
