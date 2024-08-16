"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SubmitButton from "../formInputs/SubmitButton";
import TextInput from "../formInputs/TextInput";

export default function RegisterForm() {
  const router = useRouter();
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
        toast.success("User Created Successfully");
        reset();
        router.push(`/verify-email`);
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          console.error("Server Error:", responseData.error || responseData);
          toast.error("Oops Something Went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something Went wrong, Please Try Again");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <TextInput
        label="User name"
        name="username"
        register={register}
        errors={errors}
        className=""
      />

      <TextInput
        label="Email Address"
        name="email"
        register={register}
        errors={errors}
        type="email"
        className=""
      />
      <TextInput
        label="Password"
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
          buttonTitle="Register"
          LoadingButtonTitle="Creating please wait..."
          className="w-full mt-2 sm:text-lg"
        />
      </div>

      <div className="mt-2">
        <Link href="/forgot-password" className="font-medium text-sm ">
          Forgot Password
        </Link>
      </div>

      <div className="flex items-center ">
        <div className="w-full bg-border h-[1px]"></div>
        <span className="mx-2">or</span>
        <div className="w-full bg-border h-[1px]"></div>
      </div>

      <div className="flex gap-2 justify-center sm:justify-between">
        <p className="  text-[0.75rem] font-light text-gray-500 dark:text-gray-400">
          Already have an Account?{" "}
          <Link href="/login" className="font-medium text-custom-text">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
