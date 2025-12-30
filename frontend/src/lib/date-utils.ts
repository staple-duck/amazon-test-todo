import { format, formatDistanceToNow, isToday, isTomorrow, isPast } from 'date-fns';

/**
 * Format date for display.
 * Shows relative time for recent dates, absolute for older ones.
 * Includes time in the display.
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const timeStr = format(dateObj, 'p'); // Format time as "3:30 PM"
  
  if (isToday(dateObj)) {
    return `Today at ${timeStr}`;
  }
  
  if (isTomorrow(dateObj)) {
    return `Tomorrow at ${timeStr}`;
  }
  
  // Show relative time for dates within 7 days
  const daysDiff = Math.abs(dateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysDiff < 7) {
    return `${formatDistanceToNow(dateObj, { addSuffix: true })} at ${timeStr}`;
  }
  
  return format(dateObj, 'MMM d, yyyy p'); // "Dec 29, 2025 3:30 PM"
}

/**
 * Check if a date is overdue.
 */
export function isOverdue(date: Date | string | null, completed: boolean): boolean {
  if (!date || completed) return false;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return isPast(dateObj) && !isToday(dateObj);
}

/**
 * Get badge color for due date.
 */
export function getDueDateColor(date: Date | string | null, completed: boolean): string {
  if (!date || completed) return 'text-muted-foreground';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isOverdue(date, completed)) {
    return 'text-destructive';
  }
  
  if (isToday(dateObj)) {
    return 'text-orange-500';
  }
  
  if (isTomorrow(dateObj)) {
    return 'text-yellow-500';
  }
  
  return 'text-muted-foreground';
}

