<template>
  <section ref="sectionRef" class="testimonials section--dark">
    <div class="container">
      <ScrollReveal>
        <span class="section-label text-center">Témoignages</span>
        <h2 class="section-title text-center text-white">
          Ils ont <span class="gradient-text">transformé</span> leur vie
        </h2>
      </ScrollReveal>
    </div>

    <!-- Dual-row marquee -->
    <div class="testimonials__marquee">
      <!-- Row 1: drifts left on scroll -->
      <div ref="row1Ref" class="testimonials__row">
        <div v-for="t in row1" :key="t.id" class="t-card">
          <div class="t-card__accent"></div>
          <div class="t-card__content">
            <div class="t-card__head">
              <div class="t-card__icon">
                <Quote :size="18" />
              </div>
              <div class="t-card__stars">
                <Star v-for="s in t.rating" :key="s" :size="13" fill="currentColor" />
              </div>
            </div>
            <p class="t-card__quote">{{ t.quote }}</p>
            <div class="t-card__divider"></div>
            <div class="t-card__author">
              <div class="t-card__photo-ring">
                <img :src="t.image" :alt="t.name" class="t-card__photo" loading="lazy" />
              </div>
              <div class="t-card__info">
                <span class="t-card__name">{{ t.name }}, {{ t.age }} ans</span>
                <span :class="['t-card__cat', `t-card__cat--${t.categorie.toLowerCase()}`]">
                  {{ t.categorie }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: drifts right on scroll -->
      <div ref="row2Ref" class="testimonials__row testimonials__row--reverse">
        <div v-for="t in row2" :key="t.id" class="t-card">
          <div class="t-card__accent"></div>
          <div class="t-card__content">
            <div class="t-card__head">
              <div class="t-card__icon">
                <Quote :size="18" />
              </div>
              <div class="t-card__stars">
                <Star v-for="s in t.rating" :key="s" :size="13" fill="currentColor" />
              </div>
            </div>
            <p class="t-card__quote">{{ t.quote }}</p>
            <div class="t-card__divider"></div>
            <div class="t-card__author">
              <div class="t-card__photo-ring">
                <img :src="t.image" :alt="t.name" class="t-card__photo" loading="lazy" />
              </div>
              <div class="t-card__info">
                <span class="t-card__name">{{ t.name }}, {{ t.age }} ans</span>
                <span :class="['t-card__cat', `t-card__cat--${t.categorie.toLowerCase()}`]">
                  {{ t.categorie }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust bar -->
    <div class="container">
      <ScrollReveal :delay="0.3">
        <div class="testimonials__trust-bar">
          <div class="testimonials__trust-card">
            <span class="testimonials__trust-stars">★★★★★</span>
            <span class="testimonials__trust-text">4.8/5 sur <strong>Google</strong></span>
          </div>
          <div class="testimonials__trust-sep"></div>
          <div class="testimonials__trust-card testimonials__trust-card--tp">
            <span class="testimonials__trust-stars testimonials__trust-stars--tp">★★★★★</span>
            <span class="testimonials__trust-text">"Excellent" sur <strong>Trustpilot</strong></span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Quote, Star } from 'lucide-vue-next'
import { testimonials } from '~/data/testimonials'

const { $gsap } = useNuxtApp()

const sectionRef = ref<HTMLElement | null>(null)
const row1Ref = ref<HTMLElement | null>(null)
const row2Ref = ref<HTMLElement | null>(null)

// Split testimonials into 2 rows
const mid = Math.ceil(testimonials.length / 2)
const row1 = testimonials.slice(0, mid)
const row2 = testimonials.slice(mid)

onMounted(() => {
  if (!$gsap || !sectionRef.value) return

  const gsap = $gsap as any

  nextTick(() => {
    // Row 1: drifts left as user scrolls down
    if (row1Ref.value) {
      gsap.fromTo(
        row1Ref.value,
        { x: '8%' },
        {
          x: '-8%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
    }

    // Row 2: drifts right as user scrolls down
    if (row2Ref.value) {
      gsap.fromTo(
        row2Ref.value,
        { x: '-8%' },
        {
          x: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
    }
  })
})
</script>

<style lang="scss" scoped>
.testimonials {
  background: $bg-dark-2;
  overflow: hidden;

  // Marquee container with edge fades
  &__marquee {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 48px;
    margin-bottom: 48px;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 5%,
      black 95%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 5%,
      black 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      gap: 14px;
      margin-top: 32px;
      margin-bottom: 32px;
    }
  }

  // Row
  &__row {
    display: flex;
    gap: 20px;
    width: max-content;
    will-change: transform;

    @media (max-width: 768px) {
      gap: 14px;
    }
  }

  // Trust bar
  &__trust-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 12px;
    }
  }

  &__trust-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background: $glass-bg;
    border: 1px solid $glass-border;
    border-radius: $radius-full;
  }

  &__trust-stars {
    font-size: 13px;
    color: #facc15;
    letter-spacing: 1px;

    &--tp {
      color: #00b67a;
    }
  }

  &__trust-text {
    font-size: 13px;
    color: $text-on-dark-muted;

    strong {
      color: $text-on-dark;
    }
  }

  &__trust-sep {
    width: 1px;
    height: 24px;
    background: $glass-border;

    @media (max-width: 480px) {
      width: 40px;
      height: 1px;
    }
  }
}

// Testimonial card
.t-card {
  width: 350px;
  flex-shrink: 0;
  border-radius: $radius-lg;
  background: linear-gradient(155deg, rgba($purple, 0.12), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: all 0.4s $ease-smooth;

  @media (max-width: 768px) {
    width: 290px;
  }

  &:hover {
    border-color: rgba($purple, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 20px 50px rgba($purple, 0.15), 0 0 0 1px rgba($purple, 0.1);
  }

  // Top gradient line
  &__accent {
    height: 2px;
    background: linear-gradient(90deg, $purple, $orange);
  }

  &__content {
    padding: 28px;
  }

  // Header row: quote icon + stars
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  // Quote icon
  &__icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba($orange, 0.15), rgba($purple, 0.1));
    border: 1px solid rgba($orange, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $orange;
  }

  // Stars
  &__stars {
    display: flex;
    gap: 2px;
    color: #facc15;
  }

  // Quote text
  &__quote {
    font-family: $font-heading;
    font-size: 0.95rem;
    font-weight: 500;
    color: $text-on-dark;
    line-height: 1.75;
    min-height: 76px;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }

  // Divider
  &__divider {
    height: 1px;
    background: linear-gradient(90deg, rgba($purple, 0.15), rgba($orange, 0.1), transparent);
    margin: 20px 0;
  }

  // Author
  &__author {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__photo-ring {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(135deg, $purple, $orange);
    flex-shrink: 0;
  }

  &__photo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    border: 2px solid $bg-dark-2;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  &__name {
    color: $text-white;
    font-size: $small;
    font-weight: 600;
  }

  &__cat {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: $purple-light;

    &--langues { color: #34d399; }
    &--bureautique { color: $orange-light; }
    &--infographie { color: #f472b6; }
    &--video { color: #60a5fa; }
    &--entrepreneur { color: $purple-light; }
  }
}
</style>
