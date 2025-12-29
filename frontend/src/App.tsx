import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppRouter } from './routes';

/**
 * Main App component.
 * Sets up all the providers and routing.
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="todo-theme">
        <BrowserRouter>
          <AppRouter />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

