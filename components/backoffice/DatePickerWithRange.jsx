"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { th } from "date-fns/locale"; // นำเข้า locale ภาษาไทย

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({ className }) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Button
        id="date"
        variant={"outline"}
        className={cn(
          "w-[280px]ห justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date?.from ? (
          date.to ? (
            <>
                {format(date.from, "dd LLLL yyyy", { locale: th })} - {format(date.to, "dd LLLL yyyy", { locale: th })}
            </>
          ) : (
            format(date.from, "dd LLLL yyyy", { locale: th })
          )
        ) : (
            <span>เลือกวันที่</span>
        )}
      </Button>
      <div className="w-auto p-0">
        <Calendar
          initialFocus
          mode="range"
          selected={date}
          onSelect={setDate}
          numberOfMonths={1}
        />
      </div>
    </div>
  );
}
