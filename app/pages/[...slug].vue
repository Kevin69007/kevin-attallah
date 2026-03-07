<template>
  <div class="not-found section--light">
    <div class="container text-center not-found__content">
      <ScrollReveal>
        <div class="not-found__code-wrap">
          <span class="not-found__code-bg">404</span>
          <h1 class="not-found__code">404</h1>
        </div>
        <div class="not-found__icon glass-card-light">
          <SearchX :size="28" />
        </div>
        <h2 class="not-found__title">Page introuvable</h2>
        <p class="not-found__text">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div class="btn-group" style="justify-content: center">
          <MagneticButton>
            <AppButton variant="primary" to="/">
              <Home :size="18" />
              Retour à l'accueil
            </AppButton>
          </MagneticButton>
          <MagneticButton>
            <AppButton variant="ghost-light" to="/formations">
              Voir les formations
            </AppButton>
          </MagneticButton>
        </div>
      </ScrollReveal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchX, Home } from 'lucide-vue-next'

useHead({ title: '404 - Page introuvable' })
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &__content {
    position: relative;
    z-index: 1;
  }

  // Wrapper for stacked 404 text
  &__code-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 24px;
  }

  // Background ghost layer — large, faded
  &__code-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: $font-heading;
    font-size: clamp(10rem, 25vw, 20rem);
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, rgba($purple, 0.06), rgba($orange, 0.04));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    pointer-events: none;
    user-select: none;
  }

  // Foreground 404 — gradient with glow
  &__code {
    position: relative;
    font-family: $font-heading;
    font-size: clamp(6rem, 15vw, 12rem);
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, $purple, $orange);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 4px 30px rgba($purple, 0.2)) drop-shadow(0 2px 10px rgba($orange, 0.15));
  }

  // Icon circle
  &__icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: $purple;

    &:hover {
      transform: none;
    }
  }

  &__title {
    font-size: $h3;
    margin-bottom: 12px;
  }

  &__text {
    color: $text-muted;
    font-size: $body-lg;
    margin-bottom: 36px;
    max-width: 460px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
