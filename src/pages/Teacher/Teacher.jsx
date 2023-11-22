import React from "react";
import { SubjectDetail } from "../../components";
import { IoBookOutline, IoPerson } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import teacerImage from "../../assets/images/teacher.png";
import { RiInboxArchiveFill } from "react-icons/ri";
import { FaFacebook, FaGraduationCap } from "react-icons/fa";

const Teacher = () => {
  return (
    <SubjectDetail showHeader={true}>
      <div className="mt-24 px-52">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="w-[60px] h-[60px] cursor-pointer">
            <img
              src="https://hocmai.vn/home_page/giaovien/images/logo-hm.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* Like and Share Buttons */}
          <div className="flex items-center gap-2 text-white">
            <div className="bg-blue-700 flex items-center p-1 font-mono rounded-md cursor-pointer">
              <AiOutlineLike />
              <span>Like</span>
            </div>
            <div className="bg-blue-700 flex items-center p-1 font-mono rounded-md cursor-pointer">
              <IoIosShareAlt />
              <span>Share</span>
            </div>
          </div>
        </div>

        {/* Teacher Information */}
        <div className="flex flex-col items-center">
          <div className="flex gap-5 justify-center">
            {/* Teacher Details */}
            <div className="space-y-2">
              <h1 className="text-3xl font-extralight border-black ">CÔ</h1>
              <div className="h-1 bg-black "></div>
              <h1 className="text-5xl text-[#0067b4] font-bold text-center">
                LE KHANH VY
              </h1>
              <div className="flex items-center">
                <div className="h-1 bg-black flex-grow"></div>
                <div className="mx-2 text-black">*</div>
                <div className="h-1 bg-black flex-grow"></div>
              </div>
              <h1 className="text-3xl font-extralight  border-black text-center">
                GIAO VIEN TOAN
              </h1>
            </div>

            {/* Teacher Image */}
            <div className="w-[500px] h-[400px]">
              <img
                src={teacerImage}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="relative">
        <img
          src="https://hocmai.vn/home_page/giaovien/images/anhmonhoc/mon-toan.jpg"
          alt=""
          className="w-full"
        />
        <div className="flex items-center justify-around mt-4 absolute right-0 left-0 top-12 text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold">2.000+</h1>
            <div className="h-1 bg-yellow-400 w-16 mx-auto my-2"></div>
            <p className="text-xl">học sinh đang theo dõi</p>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold">2.000+</h1>
            <div className="h-1 bg-yellow-400 w-16 mx-auto my-2"></div>
            <p className="text-xl">bài giảng online</p>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold">2.000+</h1>
            <div className="h-1 bg-yellow-400 w-16 mx-auto my-2"></div>
            <p className="text-xl">năm kinh nghiệm</p>
          </div>
        </div>
      </div>

      {/* Teacher Details */}
      <div className="flex justify-center h-screen">
        <div className="flex flex-row">
          {/* Teacher Image */}
          <div className="w-1/2 h-auto bg-[#ebebea]">
            <img
              src={teacerImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Teacher Information */}
          <div className="w-1/2 pt-60 bg-[#f9f9f9] relative">
            <div className="py-8 px-4 text-center w-1/2 shadow-black bg-[#0070ba] text-white  font-bold text-2xl absolute -left-10 top-16">
              THÔNG TIN GIÁO VIÊN
            </div>

            {/* Name Section */}
            <div className="border-b-2 gap-5 border-b-gray-400 flex items-center p-4">
              <IoPerson className="text-[#0871b9] mr-2" size={40} />
              <div>
                <h1 className="text-lg font-bold">Họ và tên</h1>
                <p>LÊ KHÁNH VY</p>
              </div>
            </div>

            {/* Workplace Section */}
            <div className="border-b-2 gap-5 border-b-gray-400 flex items-center p-4">
              <CiLocationOn className="text-[#0871b9] mr-2" size={40} />
              <div>
                <h1 className="text-lg font-bold">Nơi công tác:</h1>
                <p>HỆ THỐNG GIÁO DỤC HOCMAI</p>
              </div>
            </div>

            {/* Teaching and Education Section */}
            <div className="border-b-2 gap-5 border-b-gray-400 flex items-center justify-around p-4">
              {/* Teaching Subject */}
              <div className="flex items-center">
                <IoBookOutline className="text-[#0871b9] mr-2" size={40} />
                <div>
                  <h1 className="text-lg font-bold">Môn dạy:</h1>
                  <p>TOÁN</p>
                </div>
              </div>

              {/* Academic Degree */}
              <div className="flex items-center ">
                <FaGraduationCap className="text-[#0871b9] mr-2" size={40} />
                <div>
                  <h1 className="text-lg font-bold">Học vị:</h1>
                  <p>CỬ NHÂN</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="border-b-2 gap-5 border-b-gray-400 flex items-center justify-around p-4">
              {/* Email */}
              <div className="flex items-center">
                <RiInboxArchiveFill className="text-[#0871b9] mr-2" size={40} />
                <div>
                  <h1 className="text-lg font-bold">Email:</h1>
                  <p>gv.vylk@hocmai.edu.vn</p>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-center ">
                <FaFacebook className="text-[#0871b9] mr-2" size={40} />
                <div>
                  <h1 className="text-lg font-bold">Facebook:</h1>
                  <p>https://www.facebook.com/kh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default Teacher;
