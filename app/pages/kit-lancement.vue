<template>
  <div class="page-kit-lancement">
    <WebGLBrutalistLight />
    <main class="brutal-content-stack">
      <section class="lp">
        <div class="container">
          <!-- Hero -->
          <div class="text-center">
            <span class="brutal-label">KIT_LANCEMENT_</span>
            <h1 class="lp__title">
              LE KIT POUR <span class="text-purple">LANCER TON ENTREPRISE.</span>
            </h1>
            <p class="lp__subtitle">{{ config.subtitle }}</p>
          </div>

          <div class="split mt-48">
            <!-- Left: Offer details -->
            <div class="lp__left">
              <div class="lp__features">
                <div v-for="feature in config.features" :key="feature" class="lp__feature">
                  <CheckCircle :size="18" class="lp__check" />
                  <span>{{ feature }}</span>
                </div>
              </div>

              <div class="lp__trust mt-32">
                <div class="lp__trust-badge">
                  <Users :size="14" />
                  2100+ entrepreneurs lancés
                </div>
                <div class="lp__trust-badge">
                  <Star :size="14" />
                  4.8/5 satisfaction
                </div>
                <div class="lp__trust-badge">
                  <Gift :size="14" />
                  100% gratuit
                </div>
              </div>

              <p class="lp__reassurance mt-24">{{ config.reassurance }}</p>
            </div>

            <!-- Right: Form -->
            <div class="lp__form-card brutal-card brutal-card--orange">
              <h3 class="lp__form-title">REÇOIS TON KIT</h3>
              <p class="lp__form-subtitle">Remplis le formulaire. Tu recevras le lien de téléchargement par email.</p>
              <KitLancementForm id-prefix="kit-page" class="mt-24" />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import KitLancementForm from '~/components/ui/KitLancementForm.vue'
import { CheckCircle, Users, Star, Gift } from 'lucide-vue-next'
import { kitLancementConfig as config } from '~/data/kit-lancement'

useHead({
  title: 'Kit de Lancement — Démarre ton entreprise',
  meta: [
    {
      name: 'description',
      content:
        "Le guide pratique gratuit pour démarrer ton projet d'entreprise du bon pied. Modèles, checklists et conseils concrets.",
    },
  ],
})

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
const { trackConversion } = useLinkedIn()

const { $gsap } = useNuxtApp()

onMounted(() => {
  trackViewContent({ content_name: 'Kit Lancement Landing Page' })
  trackViewItem({ content_name: 'Kit Lancement Landing Page' })
  trackConversion()

  if (!$gsap) return
  const gsap = $gsap as any

  gsap.fromTo('.lp__title',
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', delay: 0.2 }
  )
  gsap.fromTo('.lp__subtitle',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4 }
  )
  gsap.fromTo('.lp__feature',
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
  )
  gsap.fromTo('.lp__trust-badge',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 1 }
  )
  gsap.fromTo('.lp__reassurance',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 1.2 }
  )
  gsap.fromTo('.lp__form-card',
    { x: 60, opacity: 0, rotationZ: 3 },
    { x: 0, opacity: 1, rotationZ: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.5 }
  )
})
</script>

<style lang="scss" scoped>
.text-purple { color: $purple; }

.page-kit-lancement {
  position: relative;
  background: transparent;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

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

.lp {
  padding: 160px 0 80px;
  background: transparent;
  min-height: 100vh;

  &__title {
    font-family: $font-heading;
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    line-height: 1.15;
    max-width: 700px;
    margin: 0 auto;
  }

  &__subtitle {
    font-family: $font-mono;
    color: #000;
    font-size: clamp(0.875rem, 1.4vw, 1rem);
    line-height: 1.6;
    max-width: 560px;
    margin: 12px auto 0;
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
    padding: 140px 0 40px;
  }

  .lp__feature {
    box-shadow: 2px 2px 0px $purple;
  }
}
</style>
