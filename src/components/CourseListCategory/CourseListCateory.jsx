import React from "react";

const CourseListCategory = ({
  imageUrl,
  title,
  fee,
  duration,
  teacher,
  detailsLink,
}) => {
  return (
    <div className="border mb-4 ">
      <div className="mb-2">
        <img src={imageUrl} alt={title} className="w-full" />
      </div>
      <ul className="ml-2 text-xs space-y-1 opacity-70 mb-2">
        <li className="text-black font-bold">{title}</li>
        <li>Học phí: {fee}</li>
        <li>Thời gian học: {duration}</li>
        <li>Giáo viên: {teacher}</li>
      </ul>
      <a
        href={detailsLink}
        className="inline-block px-3 py-1 bg-blue-500 text-white font-sans text-xs"
      >
        Chi tiết
      </a>
    </div>
  );
};

export default CourseListCategory;
