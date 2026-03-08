<template>
  <canvas ref="canvasRef" class="wave-lines" />
</template>

<script setup lang="ts">
import { createNoise3D } from 'simplex-noise'

const { $gsap: gsap } = useNuxtApp()

const canvasRef = ref<HTMLCanvasElement>()

const LINE_COUNT = 130
const POINT_SPACING = 4
const MOUSE_RADIUS = 400
const MOUSE_STRENGTH = 140
const LERP_FACTOR = 0.14
const BASE_AMPLITUDE = 30

const noise3D = createNoise3D()

interface Point {
  baseX: number
  y: number
  currentX: number
}

interface LineData {
  points: Point[]
  opacity: number
  width: number
  baseLineX: number
}

let lines: LineData[] = []
let mouse = { x: -9999, y: -9999, active: false }
let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let time = 0
let tickerFn: gsap.TickerCallback | null = null
let resizeObserver: ResizeObserver | null = null
let sectionEl: Element | null = null
let canvasW = 0
let canvasH = 0

function buildLines(width: number, height: number) {
  lines = []
  const pointCount = Math.ceil(height / POINT_SPACING) + 1
  const lineSpacing = width / (LINE_COUNT - 1)
  const halfW = width / 2

  for (let i = 0; i < LINE_COUNT; i++) {
    const points: Point[] = []
    const baseLineX = i * lineSpacing

    // Edge amplification: lines near edges curve more dramatically
    const distFromCenter = Math.abs(baseLineX - halfW)
    const edgeFactor = 1 + 3 * (distFromCenter / halfW) ** 2

    // Depth: vary opacity and width per line
    const depthVal = noise3D(i * 0.1, 0, 0)
    const normalizedDepth = (depthVal + 1) / 2 // 0..1
    const opacity = 0.04 + normalizedDepth * 0.06
    const lineWidth = 0.4 + normalizedDepth * 0.6

    for (let j = 0; j < pointCount; j++) {
      const y = j * POINT_SPACING
      const noiseVal = noise3D(baseLineX * 0.002, y * 0.002, time * 0.3)
      const baseX = baseLineX + noiseVal * BASE_AMPLITUDE * edgeFactor
      points.push({ baseX, y, currentX: baseX })
    }

    lines.push({ points, opacity, width: lineWidth, baseLineX })
  }
}

function updateBasePositions() {
  const halfW = canvasW / 2

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const distFromCenter = Math.abs(line.baseLineX - halfW)
    const edgeFactor = 1 + 3 * (distFromCenter / halfW) ** 2

    for (let j = 0; j < line.points.length; j++) {
      const point = line.points[j]
      const noiseVal = noise3D(line.baseLineX * 0.002, point.y * 0.002, time * 0.3)
      point.baseX = line.baseLineX + noiseVal * BASE_AMPLITUDE * edgeFactor
    }
  }
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return

  const parent = canvas.parentElement
  if (!parent) return

  dpr = window.devicePixelRatio || 1
  const rect = parent.getBoundingClientRect()

  canvasW = rect.width
  canvasH = rect.height

  canvas.width = canvasW * dpr
  canvas.height = canvasH * dpr
  canvas.style.width = `${canvasW}px`
  canvas.style.height = `${canvasH}px`

  ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)

  buildLines(canvasW, canvasH)
}

function render() {
  if (!ctx) return

  time += 0.012

  ctx.clearRect(0, 0, canvasW, canvasH)

  updateBasePositions()

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const points = line.points

    for (let j = 0; j < points.length; j++) {
      const point = points[j]
      let targetX = point.baseX

      if (mouse.active) {
        const dx = point.currentX - mouse.x
        const dy = point.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) ** 2
          const angle = Math.atan2(dy, dx)
          targetX = point.baseX + Math.cos(angle) * force * MOUSE_STRENGTH
        }
      }

      point.currentX += (targetX - point.currentX) * LERP_FACTOR
    }

    ctx.beginPath()
    ctx.moveTo(points[0].currentX, points[0].y)

    for (let j = 1; j < points.length - 1; j++) {
      const curr = points[j]
      const next = points[j + 1]
      const midX = (curr.currentX + next.currentX) / 2
      const midY = (curr.y + next.y) / 2
      ctx.quadraticCurveTo(curr.currentX, curr.y, midX, midY)
    }

    const last = points[points.length - 1]
    ctx.lineTo(last.currentX, last.y)

    ctx.strokeStyle = `rgba(108, 43, 217, ${line.opacity})`
    ctx.lineWidth = line.width
    ctx.stroke()
  }
}

function onMouseMove(e: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.active = true
}

function onMouseLeave() {
  mouse.active = false
}

onMounted(() => {
  resize()

  tickerFn = () => render()
  gsap.ticker.add(tickerFn)

  const parent = canvasRef.value?.parentElement
  if (parent) {
    resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(parent)
  }

  sectionEl = canvasRef.value?.closest('section') || null
  if (sectionEl) {
    sectionEl.addEventListener('mousemove', onMouseMove as EventListener)
    sectionEl.addEventListener('mouseleave', onMouseLeave)
  }
})

onUnmounted(() => {
  if (tickerFn) gsap.ticker.remove(tickerFn)
  resizeObserver?.disconnect()

  if (sectionEl) {
    sectionEl.removeEventListener('mousemove', onMouseMove as EventListener)
    sectionEl.removeEventListener('mouseleave', onMouseLeave)
  }
})
</script>

<style lang="scss" scoped>
.wave-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
