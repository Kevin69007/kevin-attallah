<template>
  <section class="ai-section section--dark">
    <div class="ai-section__bg">
      <div class="orb orb--orange ai-section__orb"></div>
    </div>
    <div class="container">
      <!-- Hero: 2-column layout -->
      <div class="ai-section__hero">
        <div class="ai-section__content">
          <ScrollReveal>
            <span class="section-label">Intelligence Artificielle</span>
            <h2 class="section-title text-white">
              L'IA ne remplace pas les entrepreneurs.<br />
              Elle remplace ceux qui <span class="gradient-text">refusent</span>
            </h2>
            <p class="ai-section__subtitle">
              En 2026, lancer un business sans intégrer l'IA, c'est partir avec un handicap.
              On t'aide à prendre 10 ans d'avance.
            </p>
            <AppButton variant="primary" to="/ia">
              Décoller avec l'IA
              <ArrowRight :size="18" />
            </AppButton>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="right" :delay="0.3" class="ai-section__photo-wrap">
          <div class="ai-section__photo">
            <NuxtImg src="/img/kevin-ia.png" alt="Kevin Attallah - Intelligence Artificielle" class="ai-section__photo-img" format="webp" quality="80" />
          </div>
        </ScrollReveal>
      </div>

      <!-- Cards grid below -->
      <StaggerGrid class="grid grid-3 mt-48">
        <GlassCard v-for="card in cards" :key="card.title" hoverable>
          <div class="ai-card">
            <div class="ai-card__icon">
              <component :is="card.icon" :size="28" />
            </div>
            <h3 class="ai-card__title">{{ card.title }}</h3>
            <p class="ai-card__desc">{{ card.description }}</p>
          </div>
        </GlassCard>
      </StaggerGrid>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Bot, Search, Zap, ArrowRight } from 'lucide-vue-next'

const cards = [
  {
    icon: Bot,
    title: 'Formations IA',
    description: 'Maîtrise ChatGPT, l\'automatisation, le marketing IA et la productivité boostée par l\'intelligence artificielle.',
  },
  {
    icon: Search,
    title: 'Audit IA',
    description: 'Identifie les leviers IA qui te font gagner du temps et de l\'argent dans ton business au quotidien.',
  },
  {
    icon: Zap,
    title: 'Outils & Accompagnement',
    description: 'Intègre l\'IA concrètement dans ton quotidien d\'entrepreneur avec des outils prêts à l\'emploi.',
  },
]
</script>

<style lang="scss" scoped>
.ai-section {
  background: $bg-dark-1;
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;
    width: 400px;
    height: 400px;
    top: -20%;
    right: -10%;
    opacity: 0.12;
  }

  // 2-column hero layout
  &__hero {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__content {
    @media (max-width: 1024px) {
      order: 2;
    }
  }

  &__subtitle {
    font-size: $body-lg;
    color: $text-on-dark-muted;
    max-width: 520px;
    line-height: 1.7;
    margin: 20px 0 32px;

    @media (max-width: 1024px) {
      margin-left: auto;
      margin-right: auto;
    }
  }

  // Photo
  &__photo-wrap {
    @media (max-width: 1024px) {
      order: 1;
    }
  }

  &__photo {
    position: relative;
    max-width: 460px;
    margin: 0 auto;
  }

  &__photo-img {
    width: 100%;
    border-radius: $radius-lg;
    border: 1px solid $glass-border;
    box-shadow:
      0 0 60px rgba($purple, 0.15),
      0 20px 60px rgba(0, 0, 0, 0.3);
  }
}

.ai-card {
  text-align: center;
  padding: 8px;

  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba($orange, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: $orange;
  }

  &__title {
    font-size: $body-lg;
    color: $text-white;
    margin-bottom: 10px;
    font-weight: 700;
  }

  &__desc {
    font-size: $small;
    color: $text-on-dark-muted;
    line-height: 1.6;
  }
}
</style>
