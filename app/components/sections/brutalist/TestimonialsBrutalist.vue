<template>
  <section class="testi-brutal section--white">
    <div class="container">
      <div class="testi-brutal__header">
        <span class="section-label">TÉMOIGNAGES_</span>
        <h2 class="testi-brutal__title">ILS ONT GAGNÉ LE JEU.</h2>
      </div>
    </div>

    <!-- Infinite GSAP Marquee for Reviews -->
    <div class="testi-marquee-wrap">
      <div class="testi-marquee" ref="marqueeRef">
        <!-- Duplicate array for seamless infinite scroll -->
        <div 
          v-for="(review, index) in [...reviews, ...reviews]" 
          :key="index" 
          class="brutal-card"
        >
          <div class="brutal-card__top">
            <span class="brutal-card__id">ID_{{ String((index % reviews.length) + 1).padStart(3, '0') }}</span>
            <span class="brutal-card__rating">★★★★★</span>
          </div>
          
          <p class="brutal-card__quote">
            "{{ review.text }}"
          </p>
          
          <div class="brutal-card__footer">
            <div class="brutal-card__avatar-wrap">
              <NuxtImg :src="review.image" :alt="review.name" class="brutal-card__avatar" />
            </div>
            <div class="brutal-card__author">
              <strong>{{ review.name }}</strong>
              <span v-if="review.company"> // {{ review.company }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const marqueeRef = ref<HTMLElement | null>(null)
const { $gsap } = useNuxtApp()

const reviews = [
  {
    name: "Alexandre P.",
    company: "E-com Scale",
    text: "En 3 mois, on a automatisé 70% de notre support client grâce aux frameworks de Kevin. Le ROI est absurde.",
    image: "/img/testimonial/01.png"
  },
  {
    name: "Sarah M.",
    company: "Agence Creative",
    text: "Une approche radicale qui m'a forcé à revoir tout mon modèle d'agence. On a fait x3 sur la marge ce trimestre.",
    image: "/img/testimonial/02.png"
  },
  {
    name: "David D.",
    company: "Tech Founder",
    text: "Pas de théorie fumeuse. Que du concret, de la data et des process applicables le jour même. Une machine de guerre.",
    image: "/img/testimonial/03.png"
  },
  {
    name: "Julie T.",
    company: "SaaS Dev",
    text: "L'intégration de l'IA dans nos pipelines nous a fait gagner 2 ans de R&D. Exceptionnel. Le marché n'est pas prêt.",
    image: "/img/testimonial/04.png"
  },
  {
    name: "Marc L.",
    company: "Growth Agency",
    text: "On a scalé nos process d'acquisition x10 sans recruter une seule personne. Les méthodes de Kevin sont chirurgicales.",
    image: "/img/testimonial/05.png"
  }
]

onMounted(() => {
  if (!$gsap || !marqueeRef.value) return
  const gsap = $gsap as any

  // Calculate duration based on number of cards to ensure consistent speed
  const duration = reviews.length * 8

  gsap.to(marqueeRef.value, {
    xPercent: -50, // Move exactly half the width (since we duplicated the array)
    ease: 'none',
    duration: duration,
    repeat: -1
  })
})
</script>

<style lang="scss" scoped>
.testi-brutal {
  position: relative;
  z-index: 20;
  border-bottom: 4px solid #000;
  padding: 100px 0;
  background: #FFF;
  overflow: hidden;

  &__header {
    margin-bottom: 60px;
  }

  &__title {
    font-size: clamp(3rem, 6vw, 5rem);
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.04em;
    color: #000;
  }
}

.testi-marquee-wrap {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
  padding: 20px 0 40px 0; // padding for shadows
}

.testi-marquee {
  display: flex;
  width: fit-content;
  gap: 40px;
  padding-left: 40px;
}

.brutal-card {
  flex: 0 0 500px; // Fixed width for marquee items
  border: 4px solid #000;
  padding: 30px;
  background: #FAFAFA;
  box-shadow: 8px 8px 0px $orange;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    flex: 0 0 85vw;
  }

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px $purple;
    background: #FFF;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #000;
    padding-bottom: 12px;
    margin-bottom: 24px;
    font-family: $font-mono;
    font-weight: 700;
  }

  &__id {
    color: $purple;
  }

  &__rating {
    color: $orange;
    letter-spacing: 2px;
  }

  &__quote {
    font-family: $font-mono;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #000;
    flex-grow: 1;
    margin-bottom: 30px;
    text-transform: uppercase;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 16px;
    border-top: 2px solid #000;
    padding-top: 20px;
  }

  &__avatar-wrap {
    width: 60px;
    height: 60px;
    border: 2px solid #000;
    overflow: hidden;
    background: $purple;
    flex-shrink: 0;
  }
  
  &__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(120%);
  }

  &__author {
    font-family: $font-heading;
    font-size: 1.1rem;
    color: #000;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    
    strong {
      background: #000;
      color: #FFF;
      padding: 4px 8px;
      width: fit-content;
      margin-bottom: 4px;
    }

    span {
      font-family: $font-mono;
      color: $text-body;
      font-size: 0.9rem;
    }
  }
}
</style>
