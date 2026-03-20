<template>
  <div class="page-blog">
    <WebGLBrutalistLight />
    <main class="brutal-content-stack">
    <section class="blog-hero">
      <div class="container text-center">
        <span class="blog-hero__label">BLOG_</span>
        <h1 class="blog-hero__title">LE BLOG</h1>
        <p class="blog-hero__subtitle">
          CONSEILS, STRATEGIES ET RETOURS D'EXPERIENCE POUR ENTREPRENEURS
        </p>
      </div>
    </section>

    <section class="blog-list">
      <div class="container">
        <!-- Category filters -->
        <div class="blog-filters">
          <button
            v-for="cat in blogCategories"
            :key="cat.key"
            class="blog-filters__btn"
            :class="{ 'blog-filters__btn--active': activeCategory === cat.key }"
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Featured post (only when showing all) -->
        <div
          v-if="activeCategory === 'all'"
          class="blog-featured"
          @mouseenter="onCardEnter(featuredPost.id)"
          @mouseleave="onCardLeave(featuredPost.id)"
        >
          <div class="blog-featured__carousel">
            <span class="blog-featured__badge">A LA UNE</span>

            <span class="blog-featured__category-tag">{{ getCategoryLabel(featuredPost.category) }}</span>

            <div class="blog-card__progress" :class="{ 'blog-card__progress--visible': hoveredCard === featuredPost.id }">
              <div
                :key="`prog-feat-${cardSlideIndex[featuredPost.id] || 0}`"
                class="blog-card__progress-bar"
                :class="{ 'blog-card__progress-bar--active': hoveredCard === featuredPost.id }"
              ></div>
            </div>

            <span class="blog-card__count">
              {{ (cardSlideIndex[featuredPost.id] || 0) + 1 }}/{{ allImages(featuredPost).length }}
            </span>

            <Swiper
              :modules="[SwiperPagination]"
              :slides-per-view="1"
              :space-between="0"
              :pagination="{ el: `.blog-dots-feat-list`, clickable: true }"
              :loop="allImages(featuredPost).length > 1"
              class="blog-featured__swiper"
              @swiper="(s) => onCardSwiper(featuredPost.id, s)"
              @slide-change="(s) => onCardSlideChange(featuredPost.id, s)"
            >
              <SwiperSlide v-for="(img, i) in allImages(featuredPost)" :key="i">
                <NuxtImg :src="img" :alt="`${featuredPost.title} - ${i + 1}`" loading="lazy" format="webp" quality="80" class="blog-featured__img" />
              </SwiperSlide>
            </Swiper>
            <div class="blog-card__dots blog-dots-feat-list"></div>
          </div>

          <NuxtLink :to="`/blog/${featuredPost.id}`" class="blog-featured__content">
            <span class="blog-featured__date">
              <Calendar :size="12" />
              {{ featuredPost.date }} {{ featuredPost.month }} {{ featuredPost.year }}
            </span>
            <h3 class="blog-featured__title">{{ featuredPost.title }}</h3>
            <span class="blog-featured__read">
              LIRE L'ARTICLE <ArrowRight :size="14" />
            </span>
          </NuxtLink>
        </div>

        <!-- Divider -->
        <div v-if="activeCategory === 'all'" class="blog-divider"></div>

        <!-- Posts grid -->
        <div class="grid grid-3">
          <NuxtLink
            v-for="post in displayedPosts"
            :key="post.id"
            :to="`/blog/${post.id}`"
            class="blog-card"
            :class="{ 'blog-card--locked': post.locked }"
          >
            <div
              class="blog-card__carousel"
              @mouseenter.stop="onCardEnter(post.id)"
              @mouseleave.stop="onCardLeave(post.id)"
            >
              <span class="blog-card__category">{{ getCategoryLabel(post.category) }}</span>

              <div v-if="post.locked" class="blog-card__lock-badge">
                <Lock :size="12" /> EXCLUSIF
              </div>

              <div v-if="!post.locked" class="blog-card__progress" :class="{ 'blog-card__progress--visible': hoveredCard === post.id }">
                <div
                  :key="`prog-${post.id}-${cardSlideIndex[post.id] || 0}`"
                  class="blog-card__progress-bar"
                  :class="{ 'blog-card__progress-bar--active': hoveredCard === post.id }"
                ></div>
              </div>

              <span v-if="!post.locked" class="blog-card__count">
                {{ (cardSlideIndex[post.id] || 0) + 1 }}/{{ allImages(post).length }}
              </span>

              <Swiper
                :modules="[SwiperPagination]"
                :slides-per-view="1"
                :space-between="0"
                :pagination="{ el: `.blog-dots-list-${post.id}`, clickable: true }"
                :loop="allImages(post).length > 1"
                class="blog-card__swiper"
                @swiper="(s) => onCardSwiper(post.id, s)"
                @slide-change="(s) => onCardSlideChange(post.id, s)"
              >
                <SwiperSlide v-for="(img, i) in allImages(post)" :key="i">
                  <NuxtImg :src="img" :alt="`${post.title} - ${i + 1}`" loading="lazy" format="webp" quality="80" class="blog-card__img" />
                </SwiperSlide>
              </Swiper>
              <div :class="`blog-card__dots blog-dots-list-${post.id}`"></div>
            </div>

            <div class="blog-card__body">
              <span class="blog-card__date">
                <Calendar :size="12" />
                {{ post.date }} {{ post.month }} {{ post.year }}
              </span>
              <h3 class="blog-card__title">{{ post.title }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <TunnelTransition text="ENCORE PLUS D'ARTICLES." />

    <CTABrutalist />
    <KitLancementModal
      :visible="kitIntent.triggered.value && !kitIntent.dismissed.value"
      @close="kitIntent.dismiss()"
    />
    </main>
  </div>
</template>

<script setup lang="ts">
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import TunnelTransition from '~/components/sections/brutalist/TunnelTransition.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination } from 'swiper/modules'
import { ArrowRight, Calendar, Lock } from 'lucide-vue-next'
import KitLancementModal from '~/components/ui/KitLancementModal.vue'
import { blogPosts, blogCategories } from '~/data/blog'
import type { BlogPost } from '~/data/blog'

import 'swiper/css'
import 'swiper/css/pagination'

const kitIntent = useExitIntent({ delay: 8000, scrollThreshold: 0.6, storagePrefix: 'kit_blog' })

useHead({ title: 'Blog' })

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
const { trackConversion } = useLinkedIn()
onMounted(() => {
  trackViewContent({ content_name: 'Blog' })
  trackViewItem({ content_name: 'Blog' })
  trackConversion()
})

const activeCategory = ref('all')

function getCategoryLabel(key: string): string {
  return blogCategories.find((c) => c.key === key)?.label || key
}

const featuredPost = computed(() => blogPosts[blogPosts.length - 1])
const remainingPosts = computed(() => blogPosts.slice(0, -1).reverse())

const displayedPosts = computed(() => {
  if (activeCategory.value === 'all') return remainingPosts.value
  return blogPosts.filter((p) => p.category === activeCategory.value).reverse()
})

const swiperRefs: Record<string, any> = {}
const cardSlideIndex = reactive<Record<string, number>>({})
const hoveredCard = ref<string | null>(null)
const cardTimers: Record<string, ReturnType<typeof setInterval> | null> = {}

function allImages(post: BlogPost): string[] {
  return [post.image, ...post.images]
}

function onCardSwiper(id: string, swiper: any) {
  swiperRefs[id] = swiper
}

function onCardSlideChange(id: string, swiper: any) {
  cardSlideIndex[id] = swiper.realIndex
}

function onCardEnter(id: string) {
  hoveredCard.value = id
  cardTimers[id] = setInterval(() => {
    swiperRefs[id]?.slideNext()
  }, 1500)
}

function onCardLeave(id: string) {
  if (hoveredCard.value === id) hoveredCard.value = null
  if (cardTimers[id]) {
    clearInterval(cardTimers[id]!)
    cardTimers[id] = null
  }
}

onUnmounted(() => {
  Object.values(cardTimers).forEach((t) => t && clearInterval(t))
})
</script>

<style lang="scss" scoped>
// ========================
// HERO
// ========================
.blog-hero {
  padding: 140px 0 60px;
  background: #fff;

  &__label {
    display: inline-block;
    font-family: $font-mono;
    font-size: $xs;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: $purple;
    border: 4px solid #000;
    padding: 6px 16px;
    margin-bottom: 20px;
    box-shadow: 4px 4px 0px $purple;
  }

  &__title {
    font-family: $font-heading;
    font-size: $h1;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-family: $font-mono;
    color: #000;
    font-size: $body;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

// ========================
// CATEGORY FILTERS
// ========================
.blog-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;

  &__btn {
    font-family: $font-mono;
    font-size: $xs;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #000;
    background: #fff;
    border: 3px solid #000;
    padding: 8px 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: $orange;
      box-shadow: 4px 4px 0px #000;
      transform: translate(-2px, -2px);
    }

    &--active {
      background: $purple;
      color: #fff;
      box-shadow: 4px 4px 0px #000;
    }
  }
}

// ========================
// DIVIDER
// ========================
.blog-divider {
  height: 4px;
  background: #000;
  margin: 48px 0 32px;
}

// ========================
// FEATURED POST
// ========================
.blog-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px $purple;
  background: #fff;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 10px 10px 0px $orange;
  }

  &__badge {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 10;
    font-family: $font-mono;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #000;
    background: $orange;
    border: 3px solid #000;
    padding: 4px 12px;
    box-shadow: 3px 3px 0px #000;
  }

  &__category-tag {
    position: absolute;
    bottom: 16px;
    left: 16px;
    z-index: 10;
    font-family: $font-mono;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #fff;
    background: $purple;
    border: 2px solid #000;
    padding: 3px 10px;
    transition: background 0.2s ease;
  }

  &:hover &__category-tag {
    background: $orange;
  }

  &__carousel {
    position: relative;
    overflow: hidden;
    border-right: 4px solid #000;
  }

  &__swiper {
    aspect-ratio: 4 / 3;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #fff;
  }

  &__date {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: $font-mono;
    font-size: $xs;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__title {
    font-family: $font-heading;
    font-size: $h2;
    color: #000;
    text-transform: uppercase;
    line-height: 1.3;
    margin: 16px 0 24px;
  }

  &__read {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: $purple;
    font-family: $font-mono;
    font-size: $body;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: gap 0.3s ease;
  }

  &:hover &__read {
    gap: 10px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    &__carousel {
      border-right: none;
      border-bottom: 4px solid #000;
    }

    &__content {
      padding: 24px;
    }

    &__title {
      font-size: $h3;
    }
  }
}

// ========================
// SMALLER CARDS
// ========================
.blog-card {
  display: flex;
  flex-direction: column;
  border: 4px solid #000;
  box-shadow: 6px 6px 0px $purple;
  background: #fff;
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px $orange;
  }

  &__category {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 10;
    font-family: $font-mono;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #fff;
    background: $purple;
    border: 2px solid #000;
    padding: 3px 10px;
    transition: background 0.2s ease;
  }

  &:hover &__category {
    background: $orange;
  }

  &--locked &__img {
    filter: grayscale(0.4);
  }

  &__lock-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: $font-mono;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #000;
    background: $orange;
    border: 2px solid #000;
    padding: 3px 10px;
  }

  &__carousel {
    position: relative;
    border-bottom: 4px solid #000;
  }

  &__swiper {
    aspect-ratio: 16 / 10;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: opacity 0.3s ease;

    &--visible {
      opacity: 1;
    }
  }

  &__progress-bar {
    height: 100%;
    width: 0%;
    background: $purple;

    &--active {
      animation: card-fill 1.5s linear forwards;
    }
  }

  &__count {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    background: #000;
    border: 2px solid #000;
    padding: 2px 10px;
    font-family: $font-mono;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
  }

  &__dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    display: flex;
    gap: 5px;

    :deep(.swiper-pagination-bullet) {
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 0.6);
      border: 2px solid #000;
      border-radius: 0;
      opacity: 1;
      cursor: pointer;
    }

    :deep(.swiper-pagination-bullet-active) {
      background: $purple;
      width: 20px;
    }
  }

  &__body {
    padding: 20px 24px 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
  }

  &__date {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: $font-mono;
    font-size: $xs;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 10px;
  }

  &__title {
    font-family: $font-heading;
    font-size: $h4;
    color: #000;
    text-transform: uppercase;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
}

.page-blog {
  position: relative;
  background: #FFF;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

@keyframes card-fill {
  from { width: 0%; }
  to { width: 100%; }
}

@media (max-width: 640px) {
  .blog-featured__content {
    padding: 24px;
  }

  .blog-divider {
    margin: 24px 0 16px;
  }

  .blog-hero {
    padding: 120px 0 40px;
  }
}
</style>
