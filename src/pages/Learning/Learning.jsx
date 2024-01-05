import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import {
  FaFacebookMessenger,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { HiDocumentText, HiOutlineDocumentText } from "react-icons/hi";
import { RiVideoFill, RiFileDownloadFill, RiEyeFill } from "react-icons/ri";
import { AiOutlineMenu, AiFillCheckSquare } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { publicRequest } from "../../RequestMethod/Request";
import { Message, SubjectDetail } from "../../components";

const Learning = () => {
  const { sublesson: sublessonParam } = useParams();
  const [openTab, setOpenTab] = useState("message");
  const [videoHeight, setVideoHeight] = useState(0);
  const [sublessonData, setSublessonData] = useState({});
  const videoRef = useRef();
  const [coursesData, setCoursesData] = useState({});
  const [openLessons, setOpenLessons] = useState({});
  const handleOpenTab = (tab) => {
    setOpenTab(tab);
  };

  const handleOpenLesson = (lessonId) => {
    setOpenLessons((prevOpenLessons) => ({
      ...prevOpenLessons,
      [lessonId]: !prevOpenLessons[lessonId],
    }));
  };

  useEffect(() => {
    const fetchSublessonData = async () => {
      try {
        const response = await publicRequest.get(
          `sublessions/${sublessonParam}`
        );
        setSublessonData(response.data);
      } catch (error) {
        console.error("Error fetching sublesson data:", error);
      }
    };

    fetchSublessonData();
    window.scrollTo(0, 0);
  }, [sublessonParam]);
  useEffect(() => {
    if (coursesData?.lessions) {
      const initialLessonOpenState = {};
      coursesData.lessions.forEach((lesson) => {
        initialLessonOpenState[lesson.id] = true;
      });
      setOpenLessons(initialLessonOpenState);
    }
  }, [coursesData]);
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseId = sublessonData?.lession?.courseId;
        if (courseId) {
          const response = await publicRequest.get(`/courses/${courseId}`);
          setCoursesData(response.data);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [sublessonData?.lession?.courseId]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.subscribeToStateChange(handleVideoStateChange);
    }
  }, []);
  const handleVideoStateChange = (state) => {
    if (state.videoHeight !== videoHeight) {
      setVideoHeight(state.videoHeight);
    }
  };

  // Memoized lesson content
  const memoizedContent = useMemo(() => {
    return (
      <div className="py-1 h-full overflow-y-auto space-y-1">
        {coursesData?.lessions?.map((lesson) => (
          <div key={lesson.id}>
            <div className="bg-[#e6e6e6] rounded-l-sm">
              <div
                className="flex justify-between px-3 p-3 items-center cursor-pointer transition duration-300 ease-in-out"
                onClick={() => handleOpenLesson(lesson.id)}
              >
                <h1 className="font-bold text-gray-600">
                  {lesson.lessionTilte}
                </h1>
                <span>
                  {openLessons[lesson.id] ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </span>
              </div>
            </div>
            {openLessons[lesson.id] && (
              <ul className="flex flex-col gap-2 py-3">
                {lesson.subLessions.map((sublesson) => (
                  <li
                    key={sublesson.id}
                    className="px-5 cursor-pointer text-gray-700 transition-all duration-100 hover:text-black"
                  >
                    <Link to={`/learnings/sublesson/${sublesson.id}`}>
                      <h1 className="font-bold ">
                        {sublesson.subLessionTitle}
                      </h1>
                    </Link>
                    <div className="flex gap-x-3">
                      <div className="flex items-center gap-1 ">
                        <RiVideoFill color="blue" className="opacity-60" />
                        <span>{sublesson.subLessionTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <a href={sublesson.subLessionFile} download>
                          <RiFileDownloadFill
                            color="blue"
                            className="opacity-60"
                          />
                        </a>
                        <span>1</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <RiEyeFill color="blue" className="opacity-60" />
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
                    <Link to={`/learnings/sublesson/exam/quiz/${quizz.id}`}>
                      <h1 className="font-bold text-yellow-500">
                        {quizz.quizName}
                      </h1>
                    </Link>
                    <div className="flex gap-x-3">
                      <div className="flex items-center gap-1">
                        <AiFillCheckSquare
                          color="blue"
                          className="opacity-60"
                        />
                        <span>{quizz.quizDuration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BsPencilSquare color="blue" className="opacity-60" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  }, [coursesData?.lessions, openLessons]);
  return (
    <SubjectDetail showHeader={true}>
      <div className="pt-20 px-36">
        <div className="flex items-center gap-1 text-blue-500">
          <GoHome size={20} />
          <span>Trang chủ</span>
          <span className="text-blue-500">{" > "}</span>
          <span>{sublessonData?.lession?.lessionTilte}</span>
          <span className="text-blue-500">{" > "}</span>
          <span className="text-blue-500">
            {sublessonData?.lession?.lessionTilte}-
            {sublessonData?.lession?.course.user.username}
          </span>
        </div>
        <div className="py-4 px-20 flex justify-center">
          <img
            src="https://hocmai.vn/course/images/banner/2803_hoctot11.png"
            alt=""
          />
        </div>
        <h1 className="text-2xl font-bold py-5 text-gray-600">
          {sublessonData?.lession?.lessionTilte}-
          {sublessonData?.lession?.course.user.username}
        </h1>
        <div
          className="flex border"
          style={{ height: "700px", overflow: "hidden" }}
        >
          <div className="w-3/4">
            <Player
              fluid={true}
              src={sublessonData?.subLessionVideo}
              ref={videoRef}
              height={videoHeight}
            />

            <div className="pt-10 bg-[#f9f9f9] w-full">
              <div>
                <h3 className="text-xl font-bold text-blue-500">
                  {sublessonData?.lession?.lessionTilte}
                </h3>
                <h1 className="text-2xl font-extrabold text-gray-600">
                  {sublessonData?.subLessionTitle}
                </h1>
                <span className="text-sm text-gray-600">
                  Độ dài: {sublessonData?.subLessionTime || "47 phút"} - Số lượt
                  học {sublessonData?.subLessionView || "5.831"}
                </span>
              </div>
              {sublessonData?.subLessionFileExcercise && (
                <div className="flex py-5 bg-white border justify-around">
                  <div className="flex items-center cursor-pointer">
                    <HiDocumentText size={20} />
                    <span> Bài tập tự luyện</span>
                  </div>
                  <div>
                    <a
                      href={sublessonData?.subLessionFileExcercise}
                      className="flex items-center cursor-pointer"
                    >
                      <HiOutlineDocumentText size={20} />
                      <span> Bài tập tự luyện (bản PDF)</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-[#e6e6e6] py-3 px-4 flex items-center justify-center">
              <AiOutlineMenu size={25} color="blue" className="mr-2" />
              <span className="text-blue-800 flex items-center font-bold">
                Đề cương khóa học
              </span>
            </div>
            {memoizedContent}
          </div>
        </div>

        <div className="border">
          <div className="border-b-2 flex">
            <div
              onClick={() => handleOpenTab("message")}
              className={`flex items-center p-3 font-semibold gap-2 text-blue-600 cursor-pointer ${
                openTab === "message" ? "bg-blue-500 text-white " : ""
              }`}
            >
              <FaFacebookMessenger />
              <span>Trao đổi bài</span>
            </div>

            <div
              onClick={() => handleOpenTab("note")}
              className={`flex items-center p-3 text-blue-600 font-semibold gap-2 cursor-pointer ${
                openTab === "note" ? "bg-blue-500 text-white " : ""
              }`}
            >
              <FaFacebookMessenger />
              <span>Ghi chú</span>
            </div>

            <div
              onClick={() => handleOpenTab("notification")}
              className={`flex items-center p-3 font-semibold gap-2 text-blue-600 cursor-pointer ${
                openTab === "notification" ? "bg-blue-500 text-white " : ""
              }`}
            >
              <FaFacebookMessenger />
              <span>Thông báo về khóa học</span>
            </div>

            <div
              onClick={() => handleOpenTab("support")}
              className={`flex items-center p-3 font-semibold gap-2 text-blue-600 cursor-pointer ${
                openTab === "support" ? "bg-blue-500 text-white " : ""
              }`}
            >
              <FaFacebookMessenger />
              <span>Hỗ trợ</span>
            </div>
          </div>
          {openTab === "message" && <Message sublessonData={sublessonData} />}
        </div>
      </div>
    </SubjectDetail>
  );
};

export default Learning;
