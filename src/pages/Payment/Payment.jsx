import React, { useState } from "react";
import { PaymentReport, PaymentTable, SubjectDetail } from "../../components";
import { TiTick } from "react-icons/ti";
import { FaBookMedical, FaCheck, FaCreditCard } from "react-icons/fa";
import { LuBookMarked } from "react-icons/lu";
import { TbFilePercent } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Backdrop, Table, TableBody, TableHead } from "@mui/material";
const Payment = () => {
  const [open, setOpen] = useState(false);
  const [clickHeaderIndex, setClickHeaderIndex] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <div className="mt-24">
        <div className="mx-24">
          <ul className="flex border-b-[1px] text-blue-600 mb-24">
            {["Đại học", "Các khóa THPT", "THCS", "Tiểu học"].map(
              (item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer px-3 py-2 ${
                    index === clickHeaderIndex ? "bg-blue-600 text-white" : ""
                  }`}
                  onClick={() => setClickHeaderIndex(index)}
                >
                  {item}
                </li>
              )
            )}
          </ul>
          {/* {context} */}
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
              <div className="flex-1">
                <h1 className="text-xl font-sans mb-4 text-center text-blue-600">
                  TRUNG HỌC CƠ SỞ
                </h1>
                <ul className="flex flex-wrap">
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 6
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 7
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 8
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                </ul>
              </div>
              <div className=" flex-1">
                <h1 className="text-xl font-sans mb-4 text-center text-blue-600">
                  TRUNG HỌC CƠ SỞ (2021-2022)
                </h1>
                <ul className="flex flex-wrap">
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 6
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 7
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 8
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                  <li className="border px-4 py-2 mb-4 hover:bg-blue-600 hover:text-white cursor-pointer">
                    Lớp 9
                  </li>
                </ul>
              </div>
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
                <ul className="max-w-sm  mt-2 break-words">
                  <li className="flex justify-between gap-3 border bg-gray-100 p-2 mb-2 rounded-lg">
                    <span className="text-sm font-sans text-gray-800">
                      NGỮ VĂN 12 - THẦY ĐẶNG NGỌC KHƯƠNG, CÔ TRẦN XUÂN - 3 THÁNG
                    </span>
                    <span className="text-lg text-gray-700 font-bold">
                      400,000
                    </span>
                  </li>
                  <li className="flex justify-between gap-3 border bg-gray-100 p-2 mb-2 rounded-lg">
                    <span className="text-sm font-sans text-gray-800">
                      NGỮ VĂN 12 - THẦY ĐẶNG NGỌC KHƯƠNG, CÔ TRẦN XUÂN - 3 THÁNG
                    </span>
                    <span className="text-lg text-gray-700 font-bold">
                      400,000
                    </span>
                  </li>
                </ul>
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
                    <li className="flex justify-between gap-3 border bg-[#0072bc] p-2 mb-2 rounded-lg">
                      <div>
                        <span className="text-sm block font-sans text-white">
                          NGỮ VĂN 12 - THẦY ĐẶNG NGỌC KHƯƠNG, CÔ TRẦN XUÂN - 3
                          THÁNG
                        </span>
                        <span className="text-sm font-sans text-gray-400">
                          Le Ba Tran Phuong
                        </span>
                      </div>
                      <span className="text-lg text-white font-bold">
                        400,000
                      </span>
                    </li>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-gray-700">
                          <span className="font-bold block">Học phí:</span>
                          <span>Mã Voucher:</span>
                        </div>

                        <div className="text-gray-700">
                          <span className="font-bold block">2.199.000 đ</span>
                          <span>0</span>
                        </div>
                      </div>

                      <div className="w-full h-[1px] bg-black mb-2"></div>

                      <div className="flex justify-between items-center mb-2">
                        <div className="text-gray-700 font-bold">
                          Học phí phải đóng:
                        </div>
                        <div className="text-red-600">2.199.000 đ</div>
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
                                cho tài khoản: dcan38802@gmail.com
                              </p>
                              <div className="flex justify-between gap-3 border bg-[#0072bc] p-2 mb-2 rounded-lg">
                                <div>
                                  <span className="text-sm block font-sans text-white">
                                    NGỮ VĂN 12 - THẦY ĐẶNG NGỌC KHƯƠNG, CÔ TRẦN
                                    XUÂN - 3 THÁNG
                                  </span>
                                  <span className="text-sm font-sans text-gray-400">
                                    Le Ba Tran Phuong
                                  </span>
                                </div>
                                <span className="text-lg text-white font-bold">
                                  400,000
                                </span>
                              </div>
                              <div className="flex justify-between gap-3 border bg-[#0072bc] p-2 mb-2 rounded-lg">
                                <div>
                                  <span className="text-sm block font-sans text-white">
                                    NGỮ VĂN 12 - THẦY ĐẶNG NGỌC KHƯƠNG, CÔ TRẦN
                                    XUÂN - 3 THÁNG
                                  </span>
                                  <span className="text-sm font-sans text-gray-400">
                                    Le Ba Tran Phuong
                                  </span>
                                </div>
                                <span className="text-lg text-white font-bold">
                                  400,000
                                </span>
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
                                      2.199.000 đ
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
                                    2.199.000 đ
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
                                    <button className="bg-blue-600 text-sm text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
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
