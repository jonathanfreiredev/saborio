"use client";
import { heicTo, isHeic } from "heic-to";
import imageCompression from "browser-image-compression";

export async function processImage(file: File): Promise<File> {
  let fileToProcess = file;

  const isHeicFormat = await isHeic(file);

  // 1. Convert it to JPEG if it's HEIC, since some browsers (like Safari) might not handle HEIC well and it can cause issues in the backend. Además, Vercel Image Optimization no soporta HEIC, así que lo convertimos a JPG de una vez.
  if (isHeicFormat) {
    try {
      console.log("Transforming HEIC a JPG...");
      const result = await heicTo({
        blob: file,
        type: "image/jpeg",
        quality: 0.9,
      });

      const blobCandidate = Array.isArray(result) ? result[0] : result;

      if (!blobCandidate) {
        throw new Error("La conversión de HEIC no devolvió ningún contenido.");
      }

      // convert the resulting Blob to a File, keeping the original name but changing the extension to .jpg
      fileToProcess = new File(
        [blobCandidate],
        file.name.replace(/\.[^/.]+$/, ".jpg"),
        { type: "image/jpeg" },
      );
    } catch (e) {
      console.error("Error converting HEIC to JPEG:", e);
    }
  }

  // 2.
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 2560,
    useWebWorker: true,
    fileType: "image/webp",
  };

  try {
    const compressedFile = await imageCompression(fileToProcess, options);
    console.log("Image processed:", compressedFile.size / 1024, "KB");
    return compressedFile;
  } catch (e) {
    console.error("Error processing image:", e);
    return fileToProcess;
  }
}
