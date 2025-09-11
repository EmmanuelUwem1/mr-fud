"use client";
import { useState } from "react";

export function useImageCompressor() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const compressImage = async (file: File): Promise<File | null> => {
    setError(null);
    setLoading(true);

    try {
      // Skip compression, just return the original file
      setLoading(false);
      return file;
    } catch (err) {
      setError("Image handling failed. Please try again.");
      setLoading(false);
      return null;
    }
  };

  return { compressImage, error, loading };
}
