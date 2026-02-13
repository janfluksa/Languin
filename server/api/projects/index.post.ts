import { readBody } from 'h3'
import * as yup from 'yup'
import Project from '~~/server/models/Project'

// Schéma pro validaci yup
const projectSchema = yup.object({
  name: yup.string().required('Project name is required'),
  description: yup.string().required('Description is required'),
  locale: yup.string().required('Locale is required'),
})

export default defineEventHandler(async (event) => {

  // Načtení payloadu
  const { name, description, locale } = await readBody(event) || {}

  console.log(name)
  console.log(description)
  console.log(locale)
  
  // Validace
  try {
    await projectSchema.validate({name, description, locale}, { abortEarly: false })
  } catch (err) {
    const errorMessage = err instanceof yup.ValidationError ? err.errors.join(', ') : 'Validation failed'
    throw createError({
      statusCode: 400,
      statusMessage: errorMessage
    })
  }

  // Vytvoření nového objektu Projekt 
  const project = await Project.create({
    name,
    description,
    defaultLocale: locale,
    admins: [event.context.auth.user.id],
    createdAt: new Date()   // přidáš aktuálního uživatele jako admina
  })

  try {
    await project.save()
    return {
      success: true,
      project,
    }
  } 
  catch {
     throw createError({
      statusCode: 400,
      statusMessage: 'Creating project failed'
    })
  }
  
  


})
