"use client";
import React, { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useBannerImageContext } from "../context/BannerImageContext";

const BannerUpload: React.FC = () => {
  const { bannerImage, setBannerImage } = useBannerImageContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isImageFile = (file: File) => file.type.startsWith("image/");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded && isImageFile(uploaded)) {
      setBannerImage(uploaded);
      setPreviewUrl(URL.createObjectURL(uploaded));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && isImageFile(dropped)) {
      setBannerImage(dropped);
      setPreviewUrl(URL.createObjectURL(dropped));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div className="w-full">
    

      <div className="p-3 input-bg rounded-[13px] flex flex-col w-full h-full items-center justify-center shadow-sm">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-full border border-dashed border-gray-300 rounded-[12px] flex flex-col items-center justify-center py-10 px-6 gap-2"
        >
          <p className="text-white font-bold text-lg">Upoad your project banner</p>
          <p className="text-sm text-[#87DDFF]">or drag and drop it here</p>

          <label className="bg-[#00C3FE] text-white px-4 py-2 rounded-full cursor-pointer">
            Select Banner
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>

          {/* Preview (banner-style) */}
          {bannerImage && previewUrl && (
            <div className="mt-4 rounded-md overflow-hidden w-full max-w-[400px] h-32 border border-gray-300">
              <Image
                src={previewUrl}
                alt={bannerImage.name}
                width={800}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {bannerImage && (
            <p className="mt-2 text-gray-600 text-sm">Selected: {bannerImage.name}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerUpload;
