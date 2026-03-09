<template>
  <section class="blog-preview section--light">
    <div class="container">
      <ScrollReveal>
        <span class="section-label text-center">Blog</span>
        <h2 class="section-title text-center">
          Derniers <span class="gradient-text">articles</span>
        </h2>
      </ScrollReveal>

      <!-- Featured post -->
      <ScrollReveal class="mt-48">
        <div
          v-magnetic="0.15"
          class="blog-featured glass-card-light"
          @mouseenter="onCardEnter(featuredPost.id)"
          @mouseleave="onCardLeave(featuredPost.id)"
        >
          <div class="blog-featured__carousel">
            <GlassBadge variant="orange-light" class="blog-featured__badge">À la une</GlassBadge>

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
              :pagination="{ el: `.blog-dots-feat`, clickable: true }"
              :loop="allImages(featuredPost).length > 1"
              class="blog-featured__swiper"
              @swiper="(s) => onCardSwiper(featuredPost.id, s)"
              @slide-change="(s) => onCardSlideChange(featuredPost.id, s)"
            >
              <SwiperSlide v-for="(img, i) in allImages(featuredPost)" :key="i">
                <NuxtImg :src="img" :alt="`${featuredPost.title} - ${i + 1}`" loading="lazy" format="webp" quality="80" class="blog-featured__img" />
              </SwiperSlide>
            </Swiper>
            <div class="blog-card__dots blog-dots-feat"></div>
          </div>

          <NuxtLink :to="`/blog/${featuredPost.id}`" class="blog-featured__content">
            <span class="blog-featured__date">
              <Calendar :size="12" />
              {{ featuredPost.date }} {{ featuredPost.month }} {{ featuredPost.year }}
            </span>
            <h3 class="blog-featured__title">{{ featuredPost.title }}</h3>
            <span class="blog-featured__read">
              Lire l'article <ArrowRight :size="14" />
            </span>
          </NuxtLink>
        </div>
      </ScrollReveal>

      <!-- Related articles header -->
      <ScrollReveal class="mt-48">
        <div class="blog-related__header">
          <h3 class="blog-related__title">Autres articles</h3>
          <AppButton variant="ghost-light" to="/blog" size="sm">
            Voir tout <ArrowRight :size="14" />
          </AppButton>
        </div>
        <div class="glass-divider-light"></div>
      </ScrollReveal>

      <!-- Remaining posts -->
      <StaggerGrid class="grid grid-3 mt-32">
        <NuxtLink
          v-for="post in remainingPosts"
          :key="post.id"
          :to="`/blog/${post.id}`"
          v-magnetic="0.15"
          class="blog-card glass-card-light"
        >
          <div
            class="blog-card__carousel"
            @mouseenter.stop="onCardEnter(post.id)"
            @mouseleave.stop="onCardLeave(post.id)"
          >
            <div class="blog-card__progress" :class="{ 'blog-card__progress--visible': hoveredCard === post.id }">
              <div
                :key="`prog-${post.id}-${cardSlideIndex[post.id] || 0}`"
                class="blog-card__progress-bar"
                :class="{ 'blog-card__progress-bar--active': hoveredCard === post.id }"
              ></div>
            </div>

            <span class="blog-card__count">
              {{ (cardSlideIndex[post.id] || 0) + 1 }}/{{ allImages(post).length }}
            </span>

            <Swiper
              :modules="[SwiperPagination]"
              :slides-per-view="1"
              :space-between="0"
              :pagination="{ el: `.blog-dots-${post.id}`, clickable: true }"
              :loop="allImages(post).length > 1"
              class="blog-card__swiper"
              @swiper="(s) => onCardSwiper(post.id, s)"
              @slide-change="(s) => onCardSlideChange(post.id, s)"
            >
              <SwiperSlide v-for="(img, i) in allImages(post)" :key="i">
                <NuxtImg :src="img" :alt="`${post.title} - ${i + 1}`" loading="lazy" format="webp" quality="80" class="blog-card__img" />
              </SwiperSlide>
            </Swiper>
            <div :class="`blog-card__dots blog-dots-${post.id}`"></div>
          </div>

          <div class="blog-card__body">
            <span class="blog-card__date">
              <Calendar :size="12" />
              {{ post.date }} {{ post.month }} {{ post.year }}
            </span>
            <h3 class="blog-card__title">{{ post.title }}</h3>
          </div>
        </NuxtLink>
      </StaggerGrid>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination } from 'swiper/modules'
import { ArrowRight, Calendar } from 'lucide-vue-next'
import { blogPosts } from '~/data/blog'
import type { BlogPost } from '~/data/blog'

import 'swiper/css'
import 'swiper/css/pagination'

const featuredPost = computed(() => blogPosts[blogPosts.length - 1])
const remainingPosts = computed(() => blogPosts.slice(0, -1).reverse().slice(0, 3))

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
// FEATURED POST
// ========================
.blog-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;

  &:hover {
    transform: none;
  }

  &__badge {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 10;
  }

  &__carousel {
    position: relative;
    overflow: hidden;
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
  }

  &__date {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: $xs;
    color: $text-muted;
  }

  &__title {
    font-size: $h2;
    color: $text-heading;
    line-height: 1.3;
    margin: 16px 0 24px;
  }

  &__read {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: $orange;
    font-size: $body;
    font-weight: 600;
    transition: gap 0.3s ease;
  }

  &:hover &__read {
    gap: 10px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    &__content {
      padding: 24px;
    }

    &__title {
      font-size: $h3;
    }
  }
}

// ========================
// RELATED HEADER
// ========================
.blog-related {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  &__title {
    font-size: $h3;
    color: $text-heading;
  }

}

// ========================
// SMALLER CARDS
// ========================
.blog-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  &__carousel {
    position: relative;
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
    height: 3px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;

    &--visible {
      opacity: 1;
    }
  }

  &__progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, $orange, $purple);
    border-radius: 0 2px 2px 0;

    &--active {
      animation: card-fill 1.5s linear forwards;
    }
  }

  &__count {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 100px;
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 600;
    color: $text-white;
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
      width: 6px;
      height: 6px;
      background: rgba(255, 255, 255, 0.35);
      border-radius: 50%;
      opacity: 1;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    :deep(.swiper-pagination-bullet-active) {
      background: $orange;
      width: 18px;
      border-radius: 3px;
    }
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
    color: $text-heading;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
}

@keyframes card-fill {
  from { width: 0%; }
  to { width: 100%; }
}
</style>
