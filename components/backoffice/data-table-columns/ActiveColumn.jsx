import React from 'react'
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function ActiveColumn({column}) {
    return (
        <Button
          className=" -m-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
}
