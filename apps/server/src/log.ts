import pino from 'pino';

/** Structured (JSON) logger. Level via LOG_LEVEL (default info). */
export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
});

export type Logger = typeof logger;
