"use client";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

export default function CarouselBook({ book }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        centeredSlides={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <div className="flex justify-center w-full">
          {book.imageUrls.map((item, i) => {
            return (
              <SwiperSlide key={i} className="">
                <Image
                  src={item}
                  alt={item}
                  width={160}
                  height={160}
                  className="object-cover rounded-md mx-auto "
                  loading="lazy"
                />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-5 "
      >
        {book.imageUrls.map((item, i) => {
          return (
            <SwiperSlide key={i} className="w-full">
              <Image
                src={item}
                alt={item}
                width={40}
                height={40}
                className="object-cover rounded-sm"
                loading="lazy"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
