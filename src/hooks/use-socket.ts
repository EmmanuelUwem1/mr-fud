import { useEffect, useRef } from "react";
// import { FormattedData } from "@/types";

type EventType = "chart_updates" | string;

interface SocketMessage<T = unknown> {
  eventType: EventType;
  payload: T;
}

type Callback<T = unknown> = (data: T) => void;

export default function useSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const listeners = useRef<Record<string, Callback[]>>({});

  useEffect(() => {
    socketRef.current = new WebSocket("wss://your-websocket-url"); // Replace with your actual WebSocket URL

    socketRef.current.onmessage = (event) => {
      const message: SocketMessage = JSON.parse(event.data);
      const { eventType, payload } = message;

      listeners.current[eventType]?.forEach((cb) => cb(payload));
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const emitEvent = <T>(eventType: EventType, payload: T) => {
    const message: SocketMessage<T> = { eventType, payload };
    socketRef.current?.send(JSON.stringify(message));
  };

  const subscribeToEvent = <T>(eventType: EventType, callback: Callback<T>) => {
    if (!listeners.current[eventType]) {
      listeners.current[eventType] = [];
    }
    listeners.current[eventType].push(callback as Callback);
  };

  return { emitEvent, subscribeToEvent };
}
