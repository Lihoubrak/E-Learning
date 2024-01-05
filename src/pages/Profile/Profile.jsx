// Profile.jsx
import React, { useState, useEffect, useContext } from "react";
import { SubjectDetail } from "../../components";
import PaymentTransaction from "../Payment/PaymentTransaction";
import NotificationSettings from "./NotificationSettings";
import PasswordChange from "./PasswordChange";
import ProfileDetail from "./ProfileDetail";
import PaymentSummary from "../Payment/PaymentSummary";

import { Button, Dialog, IconButton } from "@mui/material";
import { TokenRequest } from "../../RequestMethod/Request";
import UpdateUserContext from "../../context/UpdateUserContext";

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
  {
    key: "profile",
    label: "Thông tin cá nhân",
    component: <ProfileDetail />,
  },
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

const ProfileTabs = ({ activeItem, handleItemClick, user }) => {
  return (
    <div className="w-1/5 text-center relative">
      <h1 className="text-2xl font-bold">{user?.username}</h1>
      <p className="text-gray-500">{user?.email}</p>
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

const ProfileContent = ({ activeItem, user }) => {
  const components = {
    profile: <ProfileDetail user={user} />,
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
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { setChange, isChange } = useContext(UpdateUserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await TokenRequest.get(`/users/infouser`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isChange]);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleImageChange = (newImage) => {
    setNewImage(newImage);
  };

  const handleImageUrlChange = (imageUrl) => {
    setImageUrl(imageUrl);
  };
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", newImage);
      const res = await TokenRequest.put(
        "/users/change",
        { formData, imageUrl },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setChange(true);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
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

        <div className="absolute ml-20 bottom-0  mb-4">
          <IconButton onClick={handleOpenModal} className="w-[160px] h-[160px]">
            <img
              src={user && user.avatar}
              alt="Profile Picture"
              className="w-full h-full object-cover rounded-full"
            />
          </IconButton>
          <Dialog
            open={isModalOpen}
            onClose={handleCloseModal}
            className="max-w-[400px] mx-auto"
          >
            {/* Content for the modal */}
            <div className="p-4">
              <div className="mb-4">
                <label
                  htmlFor="imageInput"
                  className="block text-sm font-medium text-gray-600"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-600"
                >
                  or Paste Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 p-2 w-full border rounded"
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Update
                </Button>
                <Button
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Dialog>
        </div>
      </div>

      <div className="flex p-4">
        <ProfileTabs
          activeItem={activeItem}
          handleItemClick={handleItemClick}
          user={user}
        />
        <ProfileContent activeItem={activeItem} user={user} />
      </div>
    </SubjectDetail>
  );
};

export default Profile;
