import Translation from "~~/server/models/Translation"

export default defineEventHandler( async (event) => {
  // const id = getRouterParam(event, 'id')
  const id = event.context.params?.id
  
  console.log("==========")
  console.log("Id: "+id)
  console.log("==========")

  const translation = await Translation.findById(id)

  console.log(translation)

  return translation
})