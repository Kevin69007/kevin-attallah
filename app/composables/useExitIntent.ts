export function useExitIntent(options: {
  delay?: number
  scrollThreshold?: number
  storagePrefix?: string
  cooldown?: number
  excludeRoutes?: string[]
  perRoute?: boolean
} = {}) {
  const {
    delay = 8000,
    scrollThreshold = 0.6,
    storagePrefix = 'ffm',
    cooldown = 5 * 60 * 1000,
    excludeRoutes = [],
    perRoute = false,
  } = options

  const triggered = ref(false)
  const dismissed = ref(false)
  const route = useRoute()

  function getStorageKey(suffix: string): string {
    if (perRoute) {
      const routeKey = route.path.replace(/\//g, '_') || '_home'
      return `${storagePrefix}${routeKey}_${suffix}`
    }
    return `${storagePrefix}_${suffix}`
  }

  function isExcluded(): boolean {
    return excludeRoutes.some((pattern) => {
      if (pattern.endsWith('*')) {
        return route.path.startsWith(pattern.slice(0, -1))
      }
      return route.path === pattern || route.path === `/${pattern}`
    })
  }

  function shouldShow(): boolean {
    if (typeof window === 'undefined') return false
    if (isExcluded()) return false
    if (localStorage.getItem('kit_submitted')) return false

    const stored = localStorage.getItem(getStorageKey('dismissed'))
    if (stored && Date.now() - parseInt(stored) < cooldown) return false
    return true
  }

  let ready = false
  let timer: ReturnType<typeof setTimeout> | null = null

  function setup() {
    triggered.value = false
    dismissed.value = false
    ready = false

    if (!shouldShow()) {
      dismissed.value = true
      return
    }

    timer = setTimeout(() => {
      ready = true
    }, delay)
  }

  const onMouseLeave = (e: MouseEvent) => {
    if (e.clientY <= 0 && ready && !triggered.value && !dismissed.value) {
      triggered.value = true
    }
  }

  const onScroll = () => {
    const scrollPercent =
      window.scrollY / (document.body.scrollHeight - window.innerHeight)
    if (scrollPercent >= scrollThreshold && ready && !triggered.value && !dismissed.value) {
      triggered.value = true
    }
  }

  onMounted(() => {
    setup()
    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('scroll', onScroll, { passive: true })

    onUnmounted(() => {
      if (timer) clearTimeout(timer)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
    })
  })

  if (perRoute) {
    watch(() => route.path, () => {
      if (timer) clearTimeout(timer)
      setup()
    })
  }

  function dismiss() {
    triggered.value = false
    dismissed.value = true
    localStorage.setItem(getStorageKey('dismissed'), Date.now().toString())
  }

  return { triggered, dismissed, dismiss }
}
