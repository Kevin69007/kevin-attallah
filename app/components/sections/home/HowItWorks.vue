<template>
  <section class="how-it-works section--white">
    <div class="container">
      <ScrollReveal>
        <span class="section-label text-center">Comment ça se passe</span>
        <h2 class="section-title text-center">
          Comment ça se <span class="gradient-text">passe</span> ?
        </h2>
      </ScrollReveal>

      <StaggerGrid class="how-it-works__grid grid grid-3" :stagger="0.2">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step glass-card-light"
        >
          <div class="step__number">
            <CountUp :end="index + 1" :duration="1.5" prefix="0" />
          </div>
          <div class="step__icon">
            <component :is="step.icon" :size="32" />
          </div>
          <h3 class="step__title">{{ step.title }}</h3>
          <p class="step__desc">{{ step.description }}</p>
        </div>
      </StaggerGrid>

      <ScrollReveal :delay="0.6">
        <div class="how-it-works__cta text-center mt-48">
          <MagneticButton>
            <AppButton variant="primary" size="lg" :href="externalLinks.booking.brevoMeeting">
              Je prends mon appel gratuit
              <ArrowRight :size="20" />
            </AppButton>
          </MagneticButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Phone, Route, Rocket, ArrowRight } from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

const steps = [
  {
    icon: Phone,
    title: 'On définit ton projet ensemble',
    description: 'Un appel gratuit de 30 minutes pour comprendre où tu en es et t\'orienter vers la bonne formule — création ou évolution, autonomie ou accompagnement.',
  },
  {
    icon: Route,
    title: 'On te construit le chemin',
    description: 'Formation, accompagnement, audit IA — tout est personnalisé selon ton profil, ton budget et tes objectifs. Et c\'est finançable.',
  },
  {
    icon: Rocket,
    title: 'Tu passes à l\'action, on est là',
    description: 'Tu avances avec les bons outils, les bonnes méthodes et quelqu\'un derrière toi si tu bloques.',
  },
]
</script>

<style lang="scss" scoped>
.how-it-works {
  &__grid {
    margin-top: 48px;
  }
}

.step {
  text-align: center;
  padding: 40px 32px;
  position: relative;

  &__number {
    font-family: $font-heading;
    font-size: 4rem;
    font-weight: 900;
    background: $gradient-primary;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.5;
    line-height: 1;
    margin-bottom: 8px;
  }

  &__icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba($purple, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: $purple;
  }

  &__title {
    font-size: $h4;
    color: $text-heading;
    margin-bottom: 12px;
  }

  &__desc {
    color: $text-body;
    font-size: $small;
    line-height: 1.7;
  }
}
</style>
