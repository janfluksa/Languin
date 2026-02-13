import mongoose from 'mongoose'

const PluralizationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['cldr'],
      default: 'cldr',
      required: true,
    },

    // Povolené plural forms pro daný jazyk
    forms: {
      type: [String],
      enum: ['zero', 'one', 'two', 'few', 'many', 'other'],
      required: true,
    },
  },
  { _id: false }
)


const LocaleSchema = new mongoose.Schema(
  {
    // BCP-47, např. "cs", "en-US", "de"
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    direction: {
      type: String,
      enum: ['ltr', 'rtl'],
      default: 'ltr',
      required: true,
    },

    nativeName: {
      type: String,
      required: true, // "Deutsch", "Čeština"
    },

    nativeCountry: {
      type: String,
      required: false, // "Deutschland", "Česká repubika"
    },

    // Lokalizované názvy jazyka
    // klíč = language code, hodnota = název
    localizedNames: {
      type: Map,
      of: String,
      default: {},
    },

    pluralization: {
      type: PluralizationSchema,
      required: true,
    },
		
  }
)

export default mongoose.model('Locale', LocaleSchema)