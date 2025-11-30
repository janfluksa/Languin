// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token') // název tvé cookie

  // whitelist veřejných cest
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/reset-password']

  // pokud je route veřejná, nic neřeš
  if (publicRoutes.includes(to.path)) {
    return
  }

  // pokud není token => redirect na login
  if (!token.value) {
    return navigateTo('/auth/login')
  }
})