// File: YourComponent.js
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
const PaymentTransaction = ({ headers, data }) => {
  const handleViewDetailsClick = (invoiceNumber) => {
    alert(`View details for invoice ${invoiceNumber}`);
  };

  return (
    <TableContainer
      component={Paper}
      className="w-full max-w-[750px] ml-4 p-8 rounded-md"
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
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  style={{ cursor: "pointer" }}
                  align="center"
                  onClick={handleViewDetailsClick}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default PaymentTransaction;
