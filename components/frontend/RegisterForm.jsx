"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SubmitButton from "../formInputs/SubmitButton";
import TextInput from "../formInputs/TextInput";
import { isLoading } from "@/redux/slices/loadingFullScreenSlice";
import { useDispatch } from "react-redux";

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  async function onSubmit(data) {
    try {
      setLoading(true);
      dispatch(isLoading(true));
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      console.log(baseUrl);

      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setEmailErr("");
        setLoading(false);
        dispatch(isLoading(false));
        toast.success("สร้างบัญชีผู้ใช้สําเร็จ");
        reset();
        router.push(`/verify-email`);
      } else {
        setLoading(false);
        dispatch(isLoading(false));
        if (response.status === 409) {
          setEmailErr("มีบัญชีในระบบแล้ว");
          toast.error("มีบัญชีในระบบแล้ว");
        } else {
          console.error("Server Error:", responseData.error || responseData);
          toast.error("Oops Something Went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      dispatch(isLoading(false));
      console.error("Network Error:", error);
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <TextInput
        label="ชื่อผู้ใช้"
        name="username"
        register={register}
        errors={errors}
        className=""
      />

      <TextInput
        label="Email "
        name="email"
        register={register}
        errors={errors}
        type="email"
        className=""
      />
      <TextInput
        label="รหัสผ่าน"
        name="password"
        register={register}
        errors={errors}
        type="password"
        className=""
      />
      {emailErr && (
        <div className="text-sm text-red-600 dark:text-red-400 -mt-3 mb-2">
          {emailErr}
        </div>
      )}
      <div className="w-full">
        <SubmitButton
          isLoading={loading}
          buttonTitle="ลงทะเบียน"
          LoadingButtonTitle="กําลังสร้างบัญชี..."
          className="w-full mt-2 sm:text-lg"
        />
      </div>

      <div className="mt-2">
        <Link href="/forgot-password" className="font-medium text-sm ">
          ลืมรหัสผ่าน
        </Link>
      </div>

      <div className="flex items-center ">
        <div className="w-full bg-border h-[1px]"></div>
        <span className="mx-2">or</span>
        <div className="w-full bg-border h-[1px]"></div>
      </div>

      <div className="flex gap-2 justify-center sm:justify-between">
        <p className="  text-[0.75rem] font-light text-gray-500 dark:text-gray-400">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/login" className="font-medium text-custom-text">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </form>
  );
}
