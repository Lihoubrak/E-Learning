import React from "react";
import { RiVideoFill, RiQuestionFill } from "react-icons/ri";

const Course = (props) => {
  const { title, teacher, videoCount, questionCount, imageUrl } = props;

  return (
    <div className="group min-h-[280px] border rounded-lg overflow-hidden cursor-pointer relative">
      <div className="min-h-[150px]">
        <img src={imageUrl} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-y-5 p-3">
        <h1 className="text-xl font-extralight">{title}</h1>
        <p className="text-sm">
          Teacher: <span className="text-blue-500">{teacher}</span>
        </p>
        <ul>
          <li className="flex items-center gap-2">
            <RiVideoFill size={20} color="red" />
            <p className="text-sm">
              <span className="text-blue-500">{videoCount}</span> Bai hoc
            </p>
          </li>
          <li className="flex items-center gap-2">
            <RiQuestionFill size={20} color="blue" />
            <p className="text-sm">
              <span className="text-blue-500">{questionCount}</span> Cau hoi
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Course;
