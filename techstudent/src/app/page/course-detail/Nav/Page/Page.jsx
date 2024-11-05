"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Mota from './Mota';
import Instructor from './Instructor';
import Review from './Review';
import Course from './course';

const MotionDiv = motion.div;

export default function Page({ course, formattedTotalTime }) {
  const [page, setPage] = useState('mota');

  const renderContent = (course) => {
    switch (page) {
      case 'review':
        return <Review course={course} />;
      case 'instructor':
        return <Instructor course={course} />;
      case 'course':
        return <Course course={course} formattedTotalTime={formattedTotalTime} />;
      case 'mota':
        return <Mota course={course} />;
      default:
        return <Mota course={course} />;
    }
  };

  return (
    <div className="shadow-lg border border-gray-200 p-4 rounded-md bg-white text-black">
      <div className="w-full pb-12">
        <div className="flex border-b">
          {['Thông tin khóa học', 'Nội dung khóa học', 'Người hướng dẫn', 'Ôn tập'].map((label, index) => {
            const currentPage = ['mota', 'course', 'instructor', 'review'][index];
            return (
              <button
                key={index}
                className={`flex-1 text-center py-2 ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-blue-500 hover:text-white'
                } transition-colors duration-200`}
                onClick={() => setPage(currentPage)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent(course)}
      </MotionDiv>
    </div>
  );
}