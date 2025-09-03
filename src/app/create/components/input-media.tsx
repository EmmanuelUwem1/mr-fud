"use client";
import React, { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useImageContext } from "../context/ImageContext";
import { usePathname } from "next/navigation";




const MediaUpload: React.FC = () => {
  const pathName = usePathname();
  const show = pathName === "/create/campaign";

const { file, setFile } = useImageContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isImageFile = (file: File) => file.type.startsWith("image/");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded && isImageFile(uploaded)) {
      setFile(uploaded);
      setPreviewUrl(URL.createObjectURL(uploaded));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && isImageFile(dropped)) {
      setFile(dropped);
      setPreviewUrl(URL.createObjectURL(dropped));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div className="w-full">
      {show && (<p className="text-left mb-2 font-medium text-sm">Project image</p>)}
    {/* // sm:bg-[#141414] bg-[#212121] */}
  
    <div className=" p-2.5 cardthreebg rounded-[13px] flex flex-col w-full h-full items-center justify-center">
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

        {/* Preview (images only) */}
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
      </div>
      </div>
      </div>
  );
};

export default MediaUpload;
