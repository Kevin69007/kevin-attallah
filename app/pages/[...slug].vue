<template>
  <div class="not-found">
    <div class="container text-center not-found__content">
      <div class="not-found__code-wrap">
        <span class="not-found__code-bg">404</span>
        <h1 class="not-found__code">404</h1>
      </div>
      <h2 class="not-found__title">PAGE INTROUVABLE.</h2>
      <p class="not-found__text">
        LA PAGE QUE VOUS RECHERCHEZ N'EXISTE PAS OU A ÉTÉ DÉPLACÉE.
      </p>
      <div class="not-found__ctas">
        <AppButton variant="primary" to="/">
          RETOUR À L'ACCUEIL
        </AppButton>
        <AppButton variant="ghost-light" to="/formations">
          VOIR LES FORMATIONS
        </AppButton>
      </div>
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
  justify-content: center;
  padding: 120px 0 60px;
  background: #FFF;
  border-bottom: 4px solid #000;

  &__content {
    position: relative;
  }

  &__code-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 32px;
  }

  &__code-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: $font-heading;
    font-size: clamp(10rem, 25vw, 20rem);
    font-weight: 900;
    line-height: 1;
    color: rgba(0, 0, 0, 0.04);
    pointer-events: none;
    user-select: none;
  }

  &__code {
    position: relative;
    font-family: $font-heading;
    font-size: clamp(6rem, 15vw, 12rem);
    font-weight: 900;
    line-height: 1;
    color: $purple;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: #000;
    margin-bottom: 16px;
  }

  &__text {
    font-family: $font-mono;
    font-size: 1rem;
    color: #000;
    margin-bottom: 40px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  &__ctas {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
