// server/utils/createHomePath.ts
import mongoose from 'mongoose'
import Namespace from '../models/NamespacePath'

export const createHomePath = async (projectId: string | undefined) => {
  const ns = await Namespace.create({
    project: new mongoose.Types.ObjectId(projectId),
    name: 'Home',
    path: ''
  })

  return ns.toObject()
}