import mongoose from 'mongoose';

import { config } from './env';

export const connectDB = async (): Promise<typeof mongoose> => {
  mongoose.set('strictQuery', true);
  return mongoose.connect(config.mongoUri);
};
