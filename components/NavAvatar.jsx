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
export function NavAvatar() {
  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-xl">CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mb-2 sm:mb-4 flex items-center justify-center  ">
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
          <SheetClose className="mt-4 sm:mt-6 flex justify-end gap-4">
              <Button>Edit profile</Button>
              <Button>Logout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
