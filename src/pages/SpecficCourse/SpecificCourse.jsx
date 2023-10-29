import React, { useEffect, useState } from "react";
import { CourseRelation, SubjectDetail } from "../../components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { GoHome } from "react-icons/go";
import { RiEyeFill, RiFileDownloadFill, RiVideoFill } from "react-icons/ri";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { AiFillCheckSquare } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
// import sampleVideo from "../../videos/Happy Khmer New Year 2021.mp4";

const SpecificCourse = () => {
  const { course } = useParams();
  const [courses, setCourses] = useState({});
  const [coursesRelative, setCoursesRelative] = useState([]);
  const [lessonOpen, setLessonOpen] = useState({});

  const handleOpenLesson = (lessonId) => {
    setLessonOpen({ ...lessonOpen, [lessonId]: !lessonOpen[lessonId] });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/courses/course/${course}`
        );

        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const fetchDataRelative = async () => {
      if (courses.cos_category) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/courses/category/${courses.cos_category}`
          );

          // Filter out the current course
          const filteredCourses = response.data.filter(
            (c) => c.cos_id !== courses.cos_id
          );

          setCoursesRelative(filteredCourses);
        } catch (error) {
          console.error("Error fetching related courses:", error);
        }
      }
    };
    fetchDataRelative();
  }, [course, courses.cos_category]);

  return (
    <SubjectDetail>
      <div className="mt-24 px-36">
        <div className="flex items-center gap-x-1">
          <span className="flex gap-x-1 text-blue-500">
            <GoHome size={20} />
            Trang chủ
          </span>
          <span>{">"}</span>
          <span className="text-blue-500">{courses.cos_name}</span>
          <span>{">"}</span>
          <span>{`${courses.cos_name} - ${courses.User?.name}`}</span>
        </div>
        <div className="py-4 px-20 flex justify-center">
          <img src="https://hocmai.vn/course/images/banner/2803_hoctot11.png" />
        </div>
        <div className="flex items-center mt-10">
          <div className="space-y-4 w-full">
            <h1 className="text-xl text-gray-600">{courses.cos_name}</h1>
            <p className="w-1/2 font-sans">{courses.cos_description}</p>
            <p>
              Giáo viên:{" "}
              <span className="text-blue-500">{courses.User?.name}</span>
            </p>
            <div className="flex border">
              <div className="w-3/4">
                {/* <Player fluid={true} src={sampleVideo} /> */}
              </div>
              <div className="flex-1">
                <div className="border-b-2 flex flex-col items-center gap-y-5 p-5">
                  <h1 className="text-2xl text-blue-600">
                    Học 365 ngày chỉ với
                  </h1>
                  <p className="text-2xl text-[#ff6c00]">{courses.cos_price}</p>
                  <button className="bg-[#ff6c00] font-bold text-white rounded-xl w-[250px] h-12">
                    Học Thử Miễn Phí
                  </button>
                  <button className="bg-[#ff6c00] font-bold text-white rounded-xl w-[250px] h-12">
                    Đăng Ký Ngay
                  </button>
                </div>
                <div>
                  <ul className="mx-5">
                    <li className="font-thin text-blue-500">
                      Mục tiêu khóa học:
                    </li>
                    <li className="font-sans list-disc ml-10">
                      {courses.cos_objective}
                    </li>
                  </ul>
                  <ul className="mx-5">
                    <li className="font-thin text-blue-500">
                      Cấu trúc khóa học:
                    </li>
                    <li className="font-sans list-disc ml-10">
                      {courses.cos_structure}
                    </li>
                  </ul>
                  <ul className="mx-5">
                    <li className="font-thin text-blue-500">Dịch vụ:</li>
                    <li className="font-sans list-disc ml-10">
                      các kênh hỗ trợ học tập
                    </li>
                    <li className="font-sans list-disc ml-10">
                      Thảo luận trong từng bài giảng
                    </li>
                    <li className="font-sans list-disc ml-10">
                      Chương trình kiểm tra năng lực thường xuyên
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex pt-10 gap-3">
              <ul className="  space-y-2 w-[70%] ">
                <li className="font-bold">Mô tả khóa học</li>
                <li className="list-disc ml-10"> {courses.cos_description}</li>
                <li className="font-bold">Các yêu cầu khóa học</li>
                <li className="list-disc ml-10">{courses.cos_requirements}</li>
                <li className="font-bold">Kết quả học tập</li>
                <li className="list-disc ml-10">{courses.cos_result}</li>
                <li className="font-bold">Đối tượng</li>
                <li className="list-disc ml-10">{courses.cos_target}</li>

                <div className="border space-y-1">
                  {courses.Lessons?.map((lesson) => (
                    <div key={lesson.less_id}>
                      <div className="bg-[#e6e6e6] rounded-l-sm">
                        <div
                          className="flex justify-between px-3 p-3 items-center cursor-pointer transition duration-300 ease-in-out"
                          onClick={() => handleOpenLesson(lesson.less_id)}
                        >
                          <h1>{lesson.less_title}</h1>
                          <span>
                            {lessonOpen[lesson.less_id] ? (
                              <FaChevronDown />
                            ) : (
                              <FaChevronRight />
                            )}
                          </span>
                        </div>
                      </div>
                      {lessonOpen[lesson.less_id] && (
                        <ul className="flex flex-col gap-2 py-3">
                          {lesson.Sublessons.map((sublesson) => (
                            <li
                              key={sublesson.subless_id}
                              className="px-5 cursor-pointer text-red-800 transition-all duration-100 hover:text-black"
                            >
                              <Link
                                to={`/learnings/sublesson/${sublesson.subless_id}`}
                              >
                                <h1 className="font-bold">
                                  {sublesson.subless_title}
                                </h1>
                              </Link>

                              <div className="flex gap-x-3">
                                <div className="flex items-center gap-1">
                                  <RiVideoFill color="blue" />
                                  <span>{sublesson.subless_time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <RiFileDownloadFill color="blue" />
                                  <span>{sublesson.subless_video_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <RiEyeFill color="blue" />
                                  <span>{sublesson.subless_video_count}</span>
                                </div>
                              </div>
                            </li>
                          ))}
                          {lesson.Exams.map((exam) => (
                            <li
                              key={exam.exam_id}
                              className="px-5 cursor-pointer text-red-800 transition-all duration-100 hover:text-black"
                            >
                              <Link to={`/exam/sublesson/${exam.exam_id}`}>
                                <h1 className="font-bold text-yellow-500">
                                  {exam.ex_title}
                                </h1>
                              </Link>
                              <div className="flex gap-x-3">
                                <div className="flex items-center gap-1">
                                  <AiFillCheckSquare color="blue" />
                                  <span>{exam.ex_dutation}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BsPencilSquare color="blue" />
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

              <ul className="flex-1 space-y-3">
                <li className="font-bold">Khóa học liên quan</li>
                {coursesRelative.map((relatedCourse) => (
                  <Link to={`/specificCourse/${relatedCourse.cos_id}`}>
                    <CourseRelation
                      key={relatedCourse.cos_id}
                      title={relatedCourse.cos_name}
                      imageSrc={relatedCourse.cos_image}
                      courseFee={relatedCourse.cos_price}
                    />
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default SpecificCourse;
