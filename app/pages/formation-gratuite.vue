<template>
  <div class="page-formation-gratuite">
    <WebGLBrutalistLight />
    <main class="brutal-content-stack">
    <section class="lp">
      <div class="container">
        <!-- Hero -->
        <div class="text-center">
          <span class="brutal-label">FORMATION_GRATUITE_</span>
          <h1 class="lp__title">
            UNE FORMATION GRATUITE. <span class="text-purple">CHAQUE SEMAINE.</span>
          </h1>
          <p class="lp__subtitle">{{ config.subtitle }}</p>
        </div>

        <div class="split mt-48">
          <!-- Left: Offer details -->
          <div class="lp__left">
            <!-- Features -->
            <div class="lp__features">
              <div v-for="feature in config.features" :key="feature" class="lp__feature">
                <CheckCircle :size="18" class="lp__check" />
                <span>{{ feature }}</span>
              </div>
            </div>

            <!-- Trust signals -->
            <div class="lp__trust mt-32">
              <div class="lp__trust-badge">
                <Users :size="14" />
                2100+ entrepreneurs lancés
              </div>
              <div class="lp__trust-badge">
                <Star :size="14" />
                4.8/5 satisfaction
              </div>
            </div>

            <!-- Reassurance -->
            <p class="lp__reassurance mt-24">{{ config.reassurance }}</p>
          </div>

          <!-- Right: Form -->
          <div class="lp__form-card brutal-card brutal-card--orange">
            <h3 class="lp__form-title">ACCÈS IMMÉDIAT</h3>
            <p class="lp__form-subtitle">Remplis le formulaire. Reçois tes accès par email.</p>
            <FreeFormationForm class="mt-24" />
          </div>
        </div>
      </div>
    </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import { Gift, CheckCircle, Users, Star } from 'lucide-vue-next'
import { freeFormationConfig as config } from '~/data/free-formation'

useHead({
  title: 'Formation Gratuite',
  meta: [
    {
      name: 'description',
      content:
        'Recevez une formation professionnelle gratuite chaque semaine. Accédez à du contenu de qualité pour lancer ou booster votre activité.',
    },
  ],
})

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()

const { $gsap } = useNuxtApp()

onMounted(() => {
  trackViewContent({ content_name: 'Formation Gratuite Landing Page' })
  trackViewItem({ content_name: 'Formation Gratuite Landing Page' })

  if (!$gsap) return
  const gsap = $gsap as any

  // Hero entrance
  gsap.fromTo('.lp__title',
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', delay: 0.2 }
  )
  gsap.fromTo('.lp__subtitle',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4 }
  )

  // Feature cards stagger
  gsap.fromTo('.lp__feature',
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
  )

  // Trust badges
  gsap.fromTo('.lp__trust-badge',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 1 }
  )

  // Reassurance text
  gsap.fromTo('.lp__reassurance',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 1.2 }
  )

  // Form card entrance
  gsap.fromTo('.lp__form-card',
    { x: 60, opacity: 0, rotationZ: 3 },
    { x: 0, opacity: 1, rotationZ: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.5 }
  )
})
</script>

<style lang="scss" scoped>
.text-purple { color: $purple; }

.page-formation-gratuite {
  position: relative;
  background: #FFF;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

/* ── Brutalist shared ── */
.brutal-label {
  display: inline-block;
  font-family: $font-mono;
  font-size: $xs;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: $purple;
  border: 2px solid $purple;
  padding: 6px 16px;
  font-weight: 700;
  margin-bottom: 16px;
}

.brutal-card {
  background: #fff;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px $purple;
  padding: 32px;

  &--orange {
    box-shadow: 8px 8px 0px $orange;
  }
}

/* ── Page ── */
.lp {
  padding: 140px 0 80px;
  background: #fff;
  min-height: 100vh;

  &__title {
    font-family: $font-heading;
    font-size: $h1;
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    line-height: 1.1;
    max-width: 700px;
    margin: 0 auto;
  }

  &__subtitle {
    font-family: $font-mono;
    color: #000;
    font-size: $body-lg;
    line-height: 1.7;
    max-width: 600px;
    margin: 16px auto 0;
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #000;
    font-family: $font-mono;
    font-size: $small;
    padding: 12px 16px;
    background: #fff;
    border: 4px solid #000;
    box-shadow: 4px 4px 0px $purple;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 8px 8px 0px $orange;
    }
  }

  &__check {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    padding: 5px;
    background: #000;
    color: #fff;
  }

  &__trust {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: $font-mono;
    font-size: $xs;
    text-transform: uppercase;
    font-weight: 700;
    color: #000;
    border: 2px solid #000;
    padding: 8px 14px;
    transition: transform 0.15s, box-shadow 0.15s;

    svg { color: $orange; }

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0px $purple;
    }
  }

  &__reassurance {
    font-family: $font-mono;
    color: #000;
    font-size: $xs;
    line-height: 1.6;
    border-left: 4px solid $purple;
    padding-left: 16px;
  }

  &__form-card {
    @media (max-width: 768px) { margin-top: 32px; }
  }

  &__form-title {
    font-family: $font-heading;
    font-size: $h4;
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 8px;
  }

  &__form-subtitle {
    font-family: $font-mono;
    color: #000;
    font-size: $small;
  }
}

@media (max-width: 640px) {
  .lp {
    padding: 120px 0 40px;
  }

  .lp__feature {
    box-shadow: 2px 2px 0px $purple;
  }
}
</style>
