<template>
  <div>
    <!-- Hero -->
    <section class="catalog-hero">
      <div class="container catalog-hero__content">
        <span class="section-label">CATALOGUE_</span>
        <h1 class="catalog-hero__title">NOS FORMATIONS.</h1>
        <p class="catalog-hero__subtitle">
          +60 FORMATIONS CERTIFIANTES POUR BOOSTER TA CARRIÈRE. 100% FINANÇABLES.
        </p>

        <!-- Search -->
        <div class="catalog-hero__search">
          <Search :size="20" class="catalog-hero__search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="RECHERCHER UNE FORMATION..."
            class="catalog-hero__search-input"
          />
        </div>
      </div>
    </section>

    <!-- Filters + Grid -->
    <section class="catalog">
      <div class="container">
        <!-- Filter panel -->
        <div class="catalog__filters">
          <!-- Category pills -->
          <div class="catalog__filter-row">
            <span class="catalog__filter-label">CATÉGORIE :</span>
            <div class="catalog__pills">
              <button
                :class="['catalog__pill', { 'catalog__pill--active': !selectedCategory }]"
                @click="selectedCategory = ''"
              >
                TOUTES
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
            <span class="catalog__filter-label">NIVEAU :</span>
            <div class="catalog__pills">
              <button
                :class="['catalog__pill', { 'catalog__pill--active': !selectedLevel }]"
                @click="selectedLevel = ''"
              >
                TOUS
              </button>
              <button
                v-for="level in uniqueLevels"
                :key="level"
                :class="['catalog__pill', { 'catalog__pill--active': selectedLevel === level }]"
                @click="selectedLevel = level"
              >
                {{ level.toUpperCase() }}
              </button>
            </div>
          </div>
        </div>

        <!-- Results count -->
        <p class="catalog__count">
          {{ filteredFormations.length }} FORMATION{{ filteredFormations.length > 1 ? 'S' : '' }} TROUVÉE{{ filteredFormations.length > 1 ? 'S' : '' }}
        </p>

        <!-- Grid -->
        <div class="catalog__grid">
          <NuxtLink
            v-for="formation in filteredFormations"
            :key="formation.id"
            :to="`/formations/${formation.id}`"
            class="formation-card"
          >
            <div class="formation-card__img">
              <NuxtImg :src="formation.image" :alt="formation.titre" loading="lazy" format="webp" quality="80" />
              <span class="formation-card__badge">FINANÇABLE</span>
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
          <h3>AUCUNE FORMATION TROUVÉE</h3>
          <p>ESSAYEZ AVEC D'AUTRES CRITÈRES DE RECHERCHE</p>
          <AppButton variant="ghost-light" @click="searchQuery = ''; selectedCategory = ''; selectedLevel = ''">
            RÉINITIALISER LES FILTRES
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Search, Clock, BarChart3, SearchX } from 'lucide-vue-next'

useHead({ title: 'Formations' })

const { searchQuery, selectedCategory, selectedLevel, uniqueLevels, categoryCards, filteredFormations } = useFormations()

const route = useRoute()
if (route.query.cat) {
  selectedCategory.value = route.query.cat as string
}

function formatCategory(cat: string): string {
  return cat.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
onMounted(() => {
  trackViewContent({ content_name: 'Catalogue Formations' })
  trackViewItem({ content_name: 'Catalogue Formations' })
})
</script>

<style lang="scss" scoped>
.catalog-hero {
  padding: 140px 0 60px;
  background: #FFF;
  border-bottom: 4px solid #000;

  &__content {
    text-align: center;
  }

  &__title {
    font-size: clamp(3rem, 7vw, 5rem);
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 0.9;
    color: #000;
    margin: 8px 0 20px;
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: 1rem;
    color: #000;
    margin-bottom: 40px;
    text-transform: uppercase;
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
    color: #000;
    pointer-events: none;
  }

  &__search-input {
    width: 100%;
    padding: 16px 20px 16px 48px;
    font-family: $font-mono;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
    background: #FFF;
    border: 4px solid #000;
    box-shadow: 4px 4px 0px #000;
    outline: none;
    transition: box-shadow 0.2s, transform 0.2s;

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }

    &:focus {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px $purple;
    }
  }
}

.catalog {
  padding: 40px 0 80px;
  background: #FFF;
  border-bottom: 4px solid #000;

  &__filters {
    padding: 24px;
    border: 4px solid #000;
    background: #FAFAFA;
    margin-bottom: 32px;
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
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 700;
    color: #000;
    white-space: nowrap;
    flex-shrink: 0;
  }

  &__filter-divider {
    height: 2px;
    background: #000;
    margin: 16px 0;
  }

  &__pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__pill {
    padding: 8px 16px;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
    background: #FFF;
    border: 2px solid #000;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #000;
      color: #FFF;
    }

    &--active {
      background: $purple;
      border-color: $purple;
      color: #FFF;

      &:hover {
        background: $purple;
      }
    }
  }

  &__count {
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 700;
    color: #000;
    margin-bottom: 32px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__empty {
    padding: 80px 0;
    color: #000;

    h3 {
      margin-top: 16px;
      font-size: 1.25rem;
    }

    p {
      font-family: $font-mono;
      margin: 8px 0 24px;
      font-size: 0.9rem;
    }
  }
}

.formation-card {
  display: block;
  overflow: hidden;
  border: 4px solid #000;
  background: #FFF;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px #000;

    .formation-card__img img {
      transform: scale(1.05);
    }

    .formation-card__title {
      color: $purple;
    }
  }

  &__img {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border-bottom: 4px solid #000;
    background: #FAFAFA;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s;
    }
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: $orange;
    color: #FFF;
    font-family: $font-mono;
    font-weight: 700;
    font-size: 0.7rem;
    padding: 4px 8px;
    border: 2px solid #000;
    box-shadow: 2px 2px 0px #000;
  }

  &__body {
    padding: 24px;
  }

  &__cat {
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: $purple;
    margin-bottom: 8px;
    display: block;
  }

  &__title {
    font-size: 1.25rem;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 16px;
    line-height: 1.2;
    letter-spacing: -0.02em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s;
  }

  &__meta {
    display: flex;
    gap: 16px;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 700;
    color: #000;

    span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
}
</style>
