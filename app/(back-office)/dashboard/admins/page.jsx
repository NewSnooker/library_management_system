"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/backoffice/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeaderNoAdd from "@/components/backoffice/PageHeaderNoAdd";

const Page = () => {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ["admin_users"],
    queryFn: () => getData("admin/users/admin"),
  });

  return (
    <div>
      {/* Header */}
      <PageHeaderNoAdd
        loading={isLoading}
        heading="ข้อมูลผู้ดูแลระบบ"
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
            filterKeys={["username","fullName"]}
          />
        )}
      </div>
    </div>
  );
};

export default Page;