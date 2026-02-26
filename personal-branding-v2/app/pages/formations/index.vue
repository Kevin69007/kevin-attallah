<template>
  <div>
    <!-- Hero -->
    <section class="catalog-hero section--dark">
      <div class="catalog-hero__bg">
        <div class="orb orb--purple catalog-hero__orb"></div>
      </div>
      <div class="container catalog-hero__content">
        <TextSplit text="Notre catalogue de formations" tag="h1" class="catalog-hero__title" />
        <p class="catalog-hero__subtitle">
          +60 formations certifiantes pour propulser ta carrière
        </p>

        <!-- Search -->
        <div class="catalog-hero__search">
          <Search :size="20" class="catalog-hero__search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher une formation..."
            class="glass-input catalog-hero__search-input"
          />
        </div>
      </div>
    </section>

    <!-- Filters + Grid -->
    <section class="catalog section--dark">
      <div class="container">
        <!-- Filter panel -->
        <div class="catalog__filters">
          <!-- Category pills -->
          <div class="catalog__filter-row">
            <span class="catalog__filter-label">Catégorie :</span>
            <div class="catalog__pills">
              <button
                :class="['catalog__pill', { 'catalog__pill--active': !selectedCategory }]"
                @click="selectedCategory = ''"
              >
                Toutes
              </button>
              <button
                v-for="cat in categoryCards"
                :key="cat.id"
                :class="['catalog__pill', { 'catalog__pill--active': selectedCategory === cat.categorie }]"
                @click="selectedCategory = cat.categorie"
              >
                {{ formatCategory(cat.categorie) }}
              </button>
            </div>
          </div>

          <div class="catalog__filter-divider"></div>

          <!-- Level pills -->
          <div class="catalog__filter-row">
            <span class="catalog__filter-label">Niveau :</span>
            <div class="catalog__pills">
              <button
                :class="['catalog__pill catalog__pill--level', { 'catalog__pill--active-level': !selectedLevel }]"
                @click="selectedLevel = ''"
              >
                Tous
              </button>
              <button
                v-for="level in uniqueLevels"
                :key="level"
                :class="['catalog__pill catalog__pill--level', { 'catalog__pill--active-level': selectedLevel === level }]"
                @click="selectedLevel = level"
              >
                {{ level }}
              </button>
            </div>
          </div>
        </div>

        <!-- Results count -->
        <p class="catalog__count">
          {{ filteredFormations.length }} formation{{ filteredFormations.length > 1 ? 's' : '' }} trouvée{{ filteredFormations.length > 1 ? 's' : '' }}
        </p>

        <!-- Grid -->
        <div class="grid grid-3 catalog__grid">
          <NuxtLink
            v-for="formation in filteredFormations"
            :key="formation.id"
            :to="`/formations/${formation.id}`"
            class="formation-card glass-card"
          >
            <div class="formation-card__img">
              <img :src="formation.image" :alt="formation.titre" loading="lazy" />
              <GlassBadge variant="orange" class="formation-card__badge">CPF</GlassBadge>
            </div>
            <div class="formation-card__body">
              <span class="formation-card__cat">{{ formation.categorie }}</span>
              <h3 class="formation-card__title">{{ formation.titre }}</h3>
              <div class="formation-card__meta">
                <span><Clock :size="14" /> {{ formation.duree }}</span>
                <span><BarChart3 :size="14" /> {{ formation.niveau }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div v-if="filteredFormations.length === 0" class="catalog__empty text-center">
          <SearchX :size="48" />
          <h3 class="text-white mt-16">Aucune formation trouvée</h3>
          <p class="text-muted mt-8">Essayez avec d'autres critères de recherche</p>
          <AppButton variant="ghost" class="mt-24" @click="searchQuery = ''; selectedCategory = ''; selectedLevel = ''">
            Réinitialiser les filtres
          </AppButton>
        </div>
      </div>
    </section>

    <CTASection />
  </div>
</template>

<script setup lang="ts">
import { Search, Clock, BarChart3, SearchX } from 'lucide-vue-next'

useHead({ title: 'Formations' })

const { searchQuery, selectedCategory, selectedLevel, uniqueLevels, categoryCards, filteredFormations } = useFormations()

// Read category from URL query
const route = useRoute()
if (route.query.cat) {
  selectedCategory.value = route.query.cat as string
}

function formatCategory(cat: string): string {
  return cat.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const { trackViewContent } = useFBPixel()
onMounted(() => trackViewContent({ content_name: 'Catalogue Formations' }))
</script>

<style lang="scss" scoped>
.catalog-hero {
  padding: 140px 0 60px;
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
    top: -20%;
    right: -5%;
    opacity: 0.2;
  }

  &__content {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  &__title {
    font-size: $h2;
    color: $text-white;
    margin-bottom: 16px;
  }

  &__subtitle {
    color: $text-on-dark-muted;
    font-size: $body-lg;
    margin-bottom: 32px;
  }

  &__search {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
  }

  &__search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-on-dark-muted;
    pointer-events: none;
  }

  &__search-input {
    padding-left: 48px;
  }
}

.catalog {
  background: $bg-dark-1;
  padding-top: 32px;

  // Filter panel
  &__filters {
    background: $glass-bg;
    backdrop-filter: blur($glass-blur);
    -webkit-backdrop-filter: blur($glass-blur);
    border: 1px solid $glass-border;
    border-radius: $radius-lg;
    padding: 20px 24px;
    margin-bottom: 28px;
  }

  &__filter-row {
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }

  &__filter-label {
    font-size: $small;
    color: $text-on-dark-muted;
    font-weight: 600;
    white-space: nowrap;
    flex-shrink: 0;
  }

  &__filter-divider {
    height: 1px;
    background: $glass-border;
    margin: 14px 0;
  }

  &__pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  // Category pills
  &__pill {
    padding: 7px 16px;
    border-radius: $radius-full;
    font-size: $xs;
    font-weight: 600;
    color: $text-on-dark-muted;
    background: transparent;
    border: 1px solid $glass-border;
    white-space: nowrap;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      color: $text-white;
      border-color: rgba(255, 255, 255, 0.25);
    }

    &--active {
      background: $orange;
      border-color: $orange;
      color: $text-white;
      box-shadow: 0 0 16px rgba($orange, 0.25);
    }

    // Level variant
    &--active-level {
      background: $purple;
      border-color: $purple;
      color: $text-white;
      box-shadow: 0 0 16px rgba($purple, 0.25);
    }
  }

  &__count {
    color: $text-on-dark-muted;
    font-size: $small;
    margin-bottom: 32px;
  }

  &__empty {
    padding: 80px 0;
    color: $text-on-dark-muted;
  }
}

.formation-card {
  display: block;
  overflow: hidden;
  padding: 0;
  cursor: pointer;

  &__img {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s $ease-smooth;
    }

    .formation-card:hover & img {
      transform: scale(1.05);
    }
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  &__body {
    padding: 24px;
  }

  &__cat {
    font-size: $xs;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: $purple-light;
    margin-bottom: 8px;
    display: block;
  }

  &__title {
    font-size: $h4;
    color: $text-white;
    margin-bottom: 16px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__meta {
    display: flex;
    gap: 16px;
    color: $text-on-dark-muted;
    font-size: $xs;

    span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
}
</style>
