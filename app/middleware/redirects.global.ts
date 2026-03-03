const staticRedirects: Record<string, string> = {
  '/se-connaitre': '/accompagnement',
  '/se-lancer': '/accompagnement',
  '/se-developper': '/ia',
  '/categories': '/formations',
  '/services': '/formations',
  '/business': '/accompagnement',
  '/former': '/accompagnement',
  '/request-quote': '/accompagnement',
  '/portfolio/2-columns': '/formations',
  '/portfolio/3-columns': '/formations',
}

export default defineNuxtRouteMiddleware((to) => {
  const path = to.path

  // Static redirects
  if (staticRedirects[path]) {
    return navigateTo(staticRedirects[path], { redirectCode: 301 })
  }

  // Dynamic: /services/[id] → /formations/[id]
  if (path.startsWith('/services/')) {
    const id = path.replace('/services/', '')
    return navigateTo(`/formations/${id}`, { redirectCode: 301 })
  }

  // Dynamic: /portfolio/[id] → /formations/[id]
  if (path.startsWith('/portfolio/') && !path.includes('columns')) {
    const id = path.replace('/portfolio/', '')
    return navigateTo(`/formations/${id}`, { redirectCode: 301 })
  }
})
