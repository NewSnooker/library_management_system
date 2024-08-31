"use client";

import ActionColumn from "@/components/backoffice/data-table-columns/ActionColumn";
import ActionStatusColumn from "@/components/backoffice/data-table-columns/ActionStatusColumn";
import DateCreatedColumn from "@/components/backoffice/data-table-columns/DateCreatedColumn";
import DateCreatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnCell";
import DateUpdatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnUpdatedCell";
import ImageColumn from "@/components/backoffice/data-table-columns/ImageColumn";
import NumberColumn from "@/components/backoffice/data-table-columns/NumberColumn";
import SelectBorrowUserColumn from "@/components/backoffice/data-table-columns/SelectBorrowUserColumn";
import TitleColumn from "@/components/backoffice/data-table-columns/TitleColumn";

export const columns = [
  // {
  //   accessorKey: "profileImage",
  //   header: "โปรไฟล์",
  //   cell: ({ row }) => <ImageColumn row={row} accessorKey="profileImage" />,
  // },
  {
    accessorKey: "prefix",
    header: ({ column }) => <TitleColumn column={column} title="คำนำ" />,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <TitleColumn column={column} title="ชื่อ-นามสกุล" />
    ),
  },
  {
    accessorKey: "codeNumber",
    header: ({ column }) => (
      <TitleColumn column={column} title="รหัสนักศึกษา" />
    ),
  },
  {
    accessorKey: "educationLevel",
    header: ({ column }) => <TitleColumn column={column} title="ระดับ" />,
  },
  {
    accessorKey: "educationYear",
    header: ({ column }) => <TitleColumn column={column} title="ปี" />,
  },
  {
    header: ({ column }) => <TitleColumn column={column} title="ยืมหนังสือ" />,
    id: "borrow",
    cell: ({ row }) => {
      const user = row.original;
      return <SelectBorrowUserColumn userId={user.userId} />;
    },
  },
  // {
  //   accessorKey: "emailAddress",
  //   header: ({ column }) => <TitleColumn column={column} title="อีเมล" />,
  // },
  // {
  //   accessorKey: "createdAt",
  //   header: ({ column }) => <DateCreatedColumn column={column} title="เข้าร่วม" />,
  //   cell: ({ row }) => (
  //     <DateCreatedColumnCell row={row} accessorKey="createdAt" />
  //   ),
  // },
];
