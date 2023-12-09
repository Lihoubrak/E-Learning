import React from "react";

const PaymentSummary = ({ mainAmount, promoAmount }) => {
  return (
    <div className="border text-center w-[750px] ml-4 p-8 bg-white rounded-md">
      <p>Số tiền trong tài khoản chính: {mainAmount} VND</p>
      <p>Số tiền trong tài khoản khuyến mại: {promoAmount} VND</p>
    </div>
  );
};

export default PaymentSummary;
