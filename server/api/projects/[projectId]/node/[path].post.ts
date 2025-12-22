import * as yup from 'yup'
import NamespacePath from '~~/server/models/NamespacePath'
import { assertProjectAccess } from '~~/server/utils/assertProjectAccess.utils'
import mongoose, { type MongooseError } from 'mongoose'
import { readBody } from 'h3'
import slugify from '@sindresorhus/slugify'

// Schéma pro validaci yup
const inputSchema = yup.object({
  projectId: yup.string().required('Project id is required')
})

export default defineEventHandler(async (event) => {
  
  // Načtení payloadu
  const projectId = event.context.params?.projectId
  const path = event.context.params?.path
  const { name } = await readBody(event) || {}
  const userId = event.context.auth.user.id

  projectId?.toString()

  console.log("projectId"+":")
  console.log(projectId)
  console.log("path"+":")
  console.log(path)
  console.log("name"+":")
  console.log(name)

  // ověření oprávnění
  await assertProjectAccess(projectId, userId, ['admin'])
  
  // Validace
  try {
    await inputSchema.validate({projectId}, { abortEarly: false })
  } catch (err) {
    const errorMessage = err instanceof yup.ValidationError ? err.errors.join(', ') : 'Validation failed'
    throw createError({
      statusCode: 400,
      statusMessage: errorMessage
    })
  }
  

  // Get path from DB
  try {

    const node = await NamespacePath.create({
      project: new mongoose.Types.ObjectId(projectId),
      name,
      path: path ? `${path}.${slugify(name)}` : `${slugify(name)}`,
      createdAt: new Date()   // přidáš aktuálního uživatele jako admina
    })

    return {
      success: true,
      node,
    }

  } catch (e) {
    const error = e as MongooseError & { code?: number };

      if(error.code == 11000) throw createError({ statusCode: 400, statusMessage: 'Node already exists' })
      else throw createError({ statusCode: 400, statusMessage: 'Node not created' })


    
  }


  
  


})
