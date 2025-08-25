"use client";
import { createContext, useContext, useState } from "react";

const BannerImageContext = createContext<{
  bannerImage: File | null;
  setBannerImage: (file: File | null) => void;
}>({
  bannerImage: null,
  setBannerImage: () => {},
});

export const BannerImageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  return (
    <BannerImageContext.Provider value={{ bannerImage, setBannerImage }}>
      {children}
    </BannerImageContext.Provider>
  );
};

export const useBannerImageContext = () => useContext(BannerImageContext);
