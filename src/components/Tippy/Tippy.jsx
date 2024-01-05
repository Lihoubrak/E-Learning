import React, { useState, useEffect } from "react";
import { IoMdBook } from "react-icons/io";
import { Link } from "react-router-dom";
const Tippy = ({ categoryFirsts }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (index) => {
    setActiveItem(index);
  };

  useEffect(() => {
    // Trigger a click on the first button when the component mounts
    if (categoryFirsts && categoryFirsts.length > 0) {
      handleClick(categoryFirsts[0].id);
    }
  }, [categoryFirsts]);
  const calculateMaxWidth = () => {
    // Calculate max-width based on the specified formula
    return `calc(860px - 244px)`;
  };
  return (
    <div className="min-w-[860px] min-h-[390px] shadow-sm shadow-slate-500 bg-white relative ">
      <ul className="flex border-b items-center space-x-5">
        {categoryFirsts?.map((item) => (
          <li
            className={`py-4 px-10 cursor-pointer ${
              activeItem === item.id ? "bg-blue-700  text-white font-bold" : ""
            }`}
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            {item.categoryFirstName}
          </li>
        ))}
      </ul>
      {activeItem !== null &&
        categoryFirsts &&
        categoryFirsts.find((item) => item.id === activeItem) && (
          <div className="">
            <ul
              className="flex gap-x-10 pt-5 px-5"
              style={{ maxWidth: calculateMaxWidth() }}
            >
              {categoryFirsts
                .find((item) => item.id === activeItem)
                .categorySeconds.map((categorySecond) => (
                  <Link
                    key={categorySecond.id}
                    to={`/courseCategory/${activeItem}/${categorySecond.id}`}
                  >
                    <li className="cursor-pointer font-sans flex items-center  gap-x-2 hover:text-blue-700">
                      <IoMdBook size={20} />
                      {categorySecond.categorySecondName}
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
        )}
      <img
        src="https://hocmai.vn/media/images/home/desktop/244x390-12.jpg"
        alt=""
        className="absolute right-0 bottom-0 top-0"
      />
    </div>
  );
};

export default Tippy;
