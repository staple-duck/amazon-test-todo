import { useEffect, useState } from 'react';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@/store/api/categoriesApi';
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
import { Label } from '@/components/ui/label';
import { handleApiError, showSuccess } from '@/lib/api-helpers';
import type { Category } from '@/types/api.types';

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category; // If provided, we're editing
}

/**
 * Category form dialog.
 * Handles both creating and editing categories.
 * Validates input and shows appropriate error messages.
 */
export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
}: CategoryFormDialogProps) {
  const [name, setName] = useState('');
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const isEditing = !!category;
  const isLoading = isCreating || isUpdating;

  // Populate form when editing
  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName('');
    }
  }, [category, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const trimmedName = name.trim();
    if (!trimmedName) {
      handleApiError({ data: { message: 'Category name is required' } });
      return;
    }

    if (trimmedName.length > 100) {
      handleApiError({ data: { message: 'Category name must be less than 100 characters' } });
      return;
    }

    try {
      if (isEditing) {
        await updateCategory({
          id: category.id,
          data: { name: trimmedName },
        }).unwrap();
        showSuccess('Category updated successfully');
      } else {
        await createCategory({ name: trimmedName }).unwrap();
        showSuccess('Category created successfully');
      }
      onOpenChange(false);
      setName('');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Category' : 'Create Category'}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Update the category name. Press save when done.'
                : 'Add a new category to organize your todos.'}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Work, Personal, Shopping"
              maxLength={100}
              autoFocus
              className="mt-2"
            />
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

