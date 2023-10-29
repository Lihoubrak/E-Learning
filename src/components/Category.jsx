import React from "react";

const Category = ({ categories }) => {
  return (
    <ul className="flex px-36 py-2 gap-5 items-center bg-[#f7f8fa] text-[#9d9e9e] mt-[70px]">
      {categories.map((category, index) => (
        <li key={index} className="cursor-pointer hover:text-blue-500">
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Category;
