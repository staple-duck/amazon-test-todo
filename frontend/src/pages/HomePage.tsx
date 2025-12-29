import { CategoriesList } from '@/components/categories/CategoriesList';
import { TodosList } from '@/components/todos/TodosList';

/**
 * Home page - main todo interface.
 * Shows categories sidebar and todos list with full CRUD functionality.
 */
export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Todo App
        </h1>
        <p className="text-muted-foreground">
          Organize your tasks efficiently with categories and due dates
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Categories sidebar */}
        <div className="md:col-span-1">
          <CategoriesList />
        </div>

        {/* Todos list */}
        <div className="md:col-span-2">
          <TodosList />
        </div>
      </div>
    </div>
  );
}

