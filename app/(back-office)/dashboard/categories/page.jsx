"use client";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/backoffice/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData("admin/categories"),
  });
  const isLoading =  isCategoriesLoading;

  return (
    <div>
      {/* Header */}
      <PageHeader
        loading={isLoading}
        heading="หมวดหมู่หนังสือ"
        linkTitle="เพิ่มหมวดหมู่"
        href="/dashboard/categories/new"
      />
      <div className="py-2">
        {isLoading ? (
          <Skeleton className="w-full h-96 mb-2 " />
        ) : (
          <DataTable
            data={categories}
            columns={columns}
            filterKeys={["title"]}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
