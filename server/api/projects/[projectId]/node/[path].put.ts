import * as yup from 'yup'
import NamespacePath from '~~/server/models/NamespacePath'
import { assertProjectAccess } from '~~/server/utils/assertProjectAccess.utils'
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
 
    // Create path
    try {

        const existingPath = await NamespacePath.findOne({'path': path}).populate("parent")

        if (!existingPath) {
          throw createError({
            statusCode: 400,
            statusMessage: "Path not found"
          })
        }

        interface NamespacePathParent {
          path?: string
        }

        const parent = existingPath.parent as NamespacePathParent | undefined

        existingPath.name = name
        existingPath.path = 
          parent?.path 
          ? `${parent.path}.${slugify(name)}`
          : `${slugify(name)}` 
        existingPath.updatedAt = new Date() 

        existingPath.save()

        return {
          success: true,
          path: existingPath,
        }

    } catch (e) {
      const error = e as Error & { code?: number };
        throw createError(error)
    }




  
  


})
