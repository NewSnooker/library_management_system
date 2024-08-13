"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "@/components/magicui/particles";
import Image from "next/image";
import { BookText } from "lucide-react";

const ParticlesDemo = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#FFFFFF");
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#B81A1A");
  }, [theme]);

  return (
    <div className="relative px-4 sm:px-60 flex h-[620px] sm:h-[690px] w-full items-center justify-between overflow-hidden rounded-lg  bg-background ">
      <div className=" ml-10  ">
        <div className=" text-4xl sm:text-6xl font-bold">
          <div data-aos="fade-up" data-aos-duration="1000">
            Library{" "}
          </div>
          <div data-aos="fade-up" data-aos-duration="1200">
            Management{" "}
          </div>
          <div className="grid grid-cols-2 items-end" data-aos="fade-up" data-aos-duration="1250">
            <div>
              <div >
                System
              </div>
              <div
                className="mt-2 text-5xl sm:text-7xl "
              >
                UDVC
              </div>
            </div>
            <BookText  className="w-[120px] h-[85px] sm:h-[120px] font-thin text-sm sm:font-bold"  />
          </div>
        </div>
        <div
          className="mt-4 mb-8 text-xl"
          data-aos="fade-up"
          data-aos-duration="1400"
        >
          {" "}
          ระบบยืม-คืน ห้องสมุด ออนไลน์
        </div>
      </div>
      <Image
        src="/Bibliophile-amico.png"
        data-aos="fade-left"
        data-aos-duration="1400"
        className="hidden sm:block "
        width={500}
        height={500}
        alt="Bibliophile-amico"
      />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};

export default ParticlesDemo;
