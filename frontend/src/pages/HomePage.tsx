import { CategoriesList } from '@/components/categories/CategoriesList';
import { TodosList } from '@/components/todos/TodosList';

/**
 * Home page - main todo interface.
 * Shows categories sidebar and todos list with filtering and sorting.
 */
export function HomePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Todo App
        </h1>
        <p className="text-muted-foreground">
          Organize your tasks efficiently with categories and due dates
        </p>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Categories sidebar */}
        <div className="lg:col-span-1">
          <CategoriesList />
        </div>

        {/* Todos list with filters */}
        <div className="lg:col-span-3">
          <TodosList />
        </div>
      </div>
    </div>
  );
}

