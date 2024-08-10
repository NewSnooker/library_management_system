"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useEffect, useState } from 'react';

export default function Breadcrumb() {
  const pathname = usePathname();
  const [decodedPathArr, setDecodedPathArr] = useState([]);

  useEffect(() => {
    const pathArr = pathname.split("/").filter(Boolean);
    const decoded = pathArr.map(item => decodeURIComponent(item));
    setDecodedPathArr(decoded);
  }, [pathname]);

  return (
    <nav className="flex " aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link href="/home" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <Home className="w-3 h-3 me-2" />
            Home
          </Link>
        </li>
        {decodedPathArr.map((item, i) => (
          <li key={i} className="flex items-center">
            <ChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 " />
            <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}