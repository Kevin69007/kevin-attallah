<template>
  <section class="how-it-works section--dark">
    <div class="container">
      <ScrollReveal>
        <span class="section-label text-center">Comment ça marche</span>
        <h2 class="section-title text-center text-white">
          3 étapes vers ta <span class="gradient-text">réussite</span>
        </h2>
      </ScrollReveal>

      <StaggerGrid class="how-it-works__grid grid grid-3" :stagger="0.2">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step glass-card"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { Search, CreditCard, Rocket } from 'lucide-vue-next'

const steps = [
  {
    icon: Search,
    title: 'Choisis ta formation',
    description: 'Parcours notre catalogue de +60 formations certifiantes et trouve celle qui correspond à ton projet.',
  },
  {
    icon: CreditCard,
    title: 'Inscris-toi en ligne',
    description: 'Inscription simple et rapide, éligible CPF. Paiement sécurisé et accompagnement personnalisé.',
  },
  {
    icon: Rocket,
    title: 'Lance-toi !',
    description: 'Accède à ta formation immédiatement et commence à construire ton avenir dès aujourd\'hui.',
  },
]
</script>

<style lang="scss" scoped>
.how-it-works {
  background: $bg-dark-1;

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
    opacity: 0.3;
    line-height: 1;
    margin-bottom: 8px;
  }

  &__icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba($purple, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: $purple-light;
  }

  &__title {
    font-size: $h4;
    color: $text-white;
    margin-bottom: 12px;
  }

  &__desc {
    color: $text-on-dark-muted;
    font-size: $small;
    line-height: 1.7;
  }
}
</style>
