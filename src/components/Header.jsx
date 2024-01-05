import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { IoIosArrowBack, IoIosCall } from "react-icons/io";
import TippyHeadless from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import Subject from "./Subject";
import { Link } from "react-router-dom";
import clock from "../assets/images/clock.png";
import { FaBookMedical } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import Tippy from "@tippyjs/react/headless";
import TippyProfile from "./Tippy/TippyProfile";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { TokenRequest } from "../RequestMethod/Request";
import UpdateUserContext from "../context/UpdateUserContext";
const Header = ({
  backgroundColor,
  phoneNumber,
  loginButtonLabel,
  registerButtonLabel,
  SubjectDetail,
  logo,
  scrollY,
  showHeader,
  quiz,
  examTime,
  submitAnswers,
  colorKhoaIcon,
  setIsQuizPaused,
}) => {
  const [user, setUser] = useState(null);
  const { isChange } = useContext(UpdateUserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await TokenRequest.get(`/users/infouser`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isChange]);
  return (
    <header>
      {(scrollY || showHeader) && (
        <div
          className={`${
            SubjectDetail ? "px-32" : "px-20"
          } py-2 flex justify-between items-center shadow-md shadow-zinc-200 bg-white fixed w-full top-0 z-30 `}
          style={{ backgroundColor: backgroundColor }}
        >
          <div className="flex items-center">
            {SubjectDetail ? (
              <TippyHeadless
                placement="top-start"
                hideOnClick={false}
                interactive
                render={(attrs) => <Subject />}
              >
                <div className="flex items-center gap-x-1 cursor-pointer">
                  <span>
                    <BiMenu
                      size={30}
                      color="#ffffff"
                      className="cursor-pointer"
                    />
                  </span>
                  <span className="text-white "> Các khóa học</span>
                </div>
              </TippyHeadless>
            ) : (
              <div
                onClick={() => (window.location.href = "/")}
                className="w-12 h-12 rounded-full overflow-hidden cursor-pointer"
              >
                <img src={logo} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex items-center p-2 bg-[#f2f3f5] rounded-lg ml-4">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none border-none px-1 w-full"
              />
              <AiOutlineSearch size={24} color="#777677" />
            </div>
          </div>

          <div
            className={`text-yellow-500 flex items-center gap-2 ${
              SubjectDetail ? "h-12 w-12 rounded-lg overflow-hidden" : ""
            }`}
          >
            {SubjectDetail ? (
              <div
                onClick={() => (window.location.href = "/")}
                className="cursor-pointer"
              >
                <img src={logo} alt="Subject Detail" />
              </div>
            ) : (
              <>
                <IoIosCall />
                <span>{phoneNumber}</span>
              </>
            )}
          </div>

          <div className="flex gap-5 items-center ">
            {!!user ? (
              <>
                <Link to={"/courseMe"}>
                  <div className="flex items-center cursor-pointer hover:text-blue-500">
                    <FaBookMedical
                      size={30}
                      color={!!colorKhoaIcon ? "white" : "#6b7280"}
                    />

                    <span
                      className={`ml-2 
                        ${!!colorKhoaIcon && "text-white"}
                        text-gray-500
                        text-lg font-semibold`}
                    >
                      Khóa học của tôi
                    </span>
                  </div>
                </Link>
                <IoIosNotifications
                  size={30}
                  color="#FFFFFF"
                  className="cursor-pointer"
                />
                <Tippy
                  interactive
                  render={(attrs) => <TippyProfile user={user} />}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Tippy>
              </>
            ) : (
              <>
                <Link to={"/login "}>
                  <button
                    className={`${
                      SubjectDetail ? "font-bold text-white" : "border"
                    } border-gray-400 px-8 py-2 rounded-md `}
                  >
                    {loginButtonLabel}
                  </button>
                </Link>
                <Link to={"/register"}>
                  <button className=" font-bold text-white bg-[#ff9800] px-8 py-2 rounded-md">
                    {registerButtonLabel}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {quiz ? (
        <div
          className={`bg-[#fffcfc] flex  border px-52 py-2 z-10 items-center justify-between fixed left-0 right-0  top-${
            scrollY && quiz ? 16 : 0
          }`}
          style={{
            boxShadow: "-1px 9px 5px -5px rgba(0, 0, 0, 0.20)",
            WebkitBoxShadow: "-1px 9px 5px -5px rgba(0, 0, 0, 0.20)",
            MozBoxShadow: "-1px 9px 5px -5px rgba(0, 0, 0, 0.20)",
          }}
        >
          <div className="flex items-center cursor-pointer flex-1">
            <IoIosArrowBack className="text-blue-700 text-2xl" />
            <h1 className="text-blue-700   font-semibold ml-3">
              QUAY LẠI KHOA HỌC
            </h1>
          </div>

          <div className="flex items-center flex-1 justify-between">
            <div className="flex items-center mr-4">
              <img src={clock} alt="clock" className="mr-2 w-6 h-6" />
              <span className="text-yellow-800 text-lg font-semibold">
                {examTime}
              </span>
            </div>
            <div className="flex">
              <div
                onClick={submitAnswers}
                className="px-5 py-3 bg-[#2a70b8] text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
              >
                NỘP BÀI
              </div>
              <div
                onClick={setIsQuizPaused}
                className="px-5 py-3 bg-[#888888] text-white rounded-md cursor-pointer ml-2 hover:bg-gray-600 transition duration-300"
              >
                TẠM DỪNG
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
