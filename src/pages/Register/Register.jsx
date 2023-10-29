import React from "react";
import { Header } from "../../components";
import Footer from "../Footer/Footer";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";

const Register = () => {
  return (
    <div>
      <Header
        SubjectDetail={true}
        backgroundColor="#2a70b8"
        loginButtonLabel=" Đăng nhập"
        registerButtonLabel="Đăng ký"
        logo="https://media.istockphoto.com/id/1249217897/vi/vec-to/assassin-ninja-warrior-eith-cloak-mascot-logo-ch%C6%A1i-game-vector-minh-h%E1%BB%8Da.webp?s=1024x1024&w=is&k=20&c=37m0gByNGhagimT4BGARaJcmZisSXzw5Z-B2FJZRlZQ="
      />
      <div className="mt-24 flex flex-col items-center ">
        <div className="text-center">
          <h1 className="text-2xl font-bold py-3">Tạo tài khoản của bạn</h1>
          <p className="font-sans text-gray-600">
            Học tập và giao lưu với hàng triệu học viên trên mọi miền đất nước.
          </p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <button className="bg-[#4267b2] px-5 py-3 w-[200px] flex items-center justify-center flex-1 gap-2 rounded-lg text-white">
            <span className="flex items-center">
              <AiFillFacebook size={24} />
            </span>
            Facebook
          </button>
          <button className="bg-[#dc4e41] px-5 py-3 w-[200px] flex items-center flex-1 gap-2 justify-center rounded-lg text-white">
            <span className="flex items-center">
              <AiFillGoogleCircle size={24} />
            </span>
            Google
          </button>
        </div>

        <div className="mt-6 text-gray-600">
          <span>Hoặc</span>
        </div>

        <div className="mt-4 flex flex-col items-center w-[500px]">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-400 mb-3 outline-none"
            placeholder="Ho va Ten"
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-400 mb-3 outline-none"
            placeholder="Email"
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-400 mb-3 outline-none"
            placeholder="Phone Number"
          />
          <input
            type="password"
            className="w-full p-3 rounded-lg border border-gray-400 mb-4 outline-none"
            placeholder="Mật khẩu"
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-400 mb-4 outline-none"
            placeholder="Xac nhan mat khau"
          />
          <button className="bg-[#2a70b8] text-white p-3 rounded-lg w-full hover:bg-blue-500">
            Đăng Ký
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
