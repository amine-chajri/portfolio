import { Router } from 'express';
import { z } from 'zod';
import { Contact } from '../models/Contact.js';
import { saveMessageLocally } from '../lib/messageStore.js';
import { storageMode } from '../lib/database.js';
import { contactLimiter } from '../middleware/rateLimiters.js';

const router = Router();

const projectTypes = [
  'Website',
  'Web application',
  'E-commerce',
  'API / Backend',
  'Something else',
];

const budgets = ['< $2k', '$2k - $5k', '$5k - $10k', '$10k+', "Let's discuss"];

const contactSchema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Name is too long.'),
    email: z.string().trim().email('Please enter a valid email address.').max(254),
    company: z.string().trim().max(120, 'Company name is too long.').optional().default(''),
    projectType: z.enum(projectTypes).optional().default('Something else'),
    budget: z.enum(budgets).optional().default("Let's discuss"),
    message: z
      .string()
      .trim()
      .min(20, 'Please add a little more detail (at least 20 characters).')
      .max(2000, 'Message must be 2,000 characters or fewer.'),
  })
  .strict();

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const rawBody =
      req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : {};
    const { website, ...candidate } = rawBody;

    if (typeof website === 'string' && website.trim().length > 0) {
      return res.status(202).json({
        ok: true,
        message: 'Message received. Thanks for reaching out.',
      });
    }

    const result = contactSchema.safeParse(candidate);

    if (!result.success) {
      const fieldErrors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([field, errors]) => [
          field,
          errors?.[0] || 'Invalid value.',
        ])
      );

      return res.status(400).json({
        ok: false,
        message: 'Please review the highlighted fields.',
        errors: fieldErrors,
      });
    }

    const userAgent = String(req.get('user-agent') || '').slice(0, 300);
    const payload = {
      ...result.data,
      email: result.data.email.toLowerCase(),
      meta: {
        userAgent,
        source: 'portfolio',
      },
    };

    if (storageMode() === 'mongodb') {
      await Contact.create(payload);
    } else {
      await saveMessageLocally(payload);
    }

    return res.status(201).json({
      ok: true,
      message: 'Thanks for reaching out. I will get back to you within two business days.',
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
