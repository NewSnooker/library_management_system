import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BorderBeam } from "./magicui/border-beam";
import SwitchTheme from "./SwitchTheme";
import Image from "next/image";

export default function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center p-2 rounded-sm bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border" >
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side="left">
      <SheetHeader>
          <SheetTitle>User profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              ชื่อผู้ใช้
            </Label>
            <Input
              disabled
              id="name"
              value="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              อีเมล
            </Label>
            <Input
              disabled
              id="username"
              value="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              รหัสนักศึกษา
            </Label>
            <Input
              disabled
              id="username"
              value="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              เบอร์โทรศัพท์
            </Label>
            <Input
              disabled
              id="username"
              value="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>

      </SheetContent>
    </Sheet>
  );
}
