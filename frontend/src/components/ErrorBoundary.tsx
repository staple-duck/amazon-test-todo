import React from 'react';
import { Button } from './ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component.
 * Catches JavaScript errors anywhere in the child component tree.
 * Shows a fallback UI instead of crashing the whole app.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    console.error('Error caught by boundary:', error, errorInfo);
    
    // In production, you'd send this to an error reporting service
    // like Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4 p-8">
            <h1 className="text-4xl font-bold text-foreground">Oops!</h1>
            <p className="text-xl text-muted-foreground">
              Something went wrong
            </p>
            {this.state.error && (
              <p className="text-sm text-muted-foreground font-mono bg-muted p-4 rounded">
                {this.state.error.message}
              </p>
            )}
            <div className="flex gap-4 justify-center pt-4">
              <Button onClick={this.handleReset}>Try again</Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Go home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

