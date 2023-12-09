import React, { useState } from "react";
import { SubjectDetail } from "../../components";
import ProfileDetail from "./ProfileDetail";
import PaymentTransaction from "../Payment/PaymentTransaction";
import NotificationSettings from "./NotificationSettings";
import PasswordChange from "./PasswordChange";
import PaymentSummary from "../Payment/PaymentSummary";
const data = [
  [
    "1801204",
    "#1801203-06122023",
    "999.000",
    "2023-12-06 02:37:44",
    "Thất bại",
    "Xem chi tiết",
  ],
  [
    "1801203",
    "#1801202-06122023",
    "999.000",
    "2023-12-06 02:36:51",
    "Thất bại",
    "Xem chi tiết",
  ],
  [
    "1801202",
    "#1801201-06122023",
    "2.199.000",
    "2023-12-06 02:15:51",
    "Thất bại",
    "Xem chi tiết",
  ],
  // Add more rows as needed
];
const tabs = [
  { key: "profile", label: "Thông tin cá nhân", component: <ProfileDetail /> },
  {
    key: "notifications",
    label: "Nhận thông báo",
    component: <NotificationSettings />,
  },
  {
    key: "password",
    label: "Thay đổi mật khẩu",
    component: <PasswordChange />,
  },
  {
    key: "paymentHistory",
    label: "Lịch sử thanh toán",
    component: <PaymentSummary mainAmount={0} promoAmount={0} />,
  },
  // Add more tabs as needed
];

const ProfileTabs = ({ activeItem, handleItemClick }) => {
  return (
    <div className="w-1/5 text-center relative">
      <h1 className="text-2xl font-bold">User's Name</h1>
      <p className="text-gray-500">dcan38802@gmail.com</p>
      <ul className="mt-4 space-y-2 bg-white border py-4 px-1">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            onClick={() => handleItemClick(tab.key)}
            className={`cursor-pointer px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              activeItem === tab.key
                ? "text-white bg-blue-500 hover:bg-blue-600"
                : "text-black-500 hover:text-blue-500 hover:underline"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProfileContent = ({ activeItem }) => {
  const components = {
    profile: <ProfileDetail />,
    notifications: <NotificationSettings />,
    password: <PasswordChange />,
    paymentHistory: (
      <PaymentTransaction
        headers={[
          "STT",
          "Hóa đơn",
          "Số tiền (VND)",
          "Thời gian",
          "Trạng thái",
          "Hành động",
        ]}
        data={data}
      />
    ),
    // Add more components as needed
  };

  return <div>{components[activeItem]}</div>;
};

const Profile = () => {
  const [activeItem, setActiveItem] = useState("profile");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <SubjectDetail showHeader={true}>
      <div className="mt-16">
        <img
          src="https://hocmai.vn/user/images/cover12.png"
          alt="Cover Photo"
          className="w-full h-auto"
        />
      </div>

      <div className="relative border p-5">
        <ul className="flex gap-5 justify-center items-center">
          <li
            onClick={() => handleItemClick("profile")}
            className={`cursor-pointer ${
              activeItem === "profile" ? "text-blue-600" : "text-gray-600"
            } hover:text-blue-500`}
          >
            Thông tin cá nhân
          </li>
          <li
            onClick={() => handleItemClick("paymentHistory")}
            className={`cursor-pointer ${
              activeItem === "paymentHistory"
                ? "text-blue-600"
                : "text-gray-600"
            } hover:text-blue-500`}
          >
            Lịch sử thanh toán
          </li>
          {/* Add more list items as needed */}
        </ul>

        <div className="absolute ml-20 bottom-0 w-[160px] h-[160px] mb-4">
          <img
            src="https://hocmai.vn/pix/u/f1.png"
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
          <img
            src="https://hocmai.vn/user/profile/asset/img/camera.png"
            alt="Edit Profile Picture"
            className="absolute bottom-0 right-0 w-8 h-8 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex p-4">
        <ProfileTabs
          activeItem={activeItem}
          handleItemClick={handleItemClick}
        />
        <ProfileContent activeItem={activeItem} />
      </div>
    </SubjectDetail>
  );
};

export default Profile;
