<template>
  <section class="testi-brutal section--white">
    <div class="container">
      <div class="testi-brutal__header">
        <span class="section-label">TÉMOIGNAGES_</span>
        <h2 class="testi-brutal__title">ILS ONT GAGNÉ LE JEU.</h2>
      </div>
    </div>

    <!-- Infinite GSAP Marquee for Reviews -->
    <div
      class="testi-marquee-wrap"
      @mouseenter="onHoverIn"
      @mouseleave="onHoverOut"
    >
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

let marqueeAnimation: any = null

const reviews = [
  {
    name: "Alexandre P.",
    company: "CEO, DataFlow",
    text: "Grâce aux stratégies de Kevin, on a intégré l'IA dans notre pipeline de vente et automatisé 70% du support client. Le ROI a été immédiat.",
    image: "/img/avatar/avatar-1.jpg"
  },
  {
    name: "Sarah M.",
    company: "Fondatrice, NeoAgency",
    text: "Kevin m'a aidé à restructurer mon agence autour de l'IA. On a triplé notre marge en un trimestre sans recruter. Une transformation radicale.",
    image: "/img/avatar/avatar-2.jpg"
  },
  {
    name: "David D.",
    company: "CTO, ScaleUp Labs",
    text: "Pas de théorie. Des frameworks concrets pour automatiser la R&D et le déploiement produit. On a gagné 2 ans d'avance sur nos concurrents.",
    image: "/img/avatar/avatar-3.jpg"
  },
  {
    name: "Julie T.",
    company: "Directrice IA, Pulse Tech",
    text: "L'accompagnement de Kevin sur l'intégration des agents IA dans nos workflows a changé la donne. Notre productivité a explosé de 400%.",
    image: "/img/avatar/avatar-4.jpg"
  },
  {
    name: "Marc L.",
    company: "Growth Lead, Vertex",
    text: "On a scalé notre acquisition x10 grâce à l'automatisation IA sans embaucher. Les méthodes sont chirurgicales et immédiatement applicables.",
    image: "/img/avatar/avatar-5.jpg"
  }
]

onMounted(() => {
  if (!$gsap || !marqueeRef.value) return
  const gsap = $gsap as any

  const duration = reviews.length * 6

  marqueeAnimation = gsap.to(marqueeRef.value, {
    xPercent: -50,
    ease: 'none',
    duration: duration,
    repeat: -1
  })
})

function onHoverIn() {
  if (!marqueeAnimation || !$gsap) return
  const gsap = $gsap as any
  gsap.to(marqueeAnimation, { timeScale: 0, duration: 0.8, ease: 'power2.out' })
}

function onHoverOut() {
  if (!marqueeAnimation || !$gsap) return
  const gsap = $gsap as any
  gsap.to(marqueeAnimation, { timeScale: 1, duration: 0.8, ease: 'power2.in' })
}
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
  padding: 20px 0 40px 0;
}

.testi-marquee {
  display: flex;
  width: fit-content;
  gap: 40px;
  padding-left: 40px;
}

.brutal-card {
  flex: 0 0 500px;
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
    border-radius: 50%;
  }

  &__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
