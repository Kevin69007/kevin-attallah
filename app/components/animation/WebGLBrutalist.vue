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
let meshGroup: THREE.Group

onMounted(() => {
  if (!container.value || !window) return

  gsap.registerPlugin(ScrollTrigger)

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.FogExp2(0x000000, 0.05) // Heavy fog for depth

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 10

  renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  meshGroup = new THREE.Group()
  scene.add(meshGroup)

  // Create an aggressive wireframe tunnel / geometric mess
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  })

  for (let i = 0; i < 200; i++) {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40
    )
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    const scale = Math.random() * 4 + 1
    mesh.scale.set(scale, scale, scale)
    meshGroup.add(mesh)
  }

  // Aggressive scroll trigger - move camera THRU the shapes
  gsap.to(camera.position, {
    z: -20,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5
    }
  })

  // Twist the world
  gsap.to(meshGroup.rotation, {
    z: Math.PI,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5
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
    
    // Fast, harsh rotation
    meshGroup.children.forEach(child => {
      child.rotation.x += 0.005
      child.rotation.y += 0.005
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
