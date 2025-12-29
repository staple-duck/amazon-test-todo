import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  name: string;
  className?: string;
}

/**
 * Category badge component.
 * Small, colorful badge to display category names.
 */
export function CategoryBadge({ name, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary',
        className
      )}
    >
      {name}
    </span>
  );
}

