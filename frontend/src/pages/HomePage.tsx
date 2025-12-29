import { CategoriesList } from '@/components/categories/CategoriesList';

/**
 * Home page - main todo interface.
 * Shows categories list and todo management (coming in next commit).
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

        {/* Todo list - will be added in next commit */}
        <div className="md:col-span-2">
          <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
            <p className="text-lg font-medium">Todo List</p>
            <p className="text-sm mt-2">Coming in the next commit...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

