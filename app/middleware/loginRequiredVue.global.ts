export default defineNuxtRouteMiddleware((to) => {

  console.log(to)
  // 1) Výjimky (whitelist)
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/reset-password'
  ]

  if (publicRoutes.includes(to.path)) {
    return
  }

  const token = useCookie<string | null>('auth_token')

  if (!token.value) {
    return navigateTo('/auth/login')
  }

})