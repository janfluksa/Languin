import mongoose from 'mongoose'


const SettingsLocaleSchema = new mongoose.Schema(
  {
    // BCP-47, např. "cs", "en-US", "de"

    language: {
      type: String,
      required: true, // "Deutsch", "Čeština"
    },

    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
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

export default mongoose.model('cfg_lng_locale', SettingsLocaleSchema)