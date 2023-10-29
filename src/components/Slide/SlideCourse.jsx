import React from "react";
import { Navigation, Autoplay, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Course from "../Course";
import { Link } from "react-router-dom"; // Import Link

const SlideCourse = ({ autoplayDelay, courses }) => {
  return (
    <div className="shadow-lg">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
      >
        {courses.map((course) => {
          return (
            <SwiperSlide key={course.cos_id}>
              <Link to={`/specificCourse/${course.cos_id}`}>
                <Course
                  title={course.cos_name}
                  teacher={course.User.name}
                  videoCount={1000}
                  questionCount={1000}
                  imageUrl={course.cos_image}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SlideCourse;
