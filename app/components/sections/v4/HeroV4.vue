<template>
  <section class="hero-v4">
    <div class="container hero-v4__grid">
      <div class="hero-v4__card">
        <KineticText tag="h1" preset="words-blur" :delay="0.6" class="hero-v4__title">
          Cultivez votre entreprise. <br>Élevez votre vision.
        </KineticText>
        
        <ScrollReveal :delay="1.2">
          <p class="hero-v4__subtitle">
            Un écosystème d'apprentissage organique, fluide et profondément humain. 
            Déployez la puissance de l'IA avec élégance et bienveillance.
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="1.5">
          <div class="hero-v4__ctas">
            <AppButton variant="ghost" class="btn-pastel">
              Commencer le voyage
            </AppButton>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-v4 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  padding-top: 60px;

  &__grid {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  &__card {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(40px) saturate(1.2);
    -webkit-backdrop-filter: blur(40px) saturate(1.2);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 40px;
    padding: 80px 60px;
    max-width: 900px;
    text-align: center;
    box-shadow: 
      0 30px 60px rgba(200, 180, 220, 0.1),
      inset 0 2px 5px rgba(255, 255, 255, 1);
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 500; /* Soft weight */
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
    color: #4A4A4A;
    background: linear-gradient(135deg, #7A7A7A, #333333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__subtitle {
    font-size: 1.2rem;
    color: #8A8A8A;
    max-width: 600px;
    margin: 0 auto 40px;
    line-height: 1.8;
    font-weight: 400;
  }

  .btn-pastel {
    background: linear-gradient(135deg, #E2F0CB, #B5EAD7);
    color: #4A4A4A;
    border: none;
    font-weight: 500;
    padding: 16px 40px;
    border-radius: 100px;
    box-shadow: 0 10px 30px rgba(181, 234, 215, 0.4);
    
    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 15px 40px rgba(181, 234, 215, 0.6);
    }
  }
}
</style>
