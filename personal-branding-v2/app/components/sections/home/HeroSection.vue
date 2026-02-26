<template>
  <section class="hero section--dark">
    <!-- Background orbs -->
    <div class="hero__bg">
      <FloatingElement :amplitude="30" :duration="6">
        <div class="orb orb--purple hero__orb hero__orb--1"></div>
      </FloatingElement>
      <FloatingElement :amplitude="20" :duration="8">
        <div class="orb orb--orange hero__orb hero__orb--2"></div>
      </FloatingElement>
      <div class="orb orb--purple hero__orb hero__orb--3"></div>
    </div>

    <div class="container hero__grid">
      <!-- Left: Text content -->
      <div class="hero__content">
        <ScrollReveal :delay="0.1">
          <GlassBadge variant="orange">
            <Award :size="14" />
            Formations éligibles CPF
          </GlassBadge>
        </ScrollReveal>

        <TextSplit
          text="Lance-toi avant que l'IA ne fasse ton business à ta place"
          tag="h1"
          :delay="0.3"
          :stagger="0.02"
          class="hero__title"
        />

        <ScrollReveal :delay="0.6">
          <p class="hero__subtitle">
            +60 formations certifiantes éligibles CPF. De l'idée au décollage,
            on t'accompagne avec l'IA comme copilote.
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="0.8">
          <div class="hero__ctas">
            <MagneticButton>
              <AppButton variant="primary" size="lg" to="/formations">
                Voir les formations
                <ArrowRight :size="20" />
              </AppButton>
            </MagneticButton>
            <MagneticButton>
              <AppButton variant="ghost" size="lg" href="https://calendar.app.google/nssA5fmGCx92BebE6">
                Parler à Kevin
              </AppButton>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="1">
          <div class="hero__trust">
            <div class="hero__trust-item glass-badge">
              <Users :size="16" />
              <span><strong>2100+</strong> entrepreneurs formés</span>
            </div>
            <div class="hero__trust-item glass-badge">
              <Clock :size="16" />
              <span><strong>15000+</strong> heures de formation</span>
            </div>
            <div class="hero__trust-item glass-badge">
              <Star :size="16" />
              <span><strong>4.8/5</strong> de satisfaction</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <!-- Right: Photo with orbital particles -->
      <ScrollReveal direction="right" :delay="0.5" class="hero__photo-wrap">
        <div class="hero__photo">
          <!-- Pulsing gradient halo -->
          <div class="hero__photo-halo"></div>

          <!-- Spinning gradient border ring -->
          <div class="hero__photo-ring"></div>

          <!-- Photo -->
          <NuxtImg src="/img/banner-right-img.jpg" alt="Kevin Attallah" class="hero__photo-img" format="webp" quality="80" />

          <!-- Inner orbit ring — 3 particles -->
          <div class="hero__orbit hero__orbit--inner">
            <span class="hero__particle hero__particle--1"></span>
            <span class="hero__particle hero__particle--2"></span>
            <span class="hero__particle hero__particle--3"></span>
          </div>

          <!-- Outer orbit ring — 2 particles (reverse) -->
          <div class="hero__orbit hero__orbit--outer">
            <span class="hero__particle hero__particle--4"></span>
            <span class="hero__particle hero__particle--5"></span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Award, Users, Clock, Star } from 'lucide-vue-next'
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: $gradient-hero;
  padding-top: 100px;
  padding-bottom: 60px;

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;
    &--1 { width: 500px; height: 500px; top: -10%; right: -5%; opacity: 0.3; }
    &--2 { width: 300px; height: 300px; bottom: 10%; left: -5%; opacity: 0.25; }
    &--3 { width: 200px; height: 200px; top: 50%; left: 40%; opacity: 0.1; animation: pulse-glow 4s ease-in-out infinite; }
  }

  &__grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__content {
    @media (max-width: 1024px) { order: 2; }
  }

  &__title {
    font-size: $h1;
    color: $text-white;
    margin-top: 24px;
    margin-bottom: 24px;
    line-height: 1.1;
  }

  &__subtitle {
    font-size: $body-lg;
    color: $text-on-dark-muted;
    max-width: 550px;
    line-height: 1.7;
    margin-bottom: 40px;

    @media (max-width: 1024px) {
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__ctas {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 48px;

    @media (max-width: 1024px) { justify-content: center; }
  }

  &__trust {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    @media (max-width: 1024px) { justify-content: center; }
  }

  &__trust-item {
    font-size: $xs;
    strong { color: $text-white; }
  }

  // Photo
  &__photo-wrap {
    @media (max-width: 1024px) { order: 1; }
  }

  &__photo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 440px;
    margin: 0 auto;
  }

  // Pulsing gradient halo behind photo
  &__photo-halo {
    position: absolute;
    inset: -40px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba($purple, 0.15) 0%,
      rgba($orange, 0.08) 40%,
      transparent 70%
    );
    animation: pulse-glow 4s ease-in-out infinite;
    pointer-events: none;
  }

  &__photo-ring {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 3px solid transparent;
    background: linear-gradient(135deg, $purple, $orange) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.6;
    animation: spin 20s linear infinite;
  }

  &__photo-img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 60px rgba($purple, 0.3), 0 0 120px rgba($purple, 0.1);
    position: relative;
    z-index: 2;
  }

  // Orbit rings
  &__orbit {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    pointer-events: none;

    &--inner {
      inset: -20px;
    }

    &--outer {
      inset: -50px;
    }
  }

  // Orbital particles
  &__particle {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    z-index: 3;

    // Inner orbit particles
    &--1 {
      width: 8px;
      height: 8px;
      background: $purple;
      box-shadow: 0 0 16px $purple-glow, 0 0 32px rgba($purple, 0.2);
      --orbit-radius: 230px;
      animation: orbit 8s linear infinite;
      margin: -4px 0 0 -4px;

      @media (max-width: 1024px) { --orbit-radius: 180px; }
      @media (max-width: 640px) { --orbit-radius: 140px; }
    }

    &--2 {
      width: 6px;
      height: 6px;
      background: $orange;
      box-shadow: 0 0 12px $orange-glow, 0 0 24px rgba($orange, 0.2);
      --orbit-radius: 235px;
      animation: orbit 12s linear infinite;
      animation-delay: -4s;
      margin: -3px 0 0 -3px;

      @media (max-width: 1024px) { --orbit-radius: 185px; }
      @media (max-width: 640px) { --orbit-radius: 145px; }
    }

    &--3 {
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      --orbit-radius: 225px;
      animation: orbit 10s linear infinite;
      animation-delay: -7s;
      margin: -2.5px 0 0 -2.5px;

      @media (max-width: 1024px) { --orbit-radius: 175px; }
      @media (max-width: 640px) { --orbit-radius: 135px; }
    }

    // Outer orbit particles (reverse direction)
    &--4 {
      width: 12px;
      height: 12px;
      background: $orange;
      box-shadow: 0 0 20px $orange-glow, 0 0 40px rgba($orange, 0.3);
      --orbit-radius: 260px;
      animation: orbit-reverse 15s linear infinite;
      margin: -6px 0 0 -6px;

      @media (max-width: 1024px) { --orbit-radius: 210px; }
      @media (max-width: 640px) { --orbit-radius: 165px; }
    }

    &--5 {
      width: 10px;
      height: 10px;
      background: $purple-light;
      box-shadow: 0 0 18px $purple-glow, 0 0 36px rgba($purple, 0.2);
      --orbit-radius: 265px;
      animation: orbit-reverse 18s linear infinite;
      animation-delay: -8s;
      margin: -5px 0 0 -5px;

      @media (max-width: 1024px) { --orbit-radius: 215px; }
      @media (max-width: 640px) { --orbit-radius: 170px; }
    }
  }
}
</style>
