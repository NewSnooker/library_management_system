"use client";

import * as React from "react";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import { Book, Search } from "lucide-react";
import { DialogTitle } from "../ui/dialog";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booksAll"],
    queryFn: () => getData("all/books"),
  });
  if (error) {
    <div className=""> Error: {error.message}</div>;
  }

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className="text-sm sm:text-muted-foreground flex gap-2 group">
        {books && (
          <Button
            className="py-4 px-2.5  "
            variant="outline"
            onClick={() => setOpen(true)}
          >
            {" "}
            <Search className="w-4 sm:w-3 sm:mr-2 " />{" "}
            <span className="hidden sm:inline">ค้นหาหนังสือ...</span>
            <kbd className="hidden sm:inline-flex pointer-events-none group-hover:bg-white dark:group-hover:bg-black dark:group-hover:text-white  h-5 select-none items-center ml-2 gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs ">⌘</span>J
            </kbd>
          </Button>
        )}
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="คำที่ค้นหา">
            {books?.map((book) => (
              <Link
                href={`/books/${book.slug}`}
                className="cursor-pointer"
                key={book.id}
                onClick={() => setOpen(false)}
              >
                <CommandItem value={book.title}>
                  <Book className="mr-2 h-4 w-4" />
                  <span>{book.title}</span>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
