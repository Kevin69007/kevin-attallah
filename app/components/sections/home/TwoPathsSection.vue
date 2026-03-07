<template>
  <section class="two-paths section--light">
    <div class="container">
      <ScrollReveal>
        <span class="section-label text-center">Ton parcours</span>
        <h2 class="section-title text-center">
          Par où tu <span class="gradient-text">commences</span> ?
        </h2>
      </ScrollReveal>

      <StaggerGrid class="grid grid-2 mt-48" :stagger="0.2">
        <!-- Card 1: Créer -->
        <GlassCard variant="light">
          <div class="two-paths__card">
            <div class="two-paths__icon">
              <Building2 :size="32" />
            </div>
            <h3 class="two-paths__title">Je veux créer mon entreprise</h3>
            <p class="two-paths__desc">
              Formation en autonomie ou accompagnement personnalisé — finançable
            </p>
            <AppButton variant="ghost-light" to="/creer-entreprise" class="mt-24">
              Je découvre
              <ArrowRight :size="18" />
            </AppButton>
          </div>
        </GlassCard>

        <!-- Card 2: Évoluer -->
        <GlassCard variant="light">
          <div class="two-paths__card">
            <div class="two-paths__icon">
              <Rocket :size="32" />
            </div>
            <h3 class="two-paths__title">Je veux faire évoluer mon entreprise avec l'IA</h3>
            <p class="two-paths__desc">
              Formations équipes, audit IA, déploiement — finançable
            </p>
            <AppButton variant="ghost-light" to="/evoluer-ia" class="mt-24">
              Je découvre
              <ArrowRight :size="18" />
            </AppButton>
          </div>
        </GlassCard>
      </StaggerGrid>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Building2, Rocket, ArrowRight } from 'lucide-vue-next'
</script>

<style lang="scss" scoped>
.two-paths {
  &__card {
    padding: 16px 8px;
    text-align: center;
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
    color: $text-muted;
    font-size: $small;
    line-height: 1.7;
    max-width: 360px;
    margin: 0 auto;
  }
}
</style>
