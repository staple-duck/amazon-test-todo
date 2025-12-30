import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, AlertCircle, Clock, X } from 'lucide-react';
import { format } from 'date-fns';
import { useCreateTodoMutation, useUpdateTodoMutation } from '@/store/api/todosApi';
import { useGetCategoriesQuery } from '@/store/api/categoriesApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { handleApiError, showSuccess, formatDateForApi } from '@/lib/api-helpers';
import { cn } from '@/lib/utils';
import type { Todo } from '@/types/api.types';

interface TodoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo?: Todo; // If provided, we're editing
}

/**
 * Todo form dialog.
 * Handles both creating and editing todos.
 * Includes title, description, category, and due date.
 */
export function TodoFormDialog({ open, onOpenChange, todo }: TodoFormDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [dueTime, setDueTime] = useState<string>('09:00');

  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();

  const isEditing = !!todo;
  const isLoading = isCreating || isUpdating;
  const hasCategories = categories && categories.length > 0;

  // Helper function to combine date and time
  const combineDateAndTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined;
  };

  // Helper function to get smart default time
  const getDefaultTime = (selectedDate: Date): string => {
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(selectedDate);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate.getTime() === today.getTime()) {
      // If today, set to current time + 1 hour (rounded to nearest hour)
      const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
      const hours = nextHour.getHours().toString().padStart(2, '0');
      return `${hours}:00`;
    } else {
      // If future date, default to 9 AM
      return '09:00';
    }
  };

  // Validate date+time is not in past
  const isDueDateTimeValid = (): boolean => {
    if (!dueDate) return true;
    const combined = combineDateAndTime(dueDate, dueTime);
    const now = new Date();
    return combined >= now;
  };

  const canSubmit = hasCategories && !isLoading && isDueDateTimeValid();

  // Populate form when editing
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setCategoryId(todo.categoryId);
      if (todo.dueDate) {
        const date = new Date(todo.dueDate);
        setDueDate(date);
        // Extract time from existing date
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        setDueTime(`${hours}:${minutes}`);
      } else {
        setDueDate(undefined);
        setDueTime('09:00');
      }
    } else {
      // Reset form
      setTitle('');
      setDescription('');
      setCategoryId(categories?.[0]?.id || '');
      setDueDate(undefined);
      setDueTime('09:00');
    }
  }, [todo, categories, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      handleApiError({ data: { message: 'Title is required' } });
      return;
    }

    if (!categoryId) {
      handleApiError({ data: { message: 'Please select a category' } });
      return;
    }

    try {
      const todoData = {
        title: trimmedTitle,
        description: description.trim() || null,
        categoryId,
        dueDate: dueDate ? formatDateForApi(combineDateAndTime(dueDate, dueTime)) : null,
      };

      if (isEditing) {
        await updateTodo({
          id: todo.id,
          data: todoData,
        }).unwrap();
        showSuccess('Todo updated successfully');
      } else {
        await createTodo(todoData).unwrap();
        showSuccess('Todo created successfully');
      }

      onOpenChange(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Todo' : 'Create Todo'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Update your todo details. Press save when done.'
                : 'Add a new todo to your list.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Warning when no categories exist */}
            {!isLoadingCategories && !hasCategories && (
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/20">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  No categories available. Please create a category first before adding todos.
                </p>
              </div>
            )}
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Buy groceries"
                maxLength={200}
                autoFocus
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details about this todo..."
                maxLength={2000}
                rows={3}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Due Date & Time */}
            <div className="space-y-2">
              <Label>Due Date & Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dueDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(combineDateAndTime(dueDate, dueTime), 'PPP p') : 'Pick a date and time'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                      if (date) {
                        setDueTime(getDefaultTime(date));
                      }
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const checkDate = new Date(date);
                      checkDate.setHours(0, 0, 0, 0);
                      return checkDate < today;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Time picker - show only if date selected */}
              {dueDate && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDueDate(undefined);
                        setDueTime('09:00');
                      }}
                      title="Clear due date"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {!isDueDateTimeValid() && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Due date and time cannot be in the past
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

