import React, { useEffect, useState } from "react";
import {
  Banner,
  Category,
  Course,
  Header,
  SlideCourse,
} from "../../components";

import Footer from "../Footer/Footer";
import News from "../News/News";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import image5 from "../../assets/images/image5.png";
import image6 from "../../assets/images/image6.png";
import image7 from "../../assets/images/image7.png";
import image8 from "../../assets/images/image8.png";
import image9 from "../../assets/images/image9.png";
import image10 from "../../assets/images/image10.png";
import axios from "axios";

const Home = () => {
  const imageSources = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];
  // const courses = [
  //   {
  //     id: 1,
  //     title: "C-Programming",
  //     teacher: "Socheat",
  //     videoCount: 3000,
  //     questionCount: 3000,
  //     imageUrl:
  //       "https://hocmai.vn/course/images/pat-i-vnuhcm-luyen-giai-de-1664853341.png",
  //   },
  //   {
  //     id: 2,
  //     title: "C-Programming",
  //     teacher: "Socheat",
  //     videoCount: 3000,
  //     questionCount: 3000,
  //     imageUrl:
  //       "https://hocmai.vn/course/images/pat-i-vnuhcm-luyen-giai-de-1664853341.png",
  //   },
  //   {
  //     id: 3,
  //     title: "C-Programming",
  //     teacher: "Socheat",
  //     videoCount: 3000,
  //     questionCount: 3000,
  //     imageUrl:
  //       "https://hocmai.vn/course/images/pat-i-vnuhcm-luyen-giai-de-1664853341.png",
  //   },
  //   {
  //     id: 4,
  //     title: "C-Programming",
  //     teacher: "Socheat",
  //     videoCount: 3000,
  //     questionCount: 3000,
  //     imageUrl:
  //       "https://hocmai.vn/course/images/pat-i-vnuhcm-luyen-giai-de-1664853341.png",
  //   },
  //   {
  //     id: 5,
  //     title: "C-Programming",
  //     teacher: "Socheat",
  //     videoCount: 3000,
  //     questionCount: 3000,
  //     imageUrl:
  //       "https://hocmai.vn/course/images/pat-i-vnuhcm-luyen-giai-de-1664853341.png",
  //   },
  //   {
  //     id: 6,
  //     title: "C-Programming",
  //     teacher: "Socheat",
  //     videoCount: 3000,
  //     questionCount: 3000,
  //     imageUrl:
  //       "https://hocmai.vn/course/images/pat-i-vnuhcm-luyen-giai-de-1664853341.png",
  //   },
  //   {
  //     id: 7,
  //     title: "C-Programming",
  //     teacher: "Socheat",
  //     videoCount: 3000,
  //     questionCount: 3000,
  //     imageUrl:
  //       "https://hocmai.vn/course/images/pat-i-vnuhcm-luyen-giai-de-1664853341.png",
  //   },
  //   {
  //     id: 8,
  //     title: "C-Programming",
  //     teacher: "Socheat",
  //     videoCount: 3000,
  //     questionCount: 3000,
  //     imageUrl:
  //       "https://hocmai.vn/course/images/pat-i-vnuhcm-luyen-giai-de-1664853341.png",
  //   },
  // ];
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const highSchoolCourses = courses.filter(
    (course) =>
      course.SubCategory.Category.category_name.trim() === "High School"
  );
  console.log(courses);
  const middleSchoolCourses = courses.filter(
    (course) =>
      course.SubCategory.Category.category_name.trim() === "University School"
  );
  const elementarySchoolCourses = courses.filter(
    (course) =>
      course.SubCategory.Category.category_name.trim() === "Elementary School"
  );

  return (
    <>
      <Header
        loginButtonLabel=" Đăng nhập"
        registerButtonLabel="Đăng ký"
        phoneNumber={"1900 6933"}
        logo="https://media.istockphoto.com/id/1249217897/vi/vec-to/assassin-ninja-warrior-eith-cloak-mascot-logo-ch%C6%A1i-game-vector-minh-h%E1%BB%8Da.webp?s=1024x1024&w=is&k=20&c=37m0gByNGhagimT4BGARaJcmZisSXzw5Z-B2FJZRlZQ="
      />
      <Category
        categories={[
          "Giới thiệu",
          "Giáo viên",
          "Tự luyện",
          "Hướng nghiệp",
          "Thư viện",
          "Hướng dẫn Đăng ký học",
          "Hỗ trợ",
        ]}
      />
      <Banner imageSources={imageSources} />
      <div>
        <div className="px-20 flex items-center gap-x-5 mt-10">
          <span className="w-2 h-6 bg-red-600"></span>
          <h1 className="text-xl font-bold my-3 ">Trung học phổ thông</h1>
        </div>

        <div className="px-20  space-y-5">
          <SlideCourse autoplayDelay={2000} courses={highSchoolCourses} />
        </div>

        <div className="px-20 flex items-center gap-x-5 mt-10">
          <span className="w-2 h-6 bg-green-600"></span>
          <h1 className="text-xl font-bold my-3 ">Trung học cơ sở</h1>
        </div>

        <div className="px-20  space-y-5">
          <SlideCourse autoplayDelay={2000} courses={middleSchoolCourses} />
        </div>

        <div className="px-20 flex items-center gap-x-5 mt-10">
          <span className="w-2 h-6 bg-yellow-600"></span>
          <h1 className="text-xl font-bold my-3 ">Tiểu học</h1>
        </div>

        <div className="px-20  space-y-5">
          <SlideCourse autoplayDelay={2000} courses={elementarySchoolCourses} />
        </div>
        <News />
        <Footer />
      </div>
    </>
  );
};

export default Home;
