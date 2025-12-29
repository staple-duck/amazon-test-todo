import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Schema for validating environment variables.
 * This catches configuration errors early, before the app starts.
 * Much better than getting random crashes in production!
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).pipe(z.number().positive()).default('5000'),
  DATABASE_URL: z.string().url(),
  CORS_ORIGIN: z.string().url().default('http://localhost:3000'),
});

/**
 * Parse and validate environment variables.
 * If something's wrong, this will throw a descriptive error right away.
 */
const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.format());
    process.exit(1);
  }

  return result.data;
};

export const env = parseEnv();

// Type-safe environment config - no more typos in env var names!
export type Env = z.infer<typeof envSchema>;

