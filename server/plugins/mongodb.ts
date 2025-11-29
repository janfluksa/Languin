import mongoose from 'mongoose'

export default async () => {
  const config = useRuntimeConfig()
  const uri = config.mongodbConnectionString

  if (!uri) {
    console.error('Missing mongodbConnectionString in runtimeConfig')
    return
  }

  if (process.env.NODE_ENV === 'test') {
    return
  }

  if (mongoose.connection.readyState === 1) {
    // už připojeno
    return
  }

  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB connection error', err)
  }
}