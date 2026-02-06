import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development';

dotenv.config({ path: envFile });

const app = express();
const PORT = Number(process.env.PORT) || 8000;

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

startServer();


