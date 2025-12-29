import { createApp } from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';

/**
 * Start the server and connect to database.
 * Handles graceful shutdown on SIGTERM/SIGINT.
 */
const startServer = async (): Promise<void> => {
  try {
    // Connect to database first - fail fast if DB is down
    await connectDatabase();

    // Create Express app
    const app = createApp();

    // Start listening
    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
      console.log(`📝 Environment: ${env.NODE_ENV}`);
      console.log(`🔗 CORS enabled for: ${env.CORS_ORIGIN}`);
    });

    /**
     * Graceful shutdown handler.
     * This ensures we close database connections and finish pending requests
     * before the process exits. Important for avoiding data corruption!
     */
    const gracefulShutdown = async (signal: string): Promise<void> => {
      console.log(`\n${signal} received. Shutting down gracefully...`);

      // Stop accepting new requests
      server.close(async () => {
        console.log('✅ HTTP server closed');

        try {
          // Close database connections
          await disconnectDatabase();
          console.log('👋 Goodbye!');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds if graceful shutdown fails
      setTimeout(() => {
        console.error('⚠️  Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions - log and exit
    process.on('uncaughtException', (error) => {
      console.error('💥 Uncaught Exception:', error);
      gracefulShutdown('uncaughtException');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
      console.error('💥 Unhandled Rejection:', reason);
      gracefulShutdown('unhandledRejection');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

export { startServer };

