import { readBody } from 'h3'
import bcrypt from 'bcrypt'
import User from '~~/server/models/User' 
import * as yup from 'yup'

const registerSchema = yup.object({
  firstname: yup.string().required('Firstname is required'),
  lastname: yup.string().required('Lastname is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 chars long').required('Password is required')
})


export default defineEventHandler(async (event) => {
  const { email, password, firstname, lastname } = await readBody(event) || {}

  

  try {
    await registerSchema.validate({email, password, firstname, lastname}, { abortEarly: false })
  } catch (err) {
    const errorMessage = err instanceof yup.ValidationError ? err.errors.join(', ') : 'Validation failed'
    throw createError({
      statusCode: 400,
      statusMessage: errorMessage
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
