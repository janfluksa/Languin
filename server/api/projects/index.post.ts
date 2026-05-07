import { readBody } from 'h3'
import * as yup from 'yup'
import Cfg_Lng_Locale from '~~/server/models/Cfg_Lng_Locale'
import Project from '~~/server/models/Project'

// Schéma pro validaci yup
const projectSchema = yup.object({
  projectName: yup.string().required('Project name is required'),
  defaultLng: yup.string().required('Locale is required'),
  otherLngs: yup.array().of(yup.string()).min(1, 'Select at least one additional language'),
})

export default defineEventHandler(async (event) => {

  // Načtení payloadu
  const { projectName, description, defaultLng, otherLngs } = await readBody(event) || {}

  
  // Validace
  try {
    await projectSchema.validate({ projectName, description, defaultLng, otherLngs }, { abortEarly: false })
  } catch (err) {
    const errorMessage = err instanceof yup.ValidationError ? err.errors.join(', ') : 'Validation failed'
    throw createError({
      statusCode: 400,
      statusMessage: errorMessage
    })
  }

  const defaultLocale = await Cfg_Lng_Locale.findOne({ code: defaultLng }).populate('language')
  const otherLocales = await Cfg_Lng_Locale.find({ code: { $in: otherLngs || [] } }).populate('language')

  if (!defaultLocale) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Selected default language does not exist'
    })
  }

  // Vytvoření nového objektu Projekt 
  const project = new Project({
    name: projectName,
    description,
    defaultTrLng: defaultLocale,
    otherTrLngs: otherLocales,
    admins: [event.context.auth.user.id],
    created: new Date()
  })

  try {
    await project.save()
    return {
      success: true,
      locale: defaultLocale,
      project,
    }
  } 
  catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Creating project failed'
     throw createError({
      statusCode: 400,
      statusMessage: errorMessage
    })
  }
  
  


})
