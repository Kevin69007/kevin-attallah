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
            <!-- Main photo -->
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
            title="Pas un théoricien. Un entrepreneur."
            gradient-text="Un entrepreneur."
            mode="blur-in"
            :center="false"
          />
          <p class="why__text">
            Depuis 11 ans, je crée des entreprises, je les développe, et j'aide les autres à faire
            la même chose. J'ai lancé plus d'une dizaine de projets, dans des secteurs différents,
            avec des modèles différents. Certains ont cartonné, d'autres m'ont appris plus que
            n'importe quelle école.
          </p>
          <p class="why__text">
            Quand l'IA a commencé à tout changer, je ne l'ai pas observée de loin. Je l'ai
            intégrée dans mes process, mes équipes, mes outils. Et aujourd'hui, c'est exactement
            ce que je fais pour mes clients.
          </p>
          <p class="why__text">
            Mon objectif est simple : t'aider à créer ou faire grandir ton business avec les
            bons outils, les bonnes méthodes, et quelqu'un qui est passé par là avant toi.
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
  { icon: Building2, text: 'Une dizaine d\'entreprises créées de zéro' },
  { icon: TrendingUp, text: 'Des millions générés et économisés pour mes clients' },
  { icon: Bot, text: 'L\'IA intégrée comme outil de croissance depuis 2019' },
  { icon: Globe, text: '+2100 entrepreneurs accompagnés en France et à l\'international' },
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
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.06),
      0 2px 6px rgba(0, 0, 0, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 0 rgba(0, 0, 0, 0.02);
    animation: border-glow 6s ease-in-out infinite;
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
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
    animation: border-glow 6s ease-in-out infinite;
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
    color: $text-body;
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
    margin-top: 4px;
    display: block;
  }
}
</style>
