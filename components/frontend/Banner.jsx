"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/getData";
export default function Banner() {
  const {
    data: banners,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: () => getData("all/banners"),
  });
  if (isLoading)
    return (
      <div className="w-full mb-4 border bg-card rounded-sm">
        <Skeleton className=" h-36 sm:h-96 rounded-sm" />
      </div>
    );
    if (error) return <div>{error.message}</div>;
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
      {banners.imageUrls &&
        banners.imageUrls.length > 0 &&
        banners.imageUrls.map((imageUrl, i) => (
          <SwiperSlide key={i}>
            {" "}
            <div className="border bg-card rounded-sm overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageUrl}
                width={1280}
                height={450}
                loading="lazy"
                className="object-cover h-36 sm:h-[450px] w-full rounded-sm"
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
    // </div>
  );
}
