import React from "react";
import { FaStar, FaRegStar, FaThumbsUp, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionDiv = motion.div;
const MotionFlex = motion.div;

export default function Review({ course }) {
  const averageRating =
    course.danhgia.reduce((acc, rating) => acc + parseInt(rating.rating), 0) /
    course.danhgia.length;

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(
          <FaStar key={i} className="text-yellow-400 w-5 h-5" />
        );
      } else {
        stars.push(
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="rating-main-wrapper p-4">
      {/* Top Rating */}
      <div className="rating-top-main-wrapper mb-6">
        {/* Average Rating */}
        <div className="rating-area-main-wrapper text-center mb-4">
          <h2 className="title text-2xl font-bold">
            {averageRating.toFixed(1)}
          </h2>
          <div className="flex justify-center items-center mb-2">
            {renderStars(averageRating)}
          </div>
          <p>Total {course.danhgia.length} Ratings</p>
        </div>
        {/* Rating Progress */}
        <div className="progress-wrapper-main">
          {[5, 4, 3, 2, 1].map((rating, index) => {
            const count = course.danhgia.filter(
              (d) => parseInt(d.rating) === rating
            ).length;
            const percentage = (count / course.danhgia.length) * 100;
            let color;
            if (percentage > 50) color = "bg-green-500";
            else if (percentage > 20) color = "bg-yellow-500";
            else color = "bg-red-500";

            return (
              <MotionDiv
                key={index}
                className="single-progress-area-h mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-2 w-4 h-4" />
                    <span>{rating} Stars</span>
                  </div>
                  <span>{count} Ratings</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className={`${color} h-2 rounded`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </div>
      {/* Individual Ratings */}
      {course.danhgia.map((review, index) => (
        <MotionDiv
          key={index}
          className="individual-rating-area p-4 border border-gray-300 rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Author Info */}
          <div className="flex mb-3">
            <img
              src={course.thongtingiangvien.hinh}
              alt="instructor"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <p className="font-bold">{review.user}</p>
              <div className="flex items-center">
                {renderStars(review.rating)}
                <span className="ml-2 text-gray-500 text-sm">
                  One week ago
                </span>
              </div>
            </div>
          </div>
          {/* Review Comment */}
          <p className="mb-3">{review.comment}</p>
          {/* Like & Love */}
          <div className="flex">
            <a href="#" className="mr-4">
              <FaThumbsUp className="w-5 h-5 text-gray-600 hover:text-blue-500" />
            </a>
            <a href="#">
              <FaHeart className="w-5 h-5 text-gray-600 hover:text-red-500" />
            </a>
          </div>
        </MotionDiv>
      ))}
    </div>
  );
}