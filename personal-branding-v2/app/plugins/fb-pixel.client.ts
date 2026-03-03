export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const pixelId = config.public.fbPixelId

  if (!pixelId) {
    console.warn('Facebook Pixel ID manquant')
    return
  }

  if (typeof window !== 'undefined') {
    const w = window as any
    if (!w.fbq) {
      const n: any = (w.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      })
      if (!w._fbq) w._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
    }

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    const first = document.getElementsByTagName('script')[0]
    first?.parentNode?.insertBefore(script, first) || document.head.appendChild(script)

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
