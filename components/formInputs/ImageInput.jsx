import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "",
  endpoint = "",
}) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2 "
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
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
        className=" transition-all duration-300 cursor-pointer border-2 
        hover:border-slate-700 dark:border-slate-500  hover:dark:border-slate-400 
        ut-upload-icon:text-slate-700
        dark:ut-upload-icon:text-slate-400
        ut-label:text-slate-800
        dark:ut-label:text-slate-300
        dark:ut-allowed-content:ut-ready:text-slate-300
        dark:ut-allowed-content:ut-readying:text-slate-300
        dark:ut-allowed-content:ut-uploading:text-slate-300
        ut-button:text-slate-50
        ut-button:bg-slate-700
        dark:ut-button:text-slate-900
        dark:ut-button:bg-slate-400"
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
            console.log(`ERROR! ${error.message}`,error);
          }}
        />
      )}
    </div>
  );
}
