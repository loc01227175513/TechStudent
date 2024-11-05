"use client";
import React, { useState, useEffect } from 'react';
import { Grid, List } from './course';
import { Allcoursesss } from '../../../../service/course/course.service';

export default function Page() {
  const [view, setView] = useState('grid');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const IdTheLoai = new URLSearchParams(window.location.search).get('id');

  // Sort state
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    Allcoursesss()
      .then((data) => {
        setCourses(data.data);
        setFilteredCourses(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by IdTheLoai
    if (IdTheLoai) {
      const parsedId = parseInt(IdTheLoai, 10);
      if (!isNaN(parsedId)) {
        filtered = filtered.filter(course => course.id_theloai === parsedId);
      }
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.ten.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((course) =>
        selectedCategories.includes(course.chude)
      );
    }

    // Filter by selected authors
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((course) =>
        selectedAuthors.includes(course.giangvien)
      );
    }

    // Filter by selected prices
    if (selectedPrices.length > 0) {
      filtered = filtered.filter((course) => {
        if (selectedPrices.includes('Miễn phí') && course.gia === 0) {
          return true;
        }
        if (selectedPrices.includes('Trả') && course.gia > 0) {
          return true;
        }
        return false;
      });
    }

    // Sort courses
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'Popularity':
            return b.dangky - a.dangky;
          case 'Price':
            return a.gia - b.gia;
          case 'Stars':
            const avgA = averageRating(a.danhgia);
            const avgB = averageRating(b.danhgia);
            return avgB - avgA;
          case 'Newest':
            return new Date(b.created_at) - new Date(a.created_at);
          case 'Oldest':
            return new Date(a.created_at) - new Date(b.created_at);
          default:
            return 0;
        }
      });
    }

    setFilteredCourses(filtered);
  }, [
    courses,
    searchTerm,
    selectedCategories,
    selectedAuthors,
    selectedPrices,
    sortBy,
    IdTheLoai,
  ]);

  const averageRating = (danhgia) => {
    if (!danhgia || danhgia.length === 0) return 0;
    const sum = danhgia.reduce((acc, curr) => acc + parseFloat(curr.danhgia), 0);
    return sum / danhgia.length;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (setter) => (e) => {
    const { value, checked } = e.target;
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const renderContent = () => {
    switch (view) {
      case 'grid':
        return <Grid courses={filteredCourses} />;
      case 'list':
        return <List courses={filteredCourses} />;
      default:
        return <Grid courses={filteredCourses} />;
    }
  };

  return (
    <div>
      <div className="rts-course-default-area rts-section-gap">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-3">
              {/* course-filter-area start */}
              <div className="rts-course-filter-area">
                {/* Search Filter */}
                <div className="single-filter-left-wrapper">
                  <h6 className="title">Tìm kiếm</h6>
                  <div className="search-filter filter-body">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        placeholder="Search Course..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <i className="fa-light fa-magnifying-glass" />
                    </div>
                  </div>
                </div>
                {/* Category Filter */}
                <div className="single-filter-left-wrapper">
                  <h6 className="title">Loại</h6>
                  <div className="checkbox-filter filter-body">
                    <div className="checkbox-wrapper">
                      {Array.from(new Set(courses.map((course) => course.chude))).map(
                        (category, index) => (
                          <div className="single-checkbox-filter" key={index}>
                            <div className="check-box">
                              <input
                                type="checkbox"
                                id={`category-${index}`}
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={handleCheckboxChange(setSelectedCategories)}
                              />
                              <label htmlFor={`category-${index}`}>{category}</label>
                              <br />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {/* Author Filter */}
                <div className="single-filter-left-wrapper">
                  <h6 className="title">Tác giả</h6>
                  <div className="checkbox-filter filter-body">
                    <div className="checkbox-wrapper">
                      {Array.from(new Set(courses.map((course) => course.giangvien))).map(
                        (author, index) => (
                          <div className="single-checkbox-filter" key={index}>
                            <div className="check-box">
                              <input
                                type="checkbox"
                                id={`author-${index}`}
                                value={author}
                                checked={selectedAuthors.includes(author)}
                                onChange={handleCheckboxChange(setSelectedAuthors)}
                              />
                              <label htmlFor={`author-${index}`}>{author}</label>
                              <br />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {/* Price Filter */}
                <div className="single-filter-left-wrapper">
                  <h6 className="title">Giá</h6>
                  <div className="checkbox-filter filter-body last">
                    <div className="checkbox-wrapper">
                      {['Miễn phí', 'Trả'].map((price, index) => (
                        <div className="single-checkbox-filter" key={index}>
                          <div className="check-box">
                            <input
                              type="checkbox"
                              id={`price-${index}`}
                              value={price}
                              checked={selectedPrices.includes(price)}
                              onChange={handleCheckboxChange(setSelectedPrices)}
                            />
                            <label htmlFor={`price-${index}`}>{price}</label>
                            <br />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Clear All Filters */}
                <button
                  className="rts-btn btn-border"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategories([]);
                    setSelectedAuthors([]);
                    setSelectedPrices([]);
                    setSortBy('');
                  }}
                >
                  <i className="fa-regular fa-x" /> Xóa tất cả các bộ lọc
                </button>
              </div>
              {/* course-filter-area end */}
            </div>
            <div className="col-lg-9">
              {/* filter top-area  */}
              <div className="filter-small-top-full">
                <div className="left-filter">
                  <span>Sắp xếp theo</span>
                  <select
                    className="nice-select"
                    name="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="">Mặc định</option>
                    <option value="Popularity">Sự phổ biến</option>
                    <option value="Price">Giá</option>
                    <option value="Stars">Sao</option>
                    <option value="Newest">Mới nhất</option>
                    <option value="Oldest">Lâu đời nhất</option>
                  </select>
                </div>
                <div className="right-filter">
                  <span>
                    Hiển thị {filteredCourses.length} của {courses.length} kết quả
                  </span>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setView('grid')}
                        className={`nav-link ${view === 'grid' ? 'active' : ''}`}
                        id="home-tab"
                        type="button"
                        role="tab"
                      >
                        <i className="fa-light fa-grid-2" />
                        <span>Grid</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setView('list')}
                        className={`nav-link ${view === 'list' ? 'active' : ''}`}
                        id="profile-tab"
                        type="button"
                        role="tab"
                      >
                        <i className="fa-light fa-list" />
                        <span>Danh sách</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}