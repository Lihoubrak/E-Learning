import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import React from "react";

const PaymentTransaction = ({ headers, data }) => {
  const handleViewDetailsClick = (invoiceNumber) => {
    alert(`View details for invoice ${invoiceNumber}`);
  };

  return (
    <TableContainer
      component={Paper}
      className="w-full max-w-[900px] ml-4 p-8 rounded-md"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={6}
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
            {headers.map((header, index) => (
              <TableCell
                key={index}
                align="center"
                style={{ width: 200, fontWeight: "bold", textAlign: "center" }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((payment, paymentIndex) => (
            <React.Fragment key={paymentIndex}>
              {payment.enrollment_payments.map(
                (enrollmentPayment, enrollmentIndex) => (
                  <TableRow key={enrollmentIndex}>
                    <TableCell align="center">
                      {enrollmentPayment.enrollment.id}
                    </TableCell>
                    <TableCell align="center">
                      {enrollmentPayment.enrollment.courseId}
                    </TableCell>
                    <TableCell align="center">
                      {payment.paymentAmount}
                    </TableCell>
                    <TableCell align="center">{payment.paymentDate}</TableCell>
                    <TableCell align="center">
                      {enrollmentPayment.paymentStatus}
                    </TableCell>
                    <TableCell align="center" sx={{ width: 250 }}>
                      <Button
                        onClick={() =>
                          handleViewDetailsClick(
                            enrollmentPayment.enrollment.id
                          )
                        }
                        variant="contained"
                        color="primary"
                      >
                        Xem chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTransaction;
