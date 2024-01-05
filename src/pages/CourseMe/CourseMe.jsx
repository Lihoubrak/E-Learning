import React, { useEffect, useState } from "react";
import { Course, SubjectDetail } from "../../components";
import { BiHome } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import HistoryLearn from "../HistoryLearn/HistoryLearn";
import { TokenRequest } from "../../RequestMethod/Request";
import { Link } from "react-router-dom";
const CourseMe = () => {
  const [activeItem, setActiveItem] = useState("khoaHoc");
  const [enrollmentCourse, setEnrollmentCourse] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fectCourse = async () => {
      const res = await TokenRequest.get("/enrollments/courses");
      console.log(res.data);
      setEnrollmentCourse(res.data);
    };
    fectCourse();
  }, []);
  const handleItemClick = (item) => {
    setActiveItem(item);
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
  return (
    <SubjectDetail showHeader={true}>
      <div className="mt-16">
        <div className="flex bg-[#ffffff] py-5 px-32 shadow-md justify-between items-center border">
          <div className="flex items-center">
            <div className="flex text-xl items-center font-sans">
              <BiHome size={30} />
              <span className="ml-1">Trang Chu</span>
            </div>
            <div className="flex text-xl items-center ml-2 font-sans">
              <IoIosArrowForward size={30} />
              <span className="ml-1">Khoa hoc cua toi</span>
            </div>
          </div>

          <div>
            <div className="text-2xl text-[#f99e4b] font-bold flex items-center justify-center gap-2 h-full">
              <img
                src="https://hocmai.vn/course/mycourse/assets/images/hotline.png"
                alt=""
                className="block mx-auto"
              />
              <span>ĐƯỜNG DÂY NÓNG: 1900 6933</span>
            </div>
          </div>
        </div>
        <div className="flex px-32 mt-10 gap-5">
          <div className="w-1/5">
            <div className="text-center bg-blue-600 p-5 py-12 rounded-md">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="https://hocmai.vn/pix/u/f1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white font-bold text-xl">Cando</p>
              <ul className="text-white mt-4">
                <li
                  onClick={() => handleItemClick("khoaHoc")}
                  className="hover:text-[#f99e4b] hover:font-bold cursor-pointer"
                >
                  Các khóa học
                </li>
                <li
                  onClick={() => handleItemClick("de")}
                  className="hover:text-[#f99e4b] hover:font-bold cursor-pointer"
                >
                  Các chuyên đề
                </li>
                <li
                  onClick={() => handleItemClick("hoctap")}
                  className="hover:text-[#f99e4b] hover:font-bold cursor-pointer"
                >
                  Lịch sử học tập
                </li>
                <li
                  onClick={() => handleItemClick("canhan")}
                  className="hover:text-[#f99e4b] hover:font-bold cursor-pointer"
                >
                  Thông tin cá nhân
                </li>
                <li
                  onClick={() => handleItemClick("hotro")}
                  className="hover:text-[#f99e4b] hover:font-bold cursor-pointer"
                >
                  Hỗ trợ
                </li>
                <li
                  onClick={() => handleItemClick("ma")}
                  className="hover:text-[#f99e4b] hover:font-bold cursor-pointer"
                >
                  Mã kích hoạt
                </li>
                <li
                  onClick={() => handleItemClick("thanhtoan")}
                  className="hover:text-[#f99e4b] hover:font-bold cursor-pointer"
                >
                  Lịch sử thanh toán
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            {activeItem == "khoaHoc" && (
              <>
                <div className="flex justify-between">
                  <div className="flex flex-col items-center mx-4">
                    <label
                      htmlFor="lop"
                      className="text-lg text-gray-700 mb-1 font-bold"
                    >
                      Chọn lớp:
                    </label>
                    <select
                      id="lop"
                      className="mt-2 p-2 border rounded-md w-56 focus:outline-none border-b-blue-600 border-b-2 focus:border-blue-500"
                    >
                      <option value="lop6">Lớp 6</option>
                      <option value="lop7">Lớp 7</option>
                      <option value="lop8">Lớp 8</option>
                      <option value="lop9">Lớp 9</option>
                    </select>
                  </div>

                  <div className="flex flex-col items-center mx-4">
                    <label
                      htmlFor="mon"
                      className="text-lg text-gray-700 mb-1 font-bold "
                    >
                      Chọn môn:
                    </label>
                    <select
                      id="mon"
                      className="mt-2 p-2 border rounded-md w-56  focus:outline-none border-b-blue-600 border-b-2 focus:border-blue-500"
                    >
                      <option value="toan">Toán</option>
                      <option value="van">Ngữ Văn</option>
                      <option value="hoa">Hóa Học</option>
                    </select>
                  </div>

                  <div className="flex flex-col items-center mx-4">
                    <label
                      htmlFor="khoa"
                      className="text-lg text-gray-700 mb-1 font-bold"
                    >
                      Chọn khóa đang học:
                    </label>
                    <select
                      id="khoa"
                      className="mt-2 p-2 border rounded-md w-56  focus:outline-none border-b-2 border-b-blue-600 focus:border-blue-500"
                    >
                      <option value="khoa1">Khóa 1</option>
                      <option value="khoa2">Khóa 2</option>
                      <option value="khoa3">Khóa 3</option>
                    </select>
                  </div>
                </div>
                <div className="mx-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
                  {enrollmentCourse &&
                    enrollmentCourse.length > 0 &&
                    enrollmentCourse.map((enrollment) => (
                      <Link
                        key={enrollment.id}
                        to={`/learnings/sublesson/${enrollment.course.lessions[0]?.subLessions[0]?.id}`}
                      >
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                          <Course
                            title={enrollment.course.courseName}
                            teacher={enrollment.course.user.username}
                            videoCount={countSubLessons(
                              enrollment.course.lessions
                            )}
                            questionCount={countQuestions(
                              enrollment.course.lessions
                            )}
                            imageUrl={enrollment.course.courseImage}
                          />
                        </div>
                      </Link>
                    ))}
                  {
                    !enrollmentCourse ||
                      (enrollmentCourse.length === 0 && (
                        <p>No courses available.</p>
                      )) /* Display a message when there are no courses */
                  }
                </div>
              </>
            )}
            {activeItem == "hoctap" && <HistoryLearn />}
          </div>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default CourseMe;
