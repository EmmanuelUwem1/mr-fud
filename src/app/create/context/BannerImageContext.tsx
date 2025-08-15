"use client";
import { createContext, useContext, useState } from "react";

const BannerImageContext = createContext<{
  file: File | null;
  setFile: (file: File | null) => void;
}>({
  file: null,
  setFile: () => {},
});

export const BannerImageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <BannerImageContext.Provider value={{ file, setFile }}>
      {children}
    </BannerImageContext.Provider>
  );
};

export const useBannerImageContext = () => useContext(BannerImageContext);
