import { Pool, PoolConfig } from 'pg';
import { env } from './env';

/**
 * PostgreSQL connection pool configuration.
 * Using a pool is way more efficient than creating a new connection
 * for every request - it reuses existing connections.
 */
const poolConfig: PoolConfig = {
  connectionString: env.DATABASE_URL,
  
  // Connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if connection takes longer than 2 seconds
};

// Create the pool instance
export const pool = new Pool(poolConfig);

/**
 * Test database connection on startup.
 * This helps catch database issues early instead of failing on the first query.
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    
    // Just a quick check that we can actually query
    await client.query('SELECT NOW()');
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

/**
 * Gracefully close database connections.
 * Call this when shutting down the server to avoid hanging connections.
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await pool.end();
    console.log('✅ Database disconnected gracefully');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
    throw error;
  }
};

// Handle pool errors - don't let the app crash silently
pool.on('error', (err) => {
  console.error('❌ Unexpected database pool error:', err);
  process.exit(-1);
});

