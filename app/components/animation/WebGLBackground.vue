<template>
  <canvas ref="canvasEl" class="webgl-background" />
</template>

<script setup lang="ts">
import * as THREE from 'three'

const canvasEl = ref<HTMLCanvasElement>()
let renderer: THREE.WebGLRenderer | null = null
let animationId = 0

onMounted(() => {
  if (!canvasEl.value || typeof window === 'undefined') return

  const canvas = canvasEl.value
  const width = window.innerWidth
  const height = window.innerHeight

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xFFFFFF, 0.0015) // Bright white space background

  const camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000)
  camera.position.z = 1000

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Particles setup
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 3000
  const posArray = new Float32Array(particlesCount * 3)
  const colorsArray = new Float32Array(particlesCount * 3)

  const colorPurple = new THREE.Color(0x6c2bd9) // Vivid Purple
  const colorGold = new THREE.Color(0xd4956f)   // Bright Orange/Gold

  for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 3000
    posArray[i + 1] = (Math.random() - 0.5) * 3000
    posArray[i + 2] = (Math.random() - 0.5) * 3000

    // Mix colors
    const mixedColor = colorPurple.clone().lerp(colorGold, Math.random())
    colorsArray[i] = mixedColor.r
    colorsArray[i + 1] = mixedColor.g
    colorsArray[i + 2] = mixedColor.b
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3))

  // Create circular texture for particles
  const canvasTexture = document.createElement('canvas')
  canvasTexture.width = 16
  canvasTexture.height = 16
  const ctx = canvasTexture.getContext('2d')
  if (ctx) {
    ctx.beginPath()
    ctx.arc(8, 8, 8, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()
  }
  const texture = new THREE.CanvasTexture(canvasTexture)

  const particlesMaterial = new THREE.PointsMaterial({
    size: 9, // Slightly larger for light mode visibility
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    map: texture,
    blending: THREE.NormalBlending, // AdditiveBlending washes out on white backgrounds
    depthWrite: false
  })

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)

  // Mouse interactivity
  let mouseX = 0
  let mouseY = 0
  let targetX = 0
  let targetY = 0
  const windowHalfX = width / 2
  const windowHalfY = height / 2

  const onMouseMove = (event: MouseEvent) => {
    targetX = (event.clientX - windowHalfX) * 0.5
    targetY = (event.clientY - windowHalfY) * 0.5
  }
  window.addEventListener('mousemove', onMouseMove)

  // Scroll reactivity
  let scrollY = 0
  const onScroll = () => {
    scrollY = window.scrollY
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  const clock = new THREE.Clock()

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const elapsedTime = clock.getElapsedTime()

    mouseX += (targetX - mouseX) * 0.05
    mouseY += (targetY - mouseY) * 0.05

    // Camera move based on mouse & scroll
    camera.position.x += (mouseX - camera.position.x) * 0.05
    camera.position.y += (-mouseY - (scrollY * 0.5) - camera.position.y) * 0.05
    camera.lookAt(scene.position)

    // Slowly rotate particles
    particlesMesh.rotation.y = elapsedTime * 0.05
    particlesMesh.rotation.x = elapsedTime * 0.02

    renderer!.render(scene, camera)
  }
  animate()

  const ro = new ResizeObserver(() => {
    if (!renderer) return
    const newWidth = window.innerWidth
    const newHeight = window.innerHeight
    renderer.setSize(newWidth, newHeight)
    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
  })
  ro.observe(document.body)

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('scroll', onScroll)
    ro.disconnect()
    cancelAnimationFrame(animationId)
    if (renderer) renderer.dispose()
  })
})
</script>

<style scoped>
.webgl-background {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  background: #FFFFFF; /* Bright White Background */
}
</style>
