import React from "react";
import SwitchTheme from "./SwitchTheme";
import { SparklesTextDemo } from "./frontend/SparklesTextDemo";
import { BookOpen } from "lucide-react";
import { NavAvatar } from "./NavAvatar";
import { CommandDialogDemo } from "./frontend/CommandDialogDemo";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex  justify-between max-w-7xl mx-auto py-2 sm:py-3 px-4 sticky top-0 backdrop-blur-xl z-50 border-b">
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
        {/* <NavAvatar /> */}
        <Link href="/login" className="flex items-center">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
}
