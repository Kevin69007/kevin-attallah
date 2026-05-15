<template>
  <div class="page-appel-kevin">
    <WebGLBrutalistLight />
    <main class="brutal-content-stack">
      <section class="lp">
        <div class="container">
          <!-- Hero -->
          <div class="text-center">
            <span class="brutal-label">APPEL_KEVIN_</span>
            <h1 class="lp__title">
              ON ANALYSE TON BUSINESS <span class="text-orange">GRATUITEMENT.</span>
            </h1>
            <p class="lp__subtitle">{{ config.subtitle }}</p>
          </div>

          <!-- Top: Image + CTA card aligned at top -->
          <div class="lp__top mt-48">
            <div class="lp__image-wrap">
              <NuxtImg
                src="/img/kevin-identite.jpg"
                alt="Kevin Attallah"
                class="lp__image"
                format="webp"
                quality="80"
              />
            </div>

            <div class="lp__cta-card brutal-card brutal-card--orange">
              <h3 class="lp__cta-title">RÉSERVE TON CRÉNEAU</h3>
              <p class="lp__cta-subtitle">30 minutes en visio. 100% gratuit. Sans engagement.</p>

              <div class="lp__benefits mt-24">
                <div class="lp__benefit">
                  <Phone :size="16" />
                  <span>Appel vidéo</span>
                </div>
                <div class="lp__benefit">
                  <Clock :size="16" />
                  <span>30 min</span>
                </div>
                <div class="lp__benefit">
                  <UserCheck :size="16" />
                  <span>1-on-1 avec Kevin</span>
                </div>
              </div>

              <blockquote class="lp__quote">
                <Quote :size="18" class="lp__quote-icon" />
                <p>« 30 minutes qui ont totalement changé ma vision de l'IA pour mon business. Plan d'action clair en sortie. »</p>
                <footer>— Marie L. · entrepreneure</footer>
              </blockquote>

              <a
                :href="bookingUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="lp__cta-button"
                @click="onBookClick"
              >
                <Phone :size="18" />
                {{ config.ctaText.toUpperCase() }}
                <ArrowRight :size="18" />
              </a>

              <p class="lp__cta-privacy">
                🔒 Tu seras redirigé vers le calendrier Brevo officiel.
              </p>
            </div>
          </div>

          <!-- Below: Features grid + trust + reassurance -->
          <div class="lp__features mt-48">
            <div v-for="feature in config.features" :key="feature" class="lp__feature">
              <CheckCircle :size="18" class="lp__check" />
              <span>{{ feature }}</span>
            </div>
          </div>

          <div class="lp__trust mt-32">
            <div class="lp__trust-badge">
              <Users :size="14" />
              2100+ entrepreneurs accompagnés
            </div>
            <div class="lp__trust-badge">
              <Star :size="14" />
              4.8/5 satisfaction
            </div>
          </div>

          <p class="lp__reassurance mt-24">{{ config.reassurance }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import { CheckCircle, Users, Star, Phone, Clock, UserCheck, ArrowRight, Quote } from 'lucide-vue-next'
import { appelKevinConfig as config } from '~/data/appel-kevin'
import { externalLinks } from '~/data/external-links'

const bookingUrl = externalLinks.booking.propulseAvecIA

useHead({
  title: 'Appel avec Kevin — Audit gratuit',
  meta: [
    {
      name: 'description',
      content:
        '30 minutes avec Kevin pour analyser ton business et identifier comment l\'IA peut booster ton entreprise. Audit gratuit, sans engagement.',
    },
  ],
})

const { trackViewContent, trackLead } = useFBPixel()
const { trackViewItem, trackGenerateLead } = useGoogleAds()
const { trackConversion } = useLinkedIn()

const { $gsap } = useNuxtApp()

function onBookClick() {
  trackLead()
  trackGenerateLead()
}

onMounted(() => {
  trackViewContent({ content_name: 'Appel Kevin Landing Page' })
  trackViewItem({ content_name: 'Appel Kevin Landing Page' })
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
  gsap.fromTo('.lp__image-wrap',
    { x: -60, opacity: 0, rotationZ: -2 },
    { x: 0, opacity: 1, rotationZ: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.5 }
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
  gsap.fromTo('.lp__cta-card',
    { x: 60, opacity: 0, rotationZ: 3 },
    { x: 0, opacity: 1, rotationZ: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.5 }
  )
})
</script>

<style lang="scss" scoped>
.text-purple { color: $purple; }
.text-orange { color: $orange; }

.page-appel-kevin {
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
  padding: 110px 0 80px;
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

  &__top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: stretch;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  &__image-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    max-height: 560px;
    border: 4px solid #000;
    box-shadow: 12px 12px 0px $purple;
    overflow: hidden;
    background: $orange;
    transition: transform 0.2s, box-shadow 0.2s;

    @media (max-width: 768px) {
      aspect-ratio: 4 / 5;
      max-height: none;
    }

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 16px 16px 0px $orange;

      .lp__image {
        transform: scale(1.03);
      }
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
    transform: scale(1.06);
    transform-origin: center 25%;
    transition: transform 0.5s;
  }

  &__features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
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

  &__cta-card {
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: 768px) {
      margin-top: 32px;
      height: auto;
    }
  }

  &__cta-title {
    font-family: $font-heading;
    font-size: $h4;
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 8px;
  }

  &__cta-subtitle {
    font-family: $font-mono;
    color: #000;
    font-size: $small;
  }

  &__benefits {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__benefit {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;

    svg {
      flex-shrink: 0;
      color: $orange;
    }
  }

  &__quote {
    margin: 28px 0 0;
    padding: 18px 18px 18px 22px;
    background: rgba($purple, 0.06);
    border-left: 4px solid $orange;
    position: relative;

    p {
      font-family: $font-mono;
      font-size: 0.85rem;
      line-height: 1.6;
      color: #000;
      margin: 0 0 10px;
      font-style: italic;
    }

    footer {
      font-family: $font-mono;
      font-size: 0.7rem;
      font-weight: 700;
      color: $purple;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  &__quote-icon {
    color: $orange;
    margin-bottom: 8px;
  }

  &__cta-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    margin-top: auto;
    padding: 16px 24px;
    background: #000;
    color: #FFF;
    border: 4px solid #000;
    font-family: $font-mono;
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;

    &:hover {
      background: $orange;
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0px #000;
    }
  }

  &__cta-privacy {
    font-family: $font-mono;
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    margin-top: 12px;
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
