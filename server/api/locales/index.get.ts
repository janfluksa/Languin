
import Locale from "~~/server/models/Locale"

export default defineEventHandler(async () => {

  const items = await Locale.find().sort({ code: 1 })

  return items
})