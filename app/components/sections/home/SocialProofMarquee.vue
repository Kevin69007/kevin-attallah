<template>
  <section class="proof section--light">
    <!-- Optional: a subtle white/glass background if needed, but transparent works on the white body -->
    <InfiniteMarquee :speed="15">
      <div class="proof__items">
        <div class="proof__item" v-for="item in proofItems" :key="item.label">
          <component :is="item.icon" :size="20" class="proof__icon" />
          <span class="proof__value">{{ item.value }}</span>
          <span class="proof__label">{{ item.label }}</span>
        </div>
        <span class="proof__dot">•</span>
      </div>
    </InfiniteMarquee>
  </section>
</template>

<script setup lang="ts">
import { Users, Star, Award, Target } from 'lucide-vue-next'

const proofItems = [
  { value: '2 100+', label: 'entrepreneurs lancés', icon: Users },
  { value: '4.8/5', label: 'satisfaction client', icon: Star },
  { value: '100%', label: 'finançable', icon: Award },
  { value: '1 seul', label: 'objectif : que tu passes à l\'action', icon: Target },
]
</script>

<style lang="scss" scoped>
.proof {
  padding: 20px 0;

  &__items {
    display: flex;
    align-items: center;
    gap: 48px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    padding: 10px 20px;
  }

  &__icon {
    color: $orange;
  }

  &__value {
    font-family: $font-heading;
    font-weight: 800;
    font-size: 1.1rem;
    color: $text-heading;
  }

  &__label {
    color: $text-muted;
    font-size: $small;
  }

  &__dot {
    color: $purple-light;
    font-size: 1.5rem;
  }
}
</style>
