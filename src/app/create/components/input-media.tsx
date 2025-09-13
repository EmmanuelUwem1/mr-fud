"use client";
import React, { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useImageContext } from "../context/ImageContext";
import { usePathname } from "next/navigation";
import { useImageCompressor } from "@/hooks/useImageCompressor"; 

const MediaUpload: React.FC = () => {
  const pathName = usePathname();
  const show = pathName === "/create/campaign";

  const { file, setFile } = useImageContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { compressImage, error, loading } = useImageCompressor(); 

  const isImageFile = (file: File) => file.type.startsWith("image/");

  const processFile = async (file: File) => {
    if (!isImageFile(file)) return;

    const compressed = await compressImage(file, {
      targetRatio: 1,
      label: "1:1 (square)",
    });
    if (compressed) {
      setFile(compressed);
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
      {show && (
        <p className="text-left mb-2 font-medium text-sm">Project image</p>
      )}

      <div className="p-2.5 cardthreebg rounded-[13px] flex flex-col w-full h-full items-center justify-center">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-full border-[0.5px] border-dashed border-[#9a9a9a] rounded-[12px] flex flex-col items-center justify-center py-14 px-6 gap-2"
        >
          <p className="text-white font-bold text-lg">Select image to upload</p>
          <p className="text-sm text-[#87DDFF]">or drag and drop it here</p>

          <label className="bg-[#00C3FE] text-white px-4 py-2 rounded-full cursor-pointer">
            Select Image
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
          {file && previewUrl && (
            <div className="mt-4 rounded-full overflow-hidden h-24 w-24">
              <Image
                src={previewUrl}
                alt={file.name}
                width={200}
                height={200}
                className="rounded-md border border-[#2A2A2A]"
              />
            </div>
          )}

          {file && (
            <p className="mt-2 text-white text-sm">Selected: {file.name}</p>
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

export default MediaUpload;
