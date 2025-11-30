import { readBody } from 'h3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '~~/server/models/User'

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()

  const { email, password } = await readBody(event)

  // Email and password is required
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing email or password'
    })
  }

  // Find user in DB
  const user = await User.findOne({ email })
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  // Missing db property 'password'
  if(!user?.password) {
    return {
      error: "Missing password in db"
    }
  }

  // Check password
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const token = jwt.sign(
    {
      id: user.id, 
      email: user.email,
      realname: `${user.firstname} ${user.lastname}`, 
    }, 
    config.ACCESS_TOKEN_SECRET, 
    { 
      expiresIn: '1d' 
    })
  

  return { 
    message: "User authenticated",
    id: user._id,
    email: user.email,
    realname: `${user.firstname} ${user.lastname}`,
    token: token 
  }
})
