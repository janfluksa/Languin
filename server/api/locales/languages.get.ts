
import Cfg_Lng_Language from "~~/server/models/Cfg_Lng_Language"

export default defineEventHandler(async () => {

  const items = await Cfg_Lng_Language.find().sort({ code: 1 })

  return items
})