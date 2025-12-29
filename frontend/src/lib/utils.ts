import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes.
 * Handles conflicts intelligently (e.g., "px-2 px-4" becomes just "px-4").
 * 
 * Use this whenever you need to combine className strings,
 * especially when accepting className as a prop.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

