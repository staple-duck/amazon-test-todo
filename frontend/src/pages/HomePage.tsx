/**
 * Home page - main todo interface.
 * Will be populated with todo list and category management in next commits.
 */
export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Todo App
        </h1>
        <p className="text-muted-foreground">
          Organize your tasks efficiently with categories and due dates
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Create Categories</h3>
          <p className="text-sm text-muted-foreground">
            Organize todos into custom categories
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Manage Tasks</h3>
          <p className="text-sm text-muted-foreground">
            Create, edit, and complete your todos
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Filter & Sort</h3>
          <p className="text-sm text-muted-foreground">
            Find what you need quickly
          </p>
        </div>
      </div>
    </div>
  );
}

