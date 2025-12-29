import { Outlet } from 'react-router-dom';
import { Header } from './Header';

/**
 * Main layout component.
 * Wraps all pages with common structure (header, footer, etc).
 */
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>Built with React, TypeScript, and shadcn/ui</p>
      </footer>
    </div>
  );
}

