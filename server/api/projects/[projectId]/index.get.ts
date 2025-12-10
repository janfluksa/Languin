import Project from "~~/server/models/Project"
// TODO: Zkontrolovat, že tento endpoint funguje, protože jsem ho zkopírovat z projects. Měl by to být detail projektu

export default defineEventHandler(async (event) => {

  const projectId = event.context.params?.projectId

  try {
    // const userId = event.context.auth.user.id
    const p = await Project.findById(projectId)
      //.populate('admins')
      //.populate('copywriters')
      //.populate('developers')

    return p
      

  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Reading project failed'
    })
  }
})
