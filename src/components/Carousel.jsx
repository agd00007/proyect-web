import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { banners } from "../moocks/carousel";

function Carousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      pagination={{ clickable: true }}
      navigation
      className="w-full"
    >

      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>

          <div className="relative">

            <img
              src={banner.image}
              className="w-full h-[400px] object-cover p-6"
            />

            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">

              <h2 className="text-4xl font-bold mb-4">
                {banner.title}
              </h2>

              <p className="mb-4 text-lg">
                {banner.text}
              </p>

              <button className="bg-pink-500 px-6 py-3 rounded-lg hover:bg-pink-600">
                Shop Now
              </button>

            </div>

          </div>

        </SwiperSlide>
      ))}

    </Swiper>
  );
}

export default Carousel;