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
let mesh: THREE.Mesh

onMounted(() => {
  if (!container.value || !window) return

  gsap.registerPlugin(ScrollTrigger)

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x050505, 0.002)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 8

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
  scene.add(ambientLight)

  const pointLight1 = new THREE.PointLight(0x6C2BD9, 50, 100)
  pointLight1.position.set(5, 5, 5)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0xffffff, 40, 100)
  pointLight2.position.set(-5, -5, -5)
  scene.add(pointLight2)

  // Obsidian Monolith
  const geometry = new THREE.IcosahedronGeometry(3, 10)
  
  const material = new THREE.MeshStandardMaterial({
    color: 0x050505,
    roughness: 0.1,
    metalness: 0.9,
    wireframe: true, 
    transparent: true,
    opacity: 0.15
  })

  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x020202,
    roughness: 0.4,
    metalness: 1.0,
  })
  
  const coreGeometry = new THREE.IcosahedronGeometry(2.8, 4)
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
  
  mesh = new THREE.Mesh(geometry, material)
  mesh.add(coreMesh)
  scene.add(mesh)

  // Dramatic GSAP ScrollTrigger
  gsap.to(mesh.rotation, {
    y: Math.PI * 2,
    x: Math.PI,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
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
    mesh.rotation.y += 0.001
    mesh.rotation.x += 0.0005
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
  background: #050505;
}
</style>
