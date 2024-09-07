import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function RecentBorrows() {
  const {
    data: recentBorrows,
    isLoading: isRecentBorrowsLoading,
    error: errorRecentBorrows,
  } = useQuery({
    queryKey: ["recent-borrows"],
    queryFn: () => getData("/admin/borrows/recent-borrows"),
  });

  console.log(recentBorrows);

  if (isRecentBorrowsLoading) {
    return <div>Loading...</div>;
  }

  if (errorRecentBorrows) {
    return <div>Error loading borrows</div>;
  }

  return (
    <div>
      {recentBorrows?.map((borrow) => (
        <Link href={`/dashboard/history/borrow/return/${borrow.id}`}>
        <Card key={borrow.id} className="mb-2">
          <CardContent className="grid gap-8 p-4">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src={borrow.borrower.profileImage }
                  alt="Avatar"
                  className=" object-cover"
                />
                <AvatarFallback>{borrow.borrower.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {borrow.borrower.fullName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {borrow.borrower.emailAddress}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {(() => {
                  switch (borrow.status) {
                    case "BORROWED":
                      return <div className="text-yellow-800 dark:text-yellow-500">กำลังยืม</div>;
                    case "OVERDUE":
                      return <div className="text-orange-800 dark:text-orange-500">ค้างคืนเกินกำหนด</div>;
                    case "LOST":
                      return <div className="text-red-800 dark:text-red-500">สูญหาย</div>;
                    case "RETURNED":
                      return <div className="text-green-800 dark:text-green-500">ส่งคืนแล้ว</div>;
                    default:
                      return <div>{borrow.status}</div>;
                  }
                })()}
              </div>
            </div>
          </CardContent>
        </Card>
        </Link>
      ))}
    </div>
  );
}

