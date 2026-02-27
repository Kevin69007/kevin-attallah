<template>
  <section class="hero section--dark">
    <!-- Background orbs -->
    <div class="hero__bg">
      <FloatingElement :amplitude="30" :duration="6">
        <div class="orb orb--purple hero__orb hero__orb--1"></div>
      </FloatingElement>
      <FloatingElement :amplitude="20" :duration="8">
        <div class="orb orb--orange hero__orb hero__orb--2"></div>
      </FloatingElement>
      <div class="orb orb--purple hero__orb hero__orb--3"></div>
    </div>

    <div class="container hero__grid">
      <!-- Left: Text content -->
      <div class="hero__content">
        <ScrollReveal :delay="0.1">
          <GlassBadge variant="orange">
            <Award :size="14" />
            Formations éligibles CPF
          </GlassBadge>
        </ScrollReveal>

        <TextSplit
          text="Lance-toi avant que l'IA ne fasse ton business à ta place"
          tag="h1"
          :delay="0.3"
          :stagger="0.02"
          class="hero__title"
        />

        <ScrollReveal :delay="0.6">
          <p class="hero__subtitle">
            +60 formations certifiantes éligibles CPF. De l'idée au décollage,
            on t'accompagne avec l'IA comme copilote.
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="0.8">
          <div class="hero__ctas">
            <MagneticButton>
              <AppButton variant="primary" size="lg" to="/formations">
                Voir les formations
                <ArrowRight :size="20" />
              </AppButton>
            </MagneticButton>
            <MagneticButton>
              <AppButton variant="ghost" size="lg" :href="externalLinks.booking.brevoMeeting">
                Parler à Kevin
              </AppButton>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="1">
          <div class="hero__trust">
            <div class="hero__trust-item glass-badge">
              <Users :size="16" />
              <span><strong>2100+</strong> entrepreneurs formés</span>
            </div>
            <div class="hero__trust-item glass-badge">
              <Clock :size="16" />
              <span><strong>15000+</strong> heures de formation</span>
            </div>
            <div class="hero__trust-item glass-badge">
              <Star :size="16" />
              <span><strong>4.8/5</strong> de satisfaction</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <!-- Right: Photo with orbital particles -->
      <ScrollReveal direction="right" :delay="0.5" class="hero__photo-wrap">
        <div class="hero__photo">
          <div class="hero__photo-halo"></div>
          <div class="hero__photo-ring"></div>
          <NuxtImg src="/img/banner-right-img.jpg" alt="Kevin Attallah" class="hero__photo-img" format="webp" quality="80" />

          <div class="hero__orbit hero__orbit--inner">
            <span class="hero__particle hero__particle--1"></span>
            <span class="hero__particle hero__particle--2"></span>
            <span class="hero__particle hero__particle--3"></span>
          </div>

          <div class="hero__orbit hero__orbit--outer">
            <span class="hero__particle hero__particle--4"></span>
            <span class="hero__particle hero__particle--5"></span>
          </div>

          <!-- WhatsApp chat bubbles — anchored to photo -->
          <div
            v-for="(bubble, i) in chatBubbles"
            :key="i"
            ref="bubbleRefs"
            class="hero__bubble"
            :class="`hero__bubble--${i + 1}`"
          >
            <div class="hero__bubble-wa">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div class="hero__bubble-body">
              <div class="hero__bubble-header">
                <span class="hero__bubble-name">{{ bubble.name }}</span>
                <span v-if="bubble.company" class="hero__bubble-company">· {{ bubble.company }}</span>
                <span class="hero__bubble-time">now</span>
              </div>
              <p class="hero__bubble-msg">{{ bubble.message }}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Award, Users, Clock, Star } from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

const chatBubbles = [
  {
    name: 'David B.',
    company: 'DB Prestige',
    message: "J'hésitais à me lancer, du coup c'est décidé grâce aux conseils de Kevin !",
  },
  {
    name: 'Anthony J.',
    company: '',
    message: 'Accompagnement pro et sérieux, je recommande !',
  },
  {
    name: 'Frederic M.',
    company: 'FM Services',
    message: 'Super formation, Kevin est au top.',
  },
  {
    name: 'Sarah L.',
    company: 'SL Consulting',
    message: "Grâce à Kevin j'ai pu créer ma boîte en toute confiance !",
  },
  {
    name: 'Marc D.',
    company: '',
    message: "Formation au top, j'ai tout compris du premier coup.",
  },
]

const bubbleRefs = ref<HTMLElement[]>([])

const { $gsap } = useNuxtApp()

onMounted(() => {
  if (!$gsap) return
  const gsap = $gsap as any

  nextTick(() => {
    if (bubbleRefs.value.length) {
      gsap.fromTo(
        bubbleRefs.value,
        { opacity: 0, y: 24, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.25,
          delay: 1.6,
          ease: 'back.out(1.3)',
        },
      )
    }
  })
})
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: $gradient-hero;
  padding-top: 100px;
  padding-bottom: 60px;

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;
    &--1 { width: 500px; height: 500px; top: -10%; right: -5%; opacity: 0.3; }
    &--2 { width: 300px; height: 300px; bottom: 10%; left: -5%; opacity: 0.25; }
    &--3 { width: 200px; height: 200px; top: 50%; left: 40%; opacity: 0.1; animation: pulse-glow 4s ease-in-out infinite; }
  }

  &__grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__content {
    @media (max-width: 1024px) { order: 2; }
  }

  &__title {
    font-size: $h1;
    color: $text-white;
    margin-top: 24px;
    margin-bottom: 24px;
    line-height: 1.1;
  }

  &__subtitle {
    font-size: $body-lg;
    color: $text-on-dark-muted;
    max-width: 550px;
    line-height: 1.7;
    margin-bottom: 40px;

    @media (max-width: 1024px) {
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__ctas {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 48px;

    @media (max-width: 1024px) { justify-content: center; }
  }

  &__trust {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    @media (max-width: 1024px) { justify-content: center; }
  }

  &__trust-item {
    font-size: $xs;
    strong { color: $text-white; }
  }

  // Photo
  &__photo-wrap {
    @media (max-width: 1024px) { order: 1; }
  }

  &__photo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 440px;
    margin: 0 auto;
  }

  &__photo-halo {
    position: absolute;
    inset: -40px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba($purple, 0.15) 0%,
      rgba($orange, 0.08) 40%,
      transparent 70%
    );
    animation: pulse-glow 4s ease-in-out infinite;
    pointer-events: none;
  }

  &__photo-ring {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 3px solid transparent;
    background: linear-gradient(135deg, $purple, $orange) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.6;
    animation: spin 20s linear infinite;
  }

  &__photo-img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 60px rgba($purple, 0.3), 0 0 120px rgba($purple, 0.1);
    position: relative;
    z-index: 2;
  }

  // Orbit rings
  &__orbit {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    pointer-events: none;

    &--inner { inset: -20px; }
    &--outer { inset: -50px; }
  }

  // Orbital particles
  &__particle {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    z-index: 3;

    &--1 {
      width: 8px; height: 8px;
      background: $purple;
      box-shadow: 0 0 16px $purple-glow, 0 0 32px rgba($purple, 0.2);
      --orbit-radius: 230px; animation: orbit 8s linear infinite; margin: -4px 0 0 -4px;
      @media (max-width: 1024px) { --orbit-radius: 180px; }
      @media (max-width: 640px) { --orbit-radius: 140px; }
    }

    &--2 {
      width: 6px; height: 6px;
      background: $orange;
      box-shadow: 0 0 12px $orange-glow, 0 0 24px rgba($orange, 0.2);
      --orbit-radius: 235px; animation: orbit 12s linear infinite; animation-delay: -4s; margin: -3px 0 0 -3px;
      @media (max-width: 1024px) { --orbit-radius: 185px; }
      @media (max-width: 640px) { --orbit-radius: 145px; }
    }

    &--3 {
      width: 5px; height: 5px;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      --orbit-radius: 225px; animation: orbit 10s linear infinite; animation-delay: -7s; margin: -2.5px 0 0 -2.5px;
      @media (max-width: 1024px) { --orbit-radius: 175px; }
      @media (max-width: 640px) { --orbit-radius: 135px; }
    }

    &--4 {
      width: 12px; height: 12px;
      background: $orange;
      box-shadow: 0 0 20px $orange-glow, 0 0 40px rgba($orange, 0.3);
      --orbit-radius: 260px; animation: orbit-reverse 15s linear infinite; margin: -6px 0 0 -6px;
      @media (max-width: 1024px) { --orbit-radius: 210px; }
      @media (max-width: 640px) { --orbit-radius: 165px; }
    }

    &--5 {
      width: 10px; height: 10px;
      background: $purple-light;
      box-shadow: 0 0 18px $purple-glow, 0 0 36px rgba($purple, 0.2);
      --orbit-radius: 265px; animation: orbit-reverse 18s linear infinite; animation-delay: -8s; margin: -5px 0 0 -5px;
      @media (max-width: 1024px) { --orbit-radius: 215px; }
      @media (max-width: 640px) { --orbit-radius: 170px; }
    }
  }

  // =====================
  // WhatsApp Chat Bubbles
  // =====================
  &__bubble {
    position: absolute;
    z-index: 10;
    display: flex;
    gap: 10px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    width: 220px;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

    @media (max-width: 1024px) {
      display: none;
    }

    // Positions relative to hero__photo (≈440×440 container)
    // Clustered tightly around the circular photo

    // Top-right — "1 o'clock"
    &--1 {
      top: -20px;
      right: -60px;
      animation: bubble-float 6s ease-in-out infinite;
    }

    // Right — "3 o'clock"
    &--2 {
      top: 40%;
      right: -80px;
      animation: bubble-float 7s ease-in-out 0.8s infinite;
    }

    // Bottom-right — "5 o'clock"
    &--3 {
      bottom: -15px;
      right: -50px;
      animation: bubble-float 5.5s ease-in-out 0.3s infinite;
    }

    // Top-left — "10 o'clock"
    &--4 {
      top: -35px;
      left: 40px;
      animation: bubble-float 6.5s ease-in-out 1.2s infinite;
    }

    // Bottom-left — "8 o'clock"
    &--5 {
      bottom: -10px;
      left: -30px;
      animation: bubble-float 7.5s ease-in-out 0.5s infinite;
    }
  }

  @keyframes bubble-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  &__bubble-wa {
    width: 28px;
    height: 28px;
    min-width: 28px;
    border-radius: 50%;
    background: #25D366;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-top: 1px;
  }

  &__bubble-body {
    flex: 1;
    min-width: 0;
  }

  &__bubble-header {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 3px;
  }

  &__bubble-name {
    font-size: 11.5px;
    font-weight: 700;
    color: $text-white;
    white-space: nowrap;
  }

  &__bubble-company {
    font-size: 10px;
    color: $text-on-dark-muted;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__bubble-time {
    font-size: 9.5px;
    color: #25D366;
    margin-left: auto;
    white-space: nowrap;
    font-weight: 600;
  }

  &__bubble-msg {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
