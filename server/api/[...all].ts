export default defineEventHandler((event) => {
  throw createError({
    statusCode: 404,
    statusMessage: `API route ${event.path} not found`
  })
})