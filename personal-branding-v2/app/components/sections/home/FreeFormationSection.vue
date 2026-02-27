<template>
  <section class="free-section section--dark">
    <div class="free-section__bg">
      <div class="orb orb--orange free-section__orb free-section__orb--1"></div>
      <div class="orb orb--purple free-section__orb free-section__orb--2"></div>
    </div>
    <div class="container">
      <div class="split">
        <!-- Left: Value proposition -->
        <ScrollReveal direction="left">
          <GlassBadge variant="orange">
            <Gift :size="14" />
            {{ config.badgeText }}
          </GlassBadge>

          <h2 class="section-title text-white mt-24">
            Une formation <span class="gradient-text">offerte</span> pour bien démarrer
          </h2>

          <!-- Barred price -->
          <div class="free-section__price mt-24">
            <span class="free-section__price-original">{{ config.originalPrice }}€</span>
            <span class="free-section__price-current gradient-text">GRATUIT</span>
          </div>

          <p class="free-section__desc mt-16">{{ config.subtitle }}</p>

          <!-- Features -->
          <div class="free-section__features mt-24">
            <div v-for="feature in config.features" :key="feature" class="free-section__feature">
              <CheckCircle :size="18" class="free-section__check" />
              <span>{{ feature }}</span>
            </div>
          </div>
        </ScrollReveal>

        <!-- Right: Form -->
        <ScrollReveal direction="right" :delay="0.3">
          <GlassCard variant="dark" :hoverable="false">
            <h3 class="text-white mb-8">Recevez votre formation gratuite</h3>
            <p class="free-section__form-subtitle">Remplissez le formulaire ci-dessous</p>
            <FreeFormationForm class="mt-24" />
          </GlassCard>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Gift, CheckCircle } from 'lucide-vue-next'
import { freeFormationConfig as config } from '~/data/free-formation'
</script>

<style lang="scss" scoped>
.free-section {
  background: linear-gradient(135deg, $bg-dark-1 0%, rgba($orange, 0.03) 50%, $bg-dark-1 100%);
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;

    &--1 {
      width: 350px;
      height: 350px;
      top: -10%;
      right: -5%;
      opacity: 0.15;
    }

    &--2 {
      width: 250px;
      height: 250px;
      bottom: -5%;
      left: 5%;
      opacity: 0.1;
    }
  }

  &__price {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__price-original {
    font-family: $font-heading;
    font-size: 1.75rem;
    font-weight: 700;
    color: $text-on-dark-muted;
    text-decoration: line-through;
  }

  &__price-current {
    font-family: $font-heading;
    font-size: 2.5rem;
    font-weight: 900;

    @media (max-width: 640px) {
      font-size: 2rem;
    }
  }

  &__desc {
    color: $text-on-dark-muted;
    font-size: $body;
    line-height: 1.8;
    max-width: 480px;
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 12px;
    color: $text-on-dark;
    font-size: $small;
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 12px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  &__check {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    padding: 5px;
    border-radius: 50%;
    background: rgba($orange, 0.12);
    color: $orange;
  }

  &__form-subtitle {
    color: $text-on-dark-muted;
    font-size: $small;
  }
}
</style>
