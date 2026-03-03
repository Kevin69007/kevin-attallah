export function useFBPixel() {
  function track(event: string, data?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      if (data) {
        ;(window as any).fbq('track', event, data)
      } else {
        ;(window as any).fbq('track', event)
      }
    }
  }

  return {
    trackViewContent: (data?: Record<string, any>) => track('ViewContent', data),
    trackAddToCart: (data?: Record<string, any>) => track('AddToCart', data),
    trackInitiateCheckout: (data?: Record<string, any>) => track('InitiateCheckout', data),
    trackAddPaymentInfo: () => track('AddPaymentInfo'),
    trackPurchase: (data?: Record<string, any>) => track('Purchase', data),
    trackLead: () => track('Lead'),
    trackSubscribe: () => track('Subscribe'),
    track,
  }
}
