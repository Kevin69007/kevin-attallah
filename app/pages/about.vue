<template>
  <div>
    <!-- Hero -->
    <section class="about-hero section--dark">
      <div class="about-hero__bg">
        <div class="orb orb--purple about-hero__orb"></div>
      </div>
      <div class="container">
        <div class="split about-hero__split">
          <ScrollReveal direction="left">
            <GlassBadge variant="orange">À propos</GlassBadge>
            <h1 class="about-hero__title">
              Kevin <span class="gradient-text">Attallah</span>
            </h1>
            <p class="about-hero__text">
              Entrepreneur passionné, formateur certifié et expert en intégration IA,
              Kevin accompagne depuis des années des milliers de personnes dans leur
              reconversion professionnelle et le lancement de leur activité. Sa mission :
              rendre l'entrepreneuriat accessible à tous grâce à des formations concrètes,
              orientées résultats, et boostées par l'intelligence artificielle.
            </p>
            <div class="about-hero__stats">
              <div class="about-hero__stat" v-for="stat in stats" :key="stat.label">
                <span class="about-hero__stat-value gradient-text">
                  <CountUp :end="stat.value" :suffix="stat.suffix" />
                </span>
                <span class="about-hero__stat-label">{{ stat.label }}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div class="about-hero__photo glass-card">
              <NuxtImg src="/img/about/about-1.png" alt="Kevin Attallah" class="about-hero__photo-img" format="webp" quality="80" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="values section--dark">
      <div class="container">
        <ScrollReveal>
          <span class="section-label text-center">Nos valeurs</span>
          <h2 class="section-title text-center text-white">
            Ce qui nous <span class="gradient-text">guide</span>
          </h2>
        </ScrollReveal>

        <StaggerGrid class="grid grid-4 mt-48">
          <GlassCard v-for="value in values" :key="value.title">
            <div class="values__item text-center">
              <component :is="value.icon" :size="32" class="values__icon" />
              <h4 class="values__title">{{ value.title }}</h4>
              <p class="values__desc">{{ value.description }}</p>
            </div>
          </GlassCard>
        </StaggerGrid>
      </div>
    </section>

    <!-- Social -->
    <section class="social section--dark">
      <div class="container text-center">
        <ScrollReveal>
          <h2 class="section-title text-white">Suivez Kevin</h2>
          <p class="section-subtitle" style="margin: 0 auto 32px">
            Rejoignez la communauté sur les réseaux sociaux
          </p>
        </ScrollReveal>
        <ScrollReveal :delay="0.3">
          <div class="social__links">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social__link glass-card"
            >
              <span class="social__icon" v-html="socialIcons[link.icon]"></span>
              <span class="social__name">{{ link.name }}</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <CTASection />
  </div>
</template>

<script setup lang="ts">
import { Heart, Zap, Users, Target } from 'lucide-vue-next'
import { socialLinks } from '~/data/social'

useHead({ title: 'À propos' })

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
onMounted(() => {
  trackViewContent({ content_name: 'À propos' })
  trackViewItem({ content_name: 'À propos' })
})

const stats = [
  { value: 2100, suffix: '+', label: 'Entrepreneurs formés' },
  { value: 60, suffix: '+', label: 'Formations' },
  { value: 98, suffix: '%', label: 'Satisfaction' },
]

const values = [
  { icon: Heart, title: 'Authenticité', description: 'Des formations créées par un entrepreneur, pour des entrepreneurs.' },
  { icon: Zap, title: 'Innovation IA', description: "L'IA intégrée à chaque formation pour des résultats concrets et modernes." },
  { icon: Users, title: 'Accessibilité', description: 'Formations éligibles CPF, accessibles à tous les budgets et niveaux.' },
  { icon: Target, title: 'Résultats', description: '+2100 entrepreneurs formés avec un taux de satisfaction de 98%.' },
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
.about-hero {
  padding: 140px 0 80px;
  background: $gradient-hero;
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;
    width: 400px;
    height: 400px;
    top: -10%;
    right: 0;
    opacity: 0.15;
  }

  &__title {
    font-size: $h1;
    color: $text-white;
    margin: 16px 0 24px;
  }

  &__text {
    color: $text-on-dark-muted;
    line-height: 1.8;
    margin-bottom: 32px;
  }

  &__stats {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }

  &__stat {
    display: flex;
    flex-direction: column;
  }

  &__stat-value {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 900;
  }

  &__stat-label {
    font-size: $xs;
    color: $text-on-dark-muted;
  }

  &__photo {
    padding: 0;
    overflow: hidden;
    aspect-ratio: 3 / 4;
    max-width: 400px;
    margin: 0 auto;
  }

  &__photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.values {
  background: $bg-dark-2;

  &__item {
    padding: 8px;
  }

  &__icon {
    color: $orange;
    margin-bottom: 16px;
  }

  &__title {
    color: $text-white;
    font-size: $body;
    margin-bottom: 8px;
  }

  &__desc {
    color: $text-on-dark-muted;
    font-size: $small;
    line-height: 1.6;
  }
}

.social {
  background: $bg-dark-1;

  &__links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    color: $text-on-dark;
    font-weight: 600;
    font-size: $small;
    transition: $transition-base;

    &:hover {
      color: $orange;
      border-color: rgba($orange, 0.3);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple-light;

    .social__link:hover & {
      color: $orange;
    }
  }
}
</style>
