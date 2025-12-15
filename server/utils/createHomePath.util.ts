// server/utils/createHomePath.ts
import mongoose from 'mongoose'
import Namespace from '../models/Namespace'

export const createHomePath = async (projectId: string) => {
  const ns = await Namespace.create({
    project: new mongoose.Types.ObjectId(projectId),
    name: 'Home',
    path: ''
  })

  return ns.toObject()
}