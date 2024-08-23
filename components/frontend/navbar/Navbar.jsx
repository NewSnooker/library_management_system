import React from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import HamburgerMenu from "./HamburgerMenu";
import { NavAvatar } from "./NavAvatar";
import SwitchTheme from "@/components/SwitchTheme";
import { SparklesTextDemo } from "../SparklesTextDemo";
import { CommandDialogDemo } from "../CommandDialogDemo";
import { Button } from "@/components/ui/button";

export default async function Navbar({ className }) {
  const session = await getServerSession(authOptions);

  return (
    <div
      className={`flex justify-between sticky top-0 backdrop-blur-xl z-40 w-full ${className}`}
    >
      <div className="block lg:hidden">
        <HamburgerMenu />
      </div>
      <Link href="/home" className="text-3xl flex items-center gap-2">
        <BookOpen width={26} height={26} className="text-custom-text" />
        <SparklesTextDemo text={"LMS"} />
      </Link>
      <div className="text-3xl flex items-center justify-center gap-1 sm:gap-4">
        <CommandDialogDemo />
        <SwitchTheme customClass={"hidden sm:block"} />
        {!session ? (
          <Link href="/login" className="flex items-center">
            <Button>Login</Button>
          </Link>
        ) : (
          <NavAvatar session={session} />
        )}
      </div>
    </div>
  );
}
