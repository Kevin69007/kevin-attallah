<template>
  <section class="mosaic section--white">
    <div class="mosaic__grid">
      <!-- Tiles -->
      <div
        v-for="(tile, i) in tiles"
        :key="i"
        class="mosaic__tile"
        :style="tileGridStyle(i)"
      >
        <div class="mosaic__placeholder"></div>
        <img
          v-if="tile.image"
          :src="tile.image"
          alt=""
          class="mosaic__img"
          :class="{ 'mosaic__img--visible': tile.visible }"
          loading="lazy"
        />
      </div>

      <!-- Center content -->
      <div class="mosaic__center">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  images: string[]
}

const props = defineProps<Props>()

// Grid: 8 cols × 5 rows = 40 cells
// Center area: cols 3-6, rows 2-4 = 12 cells excluded
const COLS = 8
const ROWS = 5
const TOTAL_CELLS = COLS * ROWS

// Indices of center cells (0-indexed: col 2-5, row 1-3)
function isCenterCell(index: number): boolean {
  const col = index % COLS
  const row = Math.floor(index / COLS)
  return col >= 2 && col <= 5 && row >= 1 && row <= 3
}

// Build tile positions (only edge cells, not center)
const edgeIndices: number[] = []
for (let i = 0; i < TOTAL_CELLS; i++) {
  if (!isCenterCell(i)) edgeIndices.push(i)
}

interface Tile {
  gridIndex: number
  image: string | null
  visible: boolean
}

// Shuffle helper
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Pick a random image from the pool
let imagePool = shuffle([...props.images])
let poolIndex = 0
function nextImage(): string {
  if (poolIndex >= imagePool.length) {
    imagePool = shuffle([...props.images])
    poolIndex = 0
  }
  return imagePool[poolIndex++]
}

// Initialize tiles - every tile gets a permanent image, ~60% start visible
const tiles = reactive<Tile[]>(
  edgeIndices.map((gridIndex) => ({
    gridIndex,
    image: nextImage(),
    visible: Math.random() < 0.6,
  })),
)

// Grid positioning
function tileGridStyle(tileIdx: number) {
  const gi = tiles[tileIdx].gridIndex
  const col = (gi % COLS) + 1
  const row = Math.floor(gi / COLS) + 1
  return {
    gridColumn: `${col}`,
    gridRow: `${row}`,
  }
}

// Animation: cycle random tiles every ~2.5s
let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    // Pick 2-3 random tiles to toggle
    const count = 2 + Math.floor(Math.random() * 2)
    const indices = shuffle([...Array(tiles.length).keys()]).slice(0, count)

    indices.forEach((idx) => {
      tiles[idx].visible = !tiles[idx].visible
    })
  }, 2500)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style lang="scss" scoped>
.mosaic {
  overflow: hidden;

  &__grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 20px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__center {
    grid-column: 3 / 7;
    grid-row: 2 / 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 32px;
    z-index: 2;
  }

  &__tile {
    aspect-ratio: 1;
    border: 2px solid #000;
    overflow: hidden;
    position: relative;
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    background: #FAFAFA;
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.8s ease;

    &--visible {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    &__grid {
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(5, 1fr);
      gap: 10px;
    }

    &__center {
      grid-column: 2 / 6;
      grid-row: 2 / 5;
      padding: 24px;
    }
  }

  @media (max-width: 768px) {
    &__grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    &__tile {
      display: none;
    }

    &__center {
      padding: 40px 16px;
    }
  }

  @media (max-width: 480px) {
    &__center {
      padding: 32px 16px;
    }
  }
}
</style>
