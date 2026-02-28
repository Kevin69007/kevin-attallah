export function useLinkedIn() {
  function trackConversion(conversionId?: number) {
    if (typeof window !== 'undefined' && (window as any).lintrk) {
      if (conversionId) {
        ;(window as any).lintrk('track', { conversion_id: conversionId })
      } else {
        ;(window as any).lintrk('track')
      }
    }
  }

  return {
    trackConversion,
  }
}
