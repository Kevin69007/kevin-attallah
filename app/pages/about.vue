<template>
  <div class="about-brutal">
    <WebGLBrutalistLight />
    <main class="brutal-content-stack">
    <!-- Hero -->
    <section class="about-brutal__hero">
      <div class="container">
        <div class="about-brutal__grid">
          <!-- Left: Photo -->
          <div class="about-brutal__photo-col">
            <div class="about-brutal__photo-wrap">
              <NuxtImg
                src="/img/about/about-1.png"
                alt="Kevin Attallah"
                class="about-brutal__photo-img"
                format="webp"
                quality="80"
              />
            </div>
          </div>

          <!-- Right: Content -->
          <div class="about-brutal__content-col">
            <span class="section-label">À_PROPOS_</span>

            <h1 class="about-brutal__title">
              KEVIN<br>
              <span class="text-purple">ATTALLAH.</span>
            </h1>

            <div class="about-brutal__text-block">
              <p>
                Serial entrepreneur, aujourd'hui expert en IA. Je construis des machines à cash et j'automatise les entreprises de ceux qui refusent de stagner.
              </p>
              <p>
                Oublie la théorie. Je te livre les méthodes exactes que j'ai utilisées pour générer des millions et faire tourner mes entreprises sans moi.
              </p>
            </div>

            <div class="about-brutal__stats">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="about-brutal__stat"
              >
                <span class="about-brutal__stat-value">
                  <CountUp :end="stat.value" :suffix="stat.suffix" />
                </span>
                <span class="about-brutal__stat-label">{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TunnelTransition text="AU CŒUR DU SYSTÈME." />

    <!-- Values -->
    <section class="about-brutal__values">
      <div class="container">
        <span class="section-label">VALEURS_</span>
        <h2 class="about-brutal__section-title">
          CE QUI NOUS <span class="text-purple">GUIDE.</span>
        </h2>

        <div class="about-brutal__values-grid" ref="valuesGridRef">
          <div
            v-for="(val, i) in values"
            :key="val.title"
            class="about-brutal__value-card"
          >
            <div class="about-brutal__value-icon">
              <component :is="val.icon" :size="32" />
            </div>
            <h3 class="about-brutal__value-title">{{ val.title }}</h3>
            <p class="about-brutal__value-desc">{{ val.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <TunnelTransition text="REJOINS-NOUS." />

    <!-- Social -->
    <section class="about-brutal__social">
      <div class="container text-center">
        <span class="section-label">RÉSEAUX_</span>
        <h2 class="about-brutal__section-title">
          SUIVEZ <span class="text-purple">KEVIN.</span>
        </h2>
        <p class="about-brutal__social-sub">
          REJOINS LA COMMUNAUTÉ.
        </p>

        <div class="about-brutal__social-pills" ref="socialPillsRef">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="about-brutal__social-pill"
          >
            <span class="about-brutal__social-icon" v-html="socialIcons[link.icon]"></span>
            <span class="about-brutal__social-name">{{ link.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <CTABrutalist />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Heart, Zap, Users, Target } from 'lucide-vue-next'
import { socialLinks } from '~/data/social'
import CTABrutalist from '~/components/sections/brutalist/CTABrutalist.vue'
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import TunnelTransition from '~/components/sections/brutalist/TunnelTransition.vue'


useHead({ title: 'À propos' })

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
const { trackConversion } = useLinkedIn()
const { $gsap } = useNuxtApp()

const valuesGridRef = ref(null)
const socialPillsRef = ref(null)

onMounted(() => {
  trackViewContent({ content_name: 'À propos' })
  trackViewItem({ content_name: 'À propos' })
  trackConversion()

  if (!$gsap) return
  const gsap = $gsap as any

  // Animate value cards
  if (valuesGridRef.value) {
    gsap.from((valuesGridRef.value as HTMLElement).children, {
      y: 60,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: valuesGridRef.value,
        start: 'top 80%',
      },
    })
  }

  // Animate social pills
  if (socialPillsRef.value) {
    gsap.from((socialPillsRef.value as HTMLElement).children, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: socialPillsRef.value,
        start: 'top 80%',
      },
    })
  }
})

const stats = [
  { value: 2100, suffix: '+', label: 'Entrepreneurs formés' },
  { value: 11, suffix: ' ans', label: "Ans d'expérience" },
  { value: 98, suffix: '%', label: 'Satisfaction' },
]

const values = [
  { icon: Heart, title: 'Authenticité', description: 'Créées par un entrepreneur, pour des entrepreneurs. Du concret, pas de la théorie.' },
  { icon: Zap, title: 'Innovation IA', description: "L'IA est intégrée à chaque formation. Des résultats modernes avec les bons outils." },
  { icon: Users, title: 'Accessibilité', description: '100% finançable. Accessible à tous les niveaux et tous les budgets.' },
  { icon: Target, title: 'Résultats', description: '+2100 entrepreneurs formés avec 98% de satisfaction. Les chiffres parlent.' },
]

const socialIcons: Record<string, string> = {
  facebook: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.88 0 1.441 1.441 0 0 1 2.88 0z"/></svg>',
}
</script>

<style lang="scss" scoped>
.about-brutal {
  position: relative;
  background: #FFF;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

// ── Hero ──
.about-brutal__hero {
  position: relative;
  z-index: 20;
  background: #FFF;
  border-bottom: 4px solid #000;
  padding: 140px 0 80px;
}

.about-brutal__grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
  border: 4px solid #000;
  background: #000;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.about-brutal__photo-col,
.about-brutal__content-col {
  background: #FFF;
  padding: 60px;

  @media (max-width: 768px) {
    padding: 30px;
  }
}

.about-brutal__content-col {
  border-left: 4px solid #000;

  @media (max-width: 1024px) {
    border-left: none;
    border-top: 4px solid #000;
  }
}

.about-brutal__photo-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 7 / 10;
  border: 4px solid #000;
  box-shadow: 16px 16px 0px $purple;
  overflow: hidden;
  background: $orange;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 20px 20px 0px $orange;
  }
}

.about-brutal__photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;

  .about-brutal__photo-wrap:hover & {
    transform: scale(1.03);
  }
}

.about-brutal__title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin: 16px 0 30px;
  color: #000;

  .text-purple {
    color: $purple;
  }
}

.about-brutal__text-block {
  font-family: $font-mono;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  padding-left: 20px;
  border-left: 4px solid $orange;

  p {
    margin-bottom: 16px;
    color: #000;
  }
}

.about-brutal__stats {
  display: flex;
  gap: 0;
  flex-wrap: wrap;
  border: 4px solid #000;
  background: #000;
}

.about-brutal__stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #FFF;
  padding: 20px 24px;
  transition: background 0.2s, color 0.2s;

  & + & {
    border-left: 4px solid #000;
  }

  &:hover {
    background: #000;

    .about-brutal__stat-value {
      color: $orange;
    }

    .about-brutal__stat-label {
      color: #FFF;
    }
  }

  @media (max-width: 600px) {
    min-width: 100%;

    & + & {
      border-left: none;
      border-top: 4px solid #000;
    }
  }
}

.about-brutal__stat-value {
  font-family: $font-heading;
  font-size: 2rem;
  font-weight: 900;
  color: $purple;
  transition: color 0.2s;
}

.about-brutal__stat-label {
  font-family: $font-mono;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #000;
  transition: color 0.2s;
}

// ── Values ──
.about-brutal__values {
  position: relative;
  z-index: 20;
  background: #FFF;
  border-bottom: 4px solid #000;
  padding: 80px 0;
}

.about-brutal__section-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  text-transform: uppercase;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 48px;
  color: #000;

  .text-purple {
    color: $purple;
  }
}

.about-brutal__values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 48px 1fr;
  gap: 0;
  border: 4px solid #000;
  background: #000;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 48px 1fr 48px 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

.about-brutal__value-card {
  background: #FFF;
  padding: 40px 30px;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;

  // Odd cards (1st, 3rd): span both rows, start at top
  &:nth-child(odd) {
    grid-row: 1 / 3;
  }

  // Even cards (2nd, 4th): only in row 2, black gap in row 1
  &:nth-child(even) {
    grid-row: 2 / 3;
  }

  @media (max-width: 1024px) {
    &:nth-child(1) { grid-row: 1 / 3; }
    &:nth-child(2) { grid-row: 2 / 3; }
    &:nth-child(3) { grid-row: 3 / 5; }
    &:nth-child(4) { grid-row: 4 / 5; }
  }

  @media (max-width: 600px) {
    &:nth-child(n) {
      grid-row: auto;
    }
  }

  & + & {
    border-left: 4px solid #000;
  }

  @media (max-width: 1024px) {
    &:nth-child(n + 3) {
      border-top: 4px solid #000;
    }

    &:nth-child(odd) {
      border-left: none;
    }
  }

  @media (max-width: 600px) {
    & + & {
      border-left: none;
      border-top: 4px solid #000;
    }
  }

  &:hover {
    background: #000;

    .about-brutal__value-icon {
      color: $orange;
    }

    .about-brutal__value-title {
      color: #FFF;
    }

    .about-brutal__value-desc {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

.about-brutal__value-icon {
  color: $purple;
  margin-bottom: 16px;
  transition: color 0.2s;
}

.about-brutal__value-title {
  font-size: 1.25rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 12px;
  transition: color 0.2s;
}

.about-brutal__value-desc {
  font-family: $font-mono;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #333;
  transition: color 0.2s;
}

// ── Social ──
.about-brutal__social {
  position: relative;
  z-index: 20;
  background: #FFF;
  border-bottom: 4px solid #000;
  padding: 80px 0;
}

.about-brutal__social-sub {
  font-family: $font-mono;
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  margin-bottom: 40px;
}

.about-brutal__social-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.about-brutal__social-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 28px;
  border: 4px solid #000;
  background: #FFF;
  color: #000;
  font-family: $font-mono;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  text-decoration: none;
  box-shadow: 6px 6px 0px $purple;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0px $orange;
    background: #000;
    color: #FFF;

    .about-brutal__social-icon {
      color: $orange;
    }
  }

  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 0.9rem;
  }
}

.about-brutal__social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $purple;
  transition: color 0.2s;
}

.about-brutal__social-name {
  // inherits from pill
}

@media (max-width: 640px) {
  .about-brutal__hero {
    padding: 120px 0 40px;
  }

  .about-brutal__photo-wrap {
    box-shadow: 8px 8px 0px $purple;
  }

  .about-brutal__photo-col,
  .about-brutal__content-col {
    padding: 24px;
  }

  .about-brutal__values,
  .about-brutal__social {
    padding: 60px 0;
  }

  .about-brutal__social-pill {
    padding: 12px 20px;
    font-size: 0.85rem;
    box-shadow: 3px 3px 0px $purple;
  }
}
</style>
