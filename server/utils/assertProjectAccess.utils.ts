import Project from '../models/Project'
import mongoose from 'mongoose'

/**
 * Verifies that a user has access to a project based on their role.
 * @param projectId - The ID of the project to check access for
 * @param userId - The ID of the user requesting access
 * @param roles - Optional array of roles to check. If empty, checks all roles (admin, copywriter, developer)
 * @returns The project document if access is granted
 * @throws {Error} Throws a 403 Forbidden error if the user does not have access to the project
 */
export const assertProjectAccess = async (
  projectId: string | undefined,
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