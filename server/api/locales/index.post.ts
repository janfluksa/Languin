import { readBody } from 'h3'
import SettingsLocale from '~~/server/models/Cfg_Lng_Locale'

export default defineEventHandler(async (event) => {

  // Načtení payloadu
  const { language, code, name, icon } = await readBody(event) || {}

  // Vytvoření nového objektu Projekt 
  const locale = new SettingsLocale({
    language, 
    code, 
    name, 
    icon
  })

  try {
    await locale.save()
    return {
      success: true,
      locale,
    }
  } 
  catch {
     throw createError({
      statusCode: 400,
      statusMessage: 'Creating locale failed'
    })
  }
  
  


})
