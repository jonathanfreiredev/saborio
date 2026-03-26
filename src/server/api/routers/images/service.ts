import { deleteFromCloudinary } from "~/lib/cloudinary";

export async function deleteImageByUrl(imageUrl: string) {
  const publicId = imageUrl.split("/").pop()?.split(".")[0];

  try {
    await deleteFromCloudinary(publicId!);

    return true;
  } catch (error) {
    console.error("Failed to delete step image:", error);
    return false;
  }
}
