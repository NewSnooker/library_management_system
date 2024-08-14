import OnboardingForm from "@/components/frontend/OnboardingForm";
import Image from "next/image";
import React from "react";

export default function page({ params: { id } }) {
  return (
    <div className="w-full h-[70dvh] sm:h-full mt-20 sm:my-5 px-4 sm:flex sm:justify-center sm:items-center sm:mx-auto">
      <div className="border sm:h-full shadow-xl overflow-hidden rounded-lg">
        <div className="grid grid-cols-12">
          <div className="sm:col-span-6 hidden sm:block bg-custom-background">
            <div className="h-full">
              <Image
                src="/Bibliophile-amico.png"
                className="hidden sm:block p-5 object-cover "
                width={600}
                height={600}
                alt="Bibliophile-amico"
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 bg-card overflow-hidden ">
            <div className="flex flex-col justify-center items-center sm:h-full ">
              <div className="w-full md:mt-0 sm:max-w-md">
                <div className="px-10 py-10 space-y-4 md:space-y-6 sm:p-2">
                  <h1 className=" text-xl sm:text-3xl font-bold leading-tight tracking-tight text-center mb-6 sm:mb-5">ข้อมูลส่วนตัว</h1>
                  <OnboardingForm id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
