'use client';

/**
 * Error Boundary Component
 * 
 * Terminal-themed error boundary for catching and displaying React errors
 * in a user-friendly format that matches Hack Board's aesthetic
 */

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

/**
 * Default terminal-themed error fallback component
 */
const DefaultErrorFallback: React.FC<{ error?: Error; resetError: () => void }> = ({ 
  error, 
  resetError 
}) => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
    <div className="bg-[#1a1a1a] border border-[#ff0000] rounded-lg p-8 max-w-lg w-full">
      <div className="text-center mb-6">
        <div className="text-[#ff0000] font-mono mb-4">
          <div className="text-2xl mb-2">⚠️ SYSTEM FAULT</div>
          <div className="text-sm">┌─ CRITICAL ERROR ─┐</div>
        </div>
        <div className="text-[#ededed] font-mono text-sm mb-4">
          An unexpected error has occurred in the Hack Board system.
        </div>
        {error && (
          <div className="bg-[#2a1a1a] border border-[#666666] rounded p-3 mb-4">
            <div className="text-[#ff0000] font-mono text-xs text-left">
              <div className="mb-2">ERROR DETAILS:</div>
              <div className="text-[#cccccc] break-words">
                {error.message}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <button
          onClick={resetError}
          className="w-full py-3 px-6 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#00cc00] transition-all"
        >
          [RESTART SYSTEM]
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          className="w-full py-3 px-6 bg-transparent border-2 border-[#ffff00] text-[#ffff00] font-mono font-bold rounded hover:bg-[#ffff00] hover:text-[#0a0a0a] transition-all"
        >
          [RETURN TO HOME]
        </button>
      </div>
      
      <div className="text-center mt-6">
        <div className="text-[#888888] font-mono text-xs">
          └─ Contact system administrator if problem persists ─┘
        </div>
      </div>
    </div>
  </div>
);

/**
 * Error Boundary Class Component
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary for functional components
 */
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    console.error('Handled error:', error);
    setError(error);
  }, []);

  if (error) {
    return {
      error,
      resetError,
      ErrorComponent: () => (
        <DefaultErrorFallback error={error} resetError={resetError} />
      )
    };
  }

  return { handleError };
};

export default ErrorBoundary;