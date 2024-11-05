"use client";
import React, { useEffect, useState } from "react";
import { CourseDetails } from "../../../../../service/course/course.service";
import Link from "next/link";
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons

export default function Mota({ course }) {
  console.log(course);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const splitDescription = (description) => {
    if (!description) return [];
    const sections = description
      .split(".")
      .map((section) => section.trim())
      .filter((section) => section.length > 0);
    return sections.map((section) => capitalizeFirstLetter(section));
  };

  let descriptionSections;

  try {
    const rawDescription = course?.mota;
    descriptionSections = splitDescription(rawDescription);

    // If splitDescription returns a JSON string, parse it
    if (typeof descriptionSections === 'string') {
      descriptionSections = JSON.parse(descriptionSections);
    }
  } catch (error) {
    console.error("Error processing description:", error);
    descriptionSections = []; // Fallback to an empty array or handle as needed
  }

  let muctieu;
  try {
    muctieu = JSON.parse(course?.muctieu);
  } catch (error) {
    console.error("Error parsing muctieu:", error);
    muctieu = []; // Fallback to an empty array or handle as needed
  }

  // Ensure muctieu is an array before calling filter
  if (!Array.isArray(muctieu)) {
    muctieu = [];
  }

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
  console.log(course,"course");
  

  return (
    <>
      {/* Tab Content */}
      <div className="tab-content mt-12" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="course-content-wrapper">
            <h5 className="title mb-2.5 text-gray-800">Về khóa học</h5>
            <p className="disc text-gray-600"></p>
            <h5 className="title mb-2.5 text-gray-800">Sự miêu tả</h5>
            {descriptionSections.map((section, index) => (
              <p key={index} className="disc text-gray-700">
                {section}.
              </p>
            ))}

            <div className="module-wrapper mt-6">
              <h6 className="title mb-2.5 text-gray-800">Bạn sẽ học được gì?</h6>
              <div className="inner-content">
                <div className="single-wrapper">
                  {muctieu.filter(item => item !== "").map((item, index) => (
                    <div className="single-codule flex items-center text-green-600 mb-2" key={index}>
                      <i className="fa-regular fa-check mr-2"></i>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        ></div>
      </div>

      <div className="wrapper-bottom-course-details-page grid gap-5 mt-12 px-4 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h5 className="mb-0 title text-gray-800">
            Nhiều khóa học hơn bởi {course.thongtingiangvien.ten}.
          </h5>
          <a
            href={`/instructor/${course.thongtingiangvien.id}`}
            className="rts-btn with-arrow text-blue-500 hover:text-blue-600 flex items-center"
          >
          </a>
        </div>

        {/* Các khóa học khác của giảng viên này */}
        <div className="flex gap-6 overflow-x-auto">
          {course.Tongkhoahoc.map((item) => {
            // Calculate averageRating per course
            const averageRating = item.danhgia && item.danhgia.length > 0
              ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
              : 0;

            return (
              <div className="min-w-[300px] bg-white shadow-md rounded-lg relative" key={item.id}>
                <a href={`/page/course-detail?id=${item.id}`} className="block">
                  <img
                    src={item.hinh}
                    alt="course"
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                </a>
                <div
                  className="save-icon text-blue-500 hover:text-blue-600 absolute top-4 right-4 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal-login"
                >
                  <i className="fa-sharp fa-light fa-bookmark"></i>
                </div>
                <div className="tags-area-wrapper flex space-x-2 mt-2 px-4">
                  <div className="single-tag bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    <span>{item.chude.ten}</span>
                  </div>
                  <div className="single-tag bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    <span>Finance</span>
                  </div>
                </div>
                <div className="lesson-studente flex justify-between mt-3 px-4">
                  <div className="lesson flex items-center text-gray-700">
                    <i className="fa-light fa-calendar-lines-pen mr-1"></i>
                    <span>{item.baihocs.length} Bài học</span>
                  </div>
                  <div className="lesson flex items-center text-gray-700">
                    <i className="fa-light fa-user-group mr-1"></i>
                    <span>{course.thanhToan.length} Sinh viên</span>
                  </div>
                </div>
                <a href={`/page/course-detail?id=${item.id}`} className="block px-4">
                  <h5 className="title mt-2 text-gray-800 hover:text-blue-500">
                    {item.ten}
                  </h5>
                </a>
                <p className="teacher px-4 text-gray-600">{course.thongtingiangvien.ten}</p>
                <div className="rating-and-price flex justify-between items-center mt-2 px-4 pb-4">
                  <div className="rating-area flex items-center">
                    <span className="mr-2">{averageRating.toFixed(1)}</span>
                    <div className="stars flex">
                      {renderStars(averageRating)}
                    </div>
                  </div>
                  <div className="price-area">
                    <div className="price text-green-600">
                      {item.gia === 0 ? 'Miễn phí' : `$${item.gia}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Đóng các khóa học khác của giảng viên này */}
      </div>
    </>
  );
}