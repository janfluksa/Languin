
import Translation from "~~/server/models/Translation"

export default defineEventHandler(async (event) => {
   const id = getRouterParam(event, 'id')
  await Translation.findByIdAndDelete(id)
  return { ok: true }
})