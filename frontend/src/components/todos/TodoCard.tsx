import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { useToggleTodoMutation, useDeleteTodoMutation } from '@/store/api/todosApi';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CategoryBadge } from '@/components/categories/CategoryBadge';
import { DeleteTodoDialog } from './DeleteTodoDialog';
import { handleApiError, showSuccess } from '@/lib/api-helpers';
import { cn } from '@/lib/utils';
import type { Todo } from '@/types/api.types';

interface TodoCardProps {
  todo: Todo;
  onEdit: () => void;
}

/**
 * Todo card component.
 * Displays a single todo with all its info and actions.
 * Handles completion toggle and delete.
 */
export function TodoCard({ todo, onEdit }: TodoCardProps) {
  const [toggleTodo] = useToggleTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id).unwrap();
      showSuccess(todo.completed ? 'Todo marked as active' : 'Todo completed!');
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id).unwrap();
      showSuccess('Todo deleted successfully');
      setDeleteDialogOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  // Check if todo is overdue
  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <>
      <div
        className={cn(
          'group relative rounded-lg border p-4 transition-all hover:shadow-md',
          todo.completed && 'bg-muted/50',
          isOverdue && 'border-destructive'
        )}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            className="mt-1"
          />

          {/* Content */}
          <div className="flex-1 space-y-2">
            {/* Title */}
            <h4
              className={cn(
                'font-medium leading-tight',
                todo.completed && 'line-through text-muted-foreground'
              )}
            >
              {todo.title}
            </h4>

            {/* Description */}
            {todo.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {todo.description}
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Category badge */}
              {todo.categoryName && (
                <CategoryBadge name={todo.categoryName} />
              )}

              {/* Due date */}
              {todo.dueDate && (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 text-muted-foreground',
                    isOverdue && 'text-destructive font-medium'
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {format(new Date(todo.dueDate), 'MMM d, yyyy')}
                  {isOverdue && ' (overdue)'}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit todo</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="sr-only">Delete todo</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      <DeleteTodoDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        todo={todo}
        onConfirm={handleDelete}
      />
    </>
  );
}

