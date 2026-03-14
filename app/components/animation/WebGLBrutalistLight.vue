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
let meshGroup: THREE.Group

onMounted(() => {
  if (!container.value || !window) return

  gsap.registerPlugin(ScrollTrigger)

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xFFFFFF)
  scene.fog = new THREE.FogExp2(0xFFFFFF, 0.05) // Dense white fog

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 10

  renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  meshGroup = new THREE.Group()
  scene.add(meshGroup)

  const geometry = new THREE.IcosahedronGeometry(1, 0)
  
  // Mix of Purple and Orange wireframes
  const colorPurple = new THREE.Color(0x6C2BD9)
  const colorOrange = new THREE.Color(0xC67651)
  
  for (let i = 0; i < 500; i++) {
    const isPurple = Math.random() > 0.5
    
    // We use a LineBasicMaterial to create crisp wireframes
    const material = new THREE.MeshBasicMaterial({
      color: isPurple ? colorPurple : colorOrange,
      wireframe: true,
      transparent: true,
      opacity: Math.random() * 0.5 + 0.1
    })

    const mesh = new THREE.Mesh(geometry, material)
    
    // Distribute them in a long tunnel stretching back along the Z axis
    mesh.position.set(
      (Math.random() - 0.5) * 30, // Spread X
      (Math.random() - 0.5) * 30, // Spread Y
      (Math.random() - 0.5) * 60 // Long tunnel Z
    )
    
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    const scale = Math.random() * 3 + 0.5
    mesh.scale.set(scale, scale, scale)
    
    // Add custom rotation speeds
    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.02,
      ry: (Math.random() - 0.5) * 0.02,
      rz: (Math.random() - 0.5) * 0.02
    }
    
    meshGroup.add(mesh)
  }

  // Aggressive scroll trigger - move camera THRU the tunnel
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

  // Twist the world heavily
  gsap.to(meshGroup.rotation, {
    z: Math.PI * 1.5,
    ease: 'power2.inOut',
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
    
    // Continuous chaotic rotation of individual geometries
    meshGroup.children.forEach(child => {
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
  window.removeEventListener('resize', () => {})
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
