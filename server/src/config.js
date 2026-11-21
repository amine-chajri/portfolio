import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(serverRoot, '.env') });

const port = Number.parseInt(process.env.PORT || '5000', 10);
const corsOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const storePath = process.env.CONTACT_STORE_PATH
  ? path.resolve(serverRoot, process.env.CONTACT_STORE_PATH)
  : path.join(serverRoot, 'data', 'messages.json');

export const config = {
  port: Number.isNaN(port) ? 5000 : port,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: [...new Set([...corsOrigins, `http://localhost:${port}`, `http://127.0.0.1:${port}`])],
  mongoUri: process.env.MONGODB_URI?.trim() || '',
  contactStorePath: storePath,
  clientDistPath: path.resolve(serverRoot, '..', 'client', 'dist'),
};
