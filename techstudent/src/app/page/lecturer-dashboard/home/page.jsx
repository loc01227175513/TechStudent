"use client"

import React, { useState, useEffect } from 'react';
import { Box, Stack, FormControlLabel, Checkbox } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Link from 'next/link';

import { Dashboard, GiangvienKhoaHoc, GiangvienKhoaHocDaMua } from "../../../../service/Dashboard-lecture/Dashboard-lecture.jsx";

export default function Homedashboardlecturer() {
  const [data, setData] = useState([]);
  const [khoahoc, setKhoahoc] = useState([]);
  const [doanhthu, setDoanhthu] = useState([]);
  const [khoahocdamua, setKhoahocdamua] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardRes = await Dashboard();
        localStorage.setItem('lecturerId', JSON.stringify(dashboardRes.data));
        setData(dashboardRes.data);

        const khoahocRes = await GiangvienKhoaHoc();
        setKhoahoc(khoahocRes.data);

        const khoahocdamuaRes = await GiangvienKhoaHocDaMua();
        setKhoahocdamua(khoahocdamuaRes.data);

        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => { 
    const data= JSON.parse(localStorage.getItem('lecturerId'));

    fetch('http://127.0.0.1:8000/api/DoanhThuGiangVien', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_giangvien: data.giangvien })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDoanhthu(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      console.log(data.giangvien);
      console.log("khoahoc", khoahoc);
      console.log(khoahocdamua);
      console.log(doanhthu,"doanhthu");
    }
  }, [isDataLoaded, data, khoahoc, khoahocdamua, doanhthu]);
  console.log(doanhthu,"doanhthu");

  const khoahocdadangky = khoahoc.length;
  const khoahocdahoanthanh = khoahoc.filter((item) => item.trangthai === "Progress").length;
  const khoahoctamdung = khoahoc.filter((item) => item.trangthai === "Notyet").length;
  const khoahocdanghoc = khoahocdamua.length;
  const tongdoanhthu = doanhthu.tongdoanhthu;
  const sodukhadung = doanhthu.sodukhadung;
  const activeCoursesCount = khoahoc.filter(course => course.trangthai === "active").length;
  const TongSoHS = khoahoc.reduce((total, course) => {
    return total + course.ThanhToan.length;
  }, 0);

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh">
      <div className="right-sidebar-dashboard">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-book-open-cover" />
              </div>
              <h5 className="title">
                <span className="counter">{khoahocdadangky}</span>
              </h5>
              <p>Khóa học đã đăng ký</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-regular fa-graduation-cap" />
              </div>
              <h5 className="title">
                <span className="counter">{khoahocdanghoc}</span>
              </h5>
              <p>Khóa học đang học</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-trophy" />
              </div>
              <h5 className="title">
                <span className="counter">{khoahocdahoanthanh}</span>
              </h5>
              <p>Khóa học đã hoàn thành</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-book" />
              </div>
              <h5 className="title">
                <span className="counter">{khoahocdadangky}</span>
              </h5>
              <p>Tổng khóa học của tôi</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-user" />
              </div>
              <h5 className="title">
                <span className="counter">{TongSoHS}</span>
              </h5>
              <p>Tổng số học sinh</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-sharp fa-solid fa-dollar-sign" />
              </div>
              <h5 className="title">
                <span className="counter">{sodukhadung ?? 0}</span>
              </h5>
              <p>Số dư khả dụng</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-user" />
              </div>
              <h5 className="title">
                <span className="counter">{activeCoursesCount}</span>
              </h5>
              <p>Tổng khóa học đang phát hành</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-book" />
              </div>
              <h5 className="title">
                <span className="counter">{khoahoctamdung}</span>
              </h5>
              <p>Tổng khóa học tạm dừng</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-sharp fa-solid fa-dollar-sign" />
              </div>
              <h5 className="title">
                <span className="counter">{tongdoanhthu ?? 0}</span>
              </h5>
              <p>Tổng thu nhập</p>
            </div>
          </div>
          <CustomChart />
        </div>
        <div className="row mt--40">
          <div className="col-lg-12">
            <div className="in-progress-course-wrapper">
              <h5 className="title">Trong các khóa học tiến bộ</h5>
            </div>
            {khoahoc.map((item) => {
              const gia = Number(item.gia || 0);
              const giamgia = Number(item.giamgia || 0);
              const hinh = Number(item.hinh || 0);

              let nonZeroCount = 3;
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
              const total = 100 / 3 * nonZeroCount;

              let widthPercentage = 0;
              if (nonZeroCount > 0) {
                widthPercentage = total;
              }

              return (
                <Link href={`/page/course-create?id=${item.id}`} key={item.id}>
                  <div className="single-progress-course">
                    <a href="single-course.html">
                      <img
                        width="30%"
                        className="rounded-lg hover:border-red-600 border-2 hover:opacity-75 transition-opacity duration-300"
                        src={item.hinh}
                        alt="img"
                      />
                    </a>
                    <div className="information-progress-course">
                      <div className="rating-area">
                        <i className="fa-light fa-star" />
                        <i className="fa-light fa-star" />
                        <i className="fa-light fa-star" />
                        <i className="fa-light fa-star" />
                        <i className="fa-light fa-star" />
                        <span>(0)</span>
                      </div>
                      <a href="single-course.html">
                        <h5 className="title">{item.ten}</h5>
                      </a>
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
                          <span>{widthPercentage}% Hoàn thành</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Các khóa học của tôi</h5>
                <a href="#" className="btn btn-primary btn-sm">
                Xem tất cả
                </a>
              </div>
              <div className="row">
                {khoahoc.map((item) => (
                  <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="card-title">{item.ten}</h6>
                        <p className="card-text">{item.trangthai}</p>
                        <div className="rating">
                          <p></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const CustomChart = () => {
  const [fixMargin, setFixMargin] = useState(true);
  const [fixLabel, setFixLabel] = useState(true);
  const [khoahoc, setKhoahoc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const khoahocRes = await GiangvienKhoaHoc();
        setKhoahoc(khoahocRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Chuyển đổi dữ liệu
  const usAirportPassengers = khoahoc.map((item) => ({
    id: item.id,
    ten: item.ten,
    gia: Number(item.gia || 0),
    giamgia: Number(item.giamgia || 0),
    date: new Date(item.created_at).toLocaleDateString(), // Chỉ lấy ngày để hiển thị
  }));

  console.log(usAirportPassengers);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <FormControlLabel
          checked={fixMargin}
          control={<Checkbox onChange={(event) => setFixMargin(event.target.checked)} />}
          label="fix chart margin"
          labelPlacement="end"
        />
        <FormControlLabel
          checked={fixLabel}
          control={<Checkbox onChange={(event) => setFixLabel(event.target.checked)} />}
          label="fix axis label position"
          labelPlacement="end"
        />
      </Stack>

      <BarChart
        width={600}
        height={300}
        data={usAirportPassengers}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ten" tick={{ fill: '#FFFFFF' }} />
        <YAxis tick={{ fill: '#FFFFFF' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="gia" fill="#8884d8" />
      </BarChart>
    </Box>
  );
};