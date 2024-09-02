"use client";

import ActionColumn from "@/components/backoffice/data-table-columns/ActionColumn";
import CalculateDaysRemainingColumn from "@/components/backoffice/data-table-columns/CalculateDaysRemainingColumn";
import DateCreatedColumn from "@/components/backoffice/data-table-columns/DateCreatedColumn";
import DateCreatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnCell";
import DateUpdatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnUpdatedCell";
import ImageColumn from "@/components/backoffice/data-table-columns/ImageColumn";
import NumberColumn from "@/components/backoffice/data-table-columns/NumberColumn";
import StatusColumn from "@/components/backoffice/data-table-columns/StatusColumn";
import TitleColumn from "@/components/backoffice/data-table-columns/TitleColumn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "borrowerProfileImage",
    header: "รูปภาพ",
    cell: ({ row }) => (
      <ImageColumn row={row} accessorKey="borrowerProfileImage" />
    ),
  },
  {
    accessorKey: "borrowerName",
    header: ({ column }) => (
      <TitleColumn
        column={column}
        title="ชื่อผู้ยืม"
        className="-m-4 min-w-44"
      />
    ),
  },
  {
    accessorKey: "bookTitle",
    header: ({ column }) => (
      <TitleColumn
        column={column}
        title="ชื่อหนังสือ"
        className="-m-4 min-w-32"
      />
    ),
  },
  {
    accessorKey: "borrowDate",
    header: ({ column }) => (
      <DateCreatedColumn column={column} title="วันที่ยืม" />
    ),
    cell: ({ row }) => (
      <DateCreatedColumnCell row={row} accessorKey="borrowDate" />
    ),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DateCreatedColumn column={column} title="กำหนดส่ง" />
    ),
    cell: ({ row }) => (
      <DateCreatedColumnCell row={row} accessorKey="dueDate" />
    ),
  },
  {
    accessorKey: "numberOfDays",
    header: ({ column }) => <TitleColumn column={column} title="รวม / วัน" />,
    cell: ({ row }) => <NumberColumn row={row} accessorKey="numberOfDays" />,
  },
  {
    accessorKey: "dueDate",
    id: "daysRemaining",
    header: ({ column }) => (
      <DateCreatedColumn column={column} title="เหลือ / วัน" />
    ),
    cell: ({ row }) => (
      <CalculateDaysRemainingColumn row={row} accessorKey="dueDate" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TitleColumn column={column} title="สถานะ" />,
    cell: ({ row }) => <StatusColumn row={row} accessorKey="status" />,
  },
  {
    header: ({ column }) => <TitleColumn column={column} title="เพิ่มเติม" />,
    id: "borrow",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <Link href={`/dashboard/history/borrow/${book.id}`} className="w-full">
          <Button variant="outline" className="min-w-20">
            รายละเอียด
          </Button>
        </Link>
      );
    },
  },
  // {
  //   accessorKey: "approverName",
  //   header: ({ column }) => <TitleColumn column={column} title="ผู้อนุมัติ" />,
  // },

  // {
  //   accessorKey: "updatedAt",
  //   header: ({ column }) => (
  //     <DateCreatedColumn column={column} title="อัพเดท" />
  //   ),
  //   cell: ({ row }) => (
  //     <DateUpdatedColumnCell row={row} accessorKey="updatedAt" />
  //   ),
  // },
];
