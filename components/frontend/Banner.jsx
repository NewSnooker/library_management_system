"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
export default function Banner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="w-full mb-4 border bg-card rounded-sm">
        <Skeleton className=" h-36 sm:h-96 rounded-sm" />
      </div>
    );

  const banners = [
    {
      title: "Title",
      imageUrl:
        "https://images.unsplash.com/photo-1553686308-633f8656b49a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Title",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    // <div className="relative ">
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{
        hide: true,
      }}
      rewind={true}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      modules={[Scrollbar, Autoplay]}
      className="mb-4"
    >
      {banners.map((image, i) => (
        <SwiperSlide key={i}>
          {" "}
          <div className="border bg-card h-36 sm:h-96 rounded-sm overflow-hidden">
            <Image
              src={image.imageUrl}
              alt={image.title}
              width={1400}
              height={400}
              loading="lazy"
              className="object-cover rounded-sm"
            />
          </div>
          {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
              <div className="text-black text-3xl sm:text-5xl font-bold">{image.title}</div>
            </div> */}
        </SwiperSlide>
      ))}
    </Swiper>
    // </div>
  );
}
