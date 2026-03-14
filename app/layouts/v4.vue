<template>
  <div class="layout-v4 has-custom-cursor">
    <GlassCursor variant="pastel" />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
/* =========================================
   V4: SOFT PASTEL DREAMSCAPE SCOPE
========================================= */
.layout-v4 {
  background: #FDFBF7; // Warm, soft paper white
  color: #4A4A4A;
  min-height: 100vh;
  
  // Soft pastel overrides
  h1, h2, h3, h4, h5, h6 {
    color: #2D2D2D;
    letter-spacing: -0.01em;
  }
}
</style>
