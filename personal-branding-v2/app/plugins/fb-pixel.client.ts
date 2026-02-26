export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const pixelId = config.public.fbPixelId

  if (!pixelId) {
    console.warn('Facebook Pixel ID manquant')
    return
  }

  if (typeof window !== 'undefined') {
    const w = window as any
    w.fbq = w.fbq || function (...args: any[]) {
      (w.fbq.q = w.fbq.q || []).push(args)
    }
    w._fbq = w._fbq || w.fbq
    w.fbq.push = w.fbq
    w.fbq.loaded = true
    w.fbq.version = '2.0'
    w.fbq.q = w.fbq.q || []

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)

    w.fbq('init', pixelId)
    w.fbq('track', 'PageView')
  }

  const router = useRouter()
  router.afterEach(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', 'PageView')
    }
  })
})
