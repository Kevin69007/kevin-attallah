<template>
  <div v-if="post">
    <section class="blog-detail section--dark">
      <div class="container container--narrow">
        <ScrollReveal>
          <NuxtLink to="/blog" class="blog-detail__back">
            <ArrowLeft :size="18" /> Retour au blog
          </NuxtLink>

          <span class="blog-detail__date">
            <Calendar :size="14" />
            {{ post.date }} {{ post.month }} {{ post.year }}
          </span>

          <h1 class="blog-detail__title">{{ post.title }}</h1>
        </ScrollReveal>

        <!-- Clean image gallery -->
        <ScrollReveal :delay="0.3">
          <div class="blog-detail__gallery">
            <!-- Main image -->
            <div class="blog-detail__main">
              <Swiper
                :modules="[SwiperEffectFade, SwiperNavigation]"
                :slides-per-view="1"
                :effect="'fade'"
                :fade-effect="{ crossFade: true }"
                :navigation="{ nextEl: '.blog-detail__next', prevEl: '.blog-detail__prev' }"
                class="blog-detail__swiper"
                @swiper="onSwiper"
                @slide-change="onSlideChange"
              >
                <SwiperSlide v-for="(img, i) in allImages" :key="i">
                  <div class="blog-detail__slide">
                    <img :src="img" :alt="`${post.title} - ${i + 1}`" :loading="i === 0 ? 'eager' : 'lazy'" />
                  </div>
                </SwiperSlide>
              </Swiper>

              <!-- Navigation arrows -->
              <button v-if="allImages.length > 1" class="blog-detail__nav blog-detail__prev" aria-label="Image précédente">
                <ChevronLeft :size="20" />
              </button>
              <button v-if="allImages.length > 1" class="blog-detail__nav blog-detail__next" aria-label="Image suivante">
                <ChevronRight :size="20" />
              </button>

              <!-- Counter -->
              <span v-if="allImages.length > 1" class="blog-detail__counter">
                {{ currentSlide }} / {{ allImages.length }}
              </span>
            </div>

            <!-- Thumbnail strip -->
            <div v-if="allImages.length > 1" class="blog-detail__thumbs">
              <button
                v-for="(img, i) in allImages"
                :key="i"
                class="blog-detail__thumb"
                :class="{ 'blog-detail__thumb--active': currentSlide === i + 1 }"
                @click="goToSlide(i)"
              >
                <img :src="img" :alt="`Miniature ${i + 1}`" loading="lazy" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <CTASection />
  </div>

  <div v-else class="section--dark" style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="text-center">
      <h1 class="text-white">Article introuvable</h1>
      <AppButton variant="primary" to="/blog" class="mt-24">Retour au blog</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade as SwiperEffectFade, Navigation as SwiperNavigation } from 'swiper/modules'
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { blogPosts } from '~/data/blog'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

const route = useRoute()
const post = computed(() => blogPosts.find((p) => p.id === route.params.id))

const allImages = computed(() => (post.value ? [post.value.image, ...post.value.images] : []))
const currentSlide = ref(1)

let swiperInstance: any = null

function onSwiper(swiper: any) {
  swiperInstance = swiper
}

function onSlideChange(swiper: any) {
  currentSlide.value = swiper.activeIndex + 1
}

function goToSlide(index: number) {
  swiperInstance?.slideTo(index)
}

useHead({
  title: computed(() => post.value?.title || 'Blog'),
})
</script>

<style lang="scss" scoped>
.blog-detail {
  padding: 120px 0 80px;
  background: $gradient-hero;

  &__back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: $text-on-dark-muted;
    font-size: $small;
    margin-bottom: 24px;
    transition: color 0.3s ease;

    &:hover {
      color: $orange;
    }
  }

  &__date {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: $xs;
    color: $text-on-dark-muted;
    margin-bottom: 12px;
  }

  &__title {
    font-size: $h2;
    color: $text-white;
    margin-bottom: 32px;
    line-height: 1.2;
  }

  // Gallery
  &__gallery {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__main {
    position: relative;
    border-radius: $radius-lg;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid $glass-border;
    box-shadow: $shadow-glass;
  }

  &__swiper {
    width: 100%;
    aspect-ratio: 4 / 3;
  }

  &__slide {
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  // Navigation arrows
  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: $text-white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;

    .blog-detail__main:hover & {
      opacity: 1;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.7);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }

  &__prev {
    left: 12px;
  }

  &__next {
    right: 12px;
  }

  // Counter badge
  &__counter {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
    color: $text-white;
    pointer-events: none;
  }

  // Thumbnails
  &__thumbs {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;

    // Hide scrollbar
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }

  &__thumb {
    flex-shrink: 0;
    width: 72px;
    height: 54px;
    border-radius: $radius-sm;
    overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0.5;
    padding: 0;
    background: none;

    &:hover {
      opacity: 0.8;
    }

    &--active {
      border-color: $orange;
      opacity: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
