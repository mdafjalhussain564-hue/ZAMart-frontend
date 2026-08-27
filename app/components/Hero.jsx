
// "use client";

// import React from "react";
// import Image from "next/image";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const images = [
//   "/image/image1.png",
//   "/image/image2.png",
//   "/image/image3.png",
//   "/image/image4.png",
//   "/image/image5.png",
//   "/image/image6.png",
//   "/image/image7.png",
//   "/image/image8.png",
//   "/image/image9.png",
// ];

// const ProductCarousel = () => {
//   return (
//     <div className=" px-4 py-5">

//       <Swiper
//         modules={[Autoplay, Navigation, Pagination]}
//         spaceBetween={70}
//         slidesPerView={3}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         loop={true}

//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//           },
//           1024: {
//             slidesPerView: 3,
//           },
//         }}
//         className=" w-full lg:w-[110%] xl:w-[100%] 2xl:w-[83%]"
//       >

//         {images.map((image, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full lg:w-[115%]  xl:w-[115%] 2xl:w-[115%] h-[160px] sm:h-[300px] md:h-[350px]  lg:h-[180px] xl:h-[200px] 2xl:h-[210px] rounded-xl overflow-hidden">
//               <Image
//                 src={image}
//                 alt={`Banner ${index + 1}`}
//                 fill
//                 className="object-cover"
//                 priority={index < 3}
//               />

//             </div>
//           </SwiperSlide>
//         ))}

//       </Swiper>

//     </div>
//   );
// };

// export default ProductCarousel;




// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const images = [
//   {
//     image: "/image/image1.png",
//     productId: 5,
//   },
//   {
//     image: "/image/image2.png",
//     productId: 8,
//   },
//   {
//     image: "/image/image3.png",
//     productId: 12,
//   },
//   {
//     image: "/image/image4.png",
//     productId: 15,
//   },
//   {
//     image: "/image/image5.png",
//     productId: 20,
//   },
//   {
//     image: "/image/image6.png",
//     productId: 25,
//   },
//   {
//     image: "/image/image7.png",
//     productId: 30,
//   },
//   {
//     image: "/image/image8.png",
//     productId: 35,
//   },
//   {
//     image: "/image/image9.png",
//     productId: 40,
//   },
// ];

// const ProductCarousel = () => {
//   return (
//     <div className="px-4 py-5">

//       <Swiper
//         modules={[Autoplay, Navigation, Pagination]}
//         spaceBetween={70}
//         slidesPerView={3}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         loop={true}
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//           },
//           1024: {
//             slidesPerView: 3,
//           },
//         }}
//         className="w-full lg:w-[110%] xl:w-[100%] 2xl:w-[83%]"
//       >

//         {images.map((item, index) => (
//           <SwiperSlide key={index}>

//             <Link href={`/productdetail/${item.productId}`}>

//               <div
//                 className="
//                   relative
//                   w-full
//                   lg:w-[115%]
//                   xl:w-[115%]
//                   2xl:w-[115%]
//                   h-[160px]
//                   sm:h-[300px]
//                   md:h-[350px]
//                   lg:h-[180px]
//                   xl:h-[200px]
//                   2xl:h-[210px]
//                   rounded-xl
//                   overflow-hidden
//                   cursor-pointer
//                 "
//               >
//                 <Image
//                   src={item.image}
//                   alt={`Product ${item.productId}`}
//                   fill
//                   className="object-cover"
//                   priority={index < 3}
//                 />
//               </div>

//             </Link>

//           </SwiperSlide>
//         ))}

//       </Swiper>

//     </div>
//   );
// };

// export default ProductCarousel;







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
    productId: 26,
  },
  {
    image: "/image/image2.png",
    productId: 27,
  },
  {
    image: "/image/image3.png",
    productId: 28,
  },
  {
    image: "/image/image4.png",
    productId: 29,
  },
  {
    image: "/image/image5.png",
    productId: 30,
  },
  {
    image: "/image/image6.png",
    productId: 31,
  },
  {
    image: "/image/image7.png",
    productId: 32,
  },
  {
    image: "/image/image8.png",
    productId: 33,
  },
  {
    image: "/image/image9.png",
    productId: 34,
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

