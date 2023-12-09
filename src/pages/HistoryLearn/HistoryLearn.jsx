import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";

const HistoryLearn = () => {
  const rows = [
    {
      start: "20/11/2023 13:18:05",
      end: "21/11/2023 20:07:21",
      lesson:
        "Bài 1. Các kỹ thuật kinh điển về xét tính đơn điệu của hàm số (P1)",
      course: "PEN-C Toán - Thầy Lê Bá Trần Phương",
    },
  ];

  return (
    <div>
      <div>
        <ul className="flex flex-wrap">
          <li className="border-b-4 py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Văn
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Tiếng Việt
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Toán
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Anh
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Vật lí
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Hóa
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Sinh
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Sử
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Địa
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            GDCD
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            Tổ hợp môn
          </li>
          <li className="border-b-4  py-2 px-4 text-center hover:border-blue-600 cursor-pointer">
            KHTN
          </li>
        </ul>
      </div>

      <h1 className="text-xl font-bold text-blue-600 my-3">Lịch sử học tập</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ borderBottom: "2px solid black" }}>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", width: 100 }}
              >
                Bắt đầu
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", width: 100 }}
              >
                Kết thúc
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", width: 300 }}
              >
                Tên bài học
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", width: 300 }}
              >
                Khóa học
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.start}</TableCell>
                <TableCell align="center">{row.end}</TableCell>
                <TableCell align="center">{row.lesson}</TableCell>
                <TableCell align="center">{row.course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryLearn;
