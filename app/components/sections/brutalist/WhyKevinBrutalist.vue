<template>
  <section class="why-brutal section--white">
    <div class="container">
      <div class="brutal-grid">
        
        <!-- Left: Image with sharp borders and hover glitch -->
        <div class="brutal-grid__image-col">
          <div class="brutal-image-wrap">
            <NuxtImg 
              src="/img/kevin-ia.png"
              alt="Kevin Attallah IA"
              class="brutal-image" 
              format="webp" 
              quality="80" 
            />
            <div class="brutal-image-overlay"></div>
          </div>
        </div>

        <!-- Right: Content -->
        <div class="brutal-grid__content-col">
          <span class="section-label">IDENTITÉ_</span>
          
          <h2 class="brutal-title">
            L'IA TRAVAILLE. TOI TU <br>
            <span class="text-purple">ENCAISSES.</span>
          </h2>
          
          <div class="brutal-text-block">
            <p>
              Serial entrepreneur, aujourd'hui expert en IA. Je construis des machines à cash et j'automatise les entreprises de ceux qui refusent de stagner.
            </p>
            <p>
              Oublie la théorie. Je te livre les méthodes exactes que j'ai utilisées pour générer des millions et faire tourner mes entreprises sans moi.
            </p>
          </div>

          <ul class="brutal-list">
            <li>
              <span class="brutal-list-icon">►</span>
              <strong>15+ M€</strong> générés en ligne
            </li>
            <li>
              <span class="brutal-list-icon">►</span>
              <strong>2100+</strong> entrepreneurs formés
            </li>
            <li>
              <span class="brutal-list-icon">►</span>
              <strong>80%+</strong> de croissance moyenne
            </li>
          </ul>

        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.why-brutal {
  position: relative;
  z-index: 20; // Above WebGL
  border-top: 4px solid #000;
  border-bottom: 4px solid #000;
  background: #FFF;
  padding: 80px 0;
}

.brutal-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0; // Seamless border touching
  border: 4px solid #000;
  background: #000; // Acts as border color in the gap

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  &__image-col, &__content-col {
    background: #FFF;
    padding: 60px;
    
    @media (max-width: 768px) {
      padding: 30px;
    }
  }

  &__content-col {
    border-left: 4px solid #000;

    @media (max-width: 1024px) {
      border-left: none;
      border-top: 4px solid #000;
    }
  }
}

.brutal-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4/5;
  border: 4px solid #000;
  box-shadow: 12px 12px 0px $purple;
  overflow: hidden;
  background: $orange;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 16px 16px 0px $orange;

    .brutal-image {
      transform: scale(1.03);
    }
  }
}

.brutal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.2s, transform 0.5s;
}

.brutal-image-overlay {
  position: absolute;
  inset: 0;
  background: transparent;
  transition: all 0.2s;
  pointer-events: none;
}

.brutal-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 30px;
  color: #000;

  .text-purple {
    color: $purple;
  }
}

.brutal-text-block {
  font-family: $font-mono;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  padding-left: 20px;
  border-left: 4px solid $orange;
  
  p {
    margin-bottom: 16px;
    color: #000;
  }
}

.brutal-list {
  display: flex;
  flex-direction: column;
  gap: 16px;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
    padding: 12px;
    border: 2px solid #000;
    background: #FAFAFA;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: #000;
      color: #FFF;

      .brutal-list-icon { color: $orange; }
    }
  }

  .brutal-list-icon {
    color: $purple;
    font-size: 1.5rem;
  }
}

@media (max-width: 640px) {
  .brutal-image-wrap {
    box-shadow: 6px 6px 0px $purple;
  }
}

@media (max-width: 480px) {
  .brutal-grid__content-col {
    padding: 20px;
  }
}
</style>
