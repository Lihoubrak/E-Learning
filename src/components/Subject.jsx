import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Tippy as HeadlessTippy } from "../components";
import axios from "axios";
const Subject = () => {
  const [subject, setSubject] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categorys");
        setSubject(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul className="space-y-1 w-72 border border-gray-200 rounded-lg bg-white overflow-hidden">
        <li className="flex items-center bg-[#eeeef2] p-2">
          <BiMenu size={24} />
          <span className="ml-2 text-lg font-semibold">Các khóa học</span>
        </li>
        {subject.map((sub, index) => (
          <Tippy
            placement="right-start"
            interactive
            render={(attrs) => (
              <HeadlessTippy categoryFirsts={sub.categoryFirsts} />
            )}
            key={index}
          >
            <li className="flex items-center p-2 hover:bg-gray-100 text-sm cursor-pointer">
              <div>
                <img
                  src="https://hocmai.vn/assets/front/images/school.png"
                  alt="School"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="ml-2">{sub.categoryName}</p>
            </li>
          </Tippy>
        ))}
      </ul>
    </div>
  );
};

export default Subject;
