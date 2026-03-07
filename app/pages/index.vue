<template>
  <div>
    <HeroSection />
    <SocialProofMarquee />
    <TwoPathsSection />
    <TestimonialsCarousel />
    <WhyKevin />
    <HowItWorks />
    <BlogPreview />
    <CTASection
      title="T'es encore là ? C'est le moment de passer à l'action."
      subtitle="Un appel de 30 minutes, gratuit, sans engagement. On regarde ensemble ce qui est fait pour toi."
      primaryText="Je réserve mon appel gratuit"
      :primaryHref="externalLinks.booking.brevoMeeting"
      secondaryText=""
    />

    <!-- Exit-intent modal -->
    <FreeFormationModal
      :visible="exitIntent.triggered.value && !exitIntent.dismissed.value"
      @close="exitIntent.dismiss()"
    />
  </div>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/external-links'

useHead({ title: 'Accueil' })

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
onMounted(() => {
  trackViewContent({ content_name: 'Homepage' })
  trackViewItem({ content_name: 'Homepage' })
})

const exitIntent = useExitIntent({ delay: 8000, scrollThreshold: 0.6 })
</script>
