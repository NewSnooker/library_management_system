import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "",
  endpoint = "",
}) {
  return (
    <div className={className}>
      <div className="flex ">
        {label && (
          <label
            htmlFor="course-image"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200 mb-2 "
          >
            {label}
          </label>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={1000}
          loading="lazy"
          className="w-full h-96 object-contain"
        />
      ) : (
        <UploadDropzone
          className="mt-0 sm:h-[500px] cursor-pointer border transition-colors duration-300 border-zinc-500
          hover:border-zinc-900 dark:border-zinc-500  hover:dark:border-zinc-400 
          ut-upload-icon:text-zinc-900
          dark:ut-upload-icon:text-zinc-200
          ut-label:text-zinc-900
          dark:ut-label:text-zinc-200
          dark:ut-allowed-content:ut-ready:text-zinc-200
          dark:ut-allowed-content:ut-readying:text-zinc-200
          dark:ut-allowed-content:ut-uploading:text-zinc-200
          ut-button:text-zinc-200
          ut-button:bg-zinc-950
          dark:ut-button:text-zinc-950
          dark:ut-button:bg-zinc-200"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].url);
            // Do something with the response
            toast.success("Upload Completed");
            console.log("Files: ", res);
            console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Upload Failed, Try Again");
            console.log(`ERROR! ${error.message}`, error);
          }}
        />
      )}

      {imageUrl && (
        <div className="flex justify-end mt-5 w-full">
          <Button onClick={() => setImageUrl("")} className="flex space-x-2">
            <Pencil className="w-5 h-5" />
            <span>เปลี่ยนรูปภาพ</span>
          </Button>
        </div>
      )}
    </div>
  );
}
