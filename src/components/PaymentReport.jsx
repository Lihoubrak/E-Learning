import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const PaymentReport = () => {
  const navigateToHome = () => {};

  const data = [
    {
      stt: 1,
      khoaHoc: "React Fundamentals",
      hocPhi: 100,
      soLuong: 2,
      duongGiam: 10,
    },
    {
      stt: 2,
      khoaHoc: "Advanced JavaScript",
      hocPhi: 120,
      soLuong: 1,
      duongGiam: 5,
    },
    // Add more data as needed
  ];

  // Calculate totals
  const totalGiaTriDonHang = data.reduce(
    (acc, row) => acc + row.hocPhi * row.soLuong,
    0
  );
  const tongSoTienGiamTuVoucher = data.reduce(
    (acc, row) => acc + row.duongGiam * row.soLuong,
    0
  );
  const soTienCanThanhToan = totalGiaTriDonHang - tongSoTienGiamTuVoucher;

  return (
    <div className="mx-24">
      <div className="border w-full mt-10 p-8">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <img
              src="https://hocmai.vn/hmerror/assets/images/logo.png"
              alt="Company Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="flex-1">
            <p className="text-xl font-semibold mb-2">
              Công Ty Cổ Phần Đầu Tư và Dịch Vụ Giáo Dục
            </p>
            <ul className="list-disc pl-4">
              <li>
                Tầng 4, Tòa nhà 25T2, Đường Nguyễn Thụy Thập, Phường Trung Hòa,
                Quận Cầu Giấy, Hà Nội
              </li>
              <li>Đường dây nóng: 1900-6933</li>
            </ul>
          </div>
          <div className="ml-4">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="text-sm mr-2">Hóa Đơn số:</div>
                <div className="text-lg font-semibold">1801024843-3434e</div>
              </div>
              <div className="flex items-center mb-2">
                <div className="text-sm mr-2">Ngày tạo đơn:</div>
                <div className="text-lg font-semibold">4354354</div>
              </div>
              <div className="flex items-center mb-2">
                <div className="text-sm mr-2">Ngày thanh toán:</div>
                <div className="text-lg font-semibold">4545</div>
              </div>
              <div className="flex items-center">
                <div className="text-sm mr-2">Trạng thái:</div>
                <div className="text-lg font-semibold text-red-500">
                  Hủy đơn hàng
                </div>
              </div>
            </div>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Khoá Học/Chuyên Đề</TableCell>
              <TableCell align="center">Học Phí</TableCell>
              <TableCell align="center">Số Lượng</TableCell>
              <TableCell align="center">Giảm Giá</TableCell>
              <TableCell align="center">Thành Tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.stt}>
                <TableCell align="center">{row.stt}</TableCell>
                <TableCell align="center">{row.khoaHoc}</TableCell>
                <TableCell align="center">{`$${row.hocPhi}`}</TableCell>
                <TableCell align="center">{row.soLuong}</TableCell>
                <TableCell align="center">{`$${row.duongGiam}`}</TableCell>
                <TableCell align="center">{`$${
                  row.hocPhi * row.soLuong
                }`}</TableCell>
              </TableRow>
            ))}
            {/* Additional rows for totals */}
            <TableRow>
              <TableCell colSpan={5} align="right">
                Tổng Giá Trị Đơn Hàng:
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "black", fontWeight: "bold" }}
              >{`$${totalGiaTriDonHang}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                Tổng Số Tiền Được Giảm Từ Voucher:
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "black", fontWeight: "bold" }}
              >{`$${tongSoTienGiamTuVoucher}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                Tổng Số Tiền Cần Thanh Toán:
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "black", fontWeight: "bold" }}
              >{`$${soTienCanThanhToan}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-4">
          <Button variant="contained" color="primary" onClick={navigateToHome}>
            Về Trang Chủ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;
