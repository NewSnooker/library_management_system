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
      <div className="flex justify-between items-center h-full ">
        {label && (
          <label
            htmlFor="course-image"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2 "
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
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          className="mt-0 transition-all duration-300 cursor-pointer border 
          hover:border-zinc-700 hover:dark:border-zinc-500 
          ut-upload-icon:text-zinc-700
          dark:ut-upload-icon:text-zinc-400
          ut-label:text-zinc-800
          dark:ut-label:text-zinc-300
          dark:ut-allowed-content:ut-ready:text-zinc-300
          dark:ut-allowed-content:ut-readying:text-zinc-300
          dark:ut-allowed-content:ut-uploading:text-zinc-300
          ut-button:text-zinc-800
          ut-button:bg-zinc-700
          dark:ut-button:text-zinc-900
          dark:ut-button:bg-zinc-400"
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
          <Button
            onClick={() => setImageUrl("")}
            className="flex space-x-2"
          >
            <Pencil className="w-5 h-5" />
            <span>เปลี่ยนรูปภาพ</span>
          </Button>
        </div>
      )}
    </div>
  );
}
