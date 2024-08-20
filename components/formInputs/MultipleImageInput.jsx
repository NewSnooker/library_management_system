import { UploadDropzone } from "@/lib/uploadthing";
import { XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function MultipleImageInput({
  label,
  imageUrls = [],
  setImageUrls,
  className = "col-span-full",
  endpoint = "",
}) {
  const handleImageRemove = async (imageIndex) => {
    try {
      const filteredImages = imageUrls.filter(
        (_, index) => index !== imageIndex
      );
      setImageUrls(filteredImages);

      toast.success("ลบรูปภาพสำเร็จ");
    } catch (error) {
      toast.error("ลบรูปภาพไม่สำเร็จ");
      console.error(`ERROR! ${error.message}`, error);
    }
  };

  const handleUploadComplete = (res) => {
    const urls = res.map((item) => item.url);
    console.log(urls);
    setImageUrls(urls);

    toast.success("อัพโหลดรูปภาพสำเร็จ");
    console.log("Files: ", res);
    console.log("อัพโหลดรูปภาพสำเร็จ");
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2 "
        >
          {label}
        </label>
      </div>
      {imageUrls.length > 0 ? (
        <div className="flex sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
          {imageUrls.map((image, i) => (
            <div className="relative" key={i}>
              <button
                type="button"
                className="absolute -top-4 -right-4 bg-white text-slate-950 rounded-full p-1"
                onClick={() => handleImageRemove(i)}
              >
                <XCircle />
              </button>

              <Image
                src={image}
                alt="Item image"
                width={1000}
                height={667}
                className="w-full h-auto sm:h-32 object-cover rounded-sm"
              />
            </div>
          ))}
        </div>
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
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("อัพโหลดรูปภาพไม่สำเร็จ");
            console.log(`ERROR! ${error.message}`, error);
          }}
        />
      )}
    </div>
  );
}
