<template>
  <section class="cta-section">
    <div class="cta-section__bg">
      <div class="orb orb--purple cta-section__orb cta-section__orb--1"></div>
      <div class="orb orb--orange cta-section__orb cta-section__orb--2"></div>
    </div>
    <div class="container cta-section__content text-center">
      <ScrollReveal>
        <h2 class="cta-section__title text-white">
          {{ title }}
        </h2>
        <p class="cta-section__text">{{ subtitle }}</p>
        <div class="btn-group" style="justify-content: center">
          <MagneticButton>
            <AppButton variant="primary" size="lg" :to="primaryLink">
              {{ primaryText }}
              <ArrowRight :size="20" />
            </AppButton>
          </MagneticButton>
          <MagneticButton v-if="secondaryText">
            <AppButton variant="ghost" size="lg" :to="secondaryLink">
              {{ secondaryText }}
            </AppButton>
          </MagneticButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

interface Props {
  title?: string
  subtitle?: string
  primaryText?: string
  primaryLink?: string
  secondaryText?: string
  secondaryLink?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Prêt à transformer ta vie ?',
  subtitle: 'Rejoins les 2100+ entrepreneurs qui ont déjà fait le premier pas.',
  primaryText: 'Voir les formations',
  primaryLink: '/formations',
  secondaryText: 'Parler à Kevin',
  secondaryLink: '/accompagnement',
})
</script>

<style lang="scss" scoped>
.cta-section {
  position: relative;
  overflow: hidden;
  padding: $section-pad 0;
  background: linear-gradient(135deg, $purple-dark 0%, $bg-dark-1 40%, $orange-dark 100%);

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;

    &--1 {
      width: 400px;
      height: 400px;
      top: -30%;
      left: -10%;
      opacity: 0.3;
    }

    &--2 {
      width: 300px;
      height: 300px;
      bottom: -30%;
      right: -10%;
      opacity: 0.3;
    }
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__title {
    font-size: $h2;
    margin-bottom: 16px;
  }

  &__text {
    color: $text-on-dark-muted;
    font-size: $body-lg;
    margin-bottom: 40px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
