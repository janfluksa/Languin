
import Translation from "~~/server/models/Translation"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const t = await Translation.findById(id)
  if (!t) throw createError({ status: 404, message: "Not found" })

  // Verzování
  if (body.ast && JSON.stringify(body.ast) !== JSON.stringify(t.ast)) {
    t.history.push({
      version: t.version,
      ast: t.ast,
      updatedAt: new Date(),
      updatedBy: body.userId, // TODO: Vyhrabat správné id
      comment: body.comment || null
    })
    t.version++
  }

  // Workflow změny
  if (body.status && body.status !== t.status) {
    t.statusHistory.push({
      status: body.status,
      changedAt: new Date(),
      changedBy: body.userId,
      note: body.note
    })
    t.status = body.status
  }

  // Aktualizace polí
  if (body.ast) t.ast = body.ast

  await t.save()
  return t
})
