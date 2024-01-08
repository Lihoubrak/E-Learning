import React from "react";

const QuizInfo = ({
  correctAnswers,
  totalQuestions,
  remainingTime,
  totalMarks,
}) => {
  const displayRemainingTime = () => {
    // Convert remaining time to minutes and seconds
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes} phút ${seconds} giây`;
  };
  return (
    <div className="pt-5">
      <div className="max-w-2xl mx-auto  mb-8 p-4  bg-white rounded-md border">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          {totalMarks} điểm
        </h1>
        <p className="text-gray-700 mb-4">
          Chào bạn! Đây là điểm của bạn từ bài kiểm. Hãy xem kết quả chi tiết
          dưới đây:
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
            <p className="text-lg font-bold text-green-500">
              {correctAnswers}/{totalQuestions}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Thời gian hoàn thành</p>
            <p className="text-lg font-bold text-indigo-500">
              {displayRemainingTime()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInfo;
