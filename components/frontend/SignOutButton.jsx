"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { isLoading } from "@/redux/slices/loadingFullScreenSlice";

export default function SignOutButton() {
    const router = useRouter();
    const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(isLoading(true));

    await signOut();
    router.replace("/login");
    dispatch(isLoading(false));

  };
  return (
    <div
      onClick={() => handleLogout()}
      className="py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800  dark:hover:bg-zinc-100 text-white dark:text-black text-sm font-semibold border"
    >
      ออกจากระบบ
    </div>
  );
}
