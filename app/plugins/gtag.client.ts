export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaId

  if (!gaId) {
    console.warn('Google Ads / Analytics ID manquant')
    return
  }

  if (typeof window !== 'undefined') {
    const w = window as any
    w.dataLayer = w.dataLayer || []
    w.gtag = function (...args: any[]) {
      w.dataLayer.push(args)
    }
    w.gtag('js', new Date())
    w.gtag('config', gaId, { send_page_view: false })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)
  }

  const router = useRouter()
  router.afterEach(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'page_view')
    }
  })
})
