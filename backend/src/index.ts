import express from 'express';
import dotenv from 'dotenv';

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});