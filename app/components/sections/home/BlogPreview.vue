<template>
  <section class="blog-preview section--dark">
    <div class="container">
      <ScrollReveal>
        <span class="section-label text-center">Blog</span>
        <h2 class="section-title text-center text-white">
          Derniers <span class="gradient-text">articles</span>
        </h2>
      </ScrollReveal>

      <StaggerGrid class="grid grid-3 mt-48">
        <div
          v-for="post in latestPosts"
          :key="post.id"
          class="blog-card"
        >
          <!-- Mini Swiper for images -->
          <div
            class="blog-card__carousel"
            @mouseenter="onCardEnter(post.id)"
            @mouseleave="onCardLeave(post.id)"
          >
            <!-- Hover progress bar -->
            <div class="blog-card__progress" :class="{ 'blog-card__progress--visible': hoveredCard === post.id }">
              <div
                :key="`prog-${post.id}-${cardSlideIndex[post.id] || 0}`"
                class="blog-card__progress-bar"
                :class="{ 'blog-card__progress-bar--active': hoveredCard === post.id }"
              ></div>
            </div>

            <!-- Image count badge -->
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

          <!-- Body -->
          <NuxtLink :to="`/blog/${post.id}`" class="blog-card__body">
            <span class="blog-card__date">
              <Calendar :size="12" />
              {{ post.date }} {{ post.month }} {{ post.year }}
            </span>
            <h3 class="blog-card__title">{{ post.title }}</h3>
            <span class="blog-card__read">
              Lire l'article <ArrowRight :size="14" />
            </span>
          </NuxtLink>

          <!-- Bottom accent -->
          <div class="blog-card__accent"></div>
        </div>
      </StaggerGrid>

      <ScrollReveal class="text-center mt-48">
        <AppButton variant="ghost" to="/blog">
          Tous les articles
        </AppButton>
      </ScrollReveal>
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

const latestPosts = computed(() => blogPosts.slice(0, 3))

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
.blog-preview {
  background: $bg-dark-2;
}

.blog-card {
  display: flex;
  flex-direction: column;
  background: $glass-bg;
  backdrop-filter: blur($glass-blur);
  -webkit-backdrop-filter: blur($glass-blur);
  border: 1px solid $glass-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-glass;
  overflow: hidden;
  position: relative;
  transition: all 0.5s $ease-smooth;

  &:hover {
    border-color: rgba($orange, 0.4);
    box-shadow: 0 0 20px rgba($orange, 0.2), 0 0 40px rgba($purple, 0.15);
    transform: translateY(-4px);
    animation: stories-glow 2s ease-in-out infinite;
  }

  // Mini carousel
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

  // Hover progress bar
  &__progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.1);
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

  // Image count badge
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

  // Pagination dots
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
    color: $text-on-dark-muted;
    margin-bottom: 10px;
  }

  &__title {
    font-size: $h4;
    color: $text-white;
    margin-bottom: 16px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
    transition: color 0.3s ease;
  }

  &:hover &__title {
    color: $purple-light;
  }

  &__read {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: $orange;
    font-size: $small;
    font-weight: 600;
    transition: gap 0.3s ease;
  }

  &:hover &__read {
    gap: 10px;
  }

  // Bottom gradient accent
  &__accent {
    height: 2px;
    background: linear-gradient(90deg, $purple, $orange);
  }
}

@keyframes card-fill {
  from { width: 0%; }
  to { width: 100%; }
}

@keyframes stories-glow {
  0%, 100% { box-shadow: 0 0 20px rgba($orange, 0.2), 0 0 40px rgba($purple, 0.15); }
  50% { box-shadow: 0 0 28px rgba($orange, 0.35), 0 0 56px rgba($purple, 0.25); }
}
</style>
