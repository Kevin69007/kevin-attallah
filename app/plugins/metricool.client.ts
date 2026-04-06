export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://tracker.metricool.com/resources/be.js'
  script.onload = () => {
    ;(window as any).beTracker?.t({ hash: '586857914d8a621c84c32633cf0e8b21' })
  }
  document.head.appendChild(script)
})
