import mongoose from 'mongoose'


const HistorySchema = new mongoose.Schema({
  version: Number,
  ast: mongoose.Schema.Types.Mixed,
  type: String,
  updatedAt: Date,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: String
}, { _id: false })

const StatusHistorySchema = new mongoose.Schema({
  status: String,
  changedAt: Date,
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  note: String
}, { _id: false })



const TranslationSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
    index: true
  },

  locale: {
    type: String,
    required: true,
    index: true
  },

  namespace: {
    type: String,
    required: true,
    index: true
  },

  key: {
    type: String,
    required: true,
    index: true
  },

  fullKey: {
    type: String,
    required: true,
    index: true
  },

  ast: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  // versioning
  version: { type: Number, default: 1 },

  history: {
    type: [HistorySchema],
    default: []
  },

  status: {
    type: String,
    enum: ['draft', 'ready', 'reviewing', 'approved', 'deprecated'],
    default: 'draft'
  },

  statusHistory: {
    type: [StatusHistorySchema],
    default: []
  }


}, { timestamps: true })

// Jedinečný index: jeden ICU string per project+locale+key
TranslationSchema.index({ project: 1, locale: 1, fullKey: 1 }, { unique: true })

export default mongoose.model("Translation", TranslationSchema)