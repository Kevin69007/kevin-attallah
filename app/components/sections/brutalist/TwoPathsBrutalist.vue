<template>
  <section class="twopaths-brutal section--white">
    <div class="container">
      <div class="twopaths-brutal__header text-center">
        <span class="section-label">SERVICES_</span>
        <h2 class="twopaths-brutal__title">PAR OÙ TU COMMENCES ?</h2>
        <p class="twopaths-brutal__subtitle">Choisis ton arme. Pas de retour en arrière possible.</p>
      </div>

      <div class="twopaths-brutal__grid">
        <!-- Path 1: Create -->
        <article class="path-card path-card--purple">
          <div class="path-card__video-wrap">
            <video 
              src="/video/parcours-01.mp4" 
              autoplay 
              loop 
              muted 
              playsinline 
              class="path-card__video"
            ></video>
            <div class="path-card__overlay">VOIE 01</div>
          </div>
          <div class="path-card__content">
            <h3 class="path-card__title">CRÉER UNE ENTREPRISE</h3>
            <p class="path-card__desc">
              Tu pars de zéro. Je t'aide à construire une machine rentable dès le premier jour en utilisant l'IA comme levier principal.
            </p>
            <ul class="path-card__list">
              <li>► Stratégie GTM</li>
              <li>► Automatisation MVP</li>
              <li>► Acquisition agressive</li>
            </ul>
            <AppButton variant="primary" class="w-full mt-6" to="/creer-entreprise">
              SÉLECTIONNER
            </AppButton>
          </div>
        </article>

        <!-- Path 2: Scale -->
        <article class="path-card path-card--orange">
          <div class="path-card__video-wrap">
            <video 
              src="/video/parcours-02.mp4" 
              autoplay 
              loop 
              muted 
              playsinline 
              class="path-card__video"
            ></video>
            <div class="path-card__overlay">VOIE 02</div>
          </div>
          <div class="path-card__content">
            <h3 class="path-card__title">FAIRE ÉVOLUER AVEC L'IA</h3>
            <p class="path-card__desc">
              Tu fais déjà du chiffre. On vient injecter de l'IA dans tes workflows pour exploser ta marge et réduire ton temps de travail.
            </p>
            <ul class="path-card__list">
              <li>► Audit des process</li>
              <li>► Déploiement d'agents IA</li>
              <li>► Scaling exponentiel</li>
            </ul>
            <AppButton variant="ghost-light" class="w-full mt-6" to="/evoluer-ia">
              SÉLECTIONNER
            </AppButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.twopaths-brutal {
  position: relative;
  z-index: 20;
  padding: 100px 0;
  border-top: 4px solid #000;
  border-bottom: 4px solid #000;
  background: #FFF;

  &__header {
    margin-bottom: 60px;
  }

  &__title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.04em;
    color: #000;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }
}

.path-card {
  border: 4px solid #000;
  background: #FFF;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;

  &--purple {
    box-shadow: 12px 12px 0px $purple;
    &:hover {
      box-shadow: 16px 16px 0px $purple;
      transform: translate(-4px, -4px);
      .path-card__video { filter: grayscale(0%) contrast(120%); }
    }
  }

  &--orange {
    box-shadow: 12px 12px 0px $orange;
    &:hover {
      box-shadow: 16px 16px 0px $orange;
      transform: translate(-4px, -4px);
      .path-card__video { filter: grayscale(0%) contrast(120%); }
    }
  }

  &__video-wrap {
    width: 100%;
    aspect-ratio: 16/9;
    border-bottom: 4px solid #000;
    position: relative;
    overflow: hidden;
    background: #000;
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(150%);
    transition: filter 0.3s;
    opacity: 0.8;
  }

  &__overlay {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: #000;
    color: #FFF;
    font-family: $font-mono;
    font-weight: 700;
    font-size: 1.5rem;
    padding: 8px 16px;
    border: 2px solid #FFF;
  }

  &__content {
    padding: 40px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    @media (max-width: 768px) {
      padding: 24px;
    }
  }

  &__title {
    font-size: clamp(2rem, 3vw, 2.5rem);
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #000;
    margin-bottom: 16px;
  }

  &__desc {
    font-size: 1.125rem;
    color: $text-body;
    margin-bottom: 24px;
    flex-grow: 1;
  }

  &__list {
    margin-bottom: 20px;
    font-family: $font-mono;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    
    li {
      margin-bottom: 8px;
    }
  }
}

.w-full {
  width: 100%;
  justify-content: center;
}
.mt-6 {
  margin-top: 24px;
}
</style>
