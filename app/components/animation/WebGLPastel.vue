<template>
  <div class="webgl-container" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const container = ref<HTMLElement | null>(null)
let animationFrameId: number
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let spheres: THREE.Mesh[] = []

onMounted(() => {
  if (!container.value || !window) return

  gsap.registerPlugin(ScrollTrigger)

  scene = new THREE.Scene()
  // Soft, warm paper white
  scene.background = new THREE.Color(0xFDFBF7)
  scene.fog = new THREE.FogExp2(0xFDFBF7, 0.04)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 10

  renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // Soft Ambient Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  // Pastel colored point lights to create an iridescent effect on standard materials
  const lightColors = [0xFFB7B2, 0xE2F0CB, 0xB5EAD7, 0xC7CEEA] // Peach, Lime, Mint, Lavender
  lightColors.forEach((color, i) => {
    const light = new THREE.PointLight(color, 10, 50)
    light.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10
    )
    scene.add(light)
  })

  // Floating Soft Orbs
  const geometry = new THREE.SphereGeometry(1, 64, 64)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.3,
    transmission: 0.9, // glass-like
    thickness: 2.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  })

  for (let i = 0; i < 15; i++) {
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 15 - 5
    )
    const scale = Math.random() * 2 + 1
    sphere.scale.set(scale, scale, scale)
    
    // Custom properties for floating math
    sphere.userData = {
      speed: Math.random() * 0.002 + 0.001,
      offsetY: Math.random() * Math.PI * 2,
      offsetX: Math.random() * Math.PI * 2,
    }
    
    spheres.push(sphere)
    scene.add(sphere)
  }

  // Gentle camera pan on scroll
  gsap.to(camera.position, {
    y: -5,
    z: 5,
    ease: 'sine.inOut',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2 // extremely smooth lag
    }
  })

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', handleResize)

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)
    
    const time = Date.now()
    
    // Gentle floating
    spheres.forEach(sphere => {
      sphere.position.y += Math.sin(time * sphere.userData.speed + sphere.userData.offsetY) * 0.005
      sphere.position.x += Math.cos(time * sphere.userData.speed + sphere.userData.offsetX) * 0.005
    })

    renderer.render(scene, camera)
  }
  animate()
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', () => {})
  if (renderer && container.value) {
    container.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
})
</script>

<style scoped>
.webgl-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
