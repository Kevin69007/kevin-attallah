export function useGoogleAds() {
  function track(event: string, data?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      if (data) {
        ;(window as any).gtag('event', event, data)
      } else {
        ;(window as any).gtag('event', event)
      }
    }
  }

  return {
    trackViewItem: (data?: Record<string, any>) => track('view_item', data),
    trackAddToCart: (data?: Record<string, any>) => track('add_to_cart', data),
    trackBeginCheckout: (data?: Record<string, any>) => track('begin_checkout', data),
    trackAddPaymentInfo: () => track('add_payment_info'),
    trackPurchase: (data?: Record<string, any>) => track('purchase', data),
    trackGenerateLead: (data?: Record<string, any>) => track('generate_lead', data),
    track,
  }
}
