import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import { config, validateConfig } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

const app = express();

validateConfig();

app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Akshar AI API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      console.log(`✓ Server running on http://localhost:${config.port}`);
      console.log(`✓ Frontend URL configured as: ${config.frontendUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
