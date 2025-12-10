
import Translation from "~~/server/models/Translation"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const t = await Translation.create(body)

  return t
})
