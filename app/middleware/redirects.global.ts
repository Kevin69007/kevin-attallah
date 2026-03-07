const staticRedirects: Record<string, string> = {
  '/se-connaitre': '/creer-entreprise',
  '/se-lancer': '/creer-entreprise',
  '/se-developper': '/evoluer-ia',
  '/accompagnement': '/creer-entreprise',
  '/ia': '/evoluer-ia',
  '/categories': '/formations',
  '/services': '/formations',
  '/business': '/creer-entreprise',
  '/former': '/creer-entreprise',
  '/request-quote': '/creer-entreprise',
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
