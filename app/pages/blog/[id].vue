<template>
  <div v-if="post" class="page-blog-detail">
    <WebGLBrutalistLight />
    <main class="brutal-content-stack">
    <section class="blog-detail">
      <div class="container container--narrow">
        <NuxtLink to="/blog" class="blog-detail__back">
          <ArrowLeft :size="18" /> RETOUR AU BLOG
        </NuxtLink>

        <span class="blog-detail__label">ARTICLE_</span>

        <span class="blog-detail__date">
          <Calendar :size="14" />
          {{ post.date }} {{ post.month }} {{ post.year }}
        </span>

        <h1 class="blog-detail__title">{{ post.title }}</h1>

        <!-- Locked state -->
        <div v-if="post.locked" class="blog-detail__locked">
          <div class="blog-detail__locked-preview">
            <img :src="post.image" :alt="post.title" class="blog-detail__locked-img" />
            <div class="blog-detail__locked-overlay">
              <Lock :size="48" />
              <p class="blog-detail__locked-text">CONTENU EXCLUSIF</p>
              <p class="blog-detail__locked-sub">CET ARTICLE FAIT PARTIE DE NOS RESSOURCES EXCLUSIVES. INSCRIS-TOI POUR LE RECEVOIR GRATUITEMENT PAR EMAIL.</p>
              <button class="blog-detail__locked-btn" @click="showKit = true">
                <Mail :size="18" />
                RECEVOIR L'ARTICLE GRATUITEMENT
              </button>
            </div>
          </div>
        </div>

        <!-- Image gallery (unlocked posts only) -->
        <template v-else>
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
            <button v-if="allImages.length > 1" class="blog-detail__nav blog-detail__prev" aria-label="Image precedente">
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
        </template>

        <KitLancementModal
          :visible="showKit"
          @close="showKit = false"
        />
      </div>
    </section>

    <TunnelTransition text="CONTINUE À APPRENDRE." />

    <CTABrutalist />
    </main>
  </div>

  <div v-else style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #fff;">
    <div class="text-center">
      <h1 style="font-family: var(--font-heading); text-transform: uppercase; color: #000;">ARTICLE INTROUVABLE</h1>
      <NuxtLink to="/blog" class="blog-detail__back-btn">RETOUR AU BLOG</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import TunnelTransition from '~/components/sections/brutalist/TunnelTransition.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade as SwiperEffectFade, Navigation as SwiperNavigation } from 'swiper/modules'
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Lock, Mail } from 'lucide-vue-next'
import KitLancementModal from '~/components/ui/KitLancementModal.vue'
import { blogPosts } from '~/data/blog'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

const route = useRoute()
const post = computed(() => blogPosts.find((p) => p.id === route.params.id))
const showKit = ref(false)

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

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
const { trackConversion } = useLinkedIn()
onMounted(() => {
  if (post.value) {
    trackViewContent({ content_name: post.value.title })
    trackViewItem({ content_name: post.value.title })
    trackConversion()
  }
})
</script>

<style lang="scss" scoped>
.page-blog-detail {
  position: relative;
  background: #FFF;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

.blog-detail {
  padding: 160px 0 80px;
  background: #fff;

  &__back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: $font-mono;
    font-size: $small;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #000;
    margin-bottom: 24px;
    border: 3px solid #000;
    padding: 8px 16px;
    background: #fff;
    transition: all 0.2s ease;

    &:hover {
      background: $orange;
      box-shadow: 4px 4px 0px #000;
    }
  }

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
    margin-bottom: 16px;
    box-shadow: 4px 4px 0px $purple;
  }

  &__date {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: $font-mono;
    font-size: $xs;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  &__title {
    font-family: $font-heading;
    font-size: $h2;
    color: #000;
    text-transform: uppercase;
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
    overflow: hidden;
    background: #f5f5f5;
    border: 4px solid #000;
    box-shadow: 8px 8px 0px $purple;
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
      background: #f5f5f5;
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
    background: #000;
    border: 3px solid #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0;

    .blog-detail__main:hover & {
      opacity: 1;
    }

    &:hover {
      background: $purple;
      box-shadow: 3px 3px 0px $orange;
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
    background: #000;
    border: 2px solid #000;
    padding: 4px 14px;
    font-family: $font-mono;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    pointer-events: none;
  }

  // Thumbnails
  &__thumbs {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;

    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }

  &__thumb {
    flex-shrink: 0;
    width: 72px;
    height: 54px;
    overflow: hidden;
    border: 3px solid #000;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0.5;
    padding: 0;
    background: none;

    &:hover {
      opacity: 0.8;
    }

    &--active {
      border-color: $orange;
      border-width: 4px;
      opacity: 1;
      box-shadow: 3px 3px 0px $orange;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // Locked state
  &__locked {
    margin-bottom: 24px;
  }

  &__locked-preview {
    position: relative;
    overflow: hidden;
    border: 4px solid #000;
    box-shadow: 8px 8px 0px $purple;
  }

  &__locked-img {
    width: 100%;
    display: block;
    filter: blur(6px) grayscale(0.3);
    transform: scale(1.05);
  }

  &__locked-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 40px;
    text-align: center;
  }

  &__locked-text {
    font-family: $font-heading;
    font-size: $h3;
    text-transform: uppercase;
    margin-top: 16px;
    letter-spacing: 0.05em;
    color: #fff;
  }

  &__locked-sub {
    font-family: $font-mono;
    font-size: $small;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 8px;
    max-width: 400px;
    opacity: 1;
    color: #fff;
  }

  &__locked-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 24px;
    font-family: $font-mono;
    font-size: $body;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #000;
    background: $orange;
    border: 4px solid #000;
    padding: 14px 28px;
    box-shadow: 6px 6px 0px #000;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #fff;
      transform: translate(-4px, -4px);
      box-shadow: 10px 10px 0px #000;
    }
  }

  // Fallback back button
  &__back-btn {
    display: inline-block;
    margin-top: 24px;
    font-family: $font-mono;
    font-size: $body;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
    border: 4px solid #000;
    padding: 12px 24px;
    background: #fff;
    transition: all 0.2s ease;

    &:hover {
      background: $orange;
      box-shadow: 6px 6px 0px #000;
    }
  }
}

@media (max-width: 640px) {
  .blog-detail {
    padding: 120px 0 40px;
  }

  .blog-detail__gallery {
    margin-bottom: 24px;
  }
}
</style>
