import mongoose from 'mongoose'

const PathSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
    index: true
  },

  name: {
    type: String,
    required: true,
    index: true
  },

  path: {
    type: String,
    required: false,
    index: true
  },


}, { timestamps: true })

PathSchema.index({ project: 1, path: 1 }, { unique: true })

export default mongoose.model("Path", PathSchema)