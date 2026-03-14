<template>
  <section class="hero-v2">
    <div class="container hero-v2__grid">
      <div class="hero-v2__content">
        <KineticText tag="h1" preset="lines-reveal" :delay="0.5" class="hero-v2__title">
          Redéfinissez<br>
          <span class="text-chrome">L'Élite.</span>
        </KineticText>
        
        <ScrollReveal :delay="1.2">
          <p class="hero-v2__subtitle">
            Un accompagnement radicalement exclusif. 
            Silencieux. Puissant. Implacable. 
            Bâti pour ceux qui visent 1% du sommet.
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="1.5">
          <div class="hero-v2__ctas">
            <AppButton variant="ghost" class="btn-chrome">
              Découvrir la méthode
              <ArrowRight :size="18" />
            </AppButton>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<style lang="scss" scoped>
.hero-v2 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  padding-top: 120px;

  &__content {
    max-width: 800px;
  }

  &__title {
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.05em;
    margin-bottom: 40px;
    color: #FAFAFA;
  }

  .text-chrome {
    font-family: serif; /* Elegant contrast */
    font-style: italic;
    background: linear-gradient(180deg, #FFFFFF 0%, #888888 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.5);
    max-width: 500px;
    margin-bottom: 60px;
    letter-spacing: 0.02em;
    font-weight: 300;
  }

  .btn-chrome {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #FFF;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 0; /* Sharp, brutal luxury */
    padding: 20px 40px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
