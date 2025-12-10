import Translation from "~~/server/models/Translation"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filter: Record<string, unknown> = {}

  if (query.project) filter.project = query.project
  if (query.locale) filter.locale = query.locale
  if (query.namespace) filter.namespace = query.namespace
  if (query.search) filter.fullKey = { $regex: query.search, $options: 'i' }

  const items = await Translation.find(filter).sort({ fullKey: 1 })

  return items
})