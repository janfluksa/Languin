// import { getQuery } from 'h3'
import mongoose from 'mongoose'
import * as yup from 'yup'
import Namespace from '~~/server/models/Namespace'
import { createHomePath } from '~~/server/utils/createHomePath.util'
import { assertProjectAccess } from '~~/server/utils/assertProjectAccess.utils'

// Schéma pro validaci yup
const projectSchema = yup.object({
  projectId: yup.string().required('Project id is required')
})
  

export default defineEventHandler(async (event) => {

  const userId = event.context.auth.user.id
  const project = event.context.params?.projectId
  const path = event.context.params?.path
  
  const pathStr = path ? path.toString() : ""
  const projectId = project ? project.toString() : ""

  // Uživatel musí být admin
  await assertProjectAccess(projectId!, userId, ['admin'])
  
  // Validace
  try {
    await projectSchema.validate({projectId}, { abortEarly: false })
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
      project: new mongoose.Types.ObjectId(projectId as string),
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
