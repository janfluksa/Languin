import jwt from 'jsonwebtoken'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Získej token z cookie
  const token = getCookie(event, 'auth_token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    // Ověř token
    const decoded = jwt.verify(token, config.JWT_SECRET!)
    event.context.user = decoded // ulož uživatele do contextu
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }
})