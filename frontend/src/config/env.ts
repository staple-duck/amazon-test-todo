/**
 * Environment configuration.
 * Centralizes all environment variables with type safety.
 */

/**
 * Get environment variable with validation.
 * Throws error if required variable is missing.
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key] ?? defaultValue;
  
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
}

/**
 * Application configuration from environment variables.
 * All env vars are validated on app startup.
 */
export const env = {
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:5000/api'),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

