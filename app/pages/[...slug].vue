<template>
  <div class="not-found section--dark">
    <div class="not-found__bg">
      <div class="orb orb--purple not-found__orb"></div>
    </div>
    <div class="container text-center not-found__content">
      <ScrollReveal>
        <h1 class="not-found__code gradient-text">404</h1>
        <h2 class="text-white mt-16">Page introuvable</h2>
        <p class="text-muted mt-16 mb-32">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div class="btn-group" style="justify-content: center">
          <AppButton variant="primary" to="/">
            Retour à l'accueil
          </AppButton>
          <AppButton variant="ghost" to="/formations">
            Voir les formations
          </AppButton>
        </div>
      </ScrollReveal>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '404 - Page introuvable' })
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: $gradient-hero;
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;
    width: 500px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__code {
    font-family: $font-heading;
    font-size: clamp(6rem, 15vw, 12rem);
    font-weight: 900;
    line-height: 1;
  }
}
</style>
