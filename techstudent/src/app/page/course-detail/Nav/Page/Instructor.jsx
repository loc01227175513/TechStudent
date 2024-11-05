import React from "react";
import { FaStar, FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaYoutube, FaUsers, FaVideo } from "react-icons/fa";
import Link from "next/link";
export default function Instructor({ course }) {
  const highestRating = course.danhgia.reduce((max, review) => Math.max(max, parseFloat(review.rating)), 0);

  const StartFilter = (rating) => {
    let star = 0;
    if (rating >= 4.5) {
      star = 5;
    } else if (rating >= 4.0) {
      star = 4;
    } else if (rating >= 3.5) {
      star = 3;
    } else if (rating >= 3.0) {
      star = 2;
    } else if (rating >= 2.5) {
      star = 1;
    } else {
      star = 0;
    }
    return star;
  }

  const starCount = StartFilter(highestRating);

  const HocSinh = course.thanhToan.filter((item) => item.id_nguoidung).length;
  console.log(course.thongtingiangvien);
  
  return (
    <div className="single-instructor-area-details flex p-4 border rounded-lg shadow-md">
      <Link href={`/page/Profile-insructor?id=${course.thongtingiangvien.id}`} className="w-1/4">
        <img src={course.thongtingiangvien.hinh} alt="instructor" className="w-full h-auto rounded-full" />
      </Link>
      <div className="inner-instructor-area ml-4 flex-1">
        <h5 className="title text-xl font-semibold">{course.thongtingiangvien.ten}</h5>
        <span className="deg text-gray-600">{course.trinhdo}</span>
        <div className="stars-area-wrapper mt-2">
          <div className="stars-area flex items-center">
            <span className="text-yellow-500 mr-2">{highestRating}</span>
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className={index < starCount ? "text-yellow-500" : "text-gray-300"} />
            ))}
          </div>
          <div className="users-area flex items-center mt-2">
            <FaUsers className="text-blue-500 mr-1" />
            <span className="text-gray-700">{HocSinh} Sinh viên</span>
          </div>
          <div className="courses-area flex items-center mt-2">
            <FaVideo className="text-green-500 mr-1" />
            <span className="text-gray-700">{course.Tongkhoahoc.length} Khóa học</span>
          </div>
        </div>
        <p className="disc mt-4 text-gray-800">
          {course.thongtingiangvien.tieusu}
        </p>
        <div className="follow-us mt-4">
          <span className="text-lg font-medium">Follow</span>
          <ul className="social-links flex space-x-4 mt-2">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebook size={20} />
              </a>
            </li>
            <li>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <FaInstagram size={20} />
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedin size={20} />
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-800">
                <FaPinterest size={20} />
              </a>
            </li>
            <li>
              <a href="#" className="text-red-700 hover:text-red-900">
                <FaYoutube size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}