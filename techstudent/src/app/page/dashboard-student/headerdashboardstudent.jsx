"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KhoaHocDangHoc, KhoaHocDaHoanThanh } from '../../../service/dashbordStuden/Dashboard-service'
import { DanhSachTheoDoi, BoTheoDoiGiangVien } from '../../../service/Follow/Follow';
import { user } from '../../../service/User/user'

const Headerdashboardstudent1 = () => {
  const router = useRouter()
  const [data, setData] = useState({});
  const [KhoaHocDaHoc, setKhoaHocDaHoc] = useState([]);
  const [KhoaHocDaxong, setKhoaHocDaHoanThanh] = useState([]);
  const [NguoiDung, setNguoiDung] = useState({});
  const [TheoDoi, setTheoDoi] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('data');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response3 = await user();
        setNguoiDung(response3.data);
      } catch (error) {
        console.log('Failed to fetch user data');
      }

      try {
        const response = await KhoaHocDangHoc();
        setKhoaHocDaHoc(response);
      } catch (error) {
        console.log('Failed to fetch ongoing courses');
      }

      try {
        const response2 = await KhoaHocDaHoanThanh();
        setKhoaHocDaHoanThanh(response2.data);
      } catch (error) {
        console.log('Failed to fetch completed courses');
      }

      try {
        const response4 = await DanhSachTheoDoi();
        setTheoDoi(response4);
      } catch (error) {
        console.log('Failed to fetch following list');
      }
    };

    fetchData();
  }, []);
  console.log(TheoDoi)
  const unfollow = async (id) => {
    try {
      const response = await BoTheoDoiGiangVien(id);
      if (!response.ok) {
        throw new Error('Failed to unfollow lecturer');
      }
      console.log('Successfully unfollowed lecturer');
      window.location.href = window.location.href;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="col-lg-12">
      <div className="dashboard-banner-area-start bg_image student-dashboard" style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {data.vaitro === 1 ? (
          <div className="rating-area-banner-dashboard" style={{ marginBottom: '20px' }}>
            <a href="/page/lecturer-dashboard" className="create-btn" style={buttonStyle('#4CAF50', '#45a049')} >
              <i className="fa-regular fa-circle-plus" style={{ marginRight: '10px' }}></i> Giảng viên
            </a>
          </div>
        ) : (
          <div className="rating-area-banner-dashboard" style={{ marginBottom: '20px' }}>
            <a href="/page/become-instructor" className="create-btn" style={buttonStyle('#2196F3', '#1976D2')}>
              <i className="fa-regular fa-circle-plus" style={{ marginRight: '10px' }}></i> Tạo tài khoản giảng viên
            </a>
          </div>
        )}
        <div className="author-profile-image-and-name" style={{ textAlign: 'center' }}>
          <div className="profile-pic" style={{ marginBottom: '20px' }}>
            <img src={NguoiDung.hinh || '/default-avatar.png'} alt="dashboard" style={{ borderRadius: '50%', border: '2px solid #ddd', padding: '5px', width: '100px', height: '100px' }} />
          </div>
          <div className="name-desig">
            <h1 className="title" style={{ color: 'white', fontSize: '24px', marginBottom: '10px' }}>{NguoiDung.ten || 'Tên người dùng'}</h1>
            <div className="course-vedio">
              <div className="single" style={infoBoxStyle}>
                <i className="fa-thin fa-book" style={{ marginRight: '10px', color: 'white' }}></i>
                <span style={{ color: 'white', fontSize: '18px' }}>{KhoaHocDaHoc.length} Khóa học đã đăng ký</span>
              </div>
              <div className="single" style={infoBoxStyle}>
                <i className="fa-thin fa-file-certificate" style={{ marginRight: '10px', color: 'white', fontSize: '24px' }}></i>
                <span style={{ color: 'white', fontSize: '18px' }}>
                  <div> {KhoaHocDaxong.length} Chứng chỉ </div>
                </span>
              </div>
              <div
                className="single"
                style={infoBoxStyle}
                onClick={() => setShowModal(true)}
              >
                <i className="fa-thin fa-file-certificate" style={{ marginRight: '10px', color: 'white', fontSize: '24px' }}></i>
                <span style={{ color: 'white', fontSize: '18px' }}>
                  <div> {TheoDoi.length} Giảng viên theo dõi </div>
                </span>
              </div>

              {showModal && ReactDOM.createPortal(
                <Modal onClose={() => setShowModal(false)}>
                  <h2>Danh sách Giảng viên theo dõi</h2>
                  <ul className="list-unstyled">
                    {TheoDoi.map((item) => (
                      <li className="d-flex align-items-center mb-3 p-2 border rounded" key={item.giangvien.id} style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex align-items-center">
                          <Link href={`/page/Profile-insructor?id=${item.giangvien.id}`} className="d-flex align-items-center text-decoration-none">
                            <img
                              src={item.giangvien.hinh}
                              alt={item.giangvien.ten}
                              className="rounded-circle me-3"
                              style={{ width: '50px', height: '50px' }}
                            />
                            <h2 className="text-black mb-0">{item.giangvien.ten}</h2>
                          </Link>
                        </div>
                        <div className="ms-auto">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => unfollow(item.id)}
                          >
                            <i className="bi bi-x-circle"></i> Unfollow
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Modal>,
                document.body
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const buttonStyle = (backgroundColor, hoverColor) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#fff',
  backgroundColor: backgroundColor,
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s',
  cursor: 'pointer'
});

const infoBoxStyle = {
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#0891b2',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const Modal = ({ onClose, children }) => {
  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={onClose} style={closeStyle}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

// Updated styles for a TikTok-like modal
const modalStyle = {
  position: 'fixed',
  zIndex: 1000,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.6)', // Darker overlay for TikTok effect
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const modalContentStyle = {
  backgroundColor: '#ffffff', // Pure white for a clean look
  padding: '20px',
  borderRadius: '16px', // Rounded corners similar to TikTok
  width: '80%',
  maxWidth: '400px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Soft shadow for depth
  position: 'relative',
  textAlign: 'center' // Center text for simpler appearance
};

const closeStyle = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  position: 'absolute',
  top: '10px',
  right: '15px',
  cursor: 'pointer',
  borderRadius: '50%',
  padding: '0 6px',
  backgroundColor: '#f2f2f2' // Subtle background for the close button
};


const Headerdashboardstudent2 = ({ page }) => {
  const [pagess, setPagess] = useState(page)

  const click = (pages) => {
    setPagess(pages)
  }

  return (
    <div className="col-lg-3">
      <div className="overflow-y-scroll left-sindebar-dashboard">
        <div className="dashboard-left-single-wrapper">
          <Link href="/page/dashboard-student" className={`single-item ${pagess === 'home' ? 'active' : ''}`} onClick={() => click("home")}>
            <i className="fa-light fa-house" />
            <p>Bảng điều khiển</p>
          </Link>
          <Link href="/page/dashboard-student/myprofile" className={`single-item ${pagess === 'hoso' ? 'active' : ''}`} onClick={() => click("hoso")}>
            <i className="fa-regular fa-user" />
            <p>Hồ sơ</p>
          </Link>
          <Link href="/page/dashboard-student/khoahocdanghoc" className={`single-item ${pagess === 'khoahocdanghoc' ? 'active' : ''}`} onClick={() => click("khoahocdanghoc")}>
            <i className="fa-light fa-graduation-cap" />
            <p>Các khóa học đang học</p>
          </Link>
          <Link href="/page/dashboard-student/lichsudonhang" className={`single-item ${pagess === 'lichsumuahang' ? 'active' : ''}`} onClick={() => click("lichsumuahang")}>
            <i className="fa-sharp fa-light fa-bag-shopping" />
            <p>Lịch sử đơn hàng</p>
          </Link>
          <Link href="/page/dashboard-student/khuyenmai" className={`single-item ${pagess === 'khuyenmai' ? 'active' : ''}`} onClick={() => click("khuyenmai")}>
            <i className="fa-sharp fa-light fa-tag" />
            <p>Khuyến mãi</p>
          </Link>
          <Link href="/page/dashboard-student/YeuThich" className={`single-item ${pagess === 'yeuthich' ? 'active' : ''}`} onClick={() => click("yeuthich")}>
            <i className="fa-sharp fa-light fa-heart" />
            <p>Yêu Thích</p>
          </Link>
        </div>
        <div className="dashboard-left-single-wrapper bbnone mt--40">
          <h4 className="title mb--5">Người dùng</h4>
          <a href="/page/dashboard-student/setting" className="single-item">
            <i className="fa-sharp fa-regular fa-gear" />
            <p>Cài đặt</p>
          </a>
          <Link href="index.html" className="single-item">
            <i className="fa-light fa-right-from-bracket" />
            <p>Đăng xuất</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export { Headerdashboardstudent1, Headerdashboardstudent2 } 