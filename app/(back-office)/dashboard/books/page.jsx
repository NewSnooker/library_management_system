"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/backoffice/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => getData("admin/books"),
  });

  return (
    <div>
      {/* Header */}
      <PageHeader
        loading={isLoading}
        heading="หนังสือ"
        linkTitle="เพิ่มหนังสือ"
        href="/dashboard/books/new"
      />
      <div className="py-2">
        {isLoading ? (
          <Skeleton className="w-full h-96 mb-2 " />
        ) : error ? (
          <div>เกิดข้อผิดพลาด: {error.message}</div>
        ) : (
          <DataTable
            data={books || []}
            columns={columns}
            filterKeys={["title"]}
          />
        )}
      </div>
    </div>
  );
};

export default Page;