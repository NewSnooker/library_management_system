import React from "react";
import SwitchTheme from "./SwitchTheme";
import { SparklesTextDemo } from "./frontend/SparklesTextDemo";
import { BookOpen } from "lucide-react";
import { NavAvatar } from "./NavAvatar";
import { CommandDialogDemo } from "./frontend/CommandDialogDemo";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Navbar({ className }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div
      className={`flex justify-between sticky top-0 backdrop-blur-xl z-50 w-full ${className}`}
    >
      <div className="block lg:hidden">
        <HamburgerMenu />
      </div>
      <Link href="/" className="text-3xl flex items-center gap-2">
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
          <NavAvatar />
        )}
      </div>
    </div>
  );
}
