"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";

export type ImageWithPreview = {
  file: File;
  preview: string;
};

type ImageUploadProps = {
  maxImages: number;
  handleImages: (images: ImageWithPreview[]) => void;
};

export function ImageUpload({
  handleImages,
  maxImages = 1,
  ...props
}: React.ComponentProps<"input"> & ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const newImages: ImageWithPreview[] = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      handleImages(newImages);
    },
    [handleImages, maxImages],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: maxImages > 1,
    maxFiles: maxImages,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className="border-muted text-muted-foreground hover:bg-muted/50 focus:ring-ring data-[state=open]:bg-muted flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-3 border-dashed bg-transparent p-6 text-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed"
    >
      <Input
        {...props}
        {...getInputProps()}
        type="file"
        max={maxImages}
        accept="image/*"
        multiple={maxImages > 1}
        size={10 * 1024 * 1024}
      />
      <p>Drag 'n' drop an image here, or click to select an image</p>
    </div>
  );
}
