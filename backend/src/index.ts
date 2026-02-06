import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import connectDB from './config/database';
import authRoutes from './routes/auth';
import cors from 'cors';
import { createSessionConfig } from './config/session';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development';

dotenv.config({ path: envFile });

const app = express();
const PORT = Number(process.env.PORT) || 8000;

// Security headers with Helmet
// Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(createSessionConfig());


app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'ND Challenge API is running' });
});



// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Auth routes
app.use('/api/auth', authRoutes);

// Error handler middleware (must be last)
app.use(errorHandler);

startServer();


