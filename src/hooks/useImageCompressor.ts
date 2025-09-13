"use client";
import { useState } from "react";

type AspectRatioConfig = {
  targetRatio: number;
  tolerance?: number;
  label?: string;
};

export function useImageCompressor() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const compressImage = async (
    file: File,
    ratioConfig?: AspectRatioConfig
  ): Promise<File | null> => {
    setError(null);
    setLoading(true);

    try {
      const imageBitmap = await createImageBitmap(file);
      const { width, height } = imageBitmap;
      const aspectRatio = width / height;

      if (ratioConfig) {
        const {
          targetRatio,
          tolerance = 0.1,
          label = "this format",
        } = ratioConfig;
        const isValid =
          aspectRatio > targetRatio - tolerance &&
          aspectRatio < targetRatio + tolerance;

        if (!isValid) {
          setError(
            `Please upload an image with an aspect ratio close to ${label}. This ensures proper display.`
          );
          setLoading(false);
          return null;
        }
      }

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
