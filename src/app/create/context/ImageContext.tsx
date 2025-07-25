"use client";
import { createContext, useContext, useState } from "react";

const ImageContext = createContext<{
  file: File | null;
  setFile: (file: File | null) => void;
}>({
  file: null,
  setFile: () => {},
});

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <ImageContext.Provider value={{ file, setFile }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
