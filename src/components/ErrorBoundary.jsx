import React, { Component } from 'react';
import Icon from './AppIcon';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
          <div className="text-error mb-6">
            <Icon name="AlertTriangle" size={48} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            We're sorry, but an error occurred while rendering this page. Please try refreshing or contact support if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-organic hover:bg-primary/90 transition-therapeutic"
          >
            Refresh Page
          </button>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-8 p-4 bg-muted rounded-organic w-full max-w-2xl overflow-auto">
              <h2 className="text-lg font-medium mb-2">Error Details:</h2>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                {this.state.error.toString()}
              </pre>
              {this.state.errorInfo && (
                <pre className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;