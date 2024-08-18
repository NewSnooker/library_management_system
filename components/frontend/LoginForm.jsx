"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { isLoading } from "@/redux/slices/loadingFullScreenSlice";
import { useDispatch } from "react-redux";
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function onSubmit(data) {
    try {
      setLoading(true);
      dispatch(isLoading(true));
      console.log("Attempting to sign in with credentials");
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
  
      if (loginData?.error) {
        setLoading(false);
        dispatch(isLoading(false));
        toast.error(`Sign-in error: ${loginData.error}`);
      } 

      else {
        // Sign-in was successful
        setLoading(false);
        reset();
        router.push("/home");
        setTimeout(()=>{
          window.location.reload();
        }, 2000);
        
        dispatch(isLoading(false));
        toast.success("Login Successful");
      }
    } catch (error) {
      setLoading(false);
      dispatch(isLoading(false));
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
      <div>
        <Label htmlFor="email" className="block text-sm font-medium leading-6 mb-1">
          Email
        </Label>
        <Input
          {...register("email", { required: true })}
          type="email"
          name="email"
          id="email"
          className=""
          placeholder="your@gmail.com"
        />
        {errors.email && (
          <small className="text-red-600 text-sm ">
            จำเป็นต้องกรอกข้อมูล
          </small>
        )}
      </div>
      <div>
        <Label htmlFor="password" className="block text-sm font-medium leading-6 mb-1">
          รหัสผ่าน
        </Label>
        <Input
          {...register("password", { required: true })}
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className=""
        />
        {errors.password && (
          <small className="text-red-600 text-sm ">
            จำเป็นต้องกรอกข้อมูล
          </small>
        )}
      </div>
      <div className="">
        {loading ? (
          <Button disabled type="button" className="w-full mt-2 sm:text-lg">
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
            กำลังเข้าสู่ระบบ
          </Button>
        ) : (
          <Button type="submit" className="w-full mt-2 sm:text-lg">
           เข้าสู่ระบบ
          </Button>
        )}
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
        ยังไม่ได้เป็นสมาชิก? {" "}
          <Link href="/register" className="font-medium text-custom-text">
          สมัครสมาชิก
          </Link>
        </p>
      </div>
    </form>
  );
}
