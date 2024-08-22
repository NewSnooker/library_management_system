"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { makePutRequest } from "@/lib/apiRequest";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { queryClient } from "@/lib/react-query-client";

export default function ActionStatusColumn({
  row,
  title,
  accessorKey,
  bookId,
}) {
  const status = row.getValue(`${accessorKey}`);

  const { data: session } = useSession();
  const adminId = session?.user?.id;
  if (!adminId) {
    return toast.error("Id Admin ไม่ถูกต้อง");
  }
  const dispatch = useDispatch();


  const bookStatuses = {
    AVAILABLE: "พร้อมให้ยืม",
    BORROWED: "ถูกยืมไปแล้ว",
    NOT_AVAILABLE: "ไม่พร้อมยืม",
    OVERDUE: "ค้างคืนเกินกำหนด",
    DAMAGED: "ชำรุดเสียหาย",
    LOST: "สูญหาย",
  };

  const statusLabel = bookStatuses[status] || "ไม่พบสถานะ";

  const statusColors = {
    AVAILABLE: "text-green-700 dark:text-green-500",
    BORROWED: "text-yellow-600 dark:text-yellow-500",
    NOT_AVAILABLE: "text-zinc-500 dark:text-zinc-400",
    OVERDUE: "text-red-600 dark:text-red-500",
    DAMAGED: "text-red-600 dark:text-red-500",
    LOST: "text-red-600 dark:text-red-500",
  };

  const onSuccess = () => {
    queryClient.invalidateQueries(["books"]);
  };

  const onSubmit = async (data) => {
    data.adminId = adminId;
    console.log(data);

    makePutRequest(
      `api/admin/books/status/${bookId}`,
      data,
      "สถานะหนังสือ",
      onSuccess,
      () => {}, // No-op reset function
      dispatch
    );
    
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`${statusColors[status]} -m-4 focus:ring-0`}
          variant="ghost"
        >
          {statusLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.keys(bookStatuses).map((key) => (
          <DropdownMenuItem key={key} onClick={() => onSubmit({ status: key })}>
            <span className={statusColors[key]}>{bookStatuses[key]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
