"use client";
import React, { useEffect, useState } from "react";
import { Dashboard } from "../../../../service/dashbordStuden/Dashboard-service";
import { KhoaHocDaHoc } from "../../../../service/dashbordStuden/Dashboard-service";

export default function Homedashboardstudent() {
  const [data, setData] = useState([]);
  const [khoahocdahoc, setKhoahocdahoc] = useState([]);

  useEffect(() => {
    Dashboard()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });

    KhoaHocDaHoc()
      .then((res) => {
        setKhoahocdahoc(res.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  console.log(data.length);
  console.log(khoahocdahoc.length);

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh">
      <div className="right-sidebar-dashboard">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            {/* single dashboard-card */}
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-book-open-cover" />
              </div>
              <h5 className="title">
                <span className="counter">{data.length}</span>
              </h5>
              <p>Các khóa học ghi danh</p>
            </div>
            {/* single dashboard-card end */}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            {/* single dashboard-card */}
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-regular fa-graduation-cap" />
              </div>
              <h5 className="title">
                <span className="counter">
                  {data.reduce(
                    (count, item) =>
                      count +
                      item.khoahocs.filter(
                        (khoahoc) => khoahoc.trangthai === "active"
                      ).length,
                    0
                  )}
                </span>
              </h5>
              <p>Các khóa học tích cực</p>
            </div>
            {/* single dashboard-card end */}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            {/* single dashboard-card */}
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-trophy" />
              </div>
              <h5 className="title">
                <span className="counter">{khoahocdahoc.length}</span>
              </h5>
              <p>Hoàn thành các khóa học</p>
            </div>
            {/* single dashboard-card end */}
          </div>
        </div>
        <div className="row mt--40">
          <div className="col-lg-12">
            {/* in progress course area */}
            <div className="in-progress-course-wrapper title-between-dashboard mb--10">
              <h5 className="title">Các khóa học của tôi</h5>
              <a href="#" className="more">
                Xem tất cả
              </a>
            </div>
            {/* in progress course area end */}
            {/* my course enroll wrapper */}
            <div className="my-course-enroll-wrapper-board">
              {/* single course inroll */}
              <div className="single-course-inroll-board head">
                <div className="name">
                  <p> Khóa học của tôi</p>
                </div>
                <div className="enroll">
                  <p> Đăng ký </p>
                </div>
                <div className="rating">
                  <p> Xếp hạng </p>
                </div>
              </div>
              {/* single course inroll end */}
              {/* single course inroll */}
              {data.map((item, itemIndex) =>
                item.khoahocs.map((khoahoc, khoahocIndex) => (
                  <div
                    key={`${itemIndex}-${khoahocIndex}`}
                    className="single-course-inroll-board"
                  >
                    <div className="name">
                      <p>{khoahoc.ten}</p>
                    </div>
                    <div className="enroll">
                      <p>2</p>
                    </div>
                    <div className="rating">
                      <i className="fa-light fa-star" />
                      <i className="fa-light fa-star" />
                      <i className="fa-light fa-star" />
                      <i className="fa-light fa-star" />
                      <i className="fa-light fa-star" />
                    </div>
                  </div>
                ))
              )}
              {/* single course inroll end */}
            </div>
            {/* my course enroll wrapper end */}
          </div>
        </div>
      </div>
    </div>
  );
}