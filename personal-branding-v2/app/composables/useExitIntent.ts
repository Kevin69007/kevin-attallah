export function useExitIntent(options: { delay?: number; scrollThreshold?: number } = {}) {
  const { delay = 8000, scrollThreshold = 0.6 } = options
  const triggered = ref(false)
  const dismissed = ref(false)

  function shouldShow(): boolean {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('ffm_dismissed')
    if (stored && Date.now() - parseInt(stored) < 24 * 60 * 60 * 1000) return false
    if (localStorage.getItem('ffm_submitted')) return false
    return true
  }

  onMounted(() => {
    if (!shouldShow()) {
      dismissed.value = true
      return
    }

    let ready = false
    const timer = setTimeout(() => {
      ready = true
    }, delay)

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && ready && !triggered.value && !dismissed.value) {
        triggered.value = true
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)

    const onScroll = () => {
      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPercent >= scrollThreshold && ready && !triggered.value && !dismissed.value) {
        triggered.value = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    onUnmounted(() => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
    })
  })

  function dismiss() {
    triggered.value = false
    dismissed.value = true
    localStorage.setItem('ffm_dismissed', Date.now().toString())
  }

  return { triggered, dismissed, dismiss }
}
