"use client";
import HeadTitleBreadcrumb from "@/components/frontend/HeadTitleBreadcrumb";
import { Album, BookCheck, BookText } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import DataTable from "@/components/backoffice/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function page() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const { data: borrows, isLoading: isBorrowsLoading } = useQuery({
    queryKey: ["borrows_my_books_borrower", userId],
    queryFn: () => getData(`all/borrows/user/${userId}`),
    enabled: !!userId,
  });

 useEffect(() => {
    const timer = setTimeout(() => {
      if (!userId) {
        router.push("/login");
        router.refresh();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [userId]);

  return (
    <div className="">
      <div className="">
        <HeadTitleBreadcrumb icon={Album} />
        <div className="border bg-card py-2 px-4 rounded-sm">
          <div>
            {/* Header */}
            {/* <PageHeaderNoAdd
              loading={isBorrowsLoading}
              heading="ประวัติการยืมหนังสือ"
            /> */}
            <div className="py-2">
              {isBorrowsLoading || !borrows ? (
                <Skeleton className="w-full h-96 mb-2 " />
              ) : (
                <DataTable
                  data={borrows}
                  columns={columns}
                  filterKeys={["bookTitle","dueDate"]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
