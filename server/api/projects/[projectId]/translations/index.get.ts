import Translation from "~~/server/models/Translation"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filter: Record<string, unknown> = {}

  const projectId = event.context.params?.projectId

  if (projectId) filter.project = projectId
  if (query.locale) filter.locale = query.locale
  if (query.namespace) filter.namespace = query.namespace
  if (query.search) filter.fullKey = { $regex: query.search, $options: 'i' }

  const items = await Translation.find(filter).sort({ fullKey: 1 })

  return items
})