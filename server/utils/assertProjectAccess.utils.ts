import Project from '../models/Project'
import mongoose from 'mongoose'

export const assertProjectAccess = async (
  projectId: string,
  userId: string,
  roles: Array<'admin' | 'copywriter' | 'developer'> = []
) => {
  const userObjectId = new mongoose.Types.ObjectId(userId)

  const roleFilters = roles.length
    ? roles.map(role => ({ [`${role}s`]: userObjectId }))
    : [
        { admins: userObjectId },
        { copywriters: userObjectId },
        { developers: userObjectId }
      ]

  const project = await Project.findOne({
    _id: projectId,
    $or: roleFilters
  }).lean()

  if (!project) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access to project denied'
    })
  }

  return project
}