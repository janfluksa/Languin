import { getQuery } from 'h3'
import mongoose from 'mongoose'
import * as yup from 'yup'
import Namespace from '~~/server/models/Namespace'
import { createHomePath } from '~~/server/utils/createHomePath.util'
import { assertProjectAccess } from '~~/server/utils/assertProjectAccess.utils'

// Schéma pro validaci yup
const projectSchema = yup.object({
  project: yup.string().required('Project id is required')
})

export default defineEventHandler(async (event) => {
  
  // Načtení payloadu
  const { project, path } = getQuery(event)
  // const { } = readBody(event)
  const pathStr = path ? path.toString() : ""
  
  const userId = event.context.auth.user.id
  const projectId = project ? project.toString() : ""

   await assertProjectAccess(projectId!, userId, ['admin'])
  
  // Validace
  try {
    await projectSchema.validate({project}, { abortEarly: false })
  } catch (err) {
    const errorMessage = err instanceof yup.ValidationError ? err.errors.join(', ') : 'Validation failed'
    throw createError({
      statusCode: 400,
      statusMessage: errorMessage
    })
  }

// Get path
  try {
    const row = await Namespace.find({
      path: pathStr,
      project: new mongoose.Types.ObjectId(project as string),
    })

    if (row.length == 0 && pathStr == "") return createHomePath(projectId)
    else return row

  } catch {
    throw createError({
        statusCode: 400,
        statusMessage: 'Reading path failed'
      })
  }


  
  


})
