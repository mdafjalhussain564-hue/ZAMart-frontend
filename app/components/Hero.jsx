
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  {
    image: "/image/image1.png",
    productId: 30,
  },
  {
    image: "/image/image2.png",
    productId: 31,
  },
  {
    image: "/image/image3.png",
    productId: 32,
  },
  {
    image: "/image/image4.png",
    productId: 33,
  },
  {
    image: "/image/image5.png",
    productId: 34,
  },
  {
    image: "/image/image6.png",
    productId: 36,
  },
  {
    image: "/image/image7.png",
    productId: 37,
  },
  {
    image: "/image/image8.png",
    productId: 38,
  },
  {
    image: "/image/image9.png",
    productId: 39,
  },
];

const ProductCarousel = () => {
  return (
    <div className="px-4 py-5">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={70}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full lg:w-[110%] xl:w-[100%] 2xl:w-[83%]"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={`/productdetail/${item.productId}`}>
              <div className="relative w-full lg:w-[115%] xl:w-[115%] 2xl:w-[115%] h-[160px] sm:h-[300px] md:h-[350px] lg:h-[180px] xl:h-[200px] 2xl:h-[210px] rounded-xl overflow-hidden cursor-pointer">
                <Image
                  src={item.image}
                  alt={`Product ${item.productId}`}
                  fill
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;

