"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const SwitchTheme = ({ customClass = "", inSheet = false }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true));

  if (!mounted) {
    return null;
  }

  const handleSwitchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div>
      {!inSheet ? (
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            className={`${customClass} bg-custom-text dark:bg-custom-background border border-custom-border text-zinc-100` }
            onClick={handleSwitchTheme}
          >
            {theme === "dark" ? (
              <SunIcon className=" w-4 sm:w-3 " />
            ) : (
              <MoonIcon className=" w-4 sm:w-3 " />
            )}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div
            className={
              "py-1 px-1 rounded-lg text-black dark:text-white text-sm font-semibold transition-colors border" +
              customClass
            }
            onClick={handleSwitchTheme}
          >
            {theme === "dark" ? (
              <SunIcon className=" w-4 sm:w-3 " />
            ) : (
              <MoonIcon className=" w-4 sm:w-3 " />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SwitchTheme;
