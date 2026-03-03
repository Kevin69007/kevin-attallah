<template>
  <section class="why section--dark">
    <div class="container split">
      <!-- Left: Stats -->
      <ScrollReveal direction="left">
        <div class="why__stats">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="why__stat glass-card"
          >
            <div class="why__stat-value gradient-text">
              <CountUp :end="stat.value" :duration="2" :suffix="stat.suffix" />
            </div>
            <span class="why__stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </ScrollReveal>

      <!-- Right: Content -->
      <ScrollReveal direction="right">
        <span class="section-label">Pourquoi Kevin Attallah</span>
        <h2 class="section-title text-white">
          Un accompagnement <span class="gradient-text">humain</span>, boosté par l'IA
        </h2>
        <p class="why__text">
          Entrepreneur passionné et expert en intégration IA, Kevin accompagne depuis des
          années des milliers de personnes dans leur reconversion professionnelle et leur
          lancement d'activité. Son approche : des formations concrètes, orientées résultats,
          avec l'intelligence artificielle comme accélérateur de réussite.
        </p>
        <div class="why__features">
          <div v-for="feature in features" :key="feature" class="why__feature">
            <CheckCircle :size="18" class="why__check" />
            <span>{{ feature }}</span>
          </div>
        </div>
        <div class="btn-group mt-32">
          <AppButton variant="primary" to="/accompagnement">
            En savoir plus
            <ArrowRight :size="18" />
          </AppButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckCircle, ArrowRight } from 'lucide-vue-next'

const stats = [
  { value: 2100, suffix: '+', label: 'Entrepreneurs formés' },
  { value: 15000, suffix: '+', label: 'Heures de formation' },
  { value: 60, suffix: '+', label: 'Formations disponibles' },
  { value: 98, suffix: '%', label: 'Taux de satisfaction' },
]

const features = [
  'Formations certifiantes éligibles CPF',
  'Accompagnement personnalisé avec IA intégrée',
  'Contenu mis à jour régulièrement',
  'Accès à vie aux formations',
]
</script>

<style lang="scss" scoped>
.why {
  background: $bg-dark-1;

  &__stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  &__stat {
    text-align: center;
    padding: 28px 20px;
  }

  &__stat-value {
    font-family: $font-heading;
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 8px;
  }

  &__stat-label {
    font-size: $xs;
    color: $text-on-dark-muted;
  }

  &__text {
    color: $text-on-dark-muted;
    font-size: $body;
    line-height: 1.8;
    margin-bottom: 24px;
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 12px;
    color: $text-on-dark;
    font-size: $small;
  }

  &__check {
    color: $orange;
    flex-shrink: 0;
  }
}
</style>
