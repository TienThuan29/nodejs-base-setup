import mongoose from "mongoose";
import { config } from "./config";

export const connectDatabase = async () => {
    try {
        const mongoConnection = await mongoose.connect(config.MONGODB_URI);
        console.log(`MongoDB Connected: ${mongoConnection.connection.host}`);
    } 
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}


// Event listeners for connection status
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});
