import mongoose from 'mongoose'


const LocaleSchema = new mongoose.Schema(
  {
    // BCP-47, např. "cs", "en-US", "de"

    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cfg_lng_languages",
    },

    code: {
      type: String,
      required: true, // "Deutsch", "Čeština"
    },

    name: {
      type: String,
      required: true, // "Deutsch", "Čeština"
    },

    icon: {
      type: String,
      required: true, // "Deutsch", "Čeština"
    }
		
  }
)

export default mongoose.model('cfg_lng_locale', LocaleSchema)