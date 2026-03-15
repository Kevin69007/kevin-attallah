<template>
  <canvas ref="canvasEl" class="glass-3d-question" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const canvasEl = ref<HTMLCanvasElement>()
let renderer: THREE.WebGLRenderer | null = null
let animationId = 0

onMounted(async () => {
  if (!canvasEl.value || typeof window === 'undefined') return

  const canvas = canvasEl.value
  const parent = canvas.parentElement!
  const width = parent.clientWidth
  const height = parent.clientHeight

  // Scene
  const scene = new THREE.Scene()

  // Camera
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.set(0, 0, 5)

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Lighting for glass effect
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(2, 3, 4)
  scene.add(directionalLight)

  const purpleLight = new THREE.PointLight(0x6C2BD9, 1.5, 20)
  purpleLight.position.set(-2, 1, 3)
  scene.add(purpleLight)

  const copperLight = new THREE.PointLight(0xC67651, 1, 20)
  copperLight.position.set(2, -1, 3)
  scene.add(copperLight)

  // Load font and create "?" geometry
  const loader = new FontLoader()
  loader.load(
    'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_bold.typeface.json',
    (font) => {
      const textGeo = new TextGeometry('?', {
        font,
        size: 3.5,
        depth: 0.4,
        curveSegments: 24,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.04,
        bevelSegments: 8,
      })
      textGeo.computeBoundingBox()
      textGeo.center()

      // Glass material - translucent with refraction feel
      const glassMaterial = new THREE.MeshPhysicalMaterial({
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

      const textMesh = new THREE.Mesh(textGeo, glassMaterial)
      scene.add(textMesh)

      // Animate
      const clock = new THREE.Clock()
      const animate = () => {
        animationId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()

        // Gentle 3D float rotation
        textMesh.rotation.y = Math.sin(t * 0.3) * 0.25
        textMesh.rotation.x = Math.sin(t * 0.2) * 0.1
        textMesh.position.y = Math.sin(t * 0.4) * 0.15

        renderer!.render(scene, camera)
      }
      animate()
    },
  )

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
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) {
    renderer.dispose()
    renderer = null
  }
})
</script>

<style lang="scss" scoped>
.glass-3d-question {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
