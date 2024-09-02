"use client";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/backoffice/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import PageHeaderNoAdd from "@/components/backoffice/PageHeaderNoAdd";

const Page = () => {
  const { data: borrows, isLoading: isBorrowsLoading } = useQuery({
    queryKey: ["borrows"],
    queryFn: () => getData("admin/borrows"),
  });

  return (
    <div>
      {/* Header */}
      <PageHeaderNoAdd
        loading={isBorrowsLoading}
        heading="ประวัติการยืมหนังสือ"
      />
      <div className="py-2">
        {isBorrowsLoading ? (
          <Skeleton className="w-full h-96 mb-2 " />
        ) : (
          <DataTable
            data={borrows}
            columns={columns}
            filterKeys={["borrowerName","bookTitle",]}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
