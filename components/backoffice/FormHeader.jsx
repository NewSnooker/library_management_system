"use client";
import React from 'react'
import { X } from "lucide-react";
import { useRouter } from 'next/navigation';


export default function FormHeader({title}) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center py-4 sm:py-6 px-6 border rounded-sm sm:px-12 mb-2 ">
      <h2 className=" text-xl font-semibold">{title}</h2>
      <button 
      className=' hover:text-red-500 transition-all'
      onClick={()=>router.back()}>
        <X />
      </button>
    </div>
  )
}
