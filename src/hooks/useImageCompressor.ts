"use client";
import { useState } from "react";
import imageCompression from "browser-image-compression";

const MAX_SIZE = 512000; // 500KB

export function useImageCompressor() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const compressImage = async (file: File): Promise<File | null> => {
    setError(null);
    setLoading(true);

    if (file.size > MAX_SIZE * 3) {
      setError(
        "Image is too large to compress effectively. Try a smaller file."
      );
      setLoading(false);
      return null;
    }

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressed = await imageCompression(file, options);

      if (compressed.size > MAX_SIZE) {
        setError(
          "Compressed image still exceeds 500KB. Try resizing manually."
        );
        setLoading(false);
        return null;
      }

      setLoading(false);
      return compressed;
    } catch (err) {
      setError("Image compression failed. Please try again.");
      setLoading(false);
      return null;
    }
  };

  return { compressImage, error, loading };
}
