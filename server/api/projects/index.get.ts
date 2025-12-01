import Project from "~~/server/models/Project"

export default defineEventHandler(async (event) => {

  try {
    const userId = event.context.auth.user.id
    const projects = await Project.find({
        $or: [
          { admins: userId },
          { copywriters: userId },
          { developers: userId }
        ]
      })
      //.populate('admins')
      //.populate('copywriters')
      //.populate('developers')

      console.log(projects)
      
      return { 
        projects
      }

  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Reading projects failed'
    })
  }
})
