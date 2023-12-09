import React, { useEffect, useState } from "react";

import Footer from "../pages/Footer/Footer";
import Header from "./Header";

const SubjectDetail = ({
  children,
  scrollY,
  quiz,
  showHeader,
  examTime,
  submitAnswers,
}) => {
  return (
    <div className="bg-[#f5f8fa]">
      <Header
        colorKhoaIcon={"#6b7280"}
        submitAnswers={submitAnswers}
        showHeader={showHeader}
        scrollY={scrollY}
        examTime={examTime}
        quiz={quiz}
        SubjectDetail={true}
        backgroundColor="#2a70b8"
        loginButtonLabel=" Đăng nhập"
        registerButtonLabel="Đăng ký"
        logo="https://media.istockphoto.com/id/1249217897/vi/vec-to/assassin-ninja-warrior-eith-cloak-mascot-logo-ch%C6%A1i-game-vector-minh-h%E1%BB%8Da.webp?s=1024x1024&w=is&k=20&c=37m0gByNGhagimT4BGARaJcmZisSXzw5Z-B2FJZRlZQ="
      />
      {children}
      <Footer />
    </div>
  );
};

export default SubjectDetail;
