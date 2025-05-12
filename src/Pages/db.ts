import mongoose from 'mongoose'

const MONGO_URI = 'mongodb+srv://jacobth:<db_password>@finalproject275.glve1jj.mongodb.net/';

export const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };
  