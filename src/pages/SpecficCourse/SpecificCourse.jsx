import React, { useEffect, useState } from "react";
import { CourseRelation, SubjectDetail } from "../../components";
import { Link, useParams } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { GoHome } from "react-icons/go";
import { RiEyeFill, RiFileDownloadFill, RiVideoFill } from "react-icons/ri";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { AiFillCheckSquare } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import Cookies from "js-cookie";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
const SpecificCourse = () => {
  const { course } = useParams();
  const [courses, setCourses] = useState({});
  const [coursesRelative, setCoursesRelative] = useState([]);
  const [lessonOpen, setLessonOpen] = useState({});
  const [open, setOpen] = useState(false);
  const [isEnrollment, setEnrollment] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenLesson = (lessonId) => {
    setLessonOpen({ ...lessonOpen, [lessonId]: !lessonOpen[lessonId] });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicRequest.get(`/courses/${course}`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    if (courses.lessions) {
      const initialLessonOpenState = {};
      courses.lessions.forEach((lesson) => {
        initialLessonOpenState[lesson.id] = true;
      });
      setLessonOpen(initialLessonOpenState);
    }
    const fetchDataRelative = async () => {
      if (courses.categorySecondId) {
        try {
          const response = await publicRequest.get(`/categorys`);
          const filteredCategories = response.data.filter((category) => {
            return category.categoryFirsts.some((categoryFirst) => {
              return categoryFirst.categorySeconds.some((categorySecond) => {
                return categorySecond.courses.some(
                  (course) => course.id !== courses.id
                );
              });
            });
          });

          // Filter out the current course
          const filteredRelativeCourses = filteredCategories.map((category) => {
            return {
              ...category,
              categoryFirsts: category.categoryFirsts.map((categoryFirst) => {
                return {
                  ...categoryFirst,
                  categorySeconds: categoryFirst.categorySeconds.map(
                    (categorySecond) => {
                      return {
                        ...categorySecond,
                        courses: categorySecond.courses.filter(
                          (course) => course.id !== courses.id
                        ),
                      };
                    }
                  ),
                };
              }),
            };
          });

          setCoursesRelative(filteredRelativeCourses);
        } catch (error) {
          console.error("Error fetching related courses:", error);
        }
      }
    };

    const CheckEnrollment = async () => {
      const res = await TokenRequest.get(
        `/enrollments/check-enrollment/${course}`
      );
      setEnrollment(res.data.enrolled);
    };
    CheckEnrollment();
    fetchDataRelative();
  }, [course, courses.categorySecondId]);
  const token = Cookies.get("token");
  return (
    <SubjectDetail showHeader={true}>
      <div className="pt-20 px-36">
        <div className="flex items-center gap-x-1">
          <span className="flex gap-x-1 text-blue-500">
            <GoHome size={20} />
            Trang chủ
          </span>
          <span>{">"}</span>
          <span className="text-blue-500">{courses.courseName}</span>
          <span>{">"}</span>
          <span>{`${courses.courseName} - ${courses.user?.username}`}</span>
        </div>
        <div className="py-4 px-20 flex justify-center">
          <img src="https://hocmai.vn/course/images/banner/2803_hoctot11.png" />
        </div>
        <div className="flex items-center mt-10">
          <div className="space-y-4 w-full">
            <h1 className="text-xl text-gray-600">{courses.courseName}</h1>
            <p className="w-1/2 font-sans">{courses.courseIntroduction}</p>
            <p>
              Giáo viên:{" "}
              <span className="text-blue-500">{courses.user?.username}</span>
            </p>
            <div className="flex border">
              <div className="w-3/4">
                <Player
                  fluid={true}
                  src={courses.lessions?.[0]?.subLessions?.[0]?.subLessionVideo}
                />
              </div>
              <div className="">
                <div className="border-b-2 flex flex-col items-center gap-y-5 p-5">
                  <h1 className="text-xl font-bold text-blue-600">
                    HỌC 365 NGÀY CHỈ VỚI
                  </h1>
                  <p className="text-xl font-bold text-[#ff6c00]">
                    {courses.coursePrice ? courses.coursePrice : "FREE"} ĐỒNG
                  </p>
                  {courses.coursePrice === null ? (
                    <button className="bg-[#ff6c00] font-bold text-white rounded-xl w-[250px] h-12">
                      HỌC MIỄN PHÍ
                    </button>
                  ) : (
                    <Link
                      to={`/payment/course/${courses.id}/category/${courses.categorySecondId}`}
                    >
                      <button
                        disabled={isEnrollment ? true : false}
                        className={
                          isEnrollment
                            ? "bg-red-600 font-bold text-white rounded-xl w-[250px] h-12"
                            : "bg-[#ff6c00] font-bold text-white rounded-xl w-[250px] h-12"
                        }
                      >
                        {isEnrollment ? "BẠN ĐÃ ĐĂNG KÝ RỒI" : "ĐĂNG KÝ NGAY"}
                      </button>
                    </Link>
                  )}
                </div>
                <div>
                  <ul className="mx-5">
                    <li className="font-bold text-sm text-blue-500">
                      MỤC TIÊU KHÓA HỌC :
                    </li>
                    <li className="list-disc ml-10 text-gray-600 font-thin">
                      {courses.courseObjective}
                    </li>
                  </ul>
                  <ul className="mx-5">
                    <li className="font-bold text-sm text-blue-500">
                      CẤU TRÚC KHÓA HỌC :
                    </li>
                    <li className="list-disc ml-10 text-gray-600 font-thin">
                      {courses.courseStructure}
                    </li>
                  </ul>
                  <ul className="mx-5">
                    <li className="font-bold text-sm text-blue-500">
                      DỊCH VỤ :
                    </li>
                    <li className="list-disc ml-10 text-gray-600 font-thin">
                      {courses.courseService}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex pt-10 gap-3">
              <ul className="  space-y-2 w-[70%] ">
                <li className="font-bold text-sm">MÔ TẢ KHÓA HỌC</li>
                <li className="list-disc ml-10 text-gray-600 font-thin">
                  {courses.courseDescription}
                </li>
                <li className="font-bold text-sm">CÁC YÊU CẦU KHÓA HỌC</li>
                <li className="list-disc ml-10 text-gray-600 font-thin">
                  {courses.courseRequirement}
                </li>
                <li className="font-bold text-sm">KẾT QUẢ HỌC TẬP </li>
                <li className="list-disc ml-10 text-gray-600 font-thin">
                  {courses.courseAchievement}
                </li>
                <li className="font-bold text-sm">ĐỐI TƯỢNG</li>
                <li className="list-disc ml-10 text-gray-600 font-thin">
                  {courses.courseTarget}
                </li>

                <div className="border space-y-1">
                  {courses.lessions?.map((lesson) => (
                    <div key={lesson.id}>
                      <div className="bg-[#e6e6e6] rounded-l-sm">
                        <div
                          className="flex justify-between px-3 p-3 items-center cursor-pointer transition duration-300 ease-in-out"
                          onClick={() => handleOpenLesson(lesson.id)}
                        >
                          <h1 className="font-bold">{lesson.lessionTilte}</h1>
                          <span>
                            {lessonOpen[lesson.id] ? (
                              <FaChevronDown />
                            ) : (
                              <FaChevronRight />
                            )}
                          </span>
                        </div>
                      </div>
                      {lessonOpen[lesson.id] && (
                        <ul className="flex flex-col gap-2 py-3">
                          {lesson.subLessions.map((sublesson) => (
                            <li
                              key={sublesson.id}
                              className="px-5 cursor-pointer text-gray-700 transition-all duration-100 hover:text-black"
                            >
                              {token && isEnrollment ? (
                                <Link
                                  to={`/learnings/sublesson/${sublesson.id}`}
                                >
                                  <h1 className="font-bold">
                                    {sublesson.subLessionTitle}
                                  </h1>
                                </Link>
                              ) : (
                                <h1 onClick={handleOpen} className="font-bold">
                                  {sublesson.subLessionTitle}
                                </h1>
                              )}

                              <div className="flex gap-x-3">
                                <div className="flex items-center gap-1">
                                  <RiVideoFill
                                    color="blue"
                                    className="opacity-60"
                                  />
                                  <span>{sublesson.subLessionTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <a href={sublesson.subLessionFile} download>
                                    <RiFileDownloadFill
                                      color="blue"
                                      className="opacity-60"
                                    />
                                  </a>
                                  <span>{1}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <RiEyeFill
                                    color="blue"
                                    className="opacity-60"
                                  />
                                  <span>{sublesson.subLessionView}</span>
                                </div>
                              </div>
                            </li>
                          ))}
                          {lesson.quizzes?.map((quizz) => (
                            <li
                              key={quizz.id}
                              className="px-5 cursor-pointer text-gray-500 transition-all duration-100 hover:text-black"
                            >
                              {token && isEnrollment ? (
                                <Link
                                  to={`/learnings/sublesson/exam/quiz/${quizz.id}`}
                                >
                                  <h1 className="font-bold text-yellow-500">
                                    {quizz.quizName}
                                  </h1>
                                </Link>
                              ) : (
                                <h1
                                  onClick={handleOpen}
                                  className="font-bold text-yellow-500"
                                >
                                  {quizz.quizName}
                                </h1>
                              )}

                              <div className="flex gap-x-3">
                                <div className="flex items-center gap-1">
                                  <AiFillCheckSquare
                                    color="blue"
                                    className="opacity-60"
                                  />
                                  <span>{quizz.quizDuration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BsPencilSquare
                                    color="blue"
                                    className="opacity-60"
                                  />
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </ul>

              <ul className="flex-1 ">
                <li className="font-bold">Khóa học liên quan</li>
                <div className="flex flex-col gap-1">
                  {coursesRelative.map((category) =>
                    category.categoryFirsts.map((categoryFirst) =>
                      categoryFirst.categorySeconds.map((categorySecond) =>
                        categorySecond.courses.map((course) => (
                          <Link
                            key={course.id}
                            to={`/specificCourse/${course.id}`}
                          >
                            <CourseRelation
                              title={course.courseName}
                              imageSrc={course.courseImage}
                              courseFee={course.coursePrice}
                            />
                          </Link>
                        ))
                      )
                    )
                  )}
                </div>
              </ul>
            </div>
            <div className="">
              <div className="space-y-5">
                <p className="font-bold text-xl">Giới thiệu giáo viên</p>
                <div className="flex gap-11">
                  <div className="w-[110px] h-[150px]">
                    <img
                      src={courses.user?.avatar}
                      alt=""
                      className="w-full h-full oavatarbject-contain"
                    />
                  </div>

                  <div className="text-xl break-words tracking-tight w-10/12 font-semibold text-gray-600">
                    <h1 className="font-bold">{courses.user?.username}</h1>
                    <p>
                      Với cô, niềm vui của học sinh khi học được kiến thức mới
                      và vận dụng tốt những kiến thức đó vào thực tế cuộc sống
                      là sự thành công.
                    </p>
                    <div className="cursor-pointer">
                      <FaFacebook color="#5f8dc3" size={30} />
                    </div>
                  </div>
                </div>
                <ul className="text-xl break-words tracking-tight w-10/12 font-semibold text-gray-600 ml-10">
                  <li className="list-disc">
                    Cô tốt nghiệp loại Giỏi - khoa Toán, Trường Đại học Sư phạm
                    Thành phố Hồ Chí Minh và nhận chứng chỉ dạy học Cambridge
                    Checkpoint do Cambridge University cấp;
                  </li>
                  <li className="list-disc">
                    Cô đã từng đạt giải ba môn Vật lý cấp Thành phố năm 2012,
                    giải ba môn Vật lý cấp Thành phố năm 2015.
                  </li>
                </ul>
                <Link to={`/teacher/${courses.user?.id}`}>
                  <div className="font-bold text-blue-600 text-xl border-b-4 py-5  cursor-pointer">
                    Thông tin chi tiết
                  </div>
                </Link>
              </div>

              <div className="flex gap-5 border-b-4 py-5">
                <div className="text-[#f39c12] font-semibold">
                  <p className="text-xl">Nhận xét </p>
                  <p className="text-xl">Đánh giá trung bình</p>
                  <p className="text-9xl">4.9</p>
                  <div className="flex items-center">
                    <FaStar size={35} />
                    <FaStar size={35} />
                    <FaStar size={35} />
                    <FaStar size={35} />
                    <FaStar size={35} />
                  </div>
                </div>

                <div className="text-[#f39c12] font-semibold">
                  <p className="text-xl">Chi tiết</p>

                  <div className=""></div>
                </div>
              </div>
              {courses.reviewCourses?.map((review, index) => (
                <div key={index} className="flex  gap-11 border-b-4 py-5">
                  <div>
                    <div className="h-16 w-16">
                      <img
                        src={review?.user.avatar}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl font-thin mb-2">
                      {review?.user.username}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(review?.reviewCourseStar)].map(
                          (_, starIndex) => (
                            <FaStar key={starIndex} size={20} color="#f39c12" />
                          )
                        )}
                      </div>
                      <p className="text-xl">27/09/2023</p>
                    </div>
                    <p className="text-xl break-words tracking-tight w-10/12 ">
                      {review?.reviewCourseText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            className="w-full max-w-md mx-auto"
          >
            <DialogContent className="p-4 text-center">
              <p>
                {isEnrollment
                  ? "Bạn đã đăng ký khóa học này. Bắt đầu học ngay!"
                  : token
                  ? "Bạn chưa đăng ký khóa học này. Đăng ký để bắt đầu học ngay!"
                  : "Bạn chưa đăng ký. Hãy đăng ký để trải nghiệm nội dung học tuyệt vời!"}
              </p>
            </DialogContent>
            <DialogActions className="p-4 flex justify-center">
              <Button onClick={handleClose} color="primary" className="mr-4">
                Hủy
              </Button>
              <Link
                to={
                  token
                    ? isEnrollment
                      ? `/learnings/sublesson/1`
                      : `/payment/${courses.categorySecondId}`
                    : `/register`
                }
              >
                <Button color="primary">
                  {isEnrollment ? "Bắt đầu học" : token ? "Đăng ký" : "Đăng ký"}
                </Button>
              </Link>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default SpecificCourse;
