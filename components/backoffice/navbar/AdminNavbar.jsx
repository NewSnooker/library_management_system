import React from "react";
import { SparklesTextDemo } from "../../frontend/SparklesTextDemo";
import { BookOpen } from "lucide-react";
import { CommandDialogDemo } from "../../frontend/CommandDialogDemo";
import Link from "next/link";
import { Button } from "../../ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NavAvatar } from "@/components/frontend/navbar/NavAvatar";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import SwitchTheme from "@/components/SwitchTheme";

export default async function AdminNavbar({ className }) {
  const session = await getServerSession(authOptions);

  return (
    <div
      className={`flex justify-between sticky top-0 backdrop-blur-xl z-40 w-full ${className}`}
    >
      <div className="block lg:hidden">
        <AdminHamburgerMenu />
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
          <NavAvatar session={session} />
        )}
      </div>
    </div>
  );
}
