import { useState } from 'react';
import { useGetTodosQuery } from '@/store/api/todosApi';
import { useAppSelector } from '@/store/hooks';
import { selectTodoFilters } from '@/store/slices/uiSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TodoCard } from './TodoCard';
import { TodoFormDialog } from './TodoFormDialog';
import { TodosHeader } from './TodosHeader';
import { TodoFilters } from './TodoFilters';
import type { Todo } from '@/types/api.types';

/**
 * Todos list component.
 * Fetches and displays todos based on current filters.
 * Groups todos by category.
 */
export function TodosList() {
  const filters = useAppSelector(selectTodoFilters);
  const { data: todos, isLoading } = useGetTodosQuery(filters);
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

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
        <TodosHeader onCreateClick={() => setCreateDialogOpen(true)} />

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

