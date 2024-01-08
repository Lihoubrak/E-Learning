import React, { useEffect, useState } from "react";
import { PaymentReport, PaymentTable, SubjectDetail } from "../../components";
import { TiTick } from "react-icons/ti";
import { FaBookMedical, FaCreditCard } from "react-icons/fa";
import { LuBookMarked } from "react-icons/lu";
import { TbFilePercent } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { CiCircleRemove } from "react-icons/ci";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [clickHeaderIndex, setClickHeaderIndex] = useState(null);
  const [category, setCategory] = useState([]);
  const { categorySecondId, courseId } = useParams();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [isEnrollment, setEnrollment] = useState(false);
  const stripe = useStripe();
  const handleCategoryClick = async (categorySecondId, categoryFirsts) => {
    setClickHeaderIndex(categorySecondId);
  };

  const handleOpen = () => {
    if (selectedCourses.length > 0) {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  const handleSelect = async (course) => {
    const isCourseSelected = selectedCourses.some(
      (selectedCourse) => selectedCourse.id === course.id
    );

    try {
      // Check enrollment status for the selected course
      const res = await TokenRequest.get(
        `/enrollments/check-enrollment/${course.id}`
      );

      if (!isCourseSelected && !res.data.enrolled) {
        // If the course is not already selected and not enrolled, add it to the selected courses
        setSelectedCourses((prevCourses) => [...prevCourses, course]);
      } else if (res.data.enrolled && course.id === res.data.courseId) {
        window.alert(`Course ${course.id} is already selected and enrolled.`);
      }
    } catch (error) {
      console.error(
        `Error checking enrollment for course ${course.id}:`,
        error
      );
    }

    const fetchEnrollmentStatus = async () => {
      try {
        // Check enrollment status for each course
        const enrolledStatus = await Promise.all(
          selectedCourses.map(async (selectedCourse) => {
            const res = await TokenRequest.get(
              `/enrollments/check-enrollment/${selectedCourse.id}`
            );
            return {
              courseId: selectedCourse.id,
              enrolled: res.data.enrolled,
            };
          })
        );

        const isEnrolled = enrolledStatus.some((status) => status.enrolled);
        setEnrollment(isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment for selected courses:", error);
      }
    };

    fetchEnrollmentStatus();
  };

  const handleRemove = (course) => {
    const updatedCourses = selectedCourses.filter(
      (cos) => cos.id !== course.id
    );
    setSelectedCourses(updatedCourses);
  };

  const handlePayment = async () => {
    const response = await TokenRequest.post("/payments/create", {
      courses: selectedCourses,
    });
    if (response.data.id) {
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) {
        console.error(result.error);
      }
    }
  };

  const totalMoney = selectedCourses.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.coursePrice),
    0
  );

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await publicRequest.get(`/categorys`);
        setCategory(response.data);

        const categoryIndex = response.data.findIndex((cat) => {
          const categoryFirstIndex = cat.categoryFirsts.findIndex(
            (categoryFirst) => {
              return categoryFirst.categorySeconds.some(
                (categorySecond) =>
                  categorySecond.id === parseInt(categorySecondId)
              );
            }
          );

          return categoryFirstIndex !== -1;
        });

        setClickHeaderIndex(categoryIndex);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };

    fetchCategory();
    const fetchUserData = async () => {
      try {
        const response = await TokenRequest.get(`/users/infouser`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
    window.scrollTo(0, 0);
  }, [categorySecondId]);

  const sample = [
    {
      hoa_don: "HD001",
      thoi_gain: "2023-01-01 10:30 AM",
      trang_thai: "Chưa thanh toán",
    },
    {
      hoa_don: "HD002",
      thoi_gain: "2023-01-02 02:45 PM",
      trang_thai: "Đã thanh toán",
    },
    {
      hoa_don: "HD003",
      thoi_gain: "2023-01-03 08:15 AM",
      trang_thai: "Chưa thanh toán",
    },
  ];

  const createData = (stt, hoa_don, thoi_gain, trang_thai) => ({
    stt,
    hoa_don,
    thoi_gain,
    trang_thai,
    hinh_dong: (
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => handlePay(hoa_don)}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Thanh toán
        </button>
        <button
          onClick={() => handleCancel(hoa_don)}
          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        >
          Hủy
        </button>
      </div>
    ),
  });

  const columns = [
    { width: 10, label: "STT", dataKey: "stt" },
    { width: 200, label: "Hóa đơn", dataKey: "hoa_don" },
    { width: 200, label: "Thời gian", dataKey: "thoi_gain" },
    { width: 200, label: "Trạng thái", dataKey: "trang_thai" },
    { width: 200, label: "Hành động", dataKey: "hinh_dong" },
  ];

  const rows = sample.map((item, index) =>
    createData(index + 1, ...Object.values(item))
  );

  return (
    <SubjectDetail showHeader={true}>
      <div className="pt-24">
        <div className="mx-24">
          <ul className="flex border-b-[1px] text-blue-600 mb-24">
            {Array.isArray(category) &&
              category.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer px-3 py-2 ${
                    index === clickHeaderIndex ? "bg-blue-600 text-white" : ""
                  }`}
                  onClick={() =>
                    handleCategoryClick(index, item.categoryFirsts)
                  }
                >
                  {item.categoryName}
                </li>
              ))}
          </ul>
          <div>
            <div className=" flex flex-col items-center">
              <div className="p-1 w-1/2 bg-[#ebeced] flex justify-between relative">
                <div>
                  <span className="absolute -left-10 -top-10  ">
                    CHỌN KHÓA HỌC
                  </span>
                  <span className="absolute left-0 -top-3 rounded-full bg-[#f8971d] text-white font-bold ">
                    <TiTick size={30} />
                  </span>
                </div>
                <div>
                  <span className="absolute left-64 -top-10 ">XÁC NHẬN</span>
                  <span className="absolute left-1/2 -top-3 rounded-full bg-[#f8971d] text-white font-bold ">
                    <TiTick size={30} />
                  </span>
                </div>
                <div>
                  <span className="absolute -right-10 -top-10  ">
                    THANH TOÁN
                  </span>
                  <span className="absolute right-0 -top-3 rounded-full bg-[#f8971d] text-white font-bold ">
                    <TiTick size={30} />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-10 gap-2">
              {clickHeaderIndex !== null &&
                Array.isArray(category[clickHeaderIndex].categoryFirsts) &&
                category[clickHeaderIndex].categoryFirsts.map(
                  (categoryFirst) => (
                    <div className="flex-1" key={categoryFirst.id}>
                      <h1 className="text-xl font-sans mb-4 text-center text-blue-600">
                        {categoryFirst.categoryFirstName}
                      </h1>
                      <ul className="flex flex-wrap justify-center">
                        {Array.isArray(categoryFirst.categorySeconds) &&
                          categoryFirst.categorySeconds.map(
                            (categorySecond) => (
                              <li
                                key={categorySecond.id}
                                className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer"
                              >
                                {categorySecond.categorySecondName}
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                  )
                )}
            </div>
            <div className="flex gap-3 mt-10 justify-center ">
              <div className="max-w-[200px]">
                <button className="p-4 flex items-center bg-[#e8e8e8]  rounded-lg shadow-lg w-full">
                  <FaBookMedical size={20} />
                  <span className="ml-2">MÔN</span>
                </button>
                <ul className="max-w-[200px]  mt-2 break-words">
                  <li className="border  font-sans p-2 mb-2 text-center text-white font-bold cursor-pointer bg-[#0072bc] rounded-lg">
                    Toan
                  </li>
                  <li className="border  font-sans p-2 mb-2 text-center text-white font-bold cursor-pointer bg-[#0072bc] rounded-lg">
                    Toan
                  </li>
                </ul>
              </div>

              <div className="max-w-sm flex-1">
                <button className="p-4 flex items-center bg-[#e8e8e8]  rounded-lg shadow-lg w-full">
                  <LuBookMarked size={20} />
                  <span className="ml-2">CHỌN KHÓA HỌC</span>
                </button>
                {clickHeaderIndex !== null && (
                  <div>
                    <ul className="max-w-sm mt-2 break-words">
                      {Array.isArray(
                        category[clickHeaderIndex].categoryFirsts
                      ) &&
                        category[clickHeaderIndex].categoryFirsts.map(
                          (categoryFirst) =>
                            Array.isArray(categoryFirst.categorySeconds) &&
                            categoryFirst.categorySeconds.map(
                              (categorySecond) =>
                                categorySecond.courses.map((course) => (
                                  <li
                                    key={course.id}
                                    className={`group hover:bg-blue-400 hover:text-white flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm mb-4 relative ${
                                      isEnrollment &&
                                      course.id === isEnrollment.courseId
                                        ? "enrolled-course"
                                        : ""
                                    }`}
                                  >
                                    <div className="">
                                      <span className="text-sm block font-sans">
                                        {course.courseName}
                                      </span>
                                      <span className="text-sm font-sans text-gray-400">
                                        {course.user.username}
                                      </span>
                                    </div>
                                    <span className="text-lg font-bold">
                                      {course.coursePrice} đ
                                    </span>

                                    {isEnrollment ||
                                    course.id === isEnrollment.courseId ? (
                                      <span className="text-red-500">
                                        Enrolled
                                      </span>
                                    ) : (
                                      <button
                                        onClick={() => handleSelect(course)}
                                        className={`hidden group-hover:inline-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-md ${
                                          isEnrollment &&
                                          course.id === isEnrollment.courseId
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                        }`}
                                      >
                                        Select
                                      </button>
                                    )}
                                  </li>
                                ))
                            )
                        )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="max-w-sm flex-1">
                <button className="p-4 flex items-center bg-[#e8e8e8]  rounded-lg shadow-lg w-full">
                  <TbFilePercent size={18} />
                  <span className="ml-2">KHUYẾN MẠI/VOUCHER</span>
                </button>
                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="discountInput"
                  >
                    Nhập mã khuyến mãi:
                  </label>
                  <div className="flex">
                    <input
                      className="p-2 border border-gray-400 rounded-l w-full text-sm outline-none"
                      type="text"
                      id="discountInput"
                      placeholder="Mã khuyến mãi"
                    />
                    <button className="w-[100px] bg-[#e8e8e8]  rounded-r text-sm">
                      Sử dụng
                    </button>
                  </div>
                </div>
              </div>

              <div className="max-w-sm flex-1">
                <button className="p-4 flex items-center bg-[#e8e8e8]  rounded-lg shadow-lg w-full">
                  <GiArchiveRegister size={20} />
                  <span className="ml-2">KHÓA HỌC SẼ ĐĂNG KÝ HỌC</span>
                </button>
                <ul className="max-w-sm  mt-2 break-words">
                  <div>
                    {selectedCourses &&
                      selectedCourses.map((course) => (
                        <li
                          key={course.id}
                          className="relative flex justify-between gap-3 pt-4 border bg-[#0072bc] p-2 mb-2 rounded-lg"
                        >
                          <div>
                            <span className="text-sm block font-sans text-white">
                              {course.courseName}
                            </span>
                            <span className="text-sm font-sans text-gray-400">
                              {course.user.username}
                            </span>
                          </div>
                          <span className=" text-lg text-white font-bold">
                            {course.coursePrice} đ
                          </span>
                          <CiCircleRemove
                            className="absolute right-1 top-0 cursor-pointer"
                            color="white"
                            size={20}
                            onClick={() => handleRemove(course)}
                          />
                        </li>
                      ))}

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-gray-700">
                          <span className="font-bold block">Học phí:</span>
                          <span>Mã Voucher:</span>
                        </div>

                        <div className="text-gray-700">
                          <span className="font-bold block">
                            {totalMoney} đ
                          </span>
                          <span>0</span>
                        </div>
                      </div>

                      <div className="w-full h-[1px] bg-black mb-2"></div>

                      <div className="flex justify-between items-center mb-2">
                        <div className="text-gray-700 font-bold">
                          Học phí phải đóng:
                        </div>
                        <div className="text-red-600"> {totalMoney} đ</div>
                      </div>
                      <div
                        onClick={handleOpen}
                        className="text-lg font-bold text-center bg-[#ff9e00] py-2 text-white cursor-pointer"
                      >
                        THANH TOÁN
                      </div>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[600px] bg-white border-2 border-gray-500  outline-none shadow-lg ">
                          <div>
                            <div className="bg-[#0072bc]  text-white p-4 text-center font-bold">
                              XÁC NHẬN ĐĂNG KÝ HỌC
                            </div>
                            <div className="px-3 mt-2 space-y-2 ">
                              <p className="text-sm font-sans">
                                × XÁC NHẬN ĐĂNG KÝ HỌC Bạn sẽ đăng ký khóa học
                                cho tài khoản: {user?.email}
                              </p>
                              <div>
                                {selectedCourses &&
                                  selectedCourses.map((course) => (
                                    <div
                                      key={course.id}
                                      className="flex justify-between gap-3 border bg-[#0072bc] p-2 mb-2 rounded-lg"
                                    >
                                      <div className="">
                                        <span className="text-sm block font-sans text-white">
                                          {course.courseName}
                                        </span>
                                        <span className="text-sm font-sans text-gray-400">
                                          {course.user.username}
                                        </span>
                                      </div>
                                      <span className="text-lg text-white font-bold">
                                        {course.coursePrice} đ
                                      </span>
                                    </div>
                                  ))}
                              </div>
                              <div className="w-2/3 ml-auto">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-gray-700">
                                    <span className="font-bold block">
                                      Học phí:
                                    </span>
                                    <span>Mã Voucher:</span>
                                  </div>
                                  <div className="text-gray-700">
                                    <span className="font-bold block">
                                      {totalMoney} đ
                                    </span>
                                    <span>0</span>
                                  </div>
                                </div>
                                <div className="w-full h-[1px] bg-black mb-2"></div>
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-gray-700 font-bold">
                                    Học phí phải đóng:
                                  </div>
                                  <div className="text-red-600">
                                    {totalMoney} đ
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mb-3">
                                  <button
                                    onClick={handleClose}
                                    className="bg-red-600 text-sm text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                  >
                                    Hủy
                                  </button>
                                  <div className="ml-4">
                                    <button
                                      onClick={handlePayment}
                                      className="bg-blue-600 text-sm text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    >
                                      Xác nhận thanh toán khóa học
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default Payment;
