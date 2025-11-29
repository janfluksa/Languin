import { readBody } from 'h3'
import bcrypt from 'bcrypt'
import User from '~~/server/models/User' 

export default defineEventHandler(async (event) => {
  const { email, password, firstname, lastname } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing email or password'
    })
  }

  // 1) Zkontroluj, zda uživatel již existuje
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User already exists'
    })
  }

  // 2) Hashuj heslo pomocí bcrypt
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3) Vytvoř nového uživatele a ulož do DB
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    createdAt: new Date()
  })

  await user.save()

  // 4) Vrať odpověď potvrzující úspěch
  return {
    ok: true,
    message: 'User registered successfully',
    user: { id: user._id, email: user.email }
  }
})
