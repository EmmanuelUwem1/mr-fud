"use client";
import { useEffect, useRef } from "react";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { toast } from "react-hot-toast";

export default function NetworkStatusToast() {
  const isOnline = useOnlineStatus();
  const offlineToastId = useRef<string | null>(null);

  useEffect(() => {
    if (!isOnline) {
      offlineToastId.current = toast.error("Offline – No internet connection", {
        id: "offline-toast",
        duration: Infinity,
        position: "bottom-right",
      });
    } else {
      if (offlineToastId.current) {
        toast.dismiss(offlineToastId.current);
        offlineToastId.current = null;
      }

      toast.success("Online", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  }, [isOnline]);

  return null;
}
