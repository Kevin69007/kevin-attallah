<template>
  <div>
    <section class="lp section--light">
      <div class="container">
        <!-- Hero -->
        <ScrollReveal>
          <div class="text-center">
            <GlassBadge variant="orange-light">
              <Gift :size="14" />
              {{ config.badgeText }}
            </GlassBadge>
            <h1 class="lp__title mt-24">
              Recevez une formation professionnelle
              <span class="gradient-text">100% gratuite</span>
            </h1>
            <p class="lp__subtitle">{{ config.subtitle }}</p>
          </div>
        </ScrollReveal>

        <div class="split mt-48">
          <!-- Left: Offer details -->
          <ScrollReveal direction="left">
            <!-- Price -->
            <div class="lp__price">
              <span class="lp__price-original">{{ config.originalPrice }}€</span>
              <span class="lp__price-free gradient-text">GRATUIT</span>
            </div>

            <!-- Features -->
            <div class="lp__features mt-32">
              <div v-for="feature in config.features" :key="feature" class="lp__feature">
                <CheckCircle :size="18" class="lp__check" />
                <span>{{ feature }}</span>
              </div>
            </div>

            <!-- Trust signals -->
            <div class="lp__trust mt-32">
              <GlassBadge variant="light">
                <Users :size="14" />
                2100+ formés
              </GlassBadge>
              <GlassBadge variant="light">
                <Star :size="14" />
                4.8/5 satisfaction
              </GlassBadge>
            </div>
          </ScrollReveal>

          <!-- Right: Form -->
          <ScrollReveal direction="right" :delay="0.3">
            <GlassCard variant="light" :hoverable="false">
              <h3 class="mb-8">Accès immédiat</h3>
              <p class="lp__form-subtitle">Remplissez le formulaire pour recevoir votre formation</p>
              <FreeFormationForm class="mt-24" />
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Gift, CheckCircle, Users, Star } from 'lucide-vue-next'
import { freeFormationConfig as config } from '~/data/free-formation'

useHead({
  title: 'Formation Gratuite',
  meta: [
    {
      name: 'description',
      content:
        'Recevez une formation professionnelle gratuite. Accédez à du contenu de qualité pour booster votre carrière.',
    },
  ],
})

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
onMounted(() => {
  trackViewContent({ content_name: 'Formation Gratuite Landing Page' })
  trackViewItem({ content_name: 'Formation Gratuite Landing Page' })
})
</script>

<style lang="scss" scoped>
.lp {
  padding: 140px 0 80px;
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  &__title {
    font-size: $h1;
    line-height: 1.15;
  }

  &__subtitle {
    color: $text-body;
    font-size: $body-lg;
    line-height: 1.7;
    max-width: 600px;
    margin: 16px auto 0;
  }

  &__price {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__price-original {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 700;
    color: $text-muted;
    text-decoration: line-through;
  }

  &__price-free {
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 900;

    @media (max-width: 640px) {
      font-size: 2.25rem;
    }
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 12px;
    color: $text-body;
    font-size: $small;
    padding: 10px 16px;
    background: rgba($purple, 0.03);
    border-radius: 12px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba($purple, 0.06);
    }
  }

  &__check {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    padding: 5px;
    border-radius: 50%;
    background: rgba($orange, 0.12);
    color: $orange;
  }

  &__trust {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__form-subtitle {
    color: $text-muted;
    font-size: $small;
  }
}
</style>
