import React from "react";

const QuizInfo = () => {
  return (
    <div>
      <div className="max-w-2xl mx-auto mt-8 mb-8 p-4 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-red-500 mb-4">0 điểm</h1>
        <p className="text-gray-700 mb-4">
          Chào Bạn! Điểm bài kiểm tra đầu vào của bạn đang ở mức: dưới 60 điểm
          (theo thang điểm 100). Với kết quả này, HOCMAI thấy rằng Bạn chưa nắm
          vững kiến thức căn bản, khả năng thực hành và vận dụng kiến thức vào
          giải bài tập còn chưa tốt. Vì vậy, Bạn cần xây dựng một lộ trình học
          tập hợp lý ngay từ bây giờ để có thể đạt được thành tích tốt nhất
          trong bài thi tốt nghiệp THPT. HOCMAI khuyên Bạn nên trang bị và hệ
          thống lại ngay kiến thức nền tảng, căn bản của môn học ở bậc phổ thông
          trước khi bước vào quá trình ôn luyện toàn diện. Bạn có thể tham khảo
          chương trình Học tốt của HOCMAI để đăng kí học. Chúc Bạn học tốt và
          thành công!
        </p>
        <div className="mb-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
            LUYỆN TẬP LẠI
          </button>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Số câu đúng</p>
            <p className="text-lg font-bold text-green-500">0/20</p>
          </div>
          <div>
            <p className="text-gray-600">Thời gian hoàn thành</p>
            <p className="text-lg font-bold text-indigo-500">38 phút 31 giây</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInfo;
