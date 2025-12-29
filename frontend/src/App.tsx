import { BrowserRouter } from 'react-router-dom';
import { ReduxProvider } from './components/providers/ReduxProvider';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppRouter } from './routes';

/**
 * Main App component.
 * Sets up all the providers and routing.
 * 
 * Provider hierarchy:
 * 1. ErrorBoundary - catches errors
 * 2. ReduxProvider - state management
 * 3. ThemeProvider - dark/light mode
 * 4. BrowserRouter - routing
 */
function App() {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <ThemeProvider defaultTheme="light" storageKey="todo-theme">
          <BrowserRouter>
            <AppRouter />
            <Toaster />
          </BrowserRouter>
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export default App;

