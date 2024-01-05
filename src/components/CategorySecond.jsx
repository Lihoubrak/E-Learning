import React from "react";
import { BiBook } from "react-icons/bi";

const CategorySecond = ({ categorySecond, onCategorySecondClick }) => {
  return (
    <div className="bg-blue-600 min-w-[240px]">
      <ul className="list-none w-full">
        {categorySecond.map((categorySecondItem) => {
          return (
            <li
              onClick={() => onCategorySecondClick(categorySecondItem)}
              key={categorySecondItem.id}
              className="cursor-pointer flex items-center mb-2 text-white hover:bg-blue-700 p-2 "
            >
              <BiBook className="mr-2 text-sm" />
              <span className="font-sans text-sm">
                {categorySecondItem.categorySecondName}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySecond;
