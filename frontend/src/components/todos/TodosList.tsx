import { useState } from 'react';
import { useGetTodosQuery } from '@/store/api/todosApi';
import { useGetCategoriesQuery } from '@/store/api/categoriesApi';
import { useAppSelector } from '@/store/hooks';
import { selectTodoFilters } from '@/store/slices/uiSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TodoCard } from './TodoCard';
import { TodoFormDialog } from './TodoFormDialog';
import { TodosHeader } from './TodosHeader';
import { TodoFilters } from './TodoFilters';
import { AlertCircle } from 'lucide-react';
import type { Todo } from '@/types/api.types';

/**
 * Todos list component.
 * Fetches and displays todos based on current filters.
 * Groups todos by category.
 */
export function TodosList() {
  const filters = useAppSelector(selectTodoFilters);
  const { data: todos, isLoading } = useGetTodosQuery(filters);
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const hasCategories = categories && categories.length > 0;

  // Group todos by category
  const groupedTodos = todos?.reduce((acc, todo) => {
    const categoryName = todo.categoryName || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  return (
    <>
      <div className="space-y-6">
        {/* Header with stats */}
        <TodosHeader 
          onCreateClick={() => setCreateDialogOpen(true)}
          hasCategories={hasCategories}
          isLoadingCategories={isLoadingCategories}
        />

        {/* Warning banner when no categories exist */}
        {!isLoadingCategories && !hasCategories && (
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                No categories yet!
              </h3>
              <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
                Create a category first to start organizing your todos. Categories help you group related tasks together.
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <TodoFilters />

        {/* Todos list */}
        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : todos && todos.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedTodos || {}).map(([categoryName, categoryTodos]) => (
                  <div key={categoryName} className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      {categoryName}
                    </h3>
                    <div className="space-y-3">
                      {categoryTodos.map((todo) => (
                        <TodoCard
                          key={todo.id}
                          todo={todo}
                          onEdit={() => setEditingTodo(todo)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-medium">No todos found</p>
                <p className="text-sm mt-1">
                  {filters.status !== 'all' || filters.categoryId
                    ? 'Try adjusting your filters'
                    : 'Create your first todo to get started'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create dialog */}
      <TodoFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {/* Edit dialog */}
      {editingTodo && (
        <TodoFormDialog
          open={!!editingTodo}
          onOpenChange={(open) => !open && setEditingTodo(null)}
          todo={editingTodo}
        />
      )}
    </>
  );
}

