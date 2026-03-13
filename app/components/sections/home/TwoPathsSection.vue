<template>
  <section class="two-paths section--light">
    <div class="container">
      <SectionHeading
        label="Ton parcours"
        title="Par où tu commences ?"
        gradient-text="commences"
        mode="chars"
      />

      <StaggerGrid class="two-paths__grid mt-48" :stagger="0.2">
        <!-- Card 1: Créer (Standard) -->
        <div v-magnetic="0.15" class="two-paths__card two-paths__card--standard glass-card-light">
          <div class="two-paths__icon two-paths__icon--purple">
            <Building2 :size="28" />
          </div>
          <GlassBadge variant="purple-light">Création d'entreprise</GlassBadge>
          <h3 class="two-paths__title mt-16">Je veux créer mon entreprise</h3>
          <p class="two-paths__desc">
            Formation en autonomie ou accompagnement personnalisé, finançable
          </p>
          <div class="two-paths__checks">
            <div class="two-paths__check two-paths__check--purple">
              <CheckCircle :size="16" />
              <span>De l'idée à la structure juridique</span>
            </div>
            <div class="two-paths__check two-paths__check--purple">
              <CheckCircle :size="16" />
              <span>Business plan et financement</span>
            </div>
            <div class="two-paths__check two-paths__check--purple">
              <CheckCircle :size="16" />
              <span>Marketing et premiers clients</span>
            </div>
            <div class="two-paths__check two-paths__check--purple">
              <CheckCircle :size="16" />
              <span>L'IA intégrée dès le départ</span>
            </div>
          </div>
          <AppButton variant="ghost-light" to="/creer-entreprise" class="two-paths__button">
            Je découvre
            <ArrowRight :size="18" />
          </AppButton>
        </div>

        <!-- Card 2: Évoluer (Featured) -->
        <div v-magnetic="0.15" class="two-paths__card two-paths__card--featured glass-card-light">
          <div class="two-paths__ribbon">Recommandé</div>
          <div class="two-paths__icon two-paths__icon--orange">
            <Rocket :size="28" />
          </div>
          <GlassBadge variant="orange-light">Évolution avec l'IA</GlassBadge>
          <h3 class="two-paths__title mt-16">Je veux faire évoluer mon entreprise avec l'IA</h3>
          <p class="two-paths__desc">
            Formations équipes, audit IA, déploiement. Finançable
          </p>
          <div class="two-paths__checks">
            <div class="two-paths__check two-paths__check--orange">
              <CheckCircle :size="16" />
              <span>Audit IA gratuit et personnalisé</span>
            </div>
            <div class="two-paths__check two-paths__check--orange">
              <CheckCircle :size="16" />
              <span>Formation ou déploiement</span>
            </div>
            <div class="two-paths__check two-paths__check--orange">
              <CheckCircle :size="16" />
              <span>Solutions automatisées sur mesure</span>
            </div>
            <div class="two-paths__check two-paths__check--orange">
              <CheckCircle :size="16" />
              <span>100% finançable</span>
            </div>
          </div>
          <AppButton variant="primary" to="/evoluer-ia" class="two-paths__button">
            Je découvre
            <ArrowRight :size="18" />
          </AppButton>
        </div>
      </StaggerGrid>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Building2, Rocket, ArrowRight, CheckCircle } from 'lucide-vue-next'
</script>

<style lang="scss" scoped>
.two-paths {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    padding: 32px;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow: visible;
  }

  &__icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    &--purple {
      background: rgba($purple, 0.08);
      color: $purple;
    }

    &--orange {
      background: rgba($orange, 0.1);
      color: $orange;
    }
  }

  &__ribbon {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 24px;
    border-radius: $radius-full;
    background: $orange;
    color: $text-white;
    font-size: $xs;
    font-weight: 700;
    font-family: $font-heading;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 16px rgba($orange-dark, 0.3);
    z-index: 2;
    white-space: nowrap;
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
  }

  &__checks {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0 24px;
    flex-grow: 1;
  }

  &__check {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: $small;
    color: $text-body;

    svg {
      flex-shrink: 0;
    }

    &--purple svg {
      color: $purple;
    }

    &--orange svg {
      color: $orange;
    }
  }

  &__button {
    margin-top: auto;
  }

  // Standard card (purple accent)
  &__card--standard {
    border-left: 3px solid $purple;
  }

  // Featured card (orange accent, dominant)
  &__card--featured {
    border-left: 3px solid $orange;
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba($orange, 0.2);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.06),
      0 0 40px rgba($orange, 0.08);

    &:hover {
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.08),
        0 0 48px rgba($orange, 0.12);
      border-color: rgba($orange, 0.3);
      border-left: 3px solid $orange;
    }
  }
}
</style>
