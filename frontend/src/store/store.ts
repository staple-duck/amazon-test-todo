import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import uiReducer from './slices/uiSlice';

/**
 * Redux store configuration.
 * 
 * Includes:
 * - RTK Query API slice for data fetching
 * - UI slice for client-side UI state
 * 
 * RTK Query middleware handles:
 * - Caching
 * - Refetching
 * - Polling
 * - Request deduplication
 */
export const store = configureStore({
  reducer: {
    // RTK Query API reducer
    [baseApi.reducerPath]: baseApi.reducer,
    
    // UI state reducer
    ui: uiReducer,
  },

  // Add RTK Query middleware for cache management
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),

  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

/**
 * Type exports for use throughout the app.
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

