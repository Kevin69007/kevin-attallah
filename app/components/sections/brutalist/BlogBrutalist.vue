<template>
  <section class="blog-brutal section--light">
    <div class="container">
      <div class="blog-brutal__header">
        <span class="section-label">RÉFLEXIONS_</span>
        <h2 class="blog-brutal__title">LES DOSSIERS.</h2>
        <div class="blog-brutal__ctas">
          <AppButton variant="ghost-light" to="/blog">
            LIRE TOUS LES DOSSIERS
          </AppButton>
        </div>
      </div>

      <div class="blog-brutal__grid">
        <article v-for="post in displayedPosts" :key="post.id" class="brutal-article">
          <NuxtLink :to="`/blog/${post.id}`" class="brutal-article__link">
            <div class="brutal-article__image-wrap">
              <NuxtImg
                :src="post.image"
                :alt="post.title"
                class="brutal-article__img"
              />

            </div>

            <div class="brutal-article__content">
              <div class="brutal-article__meta">
                <span>{{ post.date }} {{ post.month.toUpperCase() }} {{ post.year }}</span>
                <span class="text-orange">///</span>
                <span>5 MIN READ</span>
              </div>
              <h3 class="brutal-article__title">
                {{ post.title }}
              </h3>
              <div class="brutal-article__readmore">
                LIRE_MAINTENANT <span class="arr">►</span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { blogPosts } from '~/data/blog'

const displayedPosts = computed(() => blogPosts.slice(0, 3))
</script>

<style lang="scss" scoped>
.blog-brutal {
  position: relative;
  z-index: 20;
  padding: 100px 0;
  border-bottom: 4px solid #000;
  background: $bg-light-2;
  background-image: radial-gradient(#d1d5db 1px, transparent 1px);
  background-size: 20px 20px;

  &__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 60px;
    gap: 20px;
  }

  &__title {
    font-size: clamp(3rem, 6vw, 5rem);
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.04em;
    color: #000;
    background: #FFF;
    display: inline-block;
    padding: 0 10px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.brutal-article {
  border: 4px solid #000;
  background: #FFF;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px #000;

    .brutal-article__img {
      transform: scale(1.05);
      filter: grayscale(0%) contrast(110%);
    }

    .brutal-article__title {
      color: $purple;
      text-decoration: underline;
    }

    .arr {
      transform: translateX(4px);
      color: $orange;
    }
  }

  &__link {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }

  &__image-wrap {
    width: 100%;
    aspect-ratio: 16/10;
    border-bottom: 4px solid #000;
    overflow: hidden;
    position: relative;
    background: #000;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(150%);
    transition: transform 0.4s, filter 0.4s;
    opacity: 0.9;
  }

  &__tag {
    position: absolute;
    top: 16px;
    left: 16px;
    background: $purple;
    color: #FFF;
    font-family: $font-mono;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 4px 8px;
    border: 2px solid #000;
    box-shadow: 2px 2px 0px #000;
  }

  &__content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__meta {
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 700;
    color: $text-muted;
    margin-bottom: 16px;
    display: flex;
    gap: 8px;

    .text-orange { color: $orange; }
  }

  &__title {
    font-size: 1.5rem;
    text-transform: uppercase;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #000;
    margin-bottom: 16px;
    transition: color 0.2s;
    flex-grow: 1;
  }

  &__readmore {
    font-family: $font-mono;
    font-weight: 700;
    color: #000;
    display: flex;
    align-items: center;
    gap: 8px;

    .arr {
      transition: transform 0.2s, color 0.2s;
      display: inline-block;
    }
  }
}

@media (max-width: 640px) {
  .brutal-article {
    border-width: 2px;
  }

  .brutal-article__content {
    padding: 16px;
  }

  .brutal-article__title {
    font-size: 1.1rem;
  }
}
</style>
