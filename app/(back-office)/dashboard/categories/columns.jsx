"use client";

import ActionColumn from "@/components/backoffice/data-table-columns/ActionColumn";
import DateCreatedColumn from "@/components/backoffice/data-table-columns/DateCreatedColumn";
import DateCreatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnCell";
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

  {
    accessorKey: "description",
    header: ({ column }) => <TitleColumn column={column} title="รายละเอียด" />,
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
  // {
  //   header: "Actions",
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const category = row.original;
  //     return (
  //       <ActionColumn
  //         row={row}
  //         title="Category"
  //         endpoint={`admin/categories/${category.id}`}
  //         editEndpoint={`admin/categories/update/${category.id}`}
  //       />
  //     );
  //   },
  // },
];
