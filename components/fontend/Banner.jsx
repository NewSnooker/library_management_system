"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar,Autoplay } from "swiper/modules";
import Image from "next/image";
export default function Banner() {
  const images = [
    {
      title: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1553686308-633f8656b49a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "2",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      scrollbar={{
        hide: true,
      }}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      modules={[Scrollbar,Autoplay]}
      className="mb-4"
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          {" "}
          <div className=" h-96 rounded-sm overflow-hidden">
            <Image
              src={image.imageUrl}
              alt={image.title}
              width={1400}
              height={400}
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
