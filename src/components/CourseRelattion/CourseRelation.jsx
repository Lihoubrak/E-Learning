import React from "react";

const CourseRelation = ({ title, imageSrc, courseFee }) => {
  return (
    <div className="flex bg-[#f5f5f5]   p-3 justify-center items-center gap-3 rounded-lg shadow-md cursor-pointer">
      <div className="w-[250px] h-[100px]">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <h1 className="text-sm font-semibold">{title}</h1>
        <p>
          Học phí:{" "}
          <span className="text-green-500">
            {courseFee === null ? "FREE" : courseFee} đồng
          </span>
        </p>
      </div>
    </div>
  );
};

export default CourseRelation;
