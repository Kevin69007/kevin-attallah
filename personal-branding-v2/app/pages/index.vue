<template>
  <div>
    <HeroSection />
    <SocialProofMarquee />
    <WhyKevin />
    <FeaturedFormations />
    <TestimonialsCarousel />
    <FreeFormationSection />
    <AILaunchSection />
    <HowItWorks />
    <BlogPreview />
    <CTASection
      title="Prêt à transformer ta vie ?"
      subtitle="Rejoins les 2100+ entrepreneurs qui ont déjà fait le premier pas."
    />

    <!-- Exit-intent modal -->
    <FreeFormationModal
      :visible="exitIntent.triggered.value && !exitIntent.dismissed.value"
      @close="exitIntent.dismiss()"
    />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Accueil' })

const { trackViewContent } = useFBPixel()
onMounted(() => trackViewContent({ content_name: 'Homepage' }))

const exitIntent = useExitIntent({ delay: 8000, scrollThreshold: 0.6 })
</script>
