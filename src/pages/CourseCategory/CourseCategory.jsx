import React from "react";
import { BiMenu } from "react-icons/bi";
import { FaChevronRight, FaHome } from "react-icons/fa";
import {
  CategorySecond,
  CourseListCategory,
  SubjectDetail,
} from "../../components";
import Tippy from "@tippyjs/react/headless";
const CourseCategory = () => {
  return (
    <SubjectDetail showHeader={true}>
      <div className="mt-24 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 bg-white border text-gray-700 ">
          <div className="font-bold flex items-center justify-center p-2">
            <BiMenu size={20} color="black" />
            <span className="ml-2">Khoá học của tôi</span>
          </div>

          <ul className="text-center font-sans">
            <li className="bg-gray-200 p-2">Đại học - Cao đẳng</li>
            <li className="cursor-pointer p-2 hover:bg-blue-700 hover:text-white">
              Đại học - Cao đẳng
            </li>
          </ul>

          <ul className="text-center font-sans">
            <li className="bg-gray-200 p-2">Đại học - Cao đẳng</li>
            <Tippy
              placement="right-start"
              interactive
              render={(attrs) => <CategorySecond />}
            >
              <li className="cursor-pointer relative p-2 hover:bg-blue-700 hover:text-white flex items-center justify-center">
                <span>Đại học - Cao đẳng</span>
                <FaChevronRight className="absolute right-3" />
              </li>
            </Tippy>
            {/* ... */}
          </ul>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center text-lg font-bold text-gray-800">
            <FaHome size={20} className="text-blue-500" />
            <span className="ml-3">Khóa học hỗ trợ môn Ngữ Văn</span>
          </div>

          <div className="flex-shrink-0">
            <img
              src="https://hocmai.vn/media/images/course/banner/760x200-445.png"
              alt=""
              className="w-full object-contain"
            />
          </div>

          <div className="flex-1">
            <div className="px-4 py-2 bg-[#2a70b8] text-white font-bold mb-4">
              Khoa bo sung
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <CourseListCategory
                  key={index}
                  imageUrl="https://hocmai.vn/course/images/gioi-thieu-ve-the-gioi-so-1653535713.png"
                  title="Giới thiệu về thế giới số"
                  fee="600.000 đồng"
                  duration="365 ngày Giáo"
                  teacher="Cô Hải Lệ"
                  detailsLink="/details-page"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default CourseCategory;
