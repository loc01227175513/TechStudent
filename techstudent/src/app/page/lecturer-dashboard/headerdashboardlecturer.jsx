"use client"
import React, { useState } from "react";
import Link from 'next/link';


import { useRouter } from 'next/navigation';


const Headerdashboardstudent1 = () => {
  return (
    <div className="col-lg-12">
      <div className="dashboard-banner-area-start bg_image">
        <div className="rating-area-banner-dashboard">
          <div className="stars">
            <span>4.5</span>
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-regular fa-star" />
          </div>
          <p>Giảng viên tiếp thị kỹ thuật số</p>
          <a href="create-course.html" className="create-btn">
            <i className="fa-regular fa-circle-plus" /> Tạo một khóa học mới
          </a>
        </div>
        <div className="author-profile-image-and-name">
          <div className="profile-pic">
            <img src="assets/images/dashboard/01.png" alt="dashboard" />
          </div>
          <div className="name-desig">
            <h1 className="title">Jondam</h1>
            <div className="course-vedio">
              <div className="single">
                <i className="fa-light fa-users" />
                <span>1350 sinh viên</span>
              </div>
              <div className="single">
                <i className="fa-regular fa-video" />
                <span>26 khóa học</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const Headerdashboardstudent2 = ({ page }) => {
  const [pagess, setPagess] = useState(page)

  const click = (pages) => {
    setPagess(pages)

  }

  return (
    <div className="col-lg-3 rts-sticky-column-item h-lvh overflow-y-scroll">
      <div className="left-sindebar-dashboard theiaStickySidebar">
        <div className="dashboard-left-single-wrapper">
          {/* single item */}
          <Link href={"/page/lecturer-dashboard"} className={`single-item ${pagess === 'home' ? 'active' : ''}`} onClick={() => click("home")}>
            <i className="fa-light fa-house" />
            <p>Bảng điều khiển</p>
          </Link>
          {/* single item end */}
          {/* single item */}
          <Link href={"/page/lecturer-dashboard/myprofile"} className={`single-item ${pagess === 'hoso' ? 'active' : ''}`} onClick={() => click("hoso")}>
            <i className="fa-regular fa-user" />
            <p>Hồ sơ của tôi</p>
          </Link>
          {/* single item end */}
          {/* single item */}
          <Link href={"/page/lecturer-dashboard/khoahocdanghoc"} className={`single-item ${pagess === 'khoahoc' ? 'active' : ''}`} onClick={() => click("khoahoc")}>
            <i className="fa-light fa-graduation-cap" />
            <p>Khóa học đang học</p>
          </Link>
          {/* single item end */}
          {/* single item */}

          {/* single item end */}
          {/* single item */}

          {/* single item end */}
          {/* single item */}

          {/* single item end */}
          {/* single item */}
          <Link href={"/page/lecturer-dashboard/lichsudonhang"} className={`single-item ${pagess === 'lichsudonhang' ? 'active' : ''}`} onClick={() => click("lichsudonhang")}>
            <i className="fa-sharp fa-light fa-bag-shopping" />
            <p>Lịch sử đơn hàng</p>
          </Link>
          {/* single item end */}
          {/* single item */}

          {/* single item end */}
          {/* single item */}

          {/* single item end */}
        </div>
        <div className="dashboard-left-single-wrapper mt--40">
          <h4 className="title mb--5">Người hướng dẫn</h4>
          {/* single item */}
          <Link href={"/page/lecturer-dashboard/quanlykhoahoc"} className="single-item">
            <i className="fa-light fa-book" />
            <p>Quản lý khóa học</p>
          </Link>
          {/* single item end */}
          {/* single item */}
          <Link href="my-bundles.html" className="single-item">
            <i className="fa-sharp fa-regular fa-layer-group" />
            <p>Gói của tôi</p>
          </Link>
          {/* single item end */}
          {/* single item */}
          <Link href="announcement.html" className="single-item">
            <i className="fa-solid fa-megaphone" />
            <p>Thông báo</p>
          </Link>
          {/* single item end */}
          {/* single item */}
          <Link href="withdrowals.html" className="single-item">
            <i className="fa-regular fa-box" />
            <p>Rút tiền</p>
          </Link>
          <Link href="/page/lecturer-dashboard/NhanTinGiangVien" className="single-item">
            <i className="fa-regular fa-box" />
            <p>Nhắn Tin Giảng Viên</p>
          </Link>
          {/* single item end */}
          {/* single item */}

          {/* single item end */}
          {/* single item */}

          {/* single item end */}
        </div>
        <div className="dashboard-left-single-wrapper bbnone mt--40">
          <h4 className="title mb--5">User</h4>
          {/* single item */}
          <Link href="/page/lecturer-dashboard/setting" className="single-item">
            <i className="fa-sharp fa-regular fa-gear" />

            <p>Cài đặt</p>

          </Link>
          {/* single item end */}
          {/* single item */}
          <Link href="index.html" className="single-item">
            <i className="fa-light fa-right-from-bracket" />
            <p>Đăng xuất</p>
          </Link>
          {/* single item end */}
        </div>
      </div>
    </div>
  )
}

export { Headerdashboardstudent1, Headerdashboardstudent2 }