"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { getData } from "@/lib/getData";
import { generateInitials } from "@/lib/generateInitials";
import SwitchTheme from "@/components/SwitchTheme";
import SignOutButton from "../SignOutButton";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function NavAvatar({ session }) {
  const { id, role } = session?.user;

  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getData(`users/user-profile/${id}`),
  });

  const username = userProfile?.username || "";
  const emailAddress = userProfile?.emailAddress || "";
  const fullName = userProfile?.fullName || "";
  const codeNumber = userProfile?.codeNumber || "";
  const phoneNumber = userProfile?.phoneNumber || "";
  const description = userProfile?.description || "";
  const profileImage = userProfile?.profileImage || "";
  const initial = generateInitials(username);
  const roleAdmin = role === "ADMIN";

  if (isLoading)
    return <Skeleton className="w-[40px] h-[40px] rounded-full border" />;
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
            <div className="relative overflow-hidden w-[100px] h-[100px] rounded-full border bg-background">
              {" "}
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={username}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="rounded-full w-[100px] h-[100px] p-1"
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
            <SheetTitle>
              {roleAdmin ? "Admin" : ""} {username}
            </SheetTitle>
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
                <a href={`/dashboard/books?username=${username}&?id=${id}`}>
                  <div className="py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800  dark:hover:bg-zinc-100 text-white dark:text-black text-sm font-semibold border">
                    แดชบอร์ด
                  </div>
                </a>
              )}

              <a href={`/setting/profile/${id}`}>
                <div className="py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800  dark:hover:bg-zinc-100 text-white dark:text-black text-sm font-semibold border">
                  ตั้งค่าโปรไฟล์
                </div>
              </a>
            </div>
            <SignOutButton />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
