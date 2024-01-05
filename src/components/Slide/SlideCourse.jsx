import React from "react";
import { Navigation, Autoplay, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Course from "../Course";
import { Link } from "react-router-dom"; // Import Link

const SlideCourse = ({ autoplayDelay, courses }) => {
  return (
    <div className="">
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
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <Link to={`/specificCourse/${course.id}`}>
              <Course
                title={course.courseName}
                teacher={course.user.username}
                videoCount={countSubLessons(course.lessions)}
                questionCount={countQuestions(course.lessions)}
                imageUrl={course.courseImage}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
// Helper function to count sublessons
const countSubLessons = (lessions) => {
  let subLessonCount = 0;
  lessions.forEach((lesson) => {
    subLessonCount += lesson.subLessions.length;
  });
  return subLessonCount;
};

// Helper function to count questions
const countQuestions = (lessions) => {
  let questionCount = 0;
  lessions.forEach((lesson) => {
    lesson.subLessions.forEach((subLesson) => {
      questionCount += subLesson.comments.length;
    });
  });
  return questionCount;
};
export default SlideCourse;
