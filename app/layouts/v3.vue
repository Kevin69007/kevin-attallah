<template>
  <div class="layout-v3 has-custom-cursor">
    <GlassCursor variant="brutalist" />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
/* =========================================
   V3: HIGH-CONTRAST BRUTALIST SCOPE
========================================= */
.layout-v3 {
  background: #000000;
  color: #FFFFFF;
  min-height: 100vh;
  
  // Brutalist typography overrides
  font-family: 'Helvetica Neue', Arial, sans-serif;
  
  h1, h2, h3, h4, h5, h6 {
    text-transform: uppercase;
    letter-spacing: -0.02em;
    font-weight: 900;
  }
}
</style>
