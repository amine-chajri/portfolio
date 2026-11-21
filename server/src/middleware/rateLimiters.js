import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: 'Too many requests. Please try again in a few minutes.',
  },
});

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: 'Too many messages sent. Please wait 15 minutes and try again.',
  },
});
