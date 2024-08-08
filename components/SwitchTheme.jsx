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
            className={customClass}
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
              "py-[13px] px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800  dark:hover:bg-zinc-100 text-white dark:text-black text-sm font-semibold transition-colors border" +
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
