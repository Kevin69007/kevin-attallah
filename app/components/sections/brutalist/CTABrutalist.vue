<template>
  <section class="cta-brutal">
    <div class="container cta-brutal__inner">
      <h2 class="cta-brutal__title">
        <span class="block">L'HÉSITATION</span>
        <span class="block outline-text">COÛTE CHER.</span>
      </h2>
      
      <p class="cta-brutal__subtitle">
        Le marché n'attend pas ceux qui réfléchissent trop. <br>
        Passez à l'action. Maintenant.
      </p>

      <div class="cta-brutal__btn-wrap" ref="btnWrapRef">
        <AppButton variant="primary" size="lg" to="/creer-entreprise" class="btn-massive">
          LANCER LA MACHINE
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const btnWrapRef = ref(null)
const { $gsap } = useNuxtApp()

onMounted(() => {
  if (!$gsap || !btnWrapRef.value) return
  const gsap = $gsap as any

  gsap.from(btnWrapRef.value, {
    scale: 0.5,
    opacity: 0,
    rotationZ: -5,
    duration: 0.8,
    ease: 'back.out(2)',
    scrollTrigger: {
      trigger: '.cta-brutal',
      start: 'top 70%'
    }
  })
})
</script>

<style lang="scss" scoped>
.cta-brutal {
  position: relative;
  z-index: 20; // Above WebGL
  background: #FFF;
  border-top: 4px solid #000;
  padding: 120px 0;
  text-align: center;
  overflow: hidden;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: clamp(3rem, 10vw, 8rem);
    text-transform: uppercase;
    line-height: 0.85;
    letter-spacing: -0.05em;
    margin-bottom: 30px;
    color: #000;
    
    .block {
      display: block;
    }

    .outline-text {
      color: transparent;
      -webkit-text-stroke: 4px #000;
      
      @media (max-width: 768px) {
        -webkit-text-stroke: 2px #000;
      }
    }
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: 1.25rem;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    max-width: 600px;
    margin-bottom: 60px;
  }

  &__btn-wrap {
    display: inline-block;
  }

  .btn-massive {
    font-size: 2rem;
    padding: 30px 60px;
    border-width: 4px;
    box-shadow: 12px 12px 0px #000;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 16px 16px 0px #000;
    }

    &:active {
      transform: translate(8px, 8px);
      box-shadow: 0px 0px 0px #000;
    }
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
      padding: 20px 40px;
    }
  }
}
</style>
