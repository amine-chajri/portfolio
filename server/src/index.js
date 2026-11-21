import { config } from './config.js';
import { createApp } from './app.js';
import { connectDatabase, disconnectDatabase } from './lib/database.js';

await connectDatabase();

const app = createApp();

const server = app.listen(config.port, () => {
  console.info(`[api] Server running at http://localhost:${config.port} (${config.nodeEnv})`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`[api] Port ${config.port} is already in use. Set a different PORT in server/.env.`);
  } else {
    console.error('[api] Server error:', error);
  }
  process.exit(1);
});

async function shutdown(signal) {
  console.info(`[api] ${signal} received — shutting down.`);

  const forceExit = setTimeout(() => {
    console.error('[api] Forced shutdown after timeout.');
    process.exit(1);
  }, 8000);
  forceExit.unref();

  server.close(async () => {
    await disconnectDatabase();
    clearTimeout(forceExit);
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
