import { readBody } from 'h3'
import * as yup from 'yup'
import Cfg_Lng_Locale from '~~/server/models/Cfg_Lng_Locale'
import Project from '~~/server/models/Project'

// Schéma pro validaci yup
const projectSchema = yup.object({
  name: yup.string().required('Project name is required'),
  defaultLocaleCode: yup.string().required('Locale is required'),
})

export default defineEventHandler(async (event) => {

  // Načtení payloadu
  const { name, description, defaultLocaleCode, otherLocalesCodes } = await readBody(event) || {}

  
  // Validace
  try {
    await projectSchema.validate({name, description, defaultLocaleCode}, { abortEarly: false })
  } catch (err) {
    const errorMessage = err instanceof yup.ValidationError ? err.errors.join(', ') : 'Validation failed'
    throw createError({
      statusCode: 400,
      statusMessage: errorMessage
    })
  }

  console.log(defaultLocaleCode)
const defaultLocale = await Cfg_Lng_Locale.findOne({"code":"en"})
  .populate('language')

console.log(defaultLocale);

  // Vytvoření nového objektu Projekt 
  const project = new Project({
    name,
    description,
    defaultLocale: defaultLocale,
    otherLocalesCodes: otherLocalesCodes, 
    admins: [event.context.auth.user.id],
    createdAt: new Date()   // přidáš aktuálního uživatele jako admina
  })

  try {
    // await project.save()
    return {
      success: true,
      locale: defaultLocale,
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
