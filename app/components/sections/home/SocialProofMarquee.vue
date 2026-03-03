<template>
  <section class="proof section--dark">
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
import { Users, Clock, Star, BookOpen, Award } from 'lucide-vue-next'

const proofItems = [
  { value: '2100+', label: 'entrepreneurs formés', icon: Users },
  { value: '15000+', label: 'heures de formation', icon: Clock },
  { value: '4.8/5', label: 'satisfaction client', icon: Star },
  { value: '60+', label: 'formations disponibles', icon: BookOpen },
  { value: 'CPF', label: 'éligible', icon: Award },
]
</script>

<style lang="scss" scoped>
.proof {
  padding: 20px 0;
  background: $bg-dark-2;
  border-top: 1px solid $glass-border;
  border-bottom: 1px solid $glass-border;

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
  }

  &__icon {
    color: $orange;
  }

  &__value {
    font-family: $font-heading;
    font-weight: 800;
    font-size: 1.1rem;
    color: $text-white;
  }

  &__label {
    color: $text-on-dark-muted;
    font-size: $small;
  }

  &__dot {
    color: $text-on-dark-muted;
    font-size: 1.5rem;
  }
}
</style>
