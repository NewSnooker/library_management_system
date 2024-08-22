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
import { MoreHorizontal } from "lucide-react";
import DeleteBtn from "@/components/Action/DeleteBtn";
import EditBtn from "@/components/Action/EditBtn";

export default function ActionColumn({ row, title, endpoint, editEndpoint,refreshQueryKey }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteBtn endpoint={endpoint} title={title} refreshQuery={refreshQueryKey}/>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EditBtn editEndpoint={editEndpoint} title={title} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
