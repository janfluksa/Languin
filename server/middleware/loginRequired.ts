import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  // neaplikj se na nic jiného než na api
  if (!event.path.startsWith('/api/')) return


const config = useRuntimeConfig()

  const authHeader = getRequestHeader(event, 'authorization')
  const token = authHeader?.split(' ')[1]

  const whitelist = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/reset-password'
  ]

  // Získání aktuální cesty
  const path = event.path

  // Pokud je endpoint ve whitelistu → nic nedělej
  if (whitelist.includes(path)) {
    return
  }

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing JWT token',
      message: 'Please provide Bearer token in headers section of http request.'
    })
  }

  jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err: Error | null, user: jwt.JwtPayload | string | undefined) => {

    // ERR
    if (err) throw createError({ statusCode: 401, statusMessage: '"Log in to see this content"' })

    // OK
    event.context.auth = { user: user }

  })
  
})
