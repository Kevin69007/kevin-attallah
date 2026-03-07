<template>
  <section class="free-section section--white">
    <div class="container">
      <div class="split">
        <!-- Left: Value proposition -->
        <ScrollReveal direction="left">
          <GlassBadge variant="orange-light">
            <Gift :size="14" />
            {{ config.badgeText }}
          </GlassBadge>

          <h2 class="section-title mt-24">
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
          <GlassCard variant="light" :hoverable="false">
            <h3 class="mb-8">Recevez votre formation gratuite</h3>
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
  background: $bg-section-alt;
  position: relative;
  overflow: hidden;

  &__price {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__price-original {
    font-family: $font-heading;
    font-size: 1.75rem;
    font-weight: 700;
    color: $text-muted;
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
    color: $text-body;
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
    color: $text-body;
    font-size: $small;
    padding: 10px 16px;
    background: rgba($purple, 0.03);
    border-radius: 12px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba($purple, 0.06);
    }
  }

  &__check {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    padding: 5px;
    border-radius: 50%;
    background: rgba($orange, 0.08);
    color: $orange;
  }

  &__form-subtitle {
    color: $text-muted;
    font-size: $small;
  }
}
</style>
