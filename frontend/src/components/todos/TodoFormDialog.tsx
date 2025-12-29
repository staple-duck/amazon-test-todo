import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
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

  const { data: categories } = useGetCategoriesQuery();
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();

  const isEditing = !!todo;
  const isLoading = isCreating || isUpdating;

  // Populate form when editing
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setCategoryId(todo.categoryId);
      setDueDate(todo.dueDate ? new Date(todo.dueDate) : undefined);
    } else {
      // Reset form
      setTitle('');
      setDescription('');
      setCategoryId(categories?.[0]?.id || '');
      setDueDate(undefined);
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
        dueDate: dueDate ? formatDateForApi(dueDate) : null,
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

            {/* Due Date */}
            <div className="space-y-2">
              <Label>Due Date</Label>
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
                    {dueDate ? format(dueDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

