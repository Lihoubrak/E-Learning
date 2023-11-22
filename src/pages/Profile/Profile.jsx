import React from "react";
import { SubjectDetail } from "../../components";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <SubjectDetail showHeader={true}>
      <div>
        {/* Cover Photo */}
        <div className="mt-16">
          <img
            src="https://hocmai.vn/user/images/cover12.png"
            alt="Cover Photo"
            className="w-full h-auto"
          />
        </div>

        <div className="relative border p-5">
          <ul className="flex gap-3 justify-center  items-center">
            <li className="cursor-pointer hover:text-blue-500">
              Thông tin cá nhân
            </li>
            <li className="cursor-pointer hover:text-blue-500">
              Lịch sử thanh toán
            </li>
            <li className="cursor-pointer hover:text-blue-500">Hộp thư</li>
            <li className="cursor-pointer hover:text-blue-500">
              {" "}
              Yêu cầu trợ giúp
            </li>
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

        <div className="flex  p-4">
          <div className="flex-shrink-0 w-1/5 text-center">
            <h1 className="text-2xl font-bold">User's Name</h1>
            <p className="text-gray-500">dcan38802@gmail.com</p>
          </div>

          <div className="flex-1 border ml-4 p-4">
            <h1 className="text-xl font-bold mb-2">Thông tin của Can Do</h1>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Họ và tên *
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-600"
                >
                  Bạn là *
                </label>
                <select id="role" className="mt-1 p-2 w-full border rounded">
                  <option value="student">Học sinh</option>
                  {/* Add other options as needed */}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium text-gray-600"
                >
                  Sinh nhật *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="day"
                    placeholder="Ngày"
                    className="p-2 w-1/4 border rounded"
                  />
                  <input
                    type="text"
                    id="month"
                    placeholder="Tháng"
                    className="p-2 w-1/4 border rounded"
                  />
                  <input
                    type="text"
                    id="year"
                    placeholder="Năm"
                    className="p-2 w-1/4 border rounded"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-600"
                >
                  Giới tính *
                </label>
                <div className="flex gap-2">
                  <select id="gender" className="p-2 w-1/2 border rounded">
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    {/* Add other options as needed */}
                  </select>
                  <input type="checkbox" id="genderPublic" className="mt-2" />
                  <label
                    htmlFor="genderPublic"
                    className="text-sm text-gray-600"
                  >
                    Công khai
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600"
                >
                  Số điện thoại
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="phone"
                    className="p-2 w-1/2 border rounded"
                  />
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Thay đổi số
                  </button>
                  <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Đã xác minh
                  </button>
                  <input type="checkbox" id="phonePrivate" className="mt-2" />
                  <label
                    htmlFor="phonePrivate"
                    className="text-sm text-gray-600"
                  >
                    Chỉ mình tôi
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <div className="flex gap-2">
                  <p>dcan38802@gmail.com</p>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Thay đổi email
                  </button>
                  <input type="checkbox" id="emailPrivate" className="mt-2" />
                  <label
                    htmlFor="emailPrivate"
                    className="text-sm text-gray-600"
                  >
                    Chỉ mình tôi
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-600"
                >
                  Facebook
                </label>
                <div className="flex gap-2">
                  {/* Add input or link for Facebook */}
                  <input
                    type="text"
                    id="facebook"
                    className="p-2 w-1/2 border rounded"
                  />
                  <input
                    type="checkbox"
                    id="facebookPrivate"
                    className="mt-2"
                  />
                  <label
                    htmlFor="facebookPrivate"
                    className="text-sm text-gray-600"
                  >
                    Chỉ mình tôi
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="zalo"
                  className="block text-sm font-medium text-gray-600"
                >
                  Zalo
                </label>
                <div className="flex gap-2">
                  {/* Add input or link for Zalo */}
                  <input
                    type="text"
                    id="zalo"
                    className="p-2 w-1/2 border rounded"
                  />
                  <input type="checkbox" id="zaloPublic" className="mt-2" />
                  <label htmlFor="zaloPublic" className="text-sm text-gray-600">
                    Công khai
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Lưu thông tin
              </button>
            </form>
          </div>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default Profile;
