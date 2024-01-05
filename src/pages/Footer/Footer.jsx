import React from "react";
// https://hocmai.vn/
const Footer = () => {
  const sections = [
    {
      title: "Giới thiệu",
      items: [
        "Phòng truyền thống",
        "Học sinh tiêu biểu",
        "Điều khoản chính sách",
        "Quy chế hoạt động",
        "Tuyển dụng",
      ],
    },
    {
      title: "Chương trình học tiêu biểu",
      items: [
        "HOCMAI Topclass - Giải pháp học toàn diện cho mọi học sinh",
        "PEN - Luyện thi đại học",
        "HM10 - Luyện thi vào lớp 10",
        "HM6 - Luyện thi vào lớp 6 CLC",
        "Speakup - Tiếng Anh Online 1 kèm 1",
        "Học Hay - Ứng dụng học tập từ lớp 1-3",
        "HOCMAIBOOK - Sách hay từ lớp 1 - 12",
        "Hệ thống trung tâm HOCMAI",
        "ICANTECH - Đào tạo Công nghệ & Lập trình",
      ],
    },
    {
      title: "Dịch vụ hỗ trợ học tập",
      items: [
        "Diễn đàn học tập",
        "Thư viện học liệu",
        "Thông tin tuyển sinh ĐH",
        "Blog góc học sinh",
        "Blog góc phụ huynh",
        "Kiểm tra, thi thử",
      ],
    },
    {
      title: "Khách hàng/Đối tác",
      items: ["Liên hệ", "Góp ý về dịch vụ", "Giải đáp thắc mắc"],
    },
  ];

  return (
    <div className="flex justify-around bg-white px-20 p-16 space-x-5 mt-10 border border-b-0">
      {sections.map((section, index) => (
        <ul key={index}>
          <li className="font-bold pb-3">{section.title}</li>
          {section.items.map((item, itemIndex) => (
            <li key={itemIndex} className="text-sm pb-1">
              {item}
            </li>
          ))}
        </ul>
      ))}
      <ul>
        <li className="font-bold pb-3">TẢI ỨNG DỤNG</li>
        <li className="pb-5">
          <img
            src="https://hocmai.vn/assets/front/images/footer-google-app.png"
            alt=""
          />
        </li>
        <li>
          <img
            src="https://hocmai.vn/assets/front/images/footer-store-app.png"
            alt=""
          />
        </li>
      </ul>
    </div>
  );
};

export default Footer;
