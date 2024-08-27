"use client";
import HeadTitleBreadcrumb from "@/components/frontend/HeadTitleBreadcrumb";
import HorizontalCard from "@/components/frontend/HorizontalCard";
import { Book } from "lucide-react";
import React, { useState } from "react";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";

export default function page() {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booksNewBooks"],
    queryFn: () => getData("all/books/new-books"),
  });
  if(error) return <div>{error.message}</div>

  return (
    <div className="">
      <HeadTitleBreadcrumb icon={Book} />
      <div className="border bg-card py-2 px-4 rounded-sm">
        <HorizontalCard books={books} isLoading={isLoading} />
      </div>
    </div>
  );
}
