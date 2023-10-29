import React, { useState } from "react";

const Tippy = ({ subcategory }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (index) => {
    setActiveItem(index);
  };

  return (
    <div className="min-w-[860px] min-h-[400px] shadow-sm shadow-slate-500 bg-white">
      <ul className="flex border-b items-center space-x-5">
        {subcategory.map((item) => (
          <li
            className={`py-4 px-10 cursor-pointer ${
              activeItem === item.subcategory_id ? "bg-red-100" : ""
            }`}
            key={item.subcategory_id}
            onClick={() => handleClick(item.subcategory_id)}
          >
            {item.sub_category_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tippy;
