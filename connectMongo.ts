import mongoose from "mongoose"
/**
 * Connects to MongoDB if the connection state is not already established.
 */
export const connectMongo = async () => {
  // Check if the MongoDB connection is not already established
  if (mongoose.connection.readyState !== 1) {
    const connString = process.env.MONGO_URI
    // Check if the MongoDB URI is available
    if (!connString) {
      console.log("No URI")
      return
    }
    // Connect to MongoDB using the provided URI
    await mongoose.connect(connString)
  } else {
    // MongoDB connection is already established
  }
}
