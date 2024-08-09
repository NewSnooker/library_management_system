"use client";
import React from "react";
import { Album, Book, BookCheck, BookText, Heart, House, MessageSquareText, SquareLibrary } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/lib/sidebarLink";
// import { useRouter } from 'next/router';

export default function Sidebar() {
  const pathname = usePathname();
  // const router = useRouter();

  return (
    <div className=" border bg-card py-2 px-4 rounded-sm sticky top-20">
      <h2 className="text-lg font-bold flex items-center justify-start border-b pb-2">
        <BookText className="mr-1 w-4" /> UDVC
      </h2>
      <div className="mt-2">
        {sidebarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={i}
              className={
                item.href == pathname
                  ? "flex border-l-4 pl-2 my-1.5 border-zinc-600 text-zinc-700 dark:text-zinc-400"
                  : "flex mb-1 "
              }
            >
              <Icon className="mr-1 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
