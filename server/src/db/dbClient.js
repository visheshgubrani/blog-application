import mongoose from 'mongoose'
const dbClient = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/blog`)
  } catch (error) {
    console.log('MongoDb Connection error: ', error)
    process.exit(1)
  }
}

export default dbClient
