"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GiangvienKhoaHoc, GiangvienKhoaHocDaMua } from "../../../../service/Dashboard-lecture/Dashboard-lecture";

export default function Khoahoccuatoi() {
  const [page, setPage] = useState(1);
  const khoahocdanghoc = () => {
    setPage(1);
  }
  const khoahocdathanhtoan = () => {
    setPage(2)
  }
  const khoahocdahoanthanh = () => {
    setPage(3)
  }
  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh">
      <div className="exrolled-course-wrapper-dashed">
        <h5 className="title">Khóa học của tôi</h5>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${page === 1 ? 'active' : ''} `}
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              onClick={() => khoahocdanghoc()}
            >
              Khóa học đang học
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${page === 2 ? 'active' : ''} `}
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => khoahocdathanhtoan()}
            >
              Khóa học đã thanh toán
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${page === 3 ? 'active' : ''} `}
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
              onClick={() => khoahocdahoanthanh()}
            >
              Khóa học đã hoàn thành
            </button>
          </li>
        </ul>
        <div className="tab-content mt--30" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {page == 1 && (
              <Khoahocdanghoc />
            )}
            {page == 2 && (
              <Khoahocdathanhtoan />
            )}
            {page == 3 && (
              <Khoahocdahoanthanh />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Khoahocdanghoc = () => {
  const [khoahocdanghoc1, setKhoahocdanghoc] = useState([]);
  useEffect(() => {
    GiangvienKhoaHoc()
      .then((res) => {
        setKhoahocdanghoc(res.data); // Assuming the array is in res.data
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);
  console.log(khoahocdanghoc1);

  const DanhGiaTrungBinh = khoahocdanghoc1.map((item) => {
    const total = item.danhgia.reduce((acc, curr) => acc + Number(curr.danhgia), 0);
    return total / item.danhgia.length;
  });
  console.log(DanhGiaTrungBinh);

  return (
    <div className="row g-5">
      {khoahocdanghoc1 && khoahocdanghoc1.map((item, index) => (
        <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
          <Link href={`/page/course-detail?id=${item.id}`} >
            <div className="single-course-style-three enroll-course">
              <a href="single-course.html" className="thumbnail">
                <img src={item.hinh} alt="course" />
                <div className="tag-thumb">
                  <span>{item.chuDe.ten}</span>
                </div>
              </a>
              <div className="body-area">
                <div className="course-top">
                  {item.ThanhToan.length > 10 ? (
                    <div className="tags">Người bán tốt nhất</div>
                  ) : (
                    <div className="tags">Người bán mới</div>
                  )}
                  <div className="line-through price">${item.gia}</div>
                  <div className="price">${item.giamgia}</div>
                </div>
                <a href="single-course.html">
                  <h5 className="title">
                    {item.ten}
                  </h5>
                </a>
                <div className="teacher-stars">
                  <div className="teacher">
                    <span>{item.giangvien}</span>
                  </div>
                  <ul className="stars">
                    <li className="span">{DanhGiaTrungBinh[index]}</li>
                    <ul className="rating-stars flex">
                      {[...Array(5)].map((_, starIndex) => (
                        (DanhGiaTrungBinh[index] >= starIndex + 1) && (
                          <li key={starIndex}>
                            <i className="fa-sharp fa-solid fa-star" />
                          </li>
                        )
                      ))}
                    </ul>
                  </ul>
                </div>
                <div className="leasson-students">
                  <div className="lesson">
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span> {item.baihoc.length} Bài học</span>
                  </div>
                  <div className="students">
                    <i className="fa-light fa-users" />
                    <span>{item.ThanhToan.length}  Học sinh</span>
                  </div>
                </div>
                <button className="rts-btn btn-border">Tải xuống chứng chỉ</button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
const Khoahocdathanhtoan = () => {
  const [coursesInProgress, setCoursesInProgress] = useState([]);

  useEffect(() => {
    GiangvienKhoaHocDaMua()
      .then((res) => {
        setCoursesInProgress(res.data); // Assuming the array is in res.data
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  console.log(coursesInProgress);

  const averageRatings = coursesInProgress.map((item) => {
    if (item.danhgia && Array.isArray(item.danhgia) && item.danhgia.length > 0) {
      const total = item.danhgia.reduce((acc, curr) => acc + Number(curr.danhgia), 0);
      return total / item.danhgia.length;
    }
    return 0; // Default value if danhgia is not defined or is empty
  });

  console.log(averageRatings);

  return (
    <div className="row g-5">
      {coursesInProgress && coursesInProgress.map((item, index) => (
        <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
          <Link href={`/page/course-detail?id=${item.khoahocs.id}`}>
            <div className="single-course-style-three enroll-course">
              <a href="single-course.html" className="thumbnail">
                <img src={item.khoahocs.hinh} alt="course" />
                <div className="tag-thumb">
                  <span>{item.chude.ten}</span>
                </div>
              </a>
              <div className="body-area">
                <div className="course-top">
                  {item.thanhtoan?.length > 10 ? (
                    <div className="tags">Người bán tốt nhất</div>
                  ) : (
                    <div className="tags">Người bán mới</div>
                  )}
                  <div className="line-through price">${item.gia}</div>
                  <div className="price">${item.giamgia}</div>
                </div>
                <a href="single-course.html">
                  <h5 className="title">
                    {item.khoahocs.ten}
                  </h5>
                </a>
                <div className="teacher-stars">
                  <div className="teacher">
                    <span>{item.giangvien}</span>
                  </div>
                  <ul className="stars">
                    <li className="span">{averageRatings[index]}</li>
                    <ul className="rating-stars flex">
                      {[...Array(5)].map((_, starIndex) => (
                        (averageRatings[index] >= starIndex + 1) && (
                          <li key={starIndex}>
                            <i className="fa-sharp fa-solid fa-star" />
                          </li>
                        )
                      ))}
                    </ul>
                  </ul>
                </div>
                <div className="leasson-students">
                  <div className="lesson">
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span> {item.baihoc.length} Bài học</span>
                  </div>
                  <div className="students">
                    <i className="fa-light fa-users" />
                    <span>{item.thanhtoan.length} Học sinh</span>
                  </div>
                </div>
                <button className="rts-btn btn-border">Tải xuống chứng chỉ</button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
const Khoahocdahoanthanh = () => {
  const [coursesInProgress, setCoursesInProgress] = useState([]);

  useEffect(() => {
    GiangvienKhoaHocDaMua()
      .then((res) => {
        setCoursesInProgress(res.data); // Assuming the array is in res.data
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  console.log(coursesInProgress);

  const averageRatings = coursesInProgress.map((item) => {
    if (item.danhgia && Array.isArray(item.danhgia) && item.danhgia.length > 0) {
      const total = item.danhgia.reduce((acc, curr) => acc + Number(curr.danhgia), 0);
      return total / item.danhgia.length;
    }
    return 0; // Default value if danhgia is not defined or is empty
  });

  console.log(averageRatings);

  return (
    <div className="row g-5">
      {coursesInProgress && coursesInProgress
        .filter((item) => item.khoahocdahoc.length > 0)
        .map((item, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
            <Link href={`/page/course-detail?id=${item.khoahocs.id}`}>
              <div className="single-course-style-three enroll-course">
                <a href="single-course.html" className="thumbnail">
                  <img src={item.khoahocs.hinh} alt="course" />
                  <div className="tag-thumb">
                    <span>{item.chude.ten}</span>
                  </div>
                </a>
                <div className="body-area">
                  <div className="course-top">
                    {item.thanhtoan?.length > 10 ? (
                      <div className="tags">Người bán tốt nhất</div>
                    ) : (
                      <div className="tags">Người bán mới</div>
                    )}
                    <div className="line-through price">${item.gia}</div>
                    <div className="price">${item.giamgia}</div>
                  </div>
                  <a href="single-course.html">
                    <h5 className="title">
                      {item.khoahocs.ten}
                    </h5>
                  </a>
                  <div className="teacher-stars">
                    <div className="teacher">
                      <span>{item.giangvien}</span>
                    </div>
                    <ul className="stars">
                      <li className="span">{averageRatings[index]}</li>
                      <ul className="rating-stars flex">
                        {[...Array(5)].map((_, starIndex) => (
                          (averageRatings[index] >= starIndex + 1) && (
                            <li key={starIndex}>
                              <i className="fa-sharp fa-solid fa-star" />
                            </li>
                          )
                        ))}
                      </ul>
                    </ul>
                  </div>
                  <div className="leasson-students">
                    <div className="lesson">
                      <i className="fa-light fa-calendar-lines-pen" />
                      <span> {item.baihoc.length} Bài học</span>
                    </div>
                    <div className="students">
                      <i className="fa-light fa-users" />
                      <span>{item.thanhtoan.length} Học sinh</span>
                    </div>
                  </div>
                  <button className="rts-btn btn-border">Tải xuống chứng chỉ</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  )
}