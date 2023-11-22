import React from "react";
import { FaFacebookMessenger } from "react-icons/fa";

const Message = () => {
  return (
    <div>
      {/** Content */}
      <div className="border border-blue-500 rounded-lg overflow-hidden">
        <div className="p-5 space-y-3 bg-[#eff1f3]">
          <span className="p-2 bg-[#d6d6d6] text-blue-700 font-bold rounded-lg">
            Thời gian: 0s
          </span>
          <p className="text-gray-400 p-2 opacity-60">
            Thưa thầy/cô. Em có vấn đề chưa hiểu, em xin đặt câu hỏi như sau:
          </p>
          <div className="ml-5">
            <textarea
              placeholder="Nhập nội dung..."
              className="bg-transparent w-full outline-none"
            />
          </div>
          <p className="text-gray-400 border-b-2 p-2 opacity-60">
            Nhờ thầy cô hỗ trợ giúp em ạ. Em cảm ơn
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              {/** Icons with text */}
              <div className="flex items-center text-blue-600 border-r-2 p-2 gap-2 cursor-pointer font-serif">
                <FaFacebookMessenger />
                <span>Gửi ảnh </span>
              </div>
              <div className="flex items-center text-blue-600 border-r-2 p-2 gap-2 cursor-pointer font-serif">
                <FaFacebookMessenger />
                <span>Công thức </span>
              </div>
              <div className="flex items-center text-blue-600 p-2 gap-2 cursor-pointer font-serif">
                <FaFacebookMessenger />
                <span>Quy định đăng bình </span>
              </div>
            </div>
            {/** Button */}
            <p className="bg-blue-700 px-5 py-2 text-xl text-white rounded-lg font-bold cursor-pointer">
              Hỏi Ngay
            </p>
          </div>
        </div>
      </div>
      <div>
        {/** More content */}
        <div className="flex items-center justify-between mx-10 mt-5">
          <p className="font-semibold text-xl">371 Câu hỏi</p>
          <div>
            {/** Search input */}
            <div className="border p-2 flex items-center gap-2 rounded-md font-semibold">
              <FaFacebookMessenger />
              <input
                type="text"
                name=""
                id=""
                placeholder="Tìm theo nội dung, người gửi..."
                className="outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="m-4 mx-10 relative">
          <div className="bg-[#eff1f3] rounded-lg p-4  w-[70%]">
            <div className="flex items-center">
              <img
                src="https://hocmai.vn/pix/u/f2.png"
                alt="Profile Image"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h1 className="text-xl font-bold">Dam Thi Nhu Y</h1>
                <p className="text-gray-600">Khoảng 4 ngày trước</p>
              </div>
            </div>
            <div className="mt-4">
              <p>
                Thưa thầy/cô. Em có vấn đề chưa hiểu, em xin đặt câu hỏi như
                sau: Tìm khoảng ĐB - NB của hàm số từ đồ thị của nó - 17s. Giúp
                em câu 5,10 với ạ. Em cảm ơn Nhờ thầy cô hỗ trợ giúp em ạ. Em
                cảm ơn.
              </p>
            </div>
          </div>
          <div className="ml-10 mt-5 relative ">
            <div className="bg-[#eff1f3] rounded-lg p-4  w-[70%]">
              <div className="flex items-center">
                <img
                  src="https://hocmai.vn/pix/u/f2.png"
                  alt="Profile Image"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h1 className="text-xl font-bold">Dam Thi Nhu Y</h1>
                  <p className="text-gray-600">Khoảng 4 ngày trước</p>
                </div>
              </div>
              <div className="mt-4">
                <p>
                  Thưa thầy/cô. Em có vấn đề chưa hiểu, em xin đặt câu hỏi như
                  sau: Tìm khoảng ĐB - NB của hàm số từ đồ thị của nó - 17s.
                  Giúp em câu 5,10 với ạ. Em cảm ơn Nhờ thầy cô hỗ trợ giúp em
                  ạ. Em cảm ơn.
                </p>
              </div>
            </div>
            <div className="bg-blue-600 p-2 rounded-lg text-white font-bold cursor-pointer absolute right-20 top-16">
              Reply
            </div>
          </div>
          <div className="bg-blue-600 p-2 rounded-lg text-white font-bold cursor-pointer absolute right-20 top-16">
            Reply
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
