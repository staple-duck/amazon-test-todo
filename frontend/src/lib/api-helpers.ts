import { toast } from 'sonner';
import type { ApiError } from '@/types/api.types';

/**
 * Helper to handle API errors consistently.
 * Shows a toast notification with the error message.
 */
export function handleApiError(error: unknown): void {
  if (error && typeof error === 'object' && 'data' in error) {
    const apiError = error.data as ApiError;
    
    // Show validation errors if present
    if (apiError.errors && apiError.errors.length > 0) {
      apiError.errors.forEach((err) => {
        toast.error(`${err.field}: ${err.message}`);
      });
    } else {
      toast.error(apiError.message || 'An error occurred');
    }
  } else {
    toast.error('An unexpected error occurred');
  }
}

/**
 * Helper to show success toast.
 */
export function showSuccess(message: string): void {
  toast.success(message);
}

/**
 * Helper to format date for API (ISO 8601).
 */
export function formatDateForApi(date: Date): string {
  return date.toISOString();
}

/**
 * Helper to parse date from API.
 */
export function parseDateFromApi(dateString: string): Date {
  return new Date(dateString);
}

