"use client";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import RegisterForm from "@/components/frontend/RegisterForm";
export default function Register() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="w-full h-[70dvh] sm:h-full mt-20 sm:my-5 px-4 sm:flex sm:justify-center sm:items-center sm:mx-auto">
      <div className="border sm:h-full shadow-xl overflow-hidden rounded-lg">
        <div className="grid grid-cols-12 ">
          <div className="sm:col-span-6 hidden sm:block bg-custom-background">
            <div className="h-full">
              <Image
                src="/Bibliophile-amico.png"
                data-aos="fade-left"
                data-aos-duration="1000"
                className="hidden sm:block p-5 object-cover "
                width={600}
                height={600}
                 loading="lazy"
                alt="Bibliophile-amico"
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 bg-card overflow-hidden ">
            <div className="flex flex-col justify-center items-center sm:h-full ">
              <div className="w-full md:mt-0 sm:max-w-md">
                <div className="px-10 py-10 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className=" text-lg sm:text-2xl font-bold leading-tight tracking-tight text-center mb-6 sm:mb-10">
                    ลงทะเบียนบัญชี
                  </h1>
                  <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ใช้ layout ใหม่
