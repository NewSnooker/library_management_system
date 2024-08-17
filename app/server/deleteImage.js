"use server";
import { utapi } from "./uploadthing";
export const deleteImage = async (imageKey) => {
  try {
    await utapi.deleteFiles(imageKey);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
