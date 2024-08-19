"use client";
import React, { useEffect, useState } from "react";
import {
  Album,
  Book,
  BookCheck,
  BookText,
  Heart,
  House,
  MessageSquareText,
  SquareLibrary,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Skeleton } from "../ui/skeleton";
import { adminSidebarLinks } from "@/lib/adminSidebarLinks";
// import { useRouter } from 'next/router';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="hidden sm:block border bg-card h-72 py-2 px-4 rounded-sm sticky top-20">
        <Skeleton className="w-full h-8 mb-2 rounded-sm" />
        <Skeleton className="w-full h-56 rounded-sm" />
      </div>
    );
  // const router = useRouter();
  return ( 
    <div className=" border bg-card py-2 px-4 rounded-sm sticky top-20 ">
      <h2 className="text-lg font-bold flex items-center justify-start border-b pb-2 text-custom-text">
        <BookText className="mr-1 w-4 " /> UDVC
      </h2>
      <div className="mt-2">
        {adminSidebarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={i}
              className={
                item.href == pathname
                  ? "flex border-l-4 pl-2 my-1.5 font-thin border-custom-border text-custom-text dark:text-zinc-400"
                  : "flex mb-1 "
              }
            >
              <Icon className="mr-1 w-4 " />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
