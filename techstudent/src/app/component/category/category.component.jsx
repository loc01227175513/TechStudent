"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Categorydata } from "../../../../src/service/category/category.service";


const NextCategory = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [buttonNext, setButtonNext] = useState(true);
  const [buttonPrev, setButtonPrev] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Categorydata();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handleResize = () => {
    if (window.innerWidth >= 1280) {
      setItemsPerPage(6);
    } else if (window.innerWidth >= 900) {
      setItemsPerPage(4);
    } else if (window.innerWidth >= 600) {
      setItemsPerPage(3);
    } else if (window.innerWidth >= 380) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(1);
    }
    setPage(1); // Reset to first page on resize
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Check size on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const img = categories.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const nexts = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setButtonPrev(true);
    }

    if (page + 1 >= totalPages) {
      setButtonNext(false);
    }
  };

  const prevs = () => {
    if (page > 1) {
      setPage(page - 1);
      setButtonNext(true);
    }

    if (page - 1 === 1) {
      setButtonPrev(false);
    }
  };

  const [DanhMuc, setDanhMuc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/theloai");
        const data = await response.json();
        setDanhMuc(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderPagination = () => {
    const displayPages = 5;
    let startPage = Math.max(1, page - Math.floor(displayPages / 2));
    let endPage = startPage + displayPages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - displayPages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center gap-2 mt-8">
        <button
          style={{ backgroundColor: buttonPrev ? "#32ADE6" : "white" }}
          className={`w-10 h-10 rounded-full border ${
            buttonPrev ? 'text-white' : 'text-black'
          }`}
          onClick={prevs}
          disabled={!buttonPrev}
        >
          <i className="bi bi-arrow-left"></i>
        </button>

        {startPage > 1 && (
          <>
            <button
              className="w-10 h-10 border rounded-full flex items-center justify-center"
              onClick={() => setPage(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="flex items-center">...</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            style={{
              backgroundColor: p === page ? "#32ADE6" : "#FFFAEE",
              color: p === page ? "white" : "black",
            }}
            className="w-10 h-10 border rounded-full flex items-center justify-center text-sm"
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="flex items-center">...</span>}
            <button
              className="w-10 h-10 border rounded-full flex items-center justify-center"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          style={{ backgroundColor: buttonNext ? "#32ADE6" : "white" }}
          className={`w-10 h-10 rounded-full border ${
            buttonNext ? 'text-white' : 'text-black'
          }`}
          onClick={nexts}
          disabled={!buttonNext}
        >
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="h-auto border category-area-style-one shape-move rts-section-gap bg_image">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-center-style">
              <div className="pre-title">
                <i
                  className="mr-2 bi bi-lightbulb"
                  style={{ color: "#32ADE6" }}
                ></i>
                <span>Danh mục hàng đầu</span>
              </div>
              <h2 className="title">
                Khám phá hơn 2000 khóa học trực tuyến miễn phí
              </h2>
              <p className="post-title">
                Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="w-full mt-10 text-center h-30">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {img.map((item, index) => (
                <div
                  className="flex flex-col items-center bg-white border p-4"
                  key={index}
                >
                  <Link
                    href={`/page/Cours-Filter?id=${item.id}`}
                    className="menu-item cv w-full"
                  >
                    <div className="m-4 text-center">
                      <img
                        src={item.image}
                        alt=""
                        className="block mx-auto w-full h-auto"
                      />
                      <h6 className="mt-4 text-sm">{item.name}</h6>
                      <p className="text-xs">130+ khóa học</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {renderPagination()}
          </div>
        </div>
      </div>
      <div className="shape-image">
        <div className="shape one" data-speed="0.04" data-revert="true">
          {/* <img src="assets/images/banner/15.png" alt="" /> */}
        </div>
        <div className="shape two" data-speed="0.04">
          {/* <img src="assets/images/banner/shape/banner-shape02.svg" alt="" /> */}
        </div>
        <div className="shape three" data-speed="0.04">
          {/* <img src="assets/images/banner/shape/banner-shape03.svg" alt="" /> */}
        </div>
      </div>
    </div>
  );
};



const Category = ({ onCategoryChange }) => {
  const cate = Categorydata();
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/allkhoahoc")
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const uniqueCategories = Array.from(
    new Set(KhoaHoc.map((item) => item.theloai))
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="title-between-area">
          <div className="title-area-left-style">
            <div className="pre-title">
              <i
                className="mr-1 bi bi-lightbulb"
                style={{ color: "#32ADE6" }}></i>
              <span>Courses</span>
            </div>
            <h2 className="title">Khám phá các khóa học</h2>
            <p className="post-title">
              Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
            </p>
          </div>
          <div className="flex button-group filters-button-group max-w ">
            <button
              className={`button ${activeCategory === '' ? 'btn-primary' : 'btn-secondary'}`}
              data-filter="*"
              onClick={() => handleCategoryChange('')}
            >
              Tất cả thể loại
            </button>
            {uniqueCategories.map((theloai, index) => (
              <button
                className={`button ${activeCategory === theloai ? 'btn-primary' : 'btn-secondary'}`}
                data-filter=".creative"
                key={index}
                onClick={() => handleCategoryChange(theloai)}
              >
                {theloai}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Categoryheader = () => {
  const [DanhMuc, setDanhMuc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/theloai");
        const data = await response.json();
        setDanhMuc(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const midIndex = Math.ceil(DanhMuc.length / 2);
  const firstHalf = DanhMuc.slice(0, midIndex);
  const secondHalf = DanhMuc.slice(midIndex);

  return (
    <ul className="category-sub-menu">
      <li>
        <ul className="category-list">
          {firstHalf.map((item, index) => (
            <li key={index}>
              <Link href={`/page/Cours-Filter?id=${item.id}`} className="menu-item cv w-96">
                <div className="text">
                  <img src={item.hinh} alt="" />
                  <h4>{item.ten}</h4>
                  <p>130+ Khóa học</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {secondHalf.map((item, index) => (
            <li key={index}>
              <Link href={`/page/Cours-Filter?id=${item.id}`} className="menu-item cv w-96">
                <div className="text">
                  <img src={item.hinh} alt="" />
                  <h4>{item.ten}</h4>
                  <p>130+ Khóa học</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default Categoryheader;

export { NextCategory, Category, Categoryheader };