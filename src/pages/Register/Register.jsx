import React, { useState } from "react";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import { Header } from "../../components";
import Footer from "../Footer/Footer";
import { publicRequest } from "../../RequestMethod/Request";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  // Update form data on input change
  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration form submission
  const handleRegister = async () => {
    try {
      // Make a POST request to the registration API endpoint
      const response = await publicRequest.post("/users/register", {
        username: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        roleId: 2,
      });
      if (response.data.message === "Registration successful.") {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      {/* Header component with your existing props */}
      <Header
        showHeader={true}
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

        {/* Social login buttons */}
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

        {/* Registration form */}
        <div className="mt-4 flex flex-col items-center w-[500px]">
          {/* Input fields */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-400 mb-3 outline-none"
            placeholder="Họ và Tên"
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-400 mb-3 outline-none"
            placeholder="Email"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-400 mb-3 outline-none"
            placeholder="Số điện thoại"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-400 mb-4 outline-none"
            placeholder="Mật khẩu"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-400 mb-4 outline-none"
            placeholder="Xác nhận mật khẩu"
          />

          {/* Register button */}
          <button
            onClick={handleRegister}
            className="bg-[#2a70b8] text-white p-3 rounded-lg w-full hover:bg-blue-500"
          >
            Đăng Ký
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
