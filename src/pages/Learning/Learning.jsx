import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { GoHome } from "react-icons/go";
import { RiVideoFill, RiFileDownloadFill, RiEyeFill } from "react-icons/ri";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { SubjectDetail } from "../../components";
import sampleVideo from "../../videos/Happy Khmer New Year 2021.mp4";
import { HiDocumentText, HiOutlineDocumentText } from "react-icons/hi";
import axios from "axios";
import { AiFillCheckSquare } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";

const Learning = () => {
  const { sublesson } = useParams();
  const [videoHeight, setVideoHeight] = useState(0);
  const [sublessons, setSublessons] = useState({});
  const videoRef = useRef();
  const staticContentRef = useRef();
  const [isLessonOpen, setIsLessonOpen] = useState(false);
  const [courses, setCourses] = useState({});
  const [lessonOpen, setLessonOpen] = useState({});

  const handleOpenLesson = (lessonId) => {
    setLessonOpen({ ...lessonOpen, [lessonId]: !lessonOpen[lessonId] });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/sublessons/${sublesson}`
      );
      setSublessons(response.data);
    };
    fetchData();
  }, [sublesson]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (sublessons.Lesson) {
          const response = await axios.get(
            `http://localhost:3000/api/courses/course/${sublessons.Lesson.less_course}`
          );
          setCourses(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourse();
  }, [sublesson, sublessons.Lesson]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.subscribeToStateChange(handleStateChange);
    }
  }, []);

  const handleStateChange = (state) => {
    if (state.videoHeight !== videoHeight) {
      setVideoHeight(state.videoHeight);
    }
  };

  return (
    <SubjectDetail>
      <div className="mt-24 px-36">
        <div className="flex items-center gap-1 text-blue-500">
          <GoHome size={20} />
          <span>Trang chủ</span>
          <span className="text-blue-500">{" > "}</span>
          <span>{sublessons.Lesson?.less_title}</span>
          <span className="text-blue-500">{" > "}</span>
          <span className="text-black">{sublessons.Lesson?.less_title}</span>
        </div>
        <div className="py-4 px-20 flex justify-center">
          <img
            src="https://hocmai.vn/course/images/banner/2803_hoctot11.png"
            alt=""
          />
        </div>
        <h1 className="text-2xl font-bold py-5">
          {sublessons.Lesson?.less_title}
        </h1>
        <div
          className="flex border"
          style={{ height: "700px", overflow: "hidden" }}
        >
          <div className="w-3/4">
            {/* <Player
              fluid={true}
              src={sampleVideo}
              className="border border-red-600"
              ref={videoRef}
              height={videoHeight}
            /> */}

            <div className="pt-10 bg-[#f9f9f9] w-full">
              <div>
                <h3 className="text-xl font-bold text-blue-500">
                  {sublessons.Lesson?.less_title}
                </h3>
                <h1 className="text-2xl font-extrabold text-gray-900">
                  {sublessons?.subless_title}
                </h1>
                <span className="text-sm text-gray-600">
                  Độ dài: {sublessons.subless_time || "47 phút"} - Số lượt học{" "}
                  {sublessons.subless_video_count || "5.831"}
                </span>
              </div>
              <div className="flex py-5 bg-white border justify-around">
                <div className="flex items-center cursor-pointer">
                  <HiDocumentText size={20} />
                  <span> Bài tập tự luyện</span>
                </div>
                <div className="flex items-center cursor-pointer">
                  <HiOutlineDocumentText size={20} />
                  <span> Bài tập tự luyện (bản PDF)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-[#e6e6e6] py-3 px-4 flex items-center justify-center">
              <AiOutlineMenu size={25} color="blue" className="mr-2" />
              <span className="text-blue-800 font-semibold flex items-center">
                Đề cương khóa học
              </span>
            </div>
            <div className="py-1 h-full overflow-y-auto space-y-1">
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
          </div>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default Learning;
