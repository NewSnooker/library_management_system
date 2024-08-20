"use client";

import ActionColumn from "@/components/backoffice/data-table-columns/ActionColumn";
import DateCreatedColumn from "@/components/backoffice/data-table-columns/DateCreatedColumn";
import DateCreatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnCell";
import DateUpdatedColumnCell from "@/components/backoffice/data-table-columns/DateCreatedColumnUpdatedCell";
import TitleColumn from "@/components/backoffice/data-table-columns/TitleColumn";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => <TitleColumn column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TitleColumn column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <TitleColumn column={column} title="Role" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DateCreatedColumn column={column} title="Date Created" />
    ),
    cell: ({ row }) => (
      <DateCreatedColumnCell row={row} accessorKey="createdAt" />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DateCreatedColumn column={column} title="Updated" />
    ),
    cell: ({ row }) => (
      <DateUpdatedColumnCell row={row} accessorKey="updatedAt" />
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <ActionColumn
          row={row}
          title="Book"
          endpoint={`users/${customer.id}`}
          editEndpoint={`customers/update/${customer.id}`}
          
        />
      );
    },
  },
];
