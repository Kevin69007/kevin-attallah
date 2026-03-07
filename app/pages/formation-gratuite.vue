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
              Ta formation gratuite de la semaine
              <span class="gradient-text">t'attend.</span>
            </h1>
            <p class="lp__subtitle">{{ config.subtitle }}</p>
          </div>
        </ScrollReveal>

        <div class="split mt-48">
          <!-- Left: Offer details -->
          <ScrollReveal direction="left">
            <!-- Features -->
            <div class="lp__features">
              <div v-for="feature in config.features" :key="feature" class="lp__feature glass-card-light">
                <CheckCircle :size="18" class="lp__check" />
                <span>{{ feature }}</span>
              </div>
            </div>

            <!-- Trust signals -->
            <div class="lp__trust mt-32">
              <GlassBadge variant="light">
                <Users :size="14" />
                2100+ entrepreneurs lancés
              </GlassBadge>
              <GlassBadge variant="light">
                <Star :size="14" />
                4.8/5 satisfaction
              </GlassBadge>
            </div>

            <!-- Reassurance -->
            <p class="lp__reassurance mt-24">{{ config.reassurance }}</p>
          </ScrollReveal>

          <!-- Right: Form -->
          <ScrollReveal direction="right" :delay="0.3">
            <GlassCard variant="light" :hoverable="false">
              <h3 class="mb-8">Accès personnel</h3>
              <p class="lp__form-subtitle">Remplis le formulaire et reçois tes identifiants</p>
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
        'Recevez une formation professionnelle gratuite chaque semaine. Accédez à du contenu de qualité pour lancer ou booster votre activité.',
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
    border-radius: 12px;

    &:hover {
      transform: none;
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

  &__reassurance {
    color: $text-muted;
    font-size: $xs;
    line-height: 1.6;
    font-style: italic;
  }

  &__form-subtitle {
    color: $text-muted;
    font-size: $small;
  }
}
</style>
