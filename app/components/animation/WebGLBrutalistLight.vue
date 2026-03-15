<template>
  <div class="webgl-brutalist" ref="container"></div>
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
let meshGroupFront: THREE.Group
let meshGroupBack: THREE.Group
let clock: THREE.Clock
let handleResize: () => void

onMounted(() => {
  if (!container.value || !window) return

  gsap.registerPlugin(ScrollTrigger)
  clock = new THREE.Clock()

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xFFFFFF)
  scene.fog = new THREE.FogExp2(0xFFFFFF, 0.018)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 120)
  camera.position.z = 12

  renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // Two groups for parallax depth
  meshGroupFront = new THREE.Group()
  meshGroupBack = new THREE.Group()
  scene.add(meshGroupBack)
  scene.add(meshGroupFront)

  const colorPurple = new THREE.Color(0x6C2BD9)
  const colorOrange = new THREE.Color(0xC67651)

  // Geometry variety
  const geometries = [
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TorusGeometry(0.7, 0.25, 8, 16),
  ]

  // Front layer - closer, more visible
  for (let i = 0; i < 70; i++) {
    const isPurple = Math.random() > 0.35
    const geoIndex = Math.floor(Math.random() * geometries.length)

    const material = new THREE.MeshBasicMaterial({
      color: isPurple ? colorPurple : colorOrange,
      wireframe: true,
      transparent: true,
      opacity: Math.random() * 0.22 + 0.08
    })

    const mesh = new THREE.Mesh(geometries[geoIndex], material)

    mesh.position.set(
      (Math.random() - 0.5) * 35,
      (Math.random() - 0.5) * 35,
      (Math.random() - 0.5) * 70
    )

    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    const scale = Math.random() * 2.2 + 0.6
    mesh.scale.set(scale, scale, scale)

    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.01,
      ry: (Math.random() - 0.5) * 0.01,
      rz: (Math.random() - 0.5) * 0.005
    }

    meshGroupFront.add(mesh)
  }

  // Back layer - deeper, subtler, for parallax
  for (let i = 0; i < 50; i++) {
    const isPurple = Math.random() > 0.5
    const geoIndex = Math.floor(Math.random() * geometries.length)

    const material = new THREE.MeshBasicMaterial({
      color: isPurple ? colorPurple : colorOrange,
      wireframe: true,
      transparent: true,
      opacity: Math.random() * 0.12 + 0.04
    })

    const mesh = new THREE.Mesh(geometries[geoIndex], material)

    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 90 - 15
    )

    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    const scale = Math.random() * 3.5 + 1.5
    mesh.scale.set(scale, scale, scale)

    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.004,
      ry: (Math.random() - 0.5) * 0.004,
      rz: (Math.random() - 0.5) * 0.002
    }

    meshGroupBack.add(mesh)
  }

  // Scroll-driven camera travel through the tunnel
  gsap.to(camera.position, {
    z: -40,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5
    }
  })

  // Front group rotates more on scroll
  gsap.to(meshGroupFront.rotation, {
    z: Math.PI * 0.8,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5
    }
  })

  // Back group rotates slower for parallax
  gsap.to(meshGroupBack.rotation, {
    z: Math.PI * 0.3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5
    }
  })

  handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', handleResize)

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)
    const elapsed = clock.getElapsedTime()

    // Organic camera drift
    camera.position.x = Math.sin(elapsed * 0.15) * 1.2
    camera.position.y = Math.cos(elapsed * 0.12) * 0.8

    // Subtle group float
    meshGroupFront.position.y = Math.sin(elapsed * 0.3) * 0.4
    meshGroupBack.position.y = Math.sin(elapsed * 0.2 + 1) * 0.6

    // Individual mesh rotations
    meshGroupFront.children.forEach(child => {
      child.rotation.x += child.userData.rx
      child.rotation.y += child.userData.ry
      child.rotation.z += child.userData.rz
    })

    meshGroupBack.children.forEach(child => {
      child.rotation.x += child.userData.rx
      child.rotation.y += child.userData.ry
      child.rotation.z += child.userData.rz
    })

    renderer.render(scene, camera)
  }
  animate()
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (handleResize) window.removeEventListener('resize', handleResize)
  if (renderer && container.value) {
    container.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
})
</script>

<style scoped>
.webgl-brutalist {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
