<template>
  <section class="blog-preview section--light">
    <div class="container">
      <SectionHeading
        label="Blog"
        title="Derniers articles"
        gradient-text="articles"
        mode="words"
      />

      <!-- Featured post: full-bleed immersive card -->
      <ScrollReveal class="mt-48">
        <div
          ref="featuredRef"
          class="blog-hero"
          @mousemove="onFeaturedMouseMove"
          @mouseleave="onFeaturedMouseLeave"
        >
          <!-- Parallax background image -->
          <div ref="featuredMediaRef" class="blog-hero__media">
            <NuxtImg
              :src="featuredPost.image"
              :alt="featuredPost.title"
              loading="lazy"
              format="webp"
              quality="80"
              class="blog-hero__img"
            />
          </div>

          <!-- Dark gradient overlay -->
          <div class="blog-hero__overlay"></div>

          <!-- Content -->
          <NuxtLink :to="`/blog/${featuredPost.id}`" class="blog-hero__content">
            <GlassBadge variant="orange-light">À la une</GlassBadge>
            <h3 class="blog-hero__title">{{ featuredPost.title }}</h3>
            <span class="blog-hero__date">
              <Calendar :size="13" />
              {{ featuredPost.date }} {{ featuredPost.month }} {{ featuredPost.year }}
            </span>
            <span class="blog-hero__read">
              Lire l'article
              <ArrowRight :size="16" />
            </span>
          </NuxtLink>
        </div>
      </ScrollReveal>

      <!-- Articles strip header -->
      <ScrollReveal class="mt-48">
        <div class="blog-strip-header">
          <h3 class="blog-strip-header__title">Autres articles</h3>
          <AppButton variant="ghost-light" to="/blog" size="sm">
            Voir tout <ArrowRight :size="14" />
          </AppButton>
        </div>
        <div class="glass-divider-light"></div>
      </ScrollReveal>

      <!-- Horizontal article strip -->
      <div ref="stripRef" class="blog-strip mt-32">
        <NuxtLink
          v-for="post in remainingPosts"
          :key="post.id"
          :to="`/blog/${post.id}`"
          ref="stripCardRefs"
          class="blog-strip__card glass-card-light"
          @mouseenter="onStripCardEnter($event)"
          @mouseleave="onStripCardLeave($event)"
        >
          <div class="blog-strip__img-wrap">
            <NuxtImg
              :src="post.image"
              :alt="post.title"
              loading="lazy"
              format="webp"
              quality="80"
              class="blog-strip__img"
            />
          </div>
          <div class="blog-strip__body">
            <span class="blog-strip__date">
              <Calendar :size="12" />
              {{ post.date }} {{ post.month }} {{ post.year }}
            </span>
            <h3 class="blog-strip__title">{{ post.title }}</h3>
          </div>
        </NuxtLink>

        <!-- View all card -->
        <NuxtLink to="/blog" class="blog-strip__view-all glass-card-light">
          <span class="blog-strip__view-all-text">
            Voir tous les articles
            <ArrowRight :size="20" />
          </span>
        </NuxtLink>
      </div>

      <!-- Background typography -->
      <ParallaxSection :speed="-0.15" class="blog-preview__bg-wrap">
        <span class="blog-preview__bg-text">ARTICLES</span>
      </ParallaxSection>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Calendar } from 'lucide-vue-next'
import { blogPosts } from '~/data/blog'

const featuredPost = computed(() => blogPosts[blogPosts.length - 1])
const remainingPosts = computed(() => blogPosts.slice(0, -1).reverse().slice(0, 4))

const featuredRef = ref<HTMLElement>()
const featuredMediaRef = ref<HTMLElement>()
const stripRef = ref<HTMLElement>()

// Featured card: parallax image + 3D tilt
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()
  if (!gsap || !ScrollTrigger || !featuredMediaRef.value) return

  // Parallax on featured image
  gsap.to(featuredMediaRef.value, {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: featuredRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Strip cards entrance
  if (stripRef.value) {
    const cards = stripRef.value.querySelectorAll('.blog-strip__card, .blog-strip__view-all')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, rotateX: 3 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stripRef.value,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      },
    )
  }
})

// 3D tilt on featured card
function onFeaturedMouseMove(e: MouseEvent) {
  if (!featuredRef.value || window.innerWidth <= 768) return
  const { $gsap: gsap } = useNuxtApp()
  if (!gsap) return

  const rect = featuredRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5

  gsap.to(featuredRef.value, {
    rotateX: y * -4,
    rotateY: x * 4,
    duration: 0.6,
    ease: 'power2.out',
    transformPerspective: 1000,
  })
}

function onFeaturedMouseLeave() {
  if (!featuredRef.value) return
  const { $gsap: gsap } = useNuxtApp()
  if (!gsap) return

  gsap.to(featuredRef.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.5)',
  })
}

// Strip card hover micro-interactions
function onStripCardEnter(e: MouseEvent) {
  const { $gsap: gsap } = useNuxtApp()
  if (!gsap) return
  const card = (e.currentTarget as HTMLElement)
  gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out' })
  const img = card.querySelector('.blog-strip__img')
  if (img) gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power2.out' })
}

function onStripCardLeave(e: MouseEvent) {
  const { $gsap: gsap } = useNuxtApp()
  if (!gsap) return
  const card = (e.currentTarget as HTMLElement)
  gsap.to(card, { y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  const img = card.querySelector('.blog-strip__img')
  if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' })
}
</script>

<style lang="scss" scoped>
.blog-preview {
  position: relative;
  overflow: hidden;

  &__bg-wrap {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    pointer-events: none;
  }

  &__bg-text {
    font-family: $font-heading;
    font-size: clamp(6rem, 12vw, 12rem);
    font-weight: 900;
    color: $purple;
    opacity: 0.025;
    white-space: nowrap;
    user-select: none;
  }
}

// ========================
// FEATURED IMMERSIVE CARD
// ========================
.blog-hero {
  position: relative;
  min-height: 55vh;
  border-radius: $radius-xl;
  overflow: hidden;
  cursor: pointer;
  will-change: transform;
  z-index: 1;
  box-shadow: $shadow-lg;

  &__media {
    position: absolute;
    inset: -15% 0 0 0;
    width: 100%;
    height: 130%;
    will-change: transform;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10, 5, 20, 0.92) 0%,
      rgba(10, 5, 20, 0.6) 40%,
      rgba(10, 5, 20, 0.15) 100%
    );
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    min-height: 55vh;
    padding: clamp(32px, 5vw, 60px);
    gap: 12px;
    text-decoration: none;
    color: inherit;
  }

  &__title {
    font-family: $font-heading;
    font-size: $h2;
    font-weight: 800;
    color: $text-white;
    line-height: 1.2;
    max-width: 700px;
    margin: 8px 0;
  }

  &__date {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: $small;
    color: $text-on-dark-muted;
  }

  &__read {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: $orange-light;
    font-size: $body;
    font-weight: 600;
    margin-top: 8px;
    transition: gap 0.3s ease;
  }

  &:hover &__read {
    gap: 14px;
  }

  @media (max-width: 768px) {
    min-height: 40vh;

    &__content {
      min-height: 40vh;
    }

    &__title {
      font-size: $h3;
    }
  }
}

// ========================
// STRIP HEADER
// ========================
.blog-strip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  &__title {
    font-size: $h3;
    color: $text-heading;
  }
}

// ========================
// HORIZONTAL ARTICLE STRIP
// ========================
.blog-strip {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 16px;
  scroll-snap-type: x mandatory;
  perspective: 800px;

  // Hide scrollbar
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }

  &__card {
    flex: 0 0 320px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    scroll-snap-align: start;
    will-change: transform;
    text-decoration: none;
    color: inherit;
    border-radius: $radius-lg;

    &:hover {
      transform: none; // Override glass-card-light hover
    }
  }

  &__img-wrap {
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: $radius-lg $radius-lg 0 0;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    will-change: transform;
    transition: none; // GSAP handles this
  }

  &__body {
    padding: 20px 24px 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__date {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: $xs;
    color: $text-muted;
    margin-bottom: 10px;
  }

  &__title {
    font-size: $h4;
    font-weight: 700;
    color: $text-heading;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  // View all card
  &__view-all {
    flex: 0 0 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: end;
    border-radius: $radius-lg;
    text-decoration: none;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: $radius-lg;
      padding: 1.5px;
      background: linear-gradient(135deg, rgba($purple, 0.25), rgba($orange, 0.25));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    &:hover {
      transform: none;
    }
  }

  &__view-all-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-size: $body;
    font-weight: 600;
    color: $purple;
    text-align: center;
    padding: 24px;
    transition: gap 0.3s ease;
  }

  &__view-all:hover &__view-all-text {
    gap: 16px;
  }

  @media (max-width: 768px) {
    &__card {
      flex: 0 0 280px;
    }

    &__img-wrap {
      aspect-ratio: 4 / 3;
    }

    &__view-all {
      flex: 0 0 160px;
    }
  }
}
</style>
