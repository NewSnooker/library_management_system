"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    console.log(data);
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users/forgot-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        setShowNotification(true);
        reset();
        toast.success("Password reset link sent Successfully");
      }
      if (response.status === 404) {
        toast.error(responseData.message || "Something Went wrong");
        setLoading(false);
      }
      if (response.status === 409) {
        toast.error(responseData.message || "Something Went wrong");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      {showNotification && (
        <div className="mt-2 mb-4 text-sm ">
          <span className="text-custom-text dark:text-red-400">กรุณาตรวจสอบอีเมลของคุณ!</span>{" "}
          เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปให้คุณแล้วคลิกลิงก์เพื่อสร้างรหัสผ่านใหม่
        </div>
      )}
      {!showNotification && (
        <div className="mt-2 mb-4 text-sm text-muted-foreground">
          กรอกอีเมลของคุณ ทางเราจะส่งลิงก์เพื่อเปลี่ยนรหัสผ่านของคุณ
        </div>
      )}
      <div>
        <Label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </Label>
        <Input
          {...register("email", { required: true })}
          type="email"
          name="email"
          id="email"
          className=""
          placeholder="Email@company.com"
          required=""
        />
        {errors.email && (
          <small className="text-red-600 text-sm ">
            จำเป็นต้องกรอกข้อมูล
          </small>
        )}
      </div>
      {loading ? (
        <Button disabled className="w-full">
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-white dark:text-black animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          กำลังดำเนินการ
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          ส่งอีเมล รีเซ็ตรหัสผ่าน
        </Button>
      )}

      <div className="flex gap-2 justify-center sm:justify-between">
        <p className="  text-[0.75rem] font-light text-gray-500 dark:text-gray-400">
          คุณจำรหัสผ่านได้แล้วหรือไม่?{" "}
          <Link href="/login" className="font-medium text-custom-text">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
