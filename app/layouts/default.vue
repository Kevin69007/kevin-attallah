<template>
  <div class="app-layout">
    <AnnouncementBar />
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <AppFooter />

    <!-- Home page: choice popup when no path selected yet -->
    <ChoiceModal
      v-if="route.path === '/' && !userPath"
      :visible="choiceIntent.triggered.value && !choiceIntent.dismissed.value"
      @close="choiceIntent.dismiss()"
      @choose="onChoice"
    />

    <!-- Boost path: book a call popup -->
    <BookCallModal
      v-else-if="userPath === 'boost'"
      :visible="kitIntent.triggered.value && !kitIntent.dismissed.value"
      @close="kitIntent.dismiss()"
    />

    <!-- Create path (or no choice on non-home pages): kit lancement popup -->
    <KitLancementModal
      v-else
      :visible="kitIntent.triggered.value && !kitIntent.dismissed.value"
      @close="kitIntent.dismiss()"
    />
  </div>
</template>

<script setup lang="ts">
import KitLancementModal from '~/components/ui/KitLancementModal.vue'
import ChoiceModal from '~/components/ui/ChoiceModal.vue'
import BookCallModal from '~/components/ui/BookCallModal.vue'

const route = useRoute()
const userPath = ref<'create' | 'boost' | null>(null)

onMounted(() => {
  const stored = localStorage.getItem('user_path')
  const ts = localStorage.getItem('user_path_ts')
  if (stored && ts && Date.now() - parseInt(ts) < 7 * 24 * 60 * 60 * 1000) {
    userPath.value = stored as 'create' | 'boost'
  } else {
    localStorage.removeItem('user_path')
    localStorage.removeItem('user_path_ts')
  }
})

function onChoice(choice: 'create' | 'boost') {
  userPath.value = choice
  localStorage.setItem('user_path', choice)
  localStorage.setItem('user_path_ts', Date.now().toString())
  choiceIntent.dismiss()
}

// Choice popup — home page only, early trigger
const choiceIntent = useExitIntent({
  delay: 3000,
  scrollThreshold: 0.15,
  storagePrefix: 'choice',
  cooldown: 5 * 60 * 1000,
  perRoute: false,
})

// Kit/BookCall popup — all pages except excluded
const kitIntent = useExitIntent({
  delay: 4000,
  scrollThreshold: 0.25,
  storagePrefix: 'kit',
  cooldown: 5 * 60 * 1000,
  excludeRoutes: ['/paiement', '/remerciement', '/formation-gratuite', '/blog/*'],
  perRoute: true,
})
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
}

.main-content {
  flex: 1;
}
</style>
