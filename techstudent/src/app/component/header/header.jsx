"use client"

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import "./cart.css";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Cart } from './cart/cartheader';
import { Categoryheader } from '../category/category.component';

export default function Header() {
  const [hasData, setHasData] = useState(false);
  // const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [vaitro, setVaitro] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isopensearch, setIsopensearch] = useState(false);
  const [opencart, setOpencart] = useState(false);
  const [header2, setHeader2] = useState(false);

  const timeoutRef = useRef(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('data')) {
      setHasData(true);
    }
  }, []);
  const data = JSON.parse(localStorage.getItem('data'));
  console.log(data);


  const handleLogout = () => {
    localStorage.removeItem('lecturerId');
    localStorage.removeItem('data');
    window.location.reload();
  };

  const handleClick = (event) => {
    event.preventDefault();
    // Your click handling logic here
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 70) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const Opensearch = () => {
    setIsopensearch(true);
  };

  const Closesearch = () => {
    setIsopensearch(false);
  };

  const closeheader2 = () => {
    setHeader2(false);
  };

  const openheader2 = () => {
    setHeader2(true);
  };

  const clickopencart = () => {
    setOpencart(true);
  };

  const clickclosecart = () => {
    setOpencart(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const test = () => {
    alert('test');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  console.log(hasData);
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 1.5 seconds delay
  };

  return (
    <>
      <header className="fixed top-0 header-one header--sticky ">
        {visible && (
          <div className="scroll" onClick={scrollToTop}>
            <i className="bi bi-chevron-up"></i>
          </div>
        )}

        {opencart && <Cart onAction={clickclosecart} />}

        {isopensearch && (
          <div className='input-search'>
            <div className='div-input'>
              <form>
                <input type="text" placeholder='tìm kiếm' />
              </form>
              <p className='hover:cursor-pointer' onClick={Closesearch}>hủy</p>
            </div>
            <div className='w-full h-full blur' onClick={Closesearch}></div>
          </div>
        )}

        <div className="header-top-one-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="header-top-one">
                  <div className="left-information">
                    <Link href="mailto:someone@example.com" className="email">
                      <i className="fa-light fa-envelope" />
                      techstudent@gmail.com
                    </Link>
                    <Link href="tel:+4733378901" className="email">
                      <i className="fa-light fa-phone" />
                      +123 456 789
                    </Link>
                  </div>
                  <div className="right-information">
                    <ul className="rts-dropdown-menu switcher-language">
                      <li className="has-child-menu">
                        <Link href="#">
                          <span className="menu-item">English</span>
                          <i className="fa-regular fa-chevron-down" />
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link href="#">
                              <span className="menu-item">Deutsch</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <span className="menu-item">Portuguese</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <span className="menu-item">Russian</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul className="rts-dropdown-menu switcher-currency">
                      <li className="has-child-menu">
                        <Link href="#">
                          <span className="menu-item">USD</span>
                          <i className="fa-regular fa-chevron-down" />
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link href="#">
                              <span className="menu-item">Euro</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <span className="menu-item">Real</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <span className="menu-item">Ruble</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-one-wrapper">
                <div className="left-side-header">
                  <Link href="/" className="logo-area">
                    <img
                      src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1727967044/z5893902778330_3f5bed4df0f1d220b06d64708c4d87fc_rfjfty.jpg"
                      className="w-72"
                      alt="logo"
                    />
                  </Link>
                  <div className="category-area">
                    <div className="category-btn">
                      <i className="bi bi-list"></i>
                      <span>Thể loại</span>
                      <i className="fa-sharp fa-regular fa-chevron-down" />
                      <Categoryheader />
                    </div>
                  </div>
                </div>
                <div className="main-nav-one">
                  <nav>
                    <ul>
                      <li className="has-dropdown" style={{ position: "static" }}>
                        <Link className="nav-link" href="/">
                          Trang chủ
                        </Link>
                      </li>
                      <li className="has-dropdown">
                        <Link className="nav-link" href="#">
                         Về chúng tôi
                        </Link>
                      </li>
                      <li className="has-dropdown" style={{ position: "static" }}>
                        <Link className="nav-link" href="#">
                          Khóa học
                        </Link>
                        <ul className="megamenu-hub min-mega shape-move">
                          <li>
                            <ul className="menu-section">
                              <li className="parent">
                                <Link href="#">Khóa học</Link>
                              </li>
                              <li>
                                <Link href="/page/Cours-Filter">Khóa học thể loại</Link>
                              </li>
                              <li>
                                <Link href="/page/courseLoTrinh">Lộ trình khóa học</Link>
                              </li>
                            </ul>
                            <ul className="menu-section">
                              <li className="parent">
                                <Link href="/page/other">Khác</Link>
                              </li>
                              <li>
                                <Link href="/page/AllGiangVien">Giảng Viên Nổi Bật</Link>
                              </li>
                              <li>
                                <Link href="/page/NhanTin">Nhắn tin Với Giảng Viên</Link>
                              </li>
                            </ul>

                            <div className="thumbnav-area">
                              <Link href="/page/KhuyenMai" className="single-thumbnav">
                                <div className="icon"></div>
                                <span>Nhận Khuyến Mãi</span>
                              </Link>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li className="has-dropdown">
                        <Link className="nav-link" href="#">
                          Trang tính
                        </Link>
                        <ul className="submenu">
                          <li>
                            <Link className="submenu-link" href="/page/dashboard-student">
                              <div className="m-4">
                                <p className="p-2 m-0 font-bold text-center rounded-lg bg-cyan-200">Học Viên</p>
                              </div>
                            </Link>
                          </li>
                          <li>

                            {!data ? null : data.vaitro === 1 ? (
                              <Link href="/page/lecturer-dashboard" className="ml-4 hover:text-gray-300">
                                <div className="m-4">
                                  <p className="p-2 m-0 font-bold text-center rounded-lg bg-cyan-200">Giảng Viên</p>
                                </div>
                              </Link>
                            ) : (
                              <Link href="/page/become-instructor" className="ml-4 hover:text-gray-300">
                                <div className="m-4">
                                  <p className="p-2 m-0 font-bold text-center rounded-lg bg-cyan-200">Đăng ký giảng viên</p>
                                </div>
                              </Link>
                            )}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>


                {!data ? null : data.vaitro === 1 ? (
                  <Link href="/page/lecturer-dashboard" className="ml-4 hover:text-gray-300">
                    <div className="m-4">
                      <p className="p-2 m-0 font-bold text-center rounded-lg bg-cyan-200">Giảng viên</p>
                    </div>
                  </Link>
                ) : (
                  <Link href="/page/become-instructor" className="ml-4 hover:text-gray-300">
                    <div className="m-4">
                      <p className="p-2 m-0 font-bold text-center rounded-lg bg-cyan-200">Đăng ký giảng viên</p>
                    </div>
                  </Link>
                )}
                <div className="header-right-area-one">
                  <div className="actions-area">
                    <div className="search-btn" id="search" onClick={Opensearch}>
                      <i className="bi bi-search search" style={{ color: '#32ADE6', fontSize: '20px', fontWeight: 'bold' }}></i>
                    </div>
                    <div className='relative cart cart-icon'>
                      <Link href="/page/dashboard-student/YeuThich">
                      <i className="fa-sharp fa-light fa-bookmark" style={{ color: '#32ADE6', fontSize: '20px' }} />
                      <div className='absolute hidden w-32 h-16 border rounded-md carthover group-hover:block'>
                        <p>Yêu Thích</p>
                      </div>
                      </Link>
                    </div>
                    <div className="relative cart cart-icon">
                      <i className="fa-regular fa-cart-shopping" onClick={clickopencart} />
                      <div className='absolute hidden h-16 border rounded-md carthover w-28 group-hover:block'>
                        <p>Giỏ Hàng</p>
                      </div>
                    </div>
                  </div>
                  <div className="buttons-area">
                    {!hasData ? (
                      <>
                        <Link href="/page/login" className="rts-btn btn-border">
                          Log In
                        </Link>
                        <Link href="/registration.html" className="rts-btn btn-primary">
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/page/login" className="rts-btn btn-border" onClick={handleLogout}>
                          Đăng xuất
                        </Link>
                        <div className="flex items-center">
                          <div
                            className="relative div-imguser"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            <img
                              src={data?.hinh}
                              alt=""
                              className="rounded-full cursor-pointer h-14 w-14"
                            />
                            {isOpen && (
                              <div
                                className="absolute right-0 top-20 bg-white border shadow-lg rounded-md"
                                style={{ width: '320px', padding: '20px', zIndex: 1000 }}
                              >
                                <div className="flex flex-col">
                                  <Link href="/page/dashboard-student/myprofile">
                                    <div className="flex items-center border-b pb-4 mb-4">

                                      <div className="w-1/3 flex justify-center">
                                        <img src={data?.hinh} alt="User Avatar" className="rounded-full" width="60" height="60" />
                                      </div>

                                      <div className="w-2/3 pl-4">
                                        <p className="text-lg font-bold">{data?.ten}</p>
                                        <p className="text-sm text-gray-500">{data?.email}</p>
                                      </div>

                                    </div>
                                  </Link>

                                  {/* Menu Options */}
                                  <div className="space-y-4">
                                    <Link href="/page/cart"> <button className="text-left text-gray-700 hover:bg-gray-100 p-2 w-full font-medium rounded-md">Giỏ Hàng</button></Link>
                                    <Link href="/page/dashboard-student/lichsudonhang"> <button className="text-left text-gray-700 hover:bg-gray-100 p-2 w-full font-medium rounded-md">Lịch Sử Mua</button></Link>
                                    <Link href="/page/dashboard-student/myprofile"> <button className="text-left text-gray-700 hover:bg-gray-100 p-2 w-full font-medium rounded-md">Hồ Sơ</button></Link>
                                    <Link href="/page/dashboard-student/myprofile"><button className="text-left text-gray-700 hover:bg-gray-100 p-2 w-full font-medium rounded-md">Ưu Đãi</button></Link>
                                    <Link href="/page/dashboard-student/myprofile"> <button className="text-left text-gray-700 hover:bg-gray-100 p-2 w-full font-medium rounded-md">Thông Báo</button></Link>
                                    <Link href="/page/dashboard-student/setting"> <button className="text-left text-gray-700 hover:bg-gray-100 p-2 w-full font-medium rounded-md">Cài Đặt Tài Khoản</button></Link>
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="menu-btn" id="menu-btn" onClick={openheader2}>
                    <svg
                      width={20}
                      height={16}
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y={14} width={20} height={2} fill="#1F1F25" />
                      <rect y={7} width={20} height={2} fill="#1F1F25" />
                      <rect width={20} height={2} fill="#1F1F25" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {header2 && (
          <div className="fixed inset-0 z-[1000] h-screen flex items-start sm:items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="absolute top-0 right-0 flex flex-col w-full sm:w-96 h-full sm:h-auto bg-white shadow-lg rounded-md overflow-hidden z-[1001]">

              {/* Close Button */}
              <div className="flex justify-end p-2">
                <button onClick={closeheader2} className="text-gray-700 p-2 rounded-full hover:bg-gray-200">
                  <i className="bi bi-x-lg text-2xl"></i>
                </button>
              </div>

              {/* Accordion Menu */}
              <div className="px-4 py-2 max-h-[80vh] overflow-y-auto">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel-header"
                    className="AccordionSummary"
                  >
                    <div className="flex items-center">

                      <img
                        src={data?.hinh}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <p className="ml-4 text-lg font-semibold">{data?.ten}</p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Link href="/page/login" className="text-blue-600 hover:underline" onClick={handleLogout}>Đăng Xuất</Link>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Link href="" className="text-blue-600 hover:underline">Cài Đặt</Link>
                  </AccordionDetails>
                </Accordion>

                {/* Additional Menu Sections */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel-header"
                    className="AccordionSummary"
                  >
                    <p className="text-lg font-semibold">Menu</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Link href="/page/cart" className="text-blue-600 hover:underline">Giỏ Hàng</Link>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Link href="/page/dashboard-student/lichsudonhang" className="text-blue-600 hover:underline">Lịch Sử Mua</Link>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Link href="/page/dashboard-student/myprofile" className="text-blue-600 hover:underline">Hồ Sơ</Link>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Link href="" className="text-blue-600 hover:underline">Mạng Xã Hội</Link>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Link href="" className="text-blue-600 hover:underline">Ưu Đãi</Link>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Link href="" className="text-blue-600 hover:underline">Thông Báo</Link>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Link href="/page/dashboard-student/setting" className="text-blue-600 hover:underline">Cài Đặt Tài Khoản</Link>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        )}



      </header>
    </>
  );
}