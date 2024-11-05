"use client";
import React, { useEffect, useState } from "react";
import { GiangVienHienTai } from "../../../../service/Lecture/Lecture";

export default function Myprofilelecturer() {
  const [lecturer, setLecturer] = useState(null);

  useEffect(() => {
    GiangVienHienTai().then((res) => {
      setLecturer(res.data);
    });
  }, []);

  if (!lecturer) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="col-lg-9 rts-sticky-column-item overflow-y-scroll h-lvh">
      <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
        <h5 className="title">Hồ sơ của tôi</h5>
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Ngày đăng ký</div>
          <div className="value">{lecturer.created_at}</div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Tên người dùng:</div>
          <div className="value">{lecturer.ten}</div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">E-mail:</div>
          <div className="value">{lecturer.email}</div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Số điện thoại:</div>
          <div className="value">{lecturer.dienthoai ? lecturer.dienthoai : "chưa có"}</div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Kỹ năng/nghề nghiệp</div>
          <div className="value">
            {lecturer.trinhdo?.ten}
          </div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Tiểu sử</div>
          <div className="value">
            {lecturer.tieusu ? lecturer.tieusu : "chưa có"}
          </div>
        </div>
        {/* single My portfolio end*/}
      </div>
    </div>
  );
}