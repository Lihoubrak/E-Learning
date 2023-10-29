import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { IoIosCall } from "react-icons/io";
import TippyHeadless from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import Subject from "./Subject";
import { Link } from "react-router-dom";
const Header = ({
  backgroundColor,
  phoneNumber,
  loginButtonLabel,
  registerButtonLabel,
  SubjectDetail,
  logo,
}) => {
  return (
    <header
      className={`${
        SubjectDetail ? "px-52" : "px-20"
      } py-2 flex justify-between items-center shadow-lg shadow-zinc-200 bg-white fixed w-full top-0 z-30 `}
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
                <BiMenu size={30} color="#ffffff" className="cursor-pointer" />
              </span>
              <span className="text-white "> Các khóa học</span>
            </div>
          </TippyHeadless>
        ) : (
          <div className="w-12 h-12 rounded-full overflow-hidden">
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
          <div>
            <img src={logo} alt="Subject Detail" />
          </div>
        ) : (
          <>
            <IoIosCall />
            <span>{phoneNumber}</span>
          </>
        )}
      </div>

      <div className="flex gap-5">
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
      </div>
    </header>
  );
};

export default Header;
