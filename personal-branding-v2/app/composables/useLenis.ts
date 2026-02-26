export function useLenis() {
  const { $lenis } = useNuxtApp()

  function scrollTo(target: string | HTMLElement | number, options?: Record<string, any>) {
    $lenis?.scrollTo(target, {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    })
  }

  function stop() {
    $lenis?.stop()
  }

  function start() {
    $lenis?.start()
  }

  return { scrollTo, stop, start, lenis: $lenis }
}
