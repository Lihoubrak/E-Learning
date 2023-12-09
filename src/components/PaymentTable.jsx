import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const PaymentTable = ({ columns, rows }) => {
  return (
    <div className="mx-24">
      <div className="w-full mt-10">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={columns.length}
                align="center"
                style={{
                  border: "1px solid gray",
                  backgroundColor: "#2a70b8",
                  padding: "12px",
                  borderBottom: "2px solid #ccc",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                Danh sách hóa đơn
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.dataKey}
                  variant="head"
                  align="center"
                  style={{
                    width: column.width,
                    border: "1px solid gray",
                    backgroundColor: "background.paper",
                    padding: "12px",
                    borderBottom: "2px solid #ccc",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
                    align="center"
                    style={{
                      width: column.width,
                      border: "1px solid gray",
                      padding: "12px",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {row[column.dataKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentTable;
