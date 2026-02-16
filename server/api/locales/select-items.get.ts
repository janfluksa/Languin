
import Cfg_Lng_Locale from "~~/server/models/Cfg_Lng_Locale"

export default defineEventHandler(async () => {

  const items = await Cfg_Lng_Locale.find().sort({ code: 1 })

  return items.map(i => ({
    ...i.toObject(),
    value: i.language,
    label: i.name,
    language: undefined
  }))

  return items
})