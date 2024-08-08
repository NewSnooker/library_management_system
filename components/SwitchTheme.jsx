"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

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
    <Button variant="outline" onClick={handleSwitchTheme}>
      {theme === "dark" ? (
        <MoonIcon className=" w-4 sm:w-3 " />
      ) : (
        <SunIcon className=" w-4 sm:w-3 " />
      )}
    </Button>
  );
};

export default SwitchTheme;
