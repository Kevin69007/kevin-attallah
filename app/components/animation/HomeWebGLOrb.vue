<template>
  <canvas ref="canvasEl" class="home-webgl-orb" />
</template>

<script setup lang="ts">
import * as THREE from 'three'

const canvasEl = ref<HTMLCanvasElement>()
let renderer: THREE.WebGLRenderer | null = null
let animationId = 0
let scrollTriggerInstance: any = null

onMounted(() => {
  if (!canvasEl.value || typeof window === 'undefined') return

  // Skip on mobile
  if (window.innerWidth <= 1024) return

  // Skip animation on reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const canvas = canvasEl.value
  const parent = canvas.parentElement!
  const width = parent.clientWidth
  const height = parent.clientHeight

  // Scene
  const scene = new THREE.Scene()

  // Camera
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.set(0, 0, 6)

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Lighting (matching Glass3DQuestion.vue)
  scene.add(new THREE.AmbientLight(0xffffff, 0.4))

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(2, 3, 4)
  scene.add(directionalLight)

  const purpleLight = new THREE.PointLight(0x6C2BD9, 1.5, 20)
  purpleLight.position.set(-2, 1, 3)
  scene.add(purpleLight)

  const copperLight = new THREE.PointLight(0xC67651, 1, 20)
  copperLight.position.set(2, -1, 3)
  scene.add(copperLight)

  // Main geometry: glass torus knot
  const torusGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x8B5CF6,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.92,
    thickness: 1.5,
    transparent: true,
    opacity: 0.15,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1,
  })
  const torus = new THREE.Mesh(torusGeo, glassMat)
  scene.add(torus)

  // Orbiting small icosahedrons
  const smallGeo = new THREE.IcosahedronGeometry(0.12, 1)
  const copperMat = new THREE.MeshPhysicalMaterial({
    color: 0xC67651,
    metalness: 0.3,
    roughness: 0.1,
    transmission: 0.7,
    thickness: 0.5,
    transparent: true,
    opacity: 0.3,
    clearcoat: 0.8,
  })

  const orbiters: THREE.Mesh[] = []
  for (let i = 0; i < 3; i++) {
    const orb = new THREE.Mesh(smallGeo, copperMat)
    scene.add(orb)
    orbiters.push(orb)
  }

  // Scroll state driven by GSAP
  const scrollState = { progress: 0 }
  const mouseTarget = { x: 0, y: 0 }

  const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()
  if (gsap && ScrollTrigger) {
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self: any) => {
        scrollState.progress = self.progress
      },
    })
  }

  // Mouse reactivity
  const onMouseMove = (e: MouseEvent) => {
    mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 0.3
    mouseTarget.y = (e.clientY / window.innerHeight - 0.5) * 0.3
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true })

  // Reduced motion: render one frame and stop
  if (prefersReducedMotion) {
    torus.rotation.y = 0.3
    torus.rotation.x = 0.1
    orbiters.forEach((orb, i) => {
      const angle = (i / 3) * Math.PI * 2
      orb.position.set(Math.cos(angle) * 2, Math.sin(angle) * 0.5, Math.sin(angle) * 2)
    })
    renderer.render(scene, camera)
    window.removeEventListener('mousemove', onMouseMove)
    return
  }

  // Animation loop
  const clock = new THREE.Clock()
  const currentMouse = { x: 0, y: 0 }

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    // Smooth mouse interpolation
    currentMouse.x += (mouseTarget.x - currentMouse.x) * 0.05
    currentMouse.y += (mouseTarget.y - currentMouse.y) * 0.05

    // Scroll-driven rotation (2 full rotations over full page scroll)
    torus.rotation.y = scrollState.progress * Math.PI * 4 + currentMouse.x * 0.5
    torus.rotation.x = Math.sin(scrollState.progress * Math.PI * 2) * 0.3 + currentMouse.y * 0.3

    // Gentle autonomous float
    torus.position.y = Math.sin(t * 0.4) * 0.15

    // Orbiting icosahedrons
    orbiters.forEach((orb, i) => {
      const offset = (i / 3) * Math.PI * 2
      const speed = 0.3 + i * 0.08
      const radius = 2 + Math.sin(t * 0.2 + i) * 0.3
      orb.position.x = Math.cos(t * speed + offset) * radius
      orb.position.y = Math.sin(t * speed * 0.7 + offset) * 0.8
      orb.position.z = Math.sin(t * speed + offset) * radius
      orb.rotation.x = t * 0.5
      orb.rotation.y = t * 0.3
    })

    renderer!.render(scene, camera)
  }
  animate()

  // Resize handler
  const ro = new ResizeObserver(() => {
    if (!renderer || !canvas.parentElement) return
    const w = canvas.parentElement.clientWidth
    const h = canvas.parentElement.clientHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  })
  ro.observe(parent)

  // Cleanup reference
  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    ro.disconnect()
  })
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
  if (renderer) {
    renderer.dispose()
    renderer = null
  }
})
</script>

<style lang="scss" scoped>
.home-webgl-orb {
  position: fixed;
  top: 0;
  right: -10%;
  width: 50vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;

  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
