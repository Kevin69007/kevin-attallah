<template>
  <section class="how-it-works section--white">
    <div class="container">
      <ScrollReveal>
        <span class="section-label text-center">Comment ça se passe</span>
        <h2 class="section-title text-center">
          Comment ça se <span class="gradient-text">passe</span> ?
        </h2>
      </ScrollReveal>

      <ScatteredCards :count="5" class="mt-48">
        <template #card-0>
          <div class="sc-content">
            <div class="sc-content__number gradient-text">01</div>
            <div class="sc-content__icon"><Phone :size="28" /></div>
            <h3 class="sc-content__title">{{ steps[0]!.title }}</h3>
            <p class="sc-content__desc">{{ steps[0]!.description }}</p>
          </div>
        </template>
        <template #card-1>
          <div class="sc-media">
            <video autoplay loop muted playsinline>
              <source src="/video/home-step-01.mp4" type="video/mp4" />
            </video>
          </div>
        </template>
        <template #card-2>
          <div class="sc-content">
            <div class="sc-content__number gradient-text">02</div>
            <div class="sc-content__icon"><Route :size="28" /></div>
            <h3 class="sc-content__title">{{ steps[1]!.title }}</h3>
            <p class="sc-content__desc">{{ steps[1]!.description }}</p>
          </div>
        </template>
        <template #card-3>
          <div class="sc-media">
            <video autoplay loop muted playsinline>
              <source src="/video/home-step-02.mp4" type="video/mp4" />
            </video>
          </div>
        </template>
        <template #card-4>
          <div class="sc-content">
            <div class="sc-content__number gradient-text">03</div>
            <div class="sc-content__icon"><Rocket :size="28" /></div>
            <h3 class="sc-content__title">{{ steps[2]!.title }}</h3>
            <p class="sc-content__desc">{{ steps[2]!.description }}</p>
          </div>
        </template>
      </ScatteredCards>

      <ScrollReveal :delay="0.6">
        <div class="how-it-works__cta text-center mt-48">
          <AppButton variant="primary" size="lg" :href="externalLinks.booking.brevoMeeting">
            Je prends mon appel gratuit
            <ArrowRight :size="20" />
          </AppButton>
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
.sc-content {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: center;
  gap: 8px;

  &__number {
    font-family: $font-heading;
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 1;
    opacity: 0.35;
  }

  &__icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba($purple, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple;
  }

  &__title {
    font-size: $body;
    font-weight: 700;
    color: $text-heading;
    line-height: 1.3;
  }

  &__desc {
    font-size: $small;
    color: $text-muted;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    gap: 6px;

    &__number { font-size: 2rem; }
    &__icon { width: 36px; height: 36px; }
    &__title { font-size: $small; }
    &__desc { font-size: $xs; }
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
    gap: 4px;

    &__number { font-size: 1.5rem; }
    &__icon { width: 32px; height: 32px; }
    &__title { font-size: $xs; }
    &__desc { display: none; }
  }
}

.sc-media {
  height: 100%;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
