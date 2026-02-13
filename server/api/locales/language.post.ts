import { readBody } from 'h3'
import Cfg_Lng_Language from '~~/server/models/Cfg_Lng_Language'

export default defineEventHandler(async (event) => {

  // Načtení payloadu
  const { code, pluralizationForms, direction } = await readBody(event) || {}

  // Vytvoření nového objektu Projekt 
  const language = new Cfg_Lng_Language({
    code, 
    pluralizationForms, 
    direction
  })

  try {
    console.log(language)
    await language.save()
    return {
      success: true,
      language,
    }
  } 
  catch {
     throw createError({
      statusCode: 400,
      statusMessage: 'Creating language failed'
    })
  }
  
  


})
