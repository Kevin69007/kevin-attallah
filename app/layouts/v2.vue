<template>
  <div class="layout-v2 has-custom-cursor">
    <GlassCursor variant="light" /> <!-- Cursor needs to contrast against dark -->
    <!-- Specific V2 Navbar would go here -->
    <main>
      <slot />
    </main>
    <!-- Specific V2 Footer would go here -->
  </div>
</template>

<script setup lang="ts">
// V2 Layout Setup
</script>

<style lang="scss">
/* =========================================
   V2: DARK CINEMATIC LUXURY SCOPE
   All V2 global resets go here to avoid 
   bleeding into V1/V3/V4
========================================= */
.layout-v2 {
  background: #050505; /* True black/dark grey */
  color: #FAFAFA;
  min-height: 100vh;
  
  // Override V1 Light Mode variables locally
  // We apply these overrides so any V1 components included here automatically adopt the dark theme
  --text-heading: #FFFFFF;
  --text-body: rgba(255, 255, 255, 0.7);
  
  * {
    selection {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  // Hide default light mode scrollbars
  ::-webkit-scrollbar-track {
    background: #050505;
  }
}
</style>
