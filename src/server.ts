import app from './app';
import dotenv from 'dotenv';
dotenv.config();
import { setupSwagger } from './config/swagger';

// Determine the environment and load the correct .env file
const envFile = process.env['NODE_ENV'] === 'production' ? 'prod.env' : 'dev.env';
dotenv.config({ path: envFile });

const PORT = process.env['PORT'] || 5000;

setupSwagger(app);

console.log('process.env.DIRECT_URL: ', process.env['DIRECT_URL']);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});