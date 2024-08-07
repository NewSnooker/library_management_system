"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const SwitchTheme = () => {
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
    <button
      className="border relative mt-4 h-[1.2rem] w-[1.2rem] p-4 rounded-md hover:opacity-70"
      onClick={handleSwitchTheme}
    >
      <SunIcon className="absolute top-2 left-2 scale-0 dark:scale-100 " />
      <MoonIcon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0" />
    </button>
  );
};

export default SwitchTheme;