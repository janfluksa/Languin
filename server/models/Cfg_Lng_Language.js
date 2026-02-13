import mongoose from 'mongoose'

const LanguageSchema = new mongoose.Schema(
  {

    code: {
      type: String,
      required: true, 
      unique: true,
      index: true,
    },

    pluralizationForms: {
      type: [String],
      enum: ['zero', 'one', 'two', 'few', 'many', 'other'],
      required: true,
    },

    direction: {
      type: String,
      enum: ['ltr','rtl'],
      required: true,
    },

		
  }
)

export default mongoose.model('cfg_lng_languages', LanguageSchema)