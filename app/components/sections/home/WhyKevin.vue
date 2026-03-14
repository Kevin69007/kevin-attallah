<template>
  <section class="why section--light">
    <div class="container">
      <div class="split why__split">
        <!-- Left: Photo -->
        <ScrollReveal direction="left">
          <div class="why__photo-wrap">
            <!-- Glass panels behind photo -->
            <div class="why__glass-panel why__glass-panel--1"></div>
            <div class="why__glass-panel why__glass-panel--2"></div>
            <div class="why__glass-panel why__glass-panel--3"></div>
            <div v-magnetic="0.12" class="why__photo glass-card-light">
              <NuxtImg src="/img/testimonial/testimonial1.png" alt="Kevin Attallah" class="why__photo-img" format="webp" quality="80" />
            </div>
            <!-- Small floating glass accents -->
            <div class="why__glass-accent why__glass-accent--1"></div>
            <div class="why__glass-accent why__glass-accent--2"></div>
          </div>
        </ScrollReveal>

        <!-- Right: Content -->
        <ScrollReveal direction="right">
          <SectionHeading
            label="Qui est Kevin"
            title="Le terrain, pas la théorie."
            gradient-text="la théorie."
            mode="blur-in"
            :center="false"
            :once="true"
          />
          <p class="why__text">
            J'ai construit, planté, relancé et scalé plus d'une dizaine de projets. Je connais 
            le goût du sang, l'odeur des victoires et la réalité de la trésorerie. Mon école ? 
            La vraie vie.
          </p>
          <p class="why__text">
            Aujourd'hui, l'IA sépare ceux qui avancent de ceux qui disparaissent. Mon objectif 
            est radical : vous faire gagner du temps, multiplier vos marges, et vous armer 
            des systèmes qui dominent le marché.
          </p>

          <div class="why__bullets">
            <div v-for="bullet in bullets" :key="bullet.text" class="why__bullet">
              <component :is="bullet.icon" :size="18" class="why__bullet-icon" />
              <span>{{ bullet.text }}</span>
            </div>
          </div>

          <div class="btn-group mt-32">
            <AppButton variant="primary" :href="externalLinks.booking.brevoMeeting">
              Travaillons ensemble
              <ArrowRight :size="18" />
            </AppButton>
          </div>
        </ScrollReveal>
      </div>

      <!-- Stats band -->
      <ScrollReveal :delay="0.3">
        <div v-magnetic="0.15" class="why__stats-band glass-card-light">
          <div v-for="stat in stats" :key="stat.label" class="why__band-item">
            <span class="why__band-value gradient-text">
              <CountUp v-if="typeof stat.value === 'number'" :end="stat.value" :duration="2" :suffix="stat.suffix" />
              <template v-else>{{ stat.value }}</template>
            </span>
            <span class="why__band-label">{{ stat.label }}</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Building2, TrendingUp, Bot, Globe, ArrowRight } from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

const bullets = [
  { icon: Building2, text: 'Stratégies validées sur +10 entreprises réelles' },
  { icon: TrendingUp, text: 'Millions d\'euros générés pour mes clients' },
  { icon: Bot, text: 'Systèmes IA implantés depuis l\'aube du marché' },
  { icon: Globe, text: '+2100 leaders accompagnés vers l\'indépendance' },
]

const stats: { value: number | string; suffix: string; label: string }[] = [
  { value: 2100, suffix: '+', label: 'Entrepreneurs lancés' },
  { value: '4.8/5', suffix: '', label: 'Satisfaction' },
  { value: 'Des millions €', suffix: '', label: 'Générés et économisés' },
  { value: 11, suffix: ' ans', label: 'D\'expérience' },
]
</script>

<style lang="scss" scoped>
.why {
  &__split {
    align-items: flex-start;
  }

  &__photo-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    padding: 24px;
  }

  &__glass-panel {
    position: absolute;
    border-radius: $radius-lg;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(24px) saturate(1.2);
    -webkit-backdrop-filter: blur(24px) saturate(1.2);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow:
      0 12px 40px rgba(17, 24, 39, 0.04),
      0 2px 6px rgba(17, 24, 39, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.8),
      inset 0 -1px 0 rgba(17, 24, 39, 0.01);
    animation: border-glow-light 6s ease-in-out infinite;
    pointer-events: none;

    &--1 {
      width: 75%;
      height: 65%;
      top: -12px;
      right: -16px;
      transform: rotate(3deg);
      animation-delay: -1s;
    }

    &--2 {
      width: 50%;
      height: 45%;
      bottom: -8px;
      left: -14px;
      transform: rotate(-2deg);
      animation-delay: -3s;
    }

    &--3 {
      width: 30%;
      height: 25%;
      top: 50%;
      right: -20px;
      transform: translateY(-50%) rotate(5deg);
      animation-delay: -5s;
    }
  }

  &__photo {
    padding: 0;
    overflow: hidden;
    aspect-ratio: 3 / 4;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  &__photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__glass-accent {
    position: absolute;
    border-radius: $radius-full;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow:
      0 8px 24px rgba(17, 24, 39, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    animation: border-glow-light 6s ease-in-out infinite;
    pointer-events: none;
    z-index: 2;

    &--1 {
      width: 48px;
      height: 48px;
      top: -8px;
      left: 8px;
      animation-delay: -2s;
    }

    &--2 {
      width: 32px;
      height: 32px;
      bottom: 4px;
      right: -4px;
      animation-delay: -4s;
    }
  }

  &__text {
    color: $text-body;
    font-size: $small;
    line-height: 1.8;
    margin-bottom: 16px;
  }

  &__bullets {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
  }

  &__bullet {
    display: flex;
    align-items: center;
    gap: 12px;
    color: $text-heading;
    font-weight: 500;
    font-size: $small;
  }

  &__bullet-icon {
    color: $orange;
    flex-shrink: 0;
  }

  // Stats band below
  &__stats-band {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 48px;
    padding: 32px;
    text-align: center;

    &:hover {
      transform: none;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  &__band-value {
    font-family: $font-heading;
    font-size: 1.75rem;
    font-weight: 900;
    display: block;
    line-height: 1.2;
  }

  &__band-label {
    font-size: $xs;
    color: $text-muted;
    font-weight: 500;
    margin-top: 4px;
    display: block;
  }
}
</style>
