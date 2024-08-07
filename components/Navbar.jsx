import React from "react";
import SwitchTheme from "./SwitchTheme";
import { SparklesTextDemo } from "./font/SparklesTextDemo";
import { BookOpen } from "lucide-react";
import { NavAvatar } from "./NavAvatar";

export default function Navbar() {
  return (
    <div className="flex justify-between max-w-7xl mx-auto py-2 sm:py-3 px-4">
      {" "}
      <div className="text-3xl flex items-center gap-2">
        <BookOpen width={26} height={26} />
        <SparklesTextDemo text={"LMS"} />
      </div>
      <div className="text-3xl flex items-center justify-center gap-4">
        <SwitchTheme />
        <NavAvatar />
      </div>
    </div>
  );
}
