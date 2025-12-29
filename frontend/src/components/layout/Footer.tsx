/**
 * Application footer.
 * Shows attribution and tech stack.
 */
export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p className="font-medium">Built with modern technologies</p>
          <p className="mt-2">
            React • TypeScript • Redux Toolkit • shadcn/ui • Tailwind CSS • Express • PostgreSQL
          </p>
          <p className="mt-2 text-xs">
            © {new Date().getFullYear()} Todo App. Production-grade architecture.
          </p>
        </div>
      </div>
    </footer>
  );
}

