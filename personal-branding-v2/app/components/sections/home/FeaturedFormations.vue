<template>
  <section class="featured section--dark">
    <div class="container">
      <ScrollReveal>
        <span class="section-label text-center">Formations populaires</span>
        <h2 class="section-title text-center text-white">
          Des formations qui <span class="gradient-text">transforment</span>
        </h2>
        <p class="section-subtitle text-center" style="margin: 0 auto 48px">
          Les formations qui ont déjà transformé +2100 entrepreneurs
        </p>
      </ScrollReveal>

      <StaggerGrid class="grid grid-3">
        <NuxtLink
          v-for="formation in featuredFormations"
          :key="formation.id"
          :to="`/formations/${formation.id}`"
          class="formation-card glass-card"
        >
          <div class="formation-card__img">
            <NuxtImg :src="formation.image" :alt="formation.titre" loading="lazy" format="webp" quality="80" />
            <GlassBadge variant="orange" class="formation-card__badge">CPF</GlassBadge>
          </div>
          <div class="formation-card__body">
            <span class="formation-card__cat">{{ formation.categorie }}</span>
            <h3 class="formation-card__title">{{ formation.titre }}</h3>
            <div class="formation-card__meta">
              <span><Clock :size="14" /> {{ formation.duree }}</span>
              <span><BarChart3 :size="14" /> {{ formation.niveau }}</span>
            </div>
          </div>
        </NuxtLink>
      </StaggerGrid>

      <ScrollReveal class="text-center mt-48">
        <AppButton variant="secondary" to="/formations">
          Tout le catalogue
          <ArrowRight :size="18" />
        </AppButton>
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Clock, BarChart3, ArrowRight } from 'lucide-vue-next'
import { formations } from '~/data/formations'

const featuredFormations = computed(() => formations.slice(0, 6))
</script>

<style lang="scss" scoped>
.featured {
  background: $bg-dark-2;
}

.formation-card {
  display: block;
  overflow: hidden;
  padding: 0;
  cursor: pointer;

  &__img {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s $ease-smooth;
    }

    .formation-card:hover & img {
      transform: scale(1.05);
    }
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  &__body {
    padding: 24px;
  }

  &__cat {
    font-size: $xs;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: $purple-light;
    margin-bottom: 8px;
    display: block;
  }

  &__title {
    font-size: $h4;
    color: $text-white;
    margin-bottom: 16px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__meta {
    display: flex;
    gap: 16px;
    color: $text-on-dark-muted;
    font-size: $xs;

    span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
}
</style>
