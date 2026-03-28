<template>
  <section class="hero-brutal">
    <div class="container hero-brutal__grid">
      <!-- Text Column -->
      <div class="hero-brutal__content">
        <h1 class="hero-brutal__title">
          <span class="block line-1">CRÉEZ.</span>
          <span class="block line-2 outline-text">BOOSTEZ.</span>
          <span class="block line-3 text-purple">DOMINEZ.</span>
        </h1>
        
        <p class="hero-brutal__subtitle">
          L'IA va créer les gagnants de demain. Décide maintenant dans quel camp tu veux être.
        </p>

        <div class="hero-brutal__ctas">
          <AppButton variant="primary" size="lg" to="/creer-entreprise">
            CRÉER MON ENTREPRISE
          </AppButton>
          <AppButton variant="ghost-light" size="lg" to="/evoluer-ia">
            BOOSTER MON ENTREPRISE
          </AppButton>
        </div>
      </div>

      <!-- Image Column -->
      <div class="hero-brutal__image-col">
        <div class="hero-image-wrap">
          <NuxtImg
            src="/img/banner-right-img.jpg"
            alt="Kevin Attallah"
            class="hero-img"
            format="webp"
            quality="90"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { onMounted } from 'vue'

const { $gsap } = useNuxtApp()

onMounted(() => {
  if (!$gsap) return
  const gsap = $gsap as any

  // Aggressive snapping entrance
  gsap.fromTo('.hero-brutal__title .block', 
    { y: 150, opacity: 0, rotationZ: 5 },
    { y: 0, opacity: 1, rotationZ: 0, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
  )

  gsap.fromTo('.hero-brutal__subtitle',
    { x: -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.8 }
  )

  gsap.fromTo('.hero-brutal__ctas',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 1 }
  )
})
</script>

<style lang="scss" scoped>
.hero-brutal {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  padding-top: 120px;
  overflow: hidden;
  background: transparent;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      margin-top: 80px;
    }
  }

  &__content {
    width: 100%;
    position: relative;
  }

  &__title {
    font-size: clamp(4rem, 12vw, 10rem);
    font-weight: 700;
    line-height: 0.85;
    letter-spacing: -0.05em;
    margin-bottom: 40px;
    color: #000000;
    text-transform: uppercase;
    
    .block {
      display: block;
      will-change: transform, opacity;
      transform-origin: left bottom;
    }

    .outline-text {
      color: transparent;
      -webkit-text-stroke: 3px #000000;
      
      @media (max-width: 768px) {
        -webkit-text-stroke: 1.5px #000000;
      }
    }
    .text-purple {
      color: $purple;
    }
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    color: #000000;
    max-width: 550px;
    margin-bottom: 50px;
    letter-spacing: 0em;
    text-transform: uppercase;
    font-weight: 700;
    background: #FFFFFF;
    padding: 16px 20px;
    border: 2px solid #000;
    box-shadow: 4px 4px 0px #000;
    display: inline-block;
  }

  &__ctas {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      
      .btn {
        width: 100%;
      }
    }
  }
}

.hero-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  background: #FAFAFA;
  border: 4px solid #000;
  box-shadow: 16px 16px 0px $purple;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  @media (max-width: 1024px) {
    max-width: 500px;
    margin: 0 auto 60px;
  }

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 20px 20px 0px $orange;

    .hero-img {
      transform: scale(1.03);
    }
  }

  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.3s;
  }
}

@media (max-width: 640px) {
  .hero-brutal__subtitle {
    box-shadow: 2px 2px 0px #000;
  }
}

@media (max-width: 480px) {
  .hero-brutal__ctas {
    flex-direction: column;
  }

  .hero-brutal__image-col .hero-image-wrap {
    max-width: 100%;
  }
}
</style>
