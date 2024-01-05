import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { TokenRequest } from "../../RequestMethod/Request";
import UpdateUserContext from "../../context/UpdateUserContext";
const ProfileDetail = ({ user }) => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setChange, isChange } = useContext(UpdateUserContext);
  console.log(isChange);
  const datePart = user && user.birthday ? user.birthday.split("T")[0] : null;
  const [modifiedUser, setModifiedUser] = useState({
    username: user?.username || "",
    role: "student",
    birthday: {
      day: datePart ? datePart.split("-")[2] || "" : "",
      month: datePart ? datePart.split("-")[1] || "" : "",
      year: datePart ? datePart.split("-")[0] || "" : "",
    },
    gender: user && user.sex ? user.sex : "",
    phone: user?.phone || "",
    email: user?.email || "",
    facebook: user?.facebookId || "",
    zalo: user?.zaloId || "",
    city: { value: user?.city || "", label: user?.city?.toUpperCase() || "" },
    district: {
      value: user?.district || "",
      label: user?.district?.toUpperCase() || "",
    },
    grade: {
      value: user?.class || "",
      label: user?.class?.toUpperCase() || "",
    },
    school: {
      value: user?.school || "",
      label: user?.school?.toUpperCase() || "",
    },
    avatar: "",
  });
  useEffect(() => {
    const datePart = user && user.birthday ? user.birthday.split("T")[0] : null;
    setModifiedUser({
      username: user?.username || "",
      role: "student",
      birthday: {
        day: datePart ? datePart.split("-")[2] || "" : "",
        month: datePart ? datePart.split("-")[1] || "" : "",
        year: datePart ? datePart.split("-")[0] || "" : "",
      },
      gender: user && user.sex ? user.sex : "",
      phone: user?.phone || "",
      email: user?.email || "",
      facebook: user?.facebookId || "",
      zalo: user?.zaloId || "",
      city: { value: user?.city || "", label: user?.city?.toUpperCase() || "" },
      district: {
        value: user?.district || "",
        label: user?.district?.toUpperCase() || "",
      },
      grade: {
        value: user?.class || "",
        label: user?.class?.toUpperCase() || "",
      },
      school: {
        value: user?.school || "",
        label: user?.school?.toUpperCase() || "",
      },
    });
  }, [user, isChange]);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "day" || id === "month" || id === "year") {
      setModifiedUser((prevUser) => ({
        ...prevUser,
        birthday: { ...prevUser.birthday, [id]: value || "" },
      }));
    } else {
      setModifiedUser((prevUser) => ({ ...prevUser, [id]: value }));
    }
  };

  const handleSelectChange = (id, selectedOption) => {
    const updatedOption = {
      value: selectedOption.value,
      label: selectedOption.label,
    };

    setModifiedUser((prevUser) => ({
      ...prevUser,
      [id]: updatedOption,
    }));
  };

  const formatBirthday = () => {
    const { day, month, year } = modifiedUser.birthday;
    if (day && month && year) {
      return `${year}-${month}-${day}`;
    }
    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setChange(true);
      setLoading(true);
      const response = await TokenRequest.put("/users/change", {
        username: modifiedUser.username,
        birthday: formatBirthday(),
        sex: modifiedUser.gender,
        phone: modifiedUser.phone,
        email: modifiedUser.email,
        facebookId: modifiedUser.facebook,
        zaloId: modifiedUser.zalo,
        city: modifiedUser.city.value,
        district: modifiedUser.district.value,
        class: modifiedUser.grade.value,
        school: modifiedUser.school.value,
      });
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const cityOptions = [
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "TP. Hồ Chí Minh", label: "TP. Hồ Chí Minh" },
    // Add other city options as needed
  ];

  const districtOptions = [
    { value: "Quận Đống Đa", label: "Quận Đống Đa" },
    { value: "Quận Bình Thạnh", label: "Quận Bình Thạnh" },
    // Add other district options as needed
  ];

  const gradeOptions = [
    { value: "Lớp 1", label: "Lớp 1" },
    { value: "Lớp 2", label: "Lớp 2" },
    // Add other grade options as needed
  ];

  const schoolOptions = [
    { value: "Trường 1", label: "Trường 1" },
    { value: "Trường 2", label: "Trường 2" },
    // Add other school options as needed
  ];

  return (
    <div className="bg-white border ml-4 p-4">
      <div className=" ">
        <h1 className="text-xl font-bold mb-2 text-center">
          Thông tin của Can Do
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Họ và tên *
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded"
              value={modifiedUser.username || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600"
            >
              Bạn là *
            </label>
            <select
              id="role"
              className="mt-1 p-2 w-full border rounded"
              defaultValue="student"
              disabled
            >
              <option value="student">Học sinh</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="birthday"
              className="block text-sm font-medium text-gray-600"
            >
              Sinh nhật *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="day"
                placeholder="Ngày"
                className="p-2 w-1/4 border rounded"
                value={modifiedUser.birthday.day || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="month"
                placeholder="Tháng"
                className="p-2 w-1/4 border rounded"
                value={modifiedUser.birthday.month || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="year"
                placeholder="Năm"
                className="p-2 w-1/4 border rounded"
                value={modifiedUser.birthday.year || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-600"
            >
              Giới tính *
            </label>
            <div className="flex gap-2">
              <select
                id="gender"
                className="p-2 w-1/2 border rounded"
                value={modifiedUser.gender}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Số điện thoại
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="phone"
                className="p-2 w-1/2 border rounded"
                value={modifiedUser.phone}
                onChange={handleInputChange}
              />
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Thay đổi số
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Đã xác minh
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <div className="flex gap-2">
              {changeEmail ? (
                <input
                  type="text"
                  id="email"
                  className="p-2 w-1/2 border rounded"
                  value={modifiedUser.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{modifiedUser.email}</p>
              )}

              <button
                onClick={() => setChangeEmail(!changeEmail)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Thay đổi email
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="facebook"
              className="block text-sm font-medium text-gray-600"
            >
              Facebook
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="facebook"
                className="p-2 w-1/2 border rounded"
                value={modifiedUser.facebook}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="zalo"
              className="block text-sm font-medium text-gray-600"
            >
              Zalo
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="zalo"
                className="p-2 w-1/2 border rounded"
                value={modifiedUser.zalo}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                Thành phố
              </label>
              <Select
                id="city"
                options={cityOptions}
                className="w-full"
                value={modifiedUser.city}
                onChange={(selectedOption) =>
                  handleSelectChange("city", selectedOption)
                }
                styles={{
                  menu: (provided) => ({ ...provided, width: "100%" }),
                }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-600"
              >
                Quận/Huyện
              </label>
              <Select
                id="district"
                options={districtOptions}
                className="w-full"
                value={modifiedUser.district}
                onChange={(selectedOption) =>
                  handleSelectChange("district", selectedOption)
                }
                styles={{
                  menu: (provided) => ({ ...provided, width: "100%" }),
                }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="grade"
                className="block text-sm font-medium text-gray-600"
              >
                Lớp
              </label>
              <Select
                id="grade"
                options={gradeOptions}
                className="w-full"
                value={modifiedUser.grade}
                onChange={(selectedOption) =>
                  handleSelectChange("grade", selectedOption)
                }
                styles={{
                  menu: (provided) => ({ ...provided, width: "100%" }),
                }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="school"
                className="block text-sm font-medium text-gray-600"
              >
                Trường
              </label>
              <Select
                id="school"
                options={schoolOptions}
                className="w-full"
                value={modifiedUser.school}
                onChange={(selectedOption) =>
                  handleSelectChange("school", selectedOption)
                }
                styles={{
                  menu: (provided) => ({ ...provided, width: "100%" }),
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Lưu thông tin"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ProfileDetail;
