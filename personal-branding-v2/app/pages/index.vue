<template>
  <div>
    <HeroSection />
    <SocialProofMarquee />
    <WhyKevin />
    <FeaturedFormations />
    <TestimonialsCarousel />
    <AILaunchSection />
    <HowItWorks />
    <BlogPreview />
    <CTASection
      title="Prêt à transformer ta vie ?"
      subtitle="Rejoins les 2100+ entrepreneurs qui ont déjà fait le premier pas."
    />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Accueil' })

const { trackViewContent } = useFBPixel()
onMounted(() => trackViewContent({ content_name: 'Homepage' }))
</script>
