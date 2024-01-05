import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaLock, FaSignOutAlt, FaComment } from "react-icons/fa";
import Cookies from "js-cookie";

const TippyProfile = ({ user }) => {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-white p-4 border rounded-lg">
      <div className="flex items-center relative mr-4 gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
          <img
            src={user.avatar}
            alt="Can Do's profile picture"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">{user.username}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <ul className="mt-2 space-y-4">
        <li className="flex items-center cursor-pointer hover:text-blue-500">
          <FaInfoCircle className="mr-2" />
          <span>
            <Link to="/tin-nhan">Tin nhắn</Link>
          </span>
        </li>
        <li className="flex items-center cursor-pointer hover:text-blue-500">
          <FaLock className="mr-2" />
          <span>
            <Link to="/profile">Thông tin cá nhân</Link>
          </span>
        </li>
        <li className="flex items-center cursor-pointer hover:text-blue-500">
          <FaSignOutAlt className="mr-2" />
          <span>
            <Link to="/doi-mat-khau">Đổi mật khẩu</Link>
          </span>
        </li>
        <li className="flex items-center cursor-pointer hover:text-blue-500">
          <FaComment className="mr-2" />
          <span onClick={handleLogout}>Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
};

export default TippyProfile;
