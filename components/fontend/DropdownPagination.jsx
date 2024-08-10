import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationEllipsis } from "../ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DropdownPagination() {
    const pag = Array.from({ length: 10 }).map(
        (_, i) => `${i+1}`
      )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <div className="cursor-pointer">
          <PaginationEllipsis />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[2rem]">
        <DropdownMenuLabel>Page</DropdownMenuLabel>
      <ScrollArea className="h-72">
        <DropdownMenuSeparator />
        {
            pag.map((p) => <DropdownMenuItem key={p}>{p}</DropdownMenuItem>)
        }
    </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
