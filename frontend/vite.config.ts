import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Path alias for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Dev server configuration
  server: {
    host: '0.0.0.0', // Listen on all interfaces for Docker
    port: 3000,
    strictPort: true,
  },

  // Preview server configuration
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});

