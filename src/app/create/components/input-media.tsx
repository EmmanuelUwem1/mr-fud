import React, { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

const MediaUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
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
    <div className="bg-[#141414] p-2.5 rounded-[13px] flex flex-col w-full items-center justify-center">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full h-full border-[0.5px] border-dashed border-[#9a9a9a] rounded-[12px] flex flex-col items-center justify-center py-14 px-6 gap-2"
      >
        <p className="text-white font-bold text-lg">Select image to upload</p>
        <p className="text-sm text-[#2A2A2A]">or drag and drop it here</p>

        <label className="bg-[#FF3C38] text-white px-4 py-2 rounded-full cursor-pointer">
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
  );
};

export default MediaUpload;
