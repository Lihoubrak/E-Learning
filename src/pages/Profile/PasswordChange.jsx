import React, { useState } from "react";

const PasswordChange = () => {
  const [showInputs, setShowInputs] = useState(false);

  const handleLinkClick = () => {
    setShowInputs(true);
  };

  const handleChangePassword = () => {
    // Add your logic for handling password change here
    // This function will be called when the "Thay đổi mật khẩu" button is clicked
  };

  return (
    <div>
      <div className="ml-4 p-4 w-[750px] p-8 bg-white border rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          THAY ĐỔI MẬT KHẨU
        </h1>
        {showInputs ? (
          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Mật khẩu hiện tại *
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="Mật khẩu cũ"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Mật khẩu mới *
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Mật khẩu mới"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Nhập lại mật khẩu mới *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu mới"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <button
              onClick={handleChangePassword}
              className="w-full px-5 py-3 bg-blue-500 text-white rounded-md"
            >
              Thay đổi mật khẩu
            </button>
          </div>
        ) : (
          <p className="text-gray-700 mb-4 text-center">
            Tài khoản của bạn được đăng nhập thông qua Google. Vì vậy, tài khoản
            của bạn chưa được kích hoạt chức năng mật khẩu. Để kích hoạt chức
            năng mật khẩu, xin vui lòng{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleLinkClick}
            >
              ấn vào đây
            </span>{" "}
            và chúng tôi sẽ kích hoạt mật khẩu cho tài khoản của bạn vào địa chỉ
            email <span className="text-blue-600">dcan38802@gmail.com</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordChange;
