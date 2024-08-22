"use client";

import ActionColumn from "@/components/backoffice/data-table-columns/ActionColumn";
import DateCreatedColumn from "@/components/backoffice/data-table-columns/DateCreatedColumn";
import DateCreatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnCell";
import DateUpdatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnUpdatedCell";
import ImageColumn from "@/components/backoffice/data-table-columns/ImageColumn";
import TitleColumn from "@/components/backoffice/data-table-columns/TitleColumn";



export const columns = [
  {
    accessorKey: "imageUrl",
    header: "รูปภาพ",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <TitleColumn column={column} title="ชื่อหมวดหมู่" />,
  },
  // {
  //   accessorKey: "description",
  //   header: ({ column }) => <TitleColumn column={column} title="รายละเอียด" />,
  // },
  {
    accessorKey: "creator",
    header: ({ column }) => <TitleColumn column={column} title="ผู้สร้าง" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DateCreatedColumn column={column} title="วันที่สร้าง" />
    ),
    cell: ({ row }) => (
      <DateCreatedColumnCell row={row} accessorKey="createdAt" />
    ),
  },
  {
    accessorKey: "updater",
    header: ({ column }) => <TitleColumn column={column} title="ผู้อัพเดท" />,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DateCreatedColumn column={column} title="อัพเดท" />
    ),
    cell: ({ row }) => (
      <DateUpdatedColumnCell row={row} accessorKey="updatedAt" />
    ),
  },
  {
    header: "จัดการ",
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <ActionColumn
          row={row}
          title="จัดการ"
          refreshQueryKey="categories"
          endpoint={`admin/categories/${category.id}`}
          editEndpoint={`categories/update/${category.id}`}
        />
      );
    },
  },
];
