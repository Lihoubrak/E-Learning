import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

const Slide = ({ options, children }) => {
  const { spaceBetween, slidesPerView, effect, pagination, autoplay } = options;

  return (
    <div className="w-[650px] h-[400px]">
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        effect={effect}
        pagination={pagination}
        autoplay={autoplay}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default Slide;
