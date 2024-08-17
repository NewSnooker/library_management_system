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
import SignOutButton from "./frontend/SignOutButton";
import { getData } from "@/lib/getData";
import { generateInitials } from "@/lib/generateInitials";
import Link from "next/link";
export async function NavAvatar({ session }) {
  const { id, role } = session?.user;
  const {
    username,
    emailAddress,
    prefix,
    fullName,
    codeNumber,
    phoneNumber,
    educationLevel,
    educationYear,
    description,
    profileImage,
  } = await getData(`users/user-profile/${id}`);
  const roleAdmin = role === "ADMIN";
  const initial = generateInitials(username);

  return (
    <Sheet>
      <SheetTrigger>
        <Avatar>
          <AvatarImage src={profileImage} alt={username} />
          <AvatarFallback className="text-xl border">{initial}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <div className="mb-2 sm:mb-4 flex items-center justify-center relative ">
            <SwitchTheme
              customClass=" absolute -top-3 -left-3"
              inSheet={true}
            />
            <div className="relative overflow-hidden rounded-full border bg-background">
              {" "}
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={username}
                  width={100}
                  height={100}
                  className="rounded-full p-1"
                />
              ) : (
                <Avatar className="w-[100px] h-[100px]">
                  <AvatarFallback className="text-5xl font-bold rounded-full ">
                    {initial}
                  </AvatarFallback>
                </Avatar>
              )}
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          </div>
          <div className="flex justify-center items-center pb-4">
            <SheetTitle>{username}</SheetTitle>
          </div>
            <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
            ชื่อผู้ใช้
            </Label>
            <Input
              disabled
              id="fullName"
              value={fullName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emailAddress" className="text-right">
              อีเมล
            </Label>
            <Input
              disabled
              id="emailAddress"
              value={emailAddress}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="codeNumber" className="text-right">
              รหัสนักศึกษา
            </Label>
            <Input
              disabled
              id="codeNumber"
              value={codeNumber}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              เบอร์โทรศัพท์
            </Label>
            <Input
              disabled
              id="phoneNumber"
              value={phoneNumber}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose
            className={`mt-4 sm:mt-6 flex ${
              roleAdmin ? "flex-col" : ""
            } items-end justify-end gap-2`}
          >
            <div className="flex gap-2">
              {roleAdmin && (
                <div className="py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800  dark:hover:bg-zinc-100 text-white dark:text-black text-sm font-semibold transition-colors border">
                  แดชบอร์ด
                </div>
              )}

              <Link href={`/setting/profile/${id}`} className="py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800  dark:hover:bg-zinc-100 text-white dark:text-black text-sm font-semibold transition-colors border">
                ตั้งค่าโปรไฟล์
              </Link>
            </div>
            <SignOutButton />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
