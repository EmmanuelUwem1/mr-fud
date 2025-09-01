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
        <div className="text-white p-8 m-auto">
          <h2 className="text-xl font-bold">Something went wrong.</h2>
          <p className="text-sm text-[#87DDFF]">
            Please try again or reload the page.
          </p>
          <button className="rounded-full mx-auto my-2 bg-white py-2.5 px-3.5 font-semibold relative text-[#0077D3]" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
