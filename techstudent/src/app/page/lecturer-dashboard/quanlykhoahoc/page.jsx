"use client";
import React, { useState, useEffect } from "react";
import "./quanlykhoahoc.css";
import { GiangvienTaoKhoaHoc } from "../../../../service/Dashboard-lecture/Add-course.jsx";
import { GiangvienKhoaHoc } from "../../../../service/Dashboard-lecture/Dashboard-lecture.jsx";
import { ref } from "yup";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Quanlykhoahoc() {

  const [formaddkhoahoc, setFormaddkhoahoc] = useState(false);
  const [chude, setChude] = useState([]);
  const [taokhoahoc, setTaokhoahoc] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [khoahoc, setKhoahoc] = useState([]);
  const [filteredChude, setFilteredChude] = useState([]);
  const [tieude, setTieude] = useState("");
  const [selectedChude, setSelectedChude] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // New state for selected status
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taoKhoaHoc = await GiangvienTaoKhoaHoc("tieude", "chude");
        setTaokhoahoc(taoKhoaHoc);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const khoahocRes = await GiangvienKhoaHoc();
        setKhoahoc(khoahocRes.data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(khoahoc);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/theloai")
      .then((response) => response.json())
      .then((data) => {
        setChude(data.data);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = chude.filter((chudeItem) =>
        chudeItem.theloaicons.some(
          (theloaiItem) => theloaiItem.id === parseInt(selectedCategory)
        )
      );
      setFilteredChude(filtered);
    } else {
      setFilteredChude(chude);
    }
  }, [selectedCategory, chude]);

  const openformaddlesson = () => {
    setFormaddkhoahoc(true);
  };
  const closeformaddlesson = () => {
    setFormaddkhoahoc(false);
  };
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const taoKhoaHoc = await GiangvienTaoKhoaHoc(tieude, selectedChude);
      setTaokhoahoc(taoKhoaHoc);
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const filteredKhoahoc = khoahoc.filter((item) => {
    if (selectedStatus && item.trangthai !== selectedStatus) return false;
    if (searchTerm && !item.ten.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh">
      <div className="right-sidebar-dashboard">
        <div className="row ">
          <div className="col-lg-12">
            {!formaddkhoahoc && (
              <div className="hover:cursor-pointer">
                <div className="addkhoahoc" onClick={() => openformaddlesson()}>
                  <i className="bi bi-plus-square"></i>
                  Thêm khóa học
                </div>
              </div>
            )}
            {formaddkhoahoc && (
              <div className="hover:cursor-pointer">
                <div
                  className="addkhoahoc"
                  onClick={() => closeformaddlesson()}
                >
                  hủy
                </div>
              </div>
            )}

            {formaddkhoahoc && (
              <div className="div-add-khoahoc">
                <div className="">
                  <div className="p-4 border">
                    <p>Thêm khóa học</p>
                  </div>
                  <form onSubmit={handleAddCourse}>
                    <div className="p-4 border">
                      <p>Tên khóa học</p>
                      <input
                        type="text"
                        value={tieude}
                        onChange={(e) => setTieude(e.target.value)}
                        placeholder="Nhập tên khóa học"
                        className="w-full p-2 border"
                      />
                    </div>

                    <div className="p-4 border">
                      <p>Chọn thể loại</p>
                      <div className="flex justify-between">
                        <section>
                          <label>thể loại</label>
                          <select
                            id="category-select"
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                          >
                            <option value="">Chọn thể loại</option>
                            {chude &&
                              chude.map((chudeItem) =>
                                chudeItem.theloaicons.map((theloaiItem) => (
                                  <option
                                    key={theloaiItem.id}
                                    value={theloaiItem.id}
                                  >
                                    {theloaiItem.ten}
                                  </option>
                                ))
                              )}
                          </select>
                        </section>
                        <section>
                          <label>chủ đề</label>
                          <select
                            id="course-select"
                            onChange={(e) => setSelectedChude(e.target.value)}
                          >
                            <option value="">chọn chủ đề</option>
                            {filteredChude &&
                              filteredChude.map((chudeItem) =>
                                chudeItem.theloaicons.map((theloaiItem) =>
                                  theloaiItem.chudes.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.ten}
                                    </option>
                                  ))
                                )
                              )}
                          </select>
                        </section>
                      </div>
                    </div>
                    <div className="flex m-2">
                      <button type="submit">Xác Nhận</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <section>
                <select
                  id="course-select"
                  onChange={(e) => setSelectedStatus(e.target.value)} // Handle status change
                >
                  <option value="">Tất cả khóa học</option>
                  <option value="active">Đang phát hành</option>
                  <option value="Notyet">Bản Nháp</option>
                  <option value="Pending">Đã hoàn thành</option>
                </select>
              </section>
              <form>
                <input
                  type="text"
                  placeholder="tìm kiếm khóa học"
                  className="mb-4 border w-96"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Handle search term change
                />
              </form>
            </div>
            {filteredKhoahoc &&
              filteredKhoahoc.map((item) => {
                const gia = Number(item.gia || 0);
                const giamgia = Number(item.giamgia || 0);
                const hinh = Number(item.hinh || 0);

                let nonZeroCount = 3; // Initially assume all three values are non-zero
                let totalPercentage = 0;

                if (gia === 0) {
                  nonZeroCount -= 1;
                }
                if (giamgia === 0) {
                  nonZeroCount -= 1;
                }
                if (hinh === 0) {
                  nonZeroCount -= 1;
                }
                const total = (100 / 3) * nonZeroCount;

                let widthPercentage = 0;
                if (nonZeroCount > 0) {
                  widthPercentage = total;
                }
                return (
                  <Link href={`/page/course-create?id=${item.id}`}>
                    <div className="single-progress-course" key={item.id}>
                      <a href="single-course.html">
                        <img
                          width="30%"
                          className="rounded-lg hover:border-red-600 border-2 hover:opacity-75 transition-opacity duration-300"
                          src={item.hinh}
                          alt="img"
                        />
                      </a>

                      <div className="information-progress-course">
                        <a href="single-course.html">
                          <h5 className="title">{item.ten}</h5>
                        </a>
                        <div>
                          <i className="bi bi-pencil-square"></i>
                          <i className="bi bi-trash3"></i>
                        </div>
                        <div className="progress-wrapper-lesson-compleate">
                          <div className="progress">
                            <div
                              className="progress-bar wow fadeInLeft bg--primary"
                              role="progressbar"
                              style={{ width: `${widthPercentage}%` }}
                              aria-valuenow={widthPercentage}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                          <div className="end">
                            <span>{widthPercentage}% Complete</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>

                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
