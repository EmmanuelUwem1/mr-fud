"use client";
import React from "react";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-white p-8">
          <h2 className="text-xl font-bold">Something went wrong.</h2>
          <p className="text-sm text-gray-400">
            Please try again or reload the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
