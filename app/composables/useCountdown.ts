export function useCountdown(durationMinutes = 60) {
  const timeLeft = ref({ hours: 0, minutes: 0, seconds: 0 })
  const isExpired = ref(false)
  let interval: ReturnType<typeof setInterval> | null = null

  const storageKey = 'promo_endTime'

  function getEndTime(): number {
    if (typeof window === 'undefined') return 0
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      const endTime = parseInt(stored, 10)
      if (endTime > Date.now()) return endTime
    }
    // Set new countdown
    const endTime = Date.now() + durationMinutes * 60 * 1000
    localStorage.setItem(storageKey, endTime.toString())
    return endTime
  }

  function update() {
    const endTime = getEndTime()
    const diff = endTime - Date.now()

    if (diff <= 0) {
      isExpired.value = true
      timeLeft.value = { hours: 0, minutes: 0, seconds: 0 }
      if (interval) clearInterval(interval)
      return
    }

    timeLeft.value = {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    }
  }

  onMounted(() => {
    update()
    interval = setInterval(update, 1000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  const formatted = computed(() => {
    const { hours, minutes, seconds } = timeLeft.value
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  })

  return { timeLeft, isExpired, formatted }
}
