export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const partnerId = config.public.linkedinPartnerId

  if (!partnerId) {
    console.warn('LinkedIn Partner ID manquant')
    return
  }

  if (typeof window !== 'undefined') {
    const w = window as any
    w._linkedin_data_partner_id = partnerId

    w.lintrk = w.lintrk || function (action: string, data?: any) {
      (w.lintrk.q = w.lintrk.q || []).push([action, data])
    }

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
    document.head.appendChild(script)
  }
})
