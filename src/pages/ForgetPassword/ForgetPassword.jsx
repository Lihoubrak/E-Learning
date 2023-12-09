import React, { useState } from "react";
import { SubjectDetail } from "../../components";

const ForgetPassword = () => {
  const [selectedOption, setSelectedOption] = useState("sms");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRecoverPassword = () => {
    console.log("Recovering password...");
    // Add logic to handle password recovery based on selected option, phone, and username
  };

  return (
    <SubjectDetail showHeader={true}>
      <div className="mt-16 p-4">
        <div className="max-w-5xl mx-auto rounded p-8">
          <div className="text-blue-600 font-bold  cursor-pointer">Back</div>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600">
              KHÔI PHỤC MẬT KHẨU
            </h1>
          </div>
          <div className="flex justify-between space-x-4 mb-4">
            <button
              onClick={() => handleOptionClick("sms")}
              className={`flex-1 py-2 ${
                selectedOption === "sms"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              } rounded focus:outline-none`}
            >
              SMS
            </button>
            <button
              onClick={() => handleOptionClick("email")}
              className={`flex-1 py-2 ${
                selectedOption === "email"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              } rounded focus:outline-none`}
            >
              EMAIL
            </button>
            <button
              onClick={() => handleOptionClick("support")}
              className={`flex-1 py-2 ${
                selectedOption === "support"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              } rounded focus:outline-none`}
            >
              HO TRO
            </button>
          </div>
          {selectedOption === "sms" && (
            <div className="space-y-4 w-10/12 mx-auto">
              <h1 className="text-xl font-bold text-blue-600">
                KHÔI PHỤC MẬT KHẨU QUA SMS
              </h1>
              <p className="text-sm text-gray-600">
                Bạn vui lòng điền số điện thoại đã dùng để đăng ký tài khoản
                HOCMAI.
              </p>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm text-gray-600">
                  Số điện thoại:
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
                />
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-600"
                >
                  Tên tài khoản (hoặc Email):
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
                />
              </div>
              <button
                onClick={handleRecoverPassword}
                className="w-1/3 py-2 bg-blue-500 text-white rounded focus:outline-none"
              >
                Lấy lại mật khẩu
              </button>
            </div>
          )}
          {selectedOption === "email" && (
            <div className="space-y-4 w-10/12 mx-auto">
              <h1 className="text-xl font-bold text-blue-600">
                KHÔI PHỤC MẬT KHẨU QUA EMAIL
              </h1>
              <p className="text-sm text-gray-600">
                Bạn vui lòng điền email đã dùng để đăng ký tài khoản HOCMAI.
              </p>

              <label htmlFor="username" className="block text-sm text-gray-600">
                Tên tài khoản (hoặc Email):
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
              />
              <button
                onClick={handleRecoverPassword}
                className="w-1/3 py-2 bg-blue-500 text-white rounded focus:outline-none"
              >
                Lấy lại mật khẩu
              </button>
            </div>
          )}
          {selectedOption === "support" && (
            <div className="space-y-4">
              <div>
                <p>Tổng đài Chăm sóc khách hàng 1900 6933 (Nhánh 1)</p>
              </div>
              <div>Email: hotro@hocmai.vn</div>
            </div>
          )}
        </div>
      </div>
    </SubjectDetail>
  );
};

export default ForgetPassword;
