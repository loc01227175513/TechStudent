"use client";

import React, { useState, useEffect } from "react";
import { Category } from "../category/category.component";
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { FaStar, FaRegStar } from 'react-icons/fa';



const OutstandingCourse = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/allkhoahoc")
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data!");
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const trungbinhDangKy = KhoaHoc.length > 0
    ? KhoaHoc.map((item) => item.dangky).reduce((a, b) => a + b, 0) / KhoaHoc.length
    : 0;

  const filteredCourses = selectedCategory
    ? KhoaHoc.filter((item) => item.theloai === selectedCategory && item.dangky > trungbinhDangKy)
    : KhoaHoc.filter((item) => item.dangky > trungbinhDangKy);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleYeuThich = async (id) => {
    try {
      const response = await KhoaHocYeuThich(id);
      console.log(response);
      toast.success("Added to favorites!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding to favorites!");
    }
  };

  // Function to render stars based on averageRating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" aria-label="Filled Star" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" aria-label="Empty Star" />
        )
      );
    }
    return stars;
  };

  return (
    <div>
      <ToastContainer />
      <div className="course-area-start rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area">
                <div className="title-area-left-style">
                  <div className="pre-title">
                    <i className="mr-1 bi bi-lightbulb" style={{ color: "#32ADE6" }}></i>
                    <span>Courses</span>
                  </div>
                  <h2 className="title">Khám phá các khóa học nổi bật</h2>
                  <p className="post-title">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
                  </p>
                </div>
                <Category onCategoryChange={handleCategoryChange} />
              </div>
            </div>
          </div>
          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter row g-5 mt--20 portfolio-feed personal">
                {paginatedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating = item.danhgia && item.danhgia.length > 0
                    ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
                    : 0;

                  return (
                    <div
                      className="transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      data-category="transition"
                      key={item.id} // Use a unique key, preferably item.id
                    >
                      <div className="rts-single-course">
                        <a href={`/page/course-detail?id=${item.id}`} className="thumbnail">
                          <img src={item.hinh} alt="course" />
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark" />
                        </div>
                        <div className="tags-area-wrapper">
                          <div className="single-tag">
                            <span>{item.chude}</span>
                          </div>
                        </div>
                        <div className="lesson-studente">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>{item.baihocs} Lessons</span>
                          </div>
                          <div className="lesson">
                            <i className="fa-light fa-user-group" />
                            <span>{item.dangky} Students</span>
                          </div>
                        </div>
                        <a href={`/page/course-detail?id=${item.id}`}>
                          <h5 className="title">{item.ten}</h5>
                        </a>
                        <p className="teacher">{item.giangvien}</p>
                        <div className="rating-and-price">
                          <div className="rating-area flex items-center">
                            <span className="mr-2">{averageRating.toFixed(1)}</span>
                            <div className="stars flex">
                              {renderStars(averageRating)}
                            </div>
                          </div>
                          <div className="price-area">
                            {item.gia === 0 || item.giamgia === 0 ? (
                              <div className="price text-white bg-cyan-500 p-1 rounded-md">Miễn Phí</div>
                            ) : (
                              <>
                                <div className="not price line-through text-gray-500 mr-2">${item.gia}</div>
                                <div className="price text-red-500 font-semibold">${item.giamgia}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Box display="flex" justifyContent="center" mt="4">
              <ButtonGroup spacing="2">
                {[...Array(totalPages).keys()].map((page) => (
                  <Button
                    key={page}
                    className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"} mt-5 m-1`}
                    borderColor={page + 1 === currentPage ? "teal.500" : "gray.500"}
                    borderWidth="1px"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};





const CourseNew = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/allkhoahoc")
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data!");
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  const filteredCourses = selectedCategory
    ? KhoaHoc.filter((item) => 
        item.theloai === selectedCategory && 
        new Date(item.created_at) >= tenDaysAgo && 
        new Date(item.created_at) < new Date()
      )
    : KhoaHoc.filter((item) => 
        new Date(item.created_at) >= tenDaysAgo && 
        new Date(item.created_at) < new Date()
      );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleYeuThich = async (id) => {
    try {
      const response = await KhoaHocYeuThich(id);
      console.log(response);
      toast.success("Added to favorites!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding to favorites!");
    }
  };

  // Function to render stars based on averageRating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" aria-label="Filled Star" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" aria-label="Empty Star" />
        )
      );
    }
    return stars;
  };

  return (
    <div>
      <ToastContainer />
      <div className="course-area-start rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area">
                <div className="title-area-left-style">
                  <div className="pre-title">
                    <i className="mr-1 bi bi-lightbulb" style={{ color: "#32ADE6" }}></i>
                    <span>Courses</span>
                  </div>
                  <h2 className="title">Khám phá các khóa học mới nhất</h2>
                  <p className="post-title">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
                  </p>
                </div>
                <Category onCategoryChange={handleCategoryChange} />
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter row g-5 mt--20 portfolio-feed personal">
                {paginatedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating = item.danhgia && item.danhgia.length > 0
                    ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
                    : 0;

                  return (
                    <div
                      className="transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      data-category="transition"
                      key={item.id} // Use a unique key
                    >
                      <div className="rts-single-course">
                        <a href={`/page/course-detail?id=${item.id}`} className="thumbnail">
                          <img src={item.hinh} alt="course" />
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark" />
                        </div>
                        <div className="tags-area-wrapper">
                          <div className="single-tag">
                            <span>{item.chude}</span>
                          </div>
                        </div>
                        <div className="lesson-studente">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>{item.baihocs} Lessons</span>
                          </div>
                          <div className="lesson">
                            <i className="fa-light fa-user-group" />
                            <span>{item.dangky} Students</span>
                          </div>
                        </div>
                        <a href={`/page/course-detail?id=${item.id}`}>
                          <h5 className="title">{item.ten}</h5>
                        </a>
                        <p className="teacher">{item.giangvien}</p>
                        <div className="rating-and-price">
                          <div className="rating-area flex items-center">
                            <span className="mr-2">{averageRating.toFixed(1)}</span>
                            <div className="stars flex">
                              {renderStars(averageRating)}
                            </div>
                          </div>
                          <div className="price-area">
                            {item.gia === 0 || item.giamgia === 0 ? (
                              <span className="text-green-500 font-bold">Miễn Phí</span>
                            ) : (
                              <>
                                <span className="line-through text-gray-500 mr-2">${item.gia}</span>
                                <span className="text-red-500 font-semibold">${item.giamgia}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Box display="flex" justifyContent="center" mt="4">
              <ButtonGroup spacing="2">
                {[...Array(totalPages).keys()].map((page) => (
                  <Button
                    key={page}
                    className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"} mt-5 m-1`}
                    borderColor={page + 1 === currentPage ? "teal.500" : "gray.500"}
                    borderWidth="1px"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

const Courseseal = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/allkhoahoc")
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data!");
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCourses = selectedCategory
    ? KhoaHoc.filter((item) => item.theloai === selectedCategory && item.giamgia < item.gia)
    : KhoaHoc.filter((item) => item.giamgia < item.gia);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const displayedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleYeuThich = async (id) => {
    try {
      const response = await KhoaHocYeuThich(id);
      console.log(response);
      toast.success("Added to favorites!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding to favorites!");
    }
  };

  // Function to render stars based on averageRating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" aria-label="Filled Star" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" aria-label="Empty Star" />
        )
      );
    }
    return stars;
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-0 course-area-start rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area">
                <div className="title-area-left-style">
                  <div className="pre-title">
                    <i className="mr-1 bi bi-lightbulb" style={{ color: "#32ADE6" }}></i>
                    <span>Courses</span>
                  </div>
                  <h2 className="title">Khóa học giảm giá</h2>
                  <p className="post-title">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
                  </p>
                </div>
                <Category onCategoryChange={handleCategoryChange} />
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter row g-5 mt--20 portfolio-feed personal">
                {displayedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating = item.danhgia && item.danhgia.length > 0
                    ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
                    : 0;

                  return (
                    <div
                      className="transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      data-category="transition"
                      key={item.id} // Use unique key
                    >
                      <div className="rts-single-course">
                        <a href={`/page/course-detail?id=${item.id}`} className="thumbnail">
                          <img src={item.hinh} alt="course" />
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark" />
                        </div>
                        <div className="tags-area-wrapper">
                          <div className="single-tag">
                            <span>{item.chude}</span>
                          </div>
                        </div>
                        <div className="lesson-studente">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>{item.baihocs} Lessons</span>
                          </div>
                          <div className="lesson">
                            <i className="fa-light fa-user-group" />
                            <span>{item.dangky} Students</span>
                          </div>
                        </div>
                        <a href={`/page/course-detail?id=${item.id}`}>
                          <h5 className="title">{item.ten}</h5>
                        </a>
                        <p className="teacher">{item.giangvien}</p>
                        <div className="rating-and-price">
                          <div className="rating-area flex items-center">
                            <span className="mr-2">{averageRating.toFixed(1)}</span>
                            <div className="stars flex">
                              {renderStars(averageRating)}
                            </div>
                          </div>
                          <div className="price-area">
                            {item.gia === 0 || item.giamgia === 0 ? (
                              <span className="text-green-500 font-bold">Miễn Phí</span>
                            ) : (
                              <>
                                <span className="line-through text-gray-500 mr-2">${item.gia}</span>
                                <span className="text-red-500 font-semibold">${item.giamgia}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination Buttons */}
          <Box display="flex" justifyContent="center" mt="4">
            <ButtonGroup spacing="2">
              {[...Array(totalPages).keys()].map((page) => (
                <Button
                  key={page}
                  className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"} mt-5 m-1`}
                  borderColor={page + 1 === currentPage ? "teal.500" : "gray.500"}
                  borderWidth="1px"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </div>
      </div>
    </div>
  );
};


const Coursefree = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/allkhoahoc")
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data!");
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCourses = selectedCategory
    ? KhoaHoc.filter((item) => item.theloai === selectedCategory && item.gia === 0)
    : KhoaHoc.filter((item) => item.gia === 0);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const displayedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleYeuThich = async (id) => {
    try {
      const response = await KhoaHocYeuThich(id);
      console.log(response);
      toast.success("Added to favorites!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding to favorites!");
    }
  };

  // Function to render stars based on averageRating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" aria-label="Filled Star" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" aria-label="Empty Star" />
        )
      );
    }
    return stars;
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-0 course-area-start rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area">
                <div className="title-area-left-style">
                  <div className="pre-title">
                    <i className="mr-1 bi bi-lightbulb" style={{ color: "#32ADE6" }}></i>
                    <span>Courses</span>
                  </div>
                  <h2 className="title">Khóa học miễn phí</h2>
                  <p className="post-title">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
                  </p>
                </div>
                <Category onCategoryChange={handleCategoryChange} />
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter row g-5 mt--20 portfolio-feed personal">
                {displayedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating = item.danhgia && item.danhgia.length > 0
                    ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
                    : 0;

                  return (
                    <div
                      className="transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      data-category="transition"
                      key={item.id} // Use unique key
                    >
                      <div className="rts-single-course">
                        <a href={`/page/course-detail?id=${item.id}`} className="thumbnail">
                          <img src={item.hinh} alt="course" />
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark" />
                        </div>
                        <div className="tags-area-wrapper">
                          <div className="single-tag">
                            <span>{item.chude}</span>
                          </div>
                        </div>
                        <div className="lesson-studente">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>{item.baihocs} Lessons</span>
                          </div>
                          <div className="lesson">
                            <i className="fa-light fa-user-group" />
                            <span>{item.dangky} Students</span>
                          </div>
                        </div>
                        <a href={`/page/course-detail?id=${item.id}`}>
                          <h5 className="title">{item.ten}</h5>
                        </a>
                        <p className="teacher">{item.giangvien}</p>
                        <div className="rating-and-price">
                          <div className="rating-area flex items-center">
                            <span className="mr-2">{averageRating.toFixed(1)}</span>
                            <div className="stars flex">
                              {renderStars(averageRating)}
                            </div>
                          </div>
                          <div className="price-area">
                            {item.gia === 0 ? (
                              <span className="text-green-500 font-bold">Miễn Phí</span>
                            ) : (
                              <>
                                <span className="line-through text-gray-500 mr-2">${item.gia}</span>
                                <span className="text-red-500 font-semibold">${item.giamgia}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination Buttons */}
          <Box display="flex" justifyContent="center" mt="4">
            <ButtonGroup spacing="2">
              {[...Array(totalPages).keys()].map((page) => (
                <Button
                  key={page}
                  className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"} m-1`}
                  borderColor={page + 1 === currentPage ? "teal.500" : "gray.500"}
                  borderWidth="1px"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </div>
      </div>
    </div>
  );
};



export { OutstandingCourse, CourseNew, Courseseal, Coursefree };
