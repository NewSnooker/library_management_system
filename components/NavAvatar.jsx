import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Image from "next/image";
import { BorderBeam } from "./magicui/border-beam";
import SwitchTheme from "./SwitchTheme";
export function NavAvatar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-xl">CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <div className="mb-2 sm:mb-4 flex items-center justify-center relative ">
            <SwitchTheme
              customClass="block sm:hidden absolute -top-3 -left-3"
              inSheet={true}
            />
            <div className="relative overflow-hidden rounded-full border bg-background">
              {" "}
              <Image
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                width={100}
                height={100}
                className="rounded-full p-1"
              />
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          </div>
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
        <SheetFooter>
          <SheetClose className="mt-4 sm:mt-6 flex justify-end gap-2">
            <div className="flex gap-2">
              <div className="py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800  dark:hover:bg-zinc-100 text-white dark:text-black text-sm font-semibold transition-colors border">
                แดชบอร์ด
              </div>
              <div className="py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800  dark:hover:bg-zinc-100 text-white dark:text-black text-sm font-semibold transition-colors border">
                คั้งค่าโปรไฟล์
              </div>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
