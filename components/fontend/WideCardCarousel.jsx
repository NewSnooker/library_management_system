"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
// import "swiper/css/scrollbar";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
export default function WideCardCarousel() {
  const images = [
    {
      title: "Title",
      imageUrl:
        "https://images.unsplash.com/photo-1513127696622-593a20aec127?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryBook: "category",
    },
    {
      title: "Title",
      imageUrl:
        "https://images.unsplash.com/photo-1513127696622-593a20aec127?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryBook: "category",
    },
    {
      title: "Title",
      imageUrl:
        "https://images.unsplash.com/photo-1513127696622-593a20aec127?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryBook: "category",
    },
    {
      title: "Title",
      imageUrl:
        "https://images.unsplash.com/photo-1513127696622-593a20aec127?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryBook: "category",
    },
    {
      title: "Title",
      imageUrl:
        "https://images.unsplash.com/photo-1513127696622-593a20aec127?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryBook: "category",
    },
    {
      title: "Title",
      imageUrl:
        "https://images.unsplash.com/photo-1513127696622-593a20aec127?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryBook: "category",
    },
    {
      title: "Title",
      imageUrl:
        "https://images.unsplash.com/photo-1513127696622-593a20aec127?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryBook: "category",
    },
  ];
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      breakpoints={{
        400: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        490: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        540: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        780: {
          slidesPerView: 5,
          spaceBetween: 0,
        },
      }}
      className="mb-6 mySwiper"
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <Link href={"/"} className=" flex flex-col justify-center items-center overflow-hidden w-full">
            <Image
              src={image.imageUrl}
              alt={image.title}
              width={200}
              height={100}
              className="object-cover w-28 h-36 rounded-sm "
            />
              <p className="text-sm sm:text-lg line-clamp-1 mt-2">
                {image.title}
              </p>
              <p className="text-sm line-clamp-1 text-muted-foreground ">
                {image.categoryBook}
              </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
