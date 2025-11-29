import { readBody } from 'h3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '~~/server/models/User'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing email or password'
    })
  }

  // 1) Najdi uživatele v DB
  const user = await User.findOne({ email })
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  console.log("body.password =", password)
  console.log("user.password =", user?.password)

  // 2) Ověř heslo
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  // 3) Vytvoř JWT
  const config = useRuntimeConfig()
  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  )

  // 4) Ulož token do HTTP-only cookie
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

  return { ok: true }
})
