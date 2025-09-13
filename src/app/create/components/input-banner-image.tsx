"use client";
import React, { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useBannerImageContext } from "../context/BannerImageContext";
import { useImageCompressor } from "@/hooks/useImageCompressor";

const BannerUpload: React.FC = () => {
  const { bannerImage, setBannerImage } = useBannerImageContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { compressImage, error, loading } = useImageCompressor();

  const isImageFile = (file: File) => file.type.startsWith("image/");

  const processFile = async (file: File) => {
    if (!isImageFile(file)) return;

    const compressed = await compressImage(file, {
      targetRatio: 39 / 23,
      label: "39:23",
    });
    if (compressed) {
      setBannerImage(compressed);
      setPreviewUrl(URL.createObjectURL(compressed));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) processFile(uploaded);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) processFile(dropped);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div className="w-full">
      <div className="p-3 input-bg rounded-[13px] flex flex-col w-full h-full items-center justify-center shadow-sm">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-full border border-dashed border-gray-300 rounded-[12px] flex flex-col items-center justify-center py-10 px-3 sm:px-6 gap-2"
        >
          <p className="text-white font-bold text-lg">
            Upload your project banner
          </p>
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

          {/* Error Message */}
          {error && (
            <p className="text-[#ff5e5e] text-sm mt-2 text-center">{error}</p>
          )}

          {/* Preview */}
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
            <p className="mt-2 text-gray-600 text-sm">
              Selected: {bannerImage.name}
            </p>
          )}

          {loading && (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerUpload;
