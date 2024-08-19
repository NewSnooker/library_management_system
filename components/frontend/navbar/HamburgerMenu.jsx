"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { BookText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/lib/sidebarLink";
import SwitchTheme from "@/components/SwitchTheme";

export default function HamburgerMenu() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center p-2 rounded-sm border border-custom-border bg-custom-background text-zinc-100">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className={" relative"}>
          <SwitchTheme
            customClass="block sm:hidden absolute -top-3 -left-3"
            inSheet={true}
          />
          <SheetTitle className="flex items-center justify-center border-b text-2xl pb-2 ">
            <BookText className="mr-1 w-5" /> UDVC
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center mt-4 relative">
          <div>
            {sidebarLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={i} className="flex flex-col">
                  <SheetClose>
                    <div
                      className={
                        item.href === pathname
                          ? "flex border-l-4 pl-2.5 mb-5 font-bold border-zinc-600 text-zinc-700 dark:text-zinc-400"
                          : "flex mb-4"
                      }
                    >
                      <Icon className="mr-2 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SheetClose>
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
