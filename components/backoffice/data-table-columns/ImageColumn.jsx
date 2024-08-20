import { Images } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ImageColumn({ row, accessorKey }) {
  const imageUrl = row.getValue(`${accessorKey}`);

  return (
    <div className=" shrink-0">
      {imageUrl && imageUrl.length > 0 ? (
        <Image
          src={imageUrl}
          width={500}
          height={500}
          alt="image"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <Images className="w-10 h-10  object-cover" />
      )}
    </div>
  );
}
