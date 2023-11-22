import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaLock, FaSignOutAlt, FaComment } from "react-icons/fa";

const TippyProfile = () => {
  const menuItems = [
    {
      text: "Tin nhắn",
      icon: <FaInfoCircle className="mr-2" />,
      link: "/tin-nhan",
    },
    {
      text: "Thông tin cá nhân",
      icon: <FaLock className="mr-2" />,
      link: "/profile",
    },
    {
      text: "Đổi mật khẩu",
      icon: <FaSignOutAlt className="mr-2" />,
      link: "/doi-mat-khau",
    },
    {
      text: "Đăng xuất",
      icon: <FaComment className="mr-2" />,
      link: "/dang-xuat",
    },
  ];

  return (
    <div className="bg-white p-4 border rounded-lg">
      <div className=" flex items-center relative mr-4">
        <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
          <img
            src="https://hocmai.vn/pix/u/f2.png"
            alt="Can Do's profile picture"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">Can Do</p>
          <p className="text-gray-500">dcan38802@gmail.com</p>
        </div>
      </div>

      <ul className="mt-2 space-y-4">
        {menuItems.map((menuItem, index) => (
          <li
            key={index}
            className="flex items-center cursor-pointer hover:text-blue-500"
          >
            {menuItem.icon}
            <Link to={menuItem.link}>
              <span>{menuItem.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TippyProfile;
