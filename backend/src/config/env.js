import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/akshar-ai',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  geminiApiKey: process.env.GEMINI_API_KEY,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

export const validateConfig = () => {
  if (!config.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  if (!config.mongodbUri) {
    throw new Error('MONGODB_URI is not set in environment variables');
  }
};
