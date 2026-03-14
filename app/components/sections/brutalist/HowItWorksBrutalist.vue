<template>
  <section class="hiw-brutal" ref="sectionRef">
    <div class="hiw-brutal__header">
      <h2 class="hiw-brutal__title">SYSTÈME EN 3 ÉTAPES.</h2>
    </div>

    <!-- The horizontal track -->
    <div class="hiw-brutal__track-wrap" ref="trackWrapRef">
      <div class="hiw-brutal__track" ref="trackRef">
        
        <!-- Step 1 -->
        <article class="brutal-step brutal-step--purple">
          <div class="brutal-step__number">01</div>
          <h3 class="brutal-step__title">AUDIT &<br>STRATÉGIE</h3>
          <p class="brutal-step__desc">
            On détruit ce qui ne marche pas. On garde l'essentiel.
            Mise en place d'un plan d'action implacable.
          </p>
        </article>

        <!-- Step 2 -->
        <article class="brutal-step brutal-step--orange">
          <div class="brutal-step__number">02</div>
          <h3 class="brutal-step__title">INTÉGRATION<br>IA</h3>
          <p class="brutal-step__desc">
            Déploiement des workflows automatisés. Vos processus 
            deviennent des machines de guerre infatigables.
          </p>
        </article>

        <!-- Step 3 -->
        <article class="brutal-step brutal-step--white">
          <div class="brutal-step__number">03</div>
          <h3 class="brutal-step__title">SCALE &<br>DOMINATION</h3>
          <p class="brutal-step__desc">
            Acquisition agressive. Optimisation des conversions.
            On prend la place qui vous revient sur le marché.
          </p>
        </article>
        
        <!-- Ending block -->
        <article class="brutal-step brutal-step--black">
          <h3 class="brutal-step__title text-white">PRÊT ?</h3>
          <AppButton variant="primary" class="mt-4">
            LANCER LE PROTOCOLE
          </AppButton>
        </article>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const trackWrapRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

const { $gsap } = useNuxtApp()
let ctx: any

onMounted(() => {
  if (!$gsap) return
  const gsap = $gsap as any

  ctx = gsap.context(() => {
    // Mechanical horizontal scroll
    const trackWidth = trackRef.value?.scrollWidth || window.innerWidth * 3
    const amountToScroll = trackWidth - window.innerWidth

    gsap.to(trackRef.value, {
      x: -amountToScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: trackWrapRef.value,
        start: 'top top',
        end: `+=${amountToScroll}`, // Pin for the duration of the scroll width
        pin: true,
        scrub: 1, // slight lag for mechanical heavy feel
        invalidateOnRefresh: true,
      }
    })
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  if (ctx) ctx.revert()
})
</script>

<style lang="scss" scoped>
.hiw-brutal {
  background: $bg-light-2;
  position: relative;
  z-index: 20;
  border-bottom: 4px solid #000;
  overflow: hidden;

  &__header {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 30;
    mix-blend-mode: difference;
    color: #FFF;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }

  &__track-wrap {
    height: 100vh;
    display: flex;
    align-items: center;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIgZmlsbD0iI2QxZDVkYiI+PC9jaXJjbGU+Cjwvc3ZnPg==') repeat;
  }

  &__track {
    display: flex;
    height: 70vh;
    padding: 0 10vw;
    gap: 0; // Negative or zero gap to have borders touch perfectly
  }
}

.brutal-step {
  flex: 0 0 600px;
  height: 100%;
  border: 4px solid #000;
  border-right: none; // prevent double borders
  padding: 60px 40px; // Increased side padding so text doesn't hit edge
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  transition: transform 0.3s;

  &:last-child {
    border-right: 4px solid #000;
    flex: 0 0 400px;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex: 0 0 85vw;
    padding: 30px 20px;
  }

  &--purple { background: $purple; color: #FFF; }
  &--orange { background: $orange; color: #000; }
  &--white { background: #FFF; color: #000; }
  &--black { background: #000; color: #FFF; }

  &__number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-family: $font-mono;
    font-size: clamp(6rem, 15vw, 12rem);
    font-weight: 700;
    line-height: 0.8;
    opacity: 0.2;
    pointer-events: none;
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.04em;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
  }

  &__desc {
    font-family: $font-mono;
    font-size: 1.125rem;
    line-height: 1.6;
    max-width: 400px;
    font-weight: 700;
    position: relative;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    border-right: 4px solid #000; // restore border on hover if shifted
    box-shadow: 16px 16px 0px rgba(0,0,0,0.5);
    z-index: 10;
  }
}
</style>
