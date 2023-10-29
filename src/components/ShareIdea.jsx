import React from "react";

const ShareIdea = () => {
  return (
    <div>
      <div className="flex items-center gap-x-5 justify-center">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src="https://hocmai.vn/media/images/home/students/nguyen-hoang-khanh.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <ul className="text-sm">
          <li className="text-base font-bold text-blue-600 pb-2">Bui An Huy</li>
          <li>Tài khoản hocmai.vn:</li>
          <li>buianhuy@gmail.com</li>
          <li>Giai nhất HSG năm 2023</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <p className="px-10 my-5">
          "Được đồng hành cùng hocmai là điều may mắn đối với em trong chuyến
          hành trình của tri thức. Em cảm ơn các thầy cô..."
        </p>
      </div>
    </div>
  );
};

export default ShareIdea;
