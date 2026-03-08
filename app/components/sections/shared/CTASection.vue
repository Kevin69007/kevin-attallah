<template>
  <section class="cta-section">
    <WaveLines />
    <div class="container cta-section__content text-center">
      <ScrollReveal>
        <h2 class="cta-section__title">
          {{ title }}
        </h2>
        <p class="cta-section__text">{{ subtitle }}</p>
        <div class="btn-group" style="justify-content: center">
          <MagneticButton>
            <AppButton variant="primary" size="lg" :to="!primaryHref ? primaryLink : undefined" :href="primaryHref || undefined">
              {{ primaryText }}
              <ArrowRight :size="20" />
            </AppButton>
          </MagneticButton>
          <MagneticButton v-if="secondaryText">
            <AppButton variant="ghost-light" size="lg" :to="secondaryLink">
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
  primaryHref?: string
  secondaryText?: string
  secondaryLink?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Prêt à transformer ta vie ?',
  subtitle: 'Rejoins les 2100+ entrepreneurs qui ont déjà fait le premier pas.',
  primaryText: 'Voir les formations',
  primaryLink: '/formations',
  secondaryText: 'Parler à Kevin',
  secondaryLink: '/creer-entreprise',
})
</script>

<style lang="scss" scoped>
.cta-section {
  position: relative;
  overflow: hidden;
  padding: $section-pad 0;

  &__content {
    position: relative;
    z-index: 1;
  }

  &__title {
    font-size: $h2;
    margin-bottom: 16px;
  }

  &__text {
    color: $text-body;
    font-size: $body-lg;
    margin-bottom: 40px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
