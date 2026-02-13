import { readBody } from 'h3'
import Locale from '~~/server/models/Locale'

export default defineEventHandler(async (event) => {

  // Načtení payloadu
  const { code, direction, nativeName, nativeCountry, localizedNames, pluralization, flag } = await readBody(event) || {}
  
  


  // Vytvoření nového objektu Projekt 
  const locale = new Locale({
    code: code, 
    direction: direction, 
    nativeName, 
    nativeCountry, 
    flag: flag.icon,
    localizedNames: localizedNames, 
    pluralization: { type: 'cldr', forms: pluralization }
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
