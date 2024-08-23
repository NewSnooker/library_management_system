"use client";

import ActionColumn from "@/components/backoffice/data-table-columns/ActionColumn";
import ActionStatusColumn from "@/components/backoffice/data-table-columns/ActionStatusColumn";
import DateCreatedColumn from "@/components/backoffice/data-table-columns/DateCreatedColumn";
import DateCreatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnCell";
import DateUpdatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnUpdatedCell";
import ImageColumn from "@/components/backoffice/data-table-columns/ImageColumn";
import NumberColumn from "@/components/backoffice/data-table-columns/NumberColumn";
import TitleColumn from "@/components/backoffice/data-table-columns/TitleColumn";

export const columns = [
  {
    accessorKey: "imageUrl",
    header: "รูปภาพ",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <TitleColumn column={column} title="ชื่อ" />,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <TitleColumn column={column} title="ราคา" />,
    cell: ({ row }) => <NumberColumn row={row} accessorKey="price" />,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <TitleColumn column={column} title="จํานวน" />,
    cell: ({ row }) => <NumberColumn row={row} accessorKey="quantity" />,
  },
  {
    accessorKey: "active",
    header: ({ column }) => <TitleColumn column={column} title="สถานะ" />,
    id: "active",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <ActionStatusColumn
          row={row}
          title="สถานะ"
          accessorKey="active"
          bookId={book.id}
        />
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => <TitleColumn column={column} title="สถานะ" />,
  //   cell: ({ row }) => <StatusColumn row={row} accessorKey="status" />,
  // },

  //   {
  //   accessorKey: "author",
  //   header: ({ column }) => <TitleColumn column={column} title="ชื่อผู้แต่ง" />,
  // },
  {
    accessorKey: "creator",
    header: ({ column }) => <TitleColumn column={column} title="ผู้สร้าง" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DateCreatedColumn column={column} title="สร้าง" />,
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
      const book = row.original;
      return (
        <ActionColumn
          row={row}
          title="หนังสือ"
          refreshQueryKey="books"
          endpoint={`admin/books/${book.id}`}
          editEndpoint={`books/update/${book.id}`}
        />
      );
    },
  },
];
