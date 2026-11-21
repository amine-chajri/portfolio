import { existsSync } from 'node:fs';
import path from 'node:path';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config.js';
import { storageMode } from './lib/database.js';
import contactRouter from './routes/contact.js';
import { apiLimiter } from './middleware/rateLimiters.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', config.nodeEnv === 'production' ? 1 : false);

  app.use(
    helmet({
      hsts: config.nodeEnv === 'production' ? undefined : false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          connectSrc: ["'self'"],
          upgradeInsecureRequests: null,
        },
      },
    })
  );

  const allowedOrigins = new Set(config.corsOrigins);

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) return callback(null, true);
        return callback(null, false);
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
    })
  );

  app.use(express.json({ limit: '16kb' }));

  app.use('/api', apiLimiter);

  app.get('/api', (req, res) => {
    res.json({
      ok: true,
      name: 'Amine Chajri Portfolio API',
      endpoints: {
        health: 'GET /api/health',
        contact: 'POST /api/contact',
      },
    });
  });

  app.get('/api/health', (req, res) => {
    res.json({
      ok: true,
      service: 'portfolio-api',
      environment: config.nodeEnv,
      storage: storageMode(),
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  app.use('/api/contact', contactRouter);
  app.use('/api', notFoundHandler);

  if (existsSync(config.clientDistPath)) {
    app.use(
      express.static(config.clientDistPath, {
        index: false,
        maxAge: '1y',
        immutable: true,
      })
    );

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.set('Cache-Control', 'no-cache');
      return res.sendFile(path.join(config.clientDistPath, 'index.html'));
    });
  }

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
