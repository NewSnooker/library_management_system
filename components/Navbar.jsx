import React from "react";
import SwitchTheme from "./SwitchTheme";
import { SparklesTextDemo } from "./fontend/SparklesTextDemo";
import { BookOpen } from "lucide-react";
import { NavAvatar } from "./NavAvatar";
import { CommandDialogDemo } from "./fontend/CommandDialogDemo";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
  return (
    <div className="flex justify-between max-w-7xl mx-auto py-2 sm:py-3 px-4 sticky top-0 backdrop-blur-xl z-50 border-b">
      <div className="block sm:hidden">
        <HamburgerMenu />
      </div>
      <div className="text-3xl flex items-center gap-2">
        <BookOpen width={26} height={26} />
        <SparklesTextDemo text={"LMS"} />
      </div>
      <div className="text-3xl flex items-center justify-center gap-2 sm:gap-4">
        <CommandDialogDemo />
        <SwitchTheme customClass={"hidden sm:block"} />
        <NavAvatar />
      </div>
    </div>
  );
}
