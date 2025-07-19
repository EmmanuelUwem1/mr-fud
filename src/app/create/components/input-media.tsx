import React, { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

const MediaUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
      setPreviewUrl(URL.createObjectURL(uploaded));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      setPreviewUrl(URL.createObjectURL(dropped));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div className="bg-[#141414] p-2.5 rounded-[13px]">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full h-full border-[0.5px] border-dotted border-[#9a9a9a] rounded-[12px] flex flex-col items-center justify-center py-14 px-6 gap-2"
      >
        <p className="text-white font-bold text-lg">
          Select video or image to upload
        </p>
        <p className="text-sm text-[#2A2A2A]">or drag and drop it here</p>

        <label className="bg-[#FF3C38] text-white px-4 py-2 rounded-full cursor-pointer">
          Select File
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*, video/*"
          />
        </label>

        {/* Preview (images only) */}
        {file && previewUrl && file.type.startsWith("image/") && (
          <div className="mt-4">
            <Image
              src={previewUrl}
              alt={file.name}
              width={200}
              height={200}
              className="rounded-md border border-[#2A2A2A]"
            />
          </div>
        )}

        {/* Show file name for any uploaded file */}
        {file && (
          <p className="mt-2 text-white text-sm">Selected: {file.name}</p>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
