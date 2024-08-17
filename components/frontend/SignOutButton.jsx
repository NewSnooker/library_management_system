"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };
  return (
    <div
      onClick={() => handleLogout()}
      className="py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800  dark:hover:bg-zinc-100 text-white dark:text-black text-sm font-semibold transition-colors border"
    >
      ออกจากระบบ
    </div>
  );
}
