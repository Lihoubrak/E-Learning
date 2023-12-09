import React from "react";

const NotificationSettings = () => {
  return (
    <div>
      <div className="border   w-[750px] ml-4 p-4 bg-white rounded-md ">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          NHẬN THÔNG BÁO
        </h1>
        <div className="text-gray-700">
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            Nhận tất cả thông báo từ HOCMAI tới Email
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            Các email thông báo về quá trình học tập
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            Các email về thông tin đăng ký học
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            Các email từ trang hỗ trợ
          </label>
          {/* Add more checkbox options as needed */}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
