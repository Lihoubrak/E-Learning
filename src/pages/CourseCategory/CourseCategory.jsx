import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FaChevronRight, FaHome } from "react-icons/fa";
import {
  CategorySecond,
  CourseListCategory,
  SubjectDetail,
} from "../../components";
import Tippy from "@tippyjs/react/headless";
import { publicRequest } from "../../RequestMethod/Request";
import { useParams } from "react-router-dom";

const CourseCategory = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategorySecond, setSelectedCategorySecond] = useState(null);
  console.log("selectedCategorySecond", selectedCategorySecond);
  const { categorySecondId, categoryId } = useParams();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await publicRequest.get("/categorys");
        setCategory(res.data);

        if (categoryId && categorySecondId) {
          const selectedCategoryItem = res.data.find(
            (categoryItem) => categoryItem.id === Number(categoryId)
          );

          if (selectedCategoryItem) {
            const selectedCategoryFirst =
              selectedCategoryItem.categoryFirsts.find(
                (categoryFirst) => categoryFirst.id === Number(categoryId)
              );

            if (selectedCategoryFirst) {
              const selectedCategorySecond =
                selectedCategoryFirst.categorySeconds.find(
                  (categorySecond) =>
                    categorySecond.id === Number(categorySecondId)
                );

              if (selectedCategorySecond) {
                setSelectedCategorySecond(selectedCategorySecond);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, [categorySecondId, categoryId]);
  const handleCategorySecondClick = (categorySecond) => {
    setSelectedCategorySecond(categorySecond);
  };
  const getCategory = () => {
    if (selectedCategorySecond) {
      const categoryFirst = category.find((categoryItem) =>
        categoryItem.categoryFirsts.find(
          (cf) => cf.id === selectedCategorySecond.categoryFirstId
        )
      );
      return categoryFirst ? categoryFirst.categoryName : "";
    }
    return "";
  };
  const getCategoryName = () => {
    if (selectedCategorySecond) {
      const foundCategory = category.find((categoryItem) =>
        categoryItem.categoryFirsts.find(
          (cf) => cf.id === selectedCategorySecond.categoryFirstId
        )
      );

      if (foundCategory && foundCategory.categoryFirsts.length > 0) {
        return foundCategory.categoryFirsts[0].categoryFirstName;
      } else {
        return "";
      }
    }
    return "";
  };

  return (
    <SubjectDetail showHeader={true}>
      <div className="pt-24 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 bg-white border text-gray-700 ">
          <div className="font-bold flex items-center justify-center p-2">
            <BiMenu size={20} color="black" />
            <span className="ml-2">Khoá học của tôi</span>
          </div>
          {category.map((categoryItem) => (
            <div key={categoryItem.id}>
              <ul className="text-center font-sans">
                <li className="bg-gray-200 p-2">{categoryItem.categoryName}</li>
                {categoryItem.categoryFirsts.map((categoryFirst) => (
                  <React.Fragment key={categoryFirst.id}>
                    <ul>
                      <Tippy
                        placement="right-start"
                        interactive
                        render={(attrs) => (
                          <CategorySecond
                            {...attrs}
                            categorySecond={categoryFirst.categorySeconds}
                            onCategorySecondClick={handleCategorySecondClick}
                          />
                        )}
                      >
                        <li className="cursor-pointer relative p-2 hover:bg-blue-700 hover:text-white flex items-center justify-center">
                          <span>{categoryFirst.categoryFirstName}</span>
                          <FaChevronRight className="absolute right-3" />
                        </li>
                      </Tippy>
                    </ul>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center text-lg font-bold text-gray-800">
            <FaHome size={20} className="text-blue-500" />
            <span className="ml-3">{getCategory()}</span>
          </div>

          <div className="flex-shrink-0">
            <img
              src="https://hocmai.vn/media/images/course/banner/760x200-445.png"
              alt=""
              className="w-full object-contain"
            />
          </div>

          <div className="flex-1">
            <div className="px-4 py-2 bg-[#2a70b8] text-white font-bold mb-4">
              {getCategoryName()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedCategorySecond &&
                selectedCategorySecond?.courses?.map((course) => (
                  <CourseListCategory
                    key={course.id}
                    imageUrl={course.courseImage}
                    title={course.courseName}
                    fee={
                      course.coursePrice ? `${course.coursePrice} đồng` : "Free"
                    }
                    duration={course.courseRegister}
                    teacher={course.user.username}
                    detailsLink={`/specificCourse/${course.id}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default CourseCategory;
