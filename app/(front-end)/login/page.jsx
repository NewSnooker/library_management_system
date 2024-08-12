"use client";
// app/(front-end)/login/page.jsx
import LoginForm from "@/components/frontend/LoginForm";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="grid grid-cols-12 h-[80dvh] sm:h-full sm:mt-12">
      <div className="sm:col-span-6 hidden sm:block">
        <div className="flex justify-center">
          <Image
            src="/Bibliophile-amico.png"
            data-aos="fade-left"
            data-aos-duration="1400"
            className="hidden sm:block "
            width={500}
            height={500}
            alt="Bibliophile-amico"
          />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 h-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-full">
          <div className="w-full bg-card rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  text-center">
                Login to Account
              </h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
