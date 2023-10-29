import React, { useState, useEffect } from "react";
import Subject from "./Subject";
import Slide from "./Slide/Slide";

import { SwiperSlide } from "swiper/react";
const Banner = ({ imageSources }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const bannerTexts = [
    "MIỄN PHÍ tư vấn lộ trình luyện thi Đánh giá năng lực - ĐHQG Hà Nội cho 2k6 >>> Đăng ký nhận tư vấn",
    "MIỄN PHÍ hỗ trợ đăng ký luyện thi cho Đánh giá năng lực - ĐHQG Hà Nội cho 2k7 >>> Đăng ký ngay",
    "MIỄN PHÍ tư vấn và hỗ trợ luyện thi Đánh giá năng lực - ĐHQG Hà Nội cho 2k8 >>> Đăng ký tư vấn",
    "MIỄN PHÍ tư vấn lộ trình luyện thi cho Đánh giá năng lực - ĐHQG Hà Nội cho 2k9 >>> Đăng ký hỗ trợ",
    "MIỄN PHÍ đăng ký luyện thi Đánh giá năng lực - ĐHQG Hà Nội cho 2k10 >>> Tư vấn và đăng ký",
  ];
  const imageUrl = [
    "https://hocmai.vn/media/images/home/desktop/1123715x400.jpg",
    "https://hocmai.vn/media/images/home/desktop/715x400-11-1.png",
  ];
  const slideOptions = {
    spaceBetween: 50,
    slidesPerView: 1,
    effect: "fade",
    pagination: { clickable: true },
    autoplay: { delay: 3000 },
  };

  useEffect(() => {
    const changeImage = () => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
    };

    const changeText = () => {
      setTextIndex((prevIndex) => (prevIndex + 1) % bannerTexts.length);
    };

    const imageTimer = setInterval(changeImage, 2000);
    const textTimer = setInterval(changeText, 1500);

    return () => {
      clearInterval(imageTimer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <div className="relative h-[500px]">
      <img
        src={imageSources[imageIndex]}
        alt={`Image ${imageIndex}`}
        className="w-full h-full object-cover"
      />
      <div
        className="absolute top-0 w-full text-center z-10 text-white text-sm bg-opacity-80 p-3"
        style={{
          background: `url(${imageSources[imageIndex]}) center/cover`,
        }}
      >
        <span className="ml-52">{bannerTexts[textIndex]}</span>
      </div>
      <div className="absolute top-0 z-20 px-20 mt-2 flex gap-3">
        <div>
          <Subject />
        </div>
        <div className="mt-10">
          <Slide options={slideOptions}>
            {imageUrl.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Slide>
        </div>
        <div className="bg-white p-4 rounded-lg mt-10 flex items-center">
          <img
            src="https://hocmai.vn/media/images/home/desktop/chungnhan-04.png"
            alt=""
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
