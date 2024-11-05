"use client";
import React, { useState } from 'react';

const BecomeInstructor = () => {
    return (
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <p className="mb-6 text-gray-700">
               Trở thành một người hướng dẫn liên quan đến một loạt các bước có thể thay đổi tùy thuộc vào loại hướng dẫn mà bạn quan tâm (ví dụ: giảng dạy học thuật, đào tạo công ty, khóa học trực tuyến). Đây là một hướng dẫn chung để giúp bạn trở thành một người hướng dẫn:
            </p>
            <h6 className="mb-3 text-xl font-semibold text-blue-600">Xác định lĩnh vực chuyên môn của bạn:</h6>
            <p className="mb-6 text-gray-700">
              Xác định môn học hoặc kỹ năng mà bạn có chuyên môn và đam mê giảng dạy.
            </p>
            <h6 className="mb-3 text-xl font-semibold text-blue-600">Trình độ học vấn:</h6>
            <p className="mb-6 text-gray-700">
               Có được các bằng cấp giáo dục cần thiết cho cấp độ và loại hướng dẫn mà bạn đang hướng tới. Điều này có thể bao gồm bằng cử nhân.
            </p>
            <div className="mt-8 flex justify-center">
                <img src="https://cdn.vus.edu.vn/webroot/css/images/website/2024/giaovien/ANNE-KENTHILL-ELOISE.webp" alt="instructor" className="w-96 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300" />
            </div>
        </div>
    );
};

const InstructorRules = () => {
    return (
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <p className="mb-6 text-gray-700">
                Trở thành một người hướng dẫn liên quan đến một loạt các bước có thể thay đổi tùy thuộc vào loại hướng dẫn mà bạn quan tâm (ví dụ: giảng dạy học thuật, đào tạo công ty, khóa học trực tuyến). Đây là một hướng dẫn chung để giúp bạn trở thành một người hướng dẫn:
            </p>
            <h6 className="mb-3 text-xl font-semibold text-blue-600">Xác định lĩnh vực chuyên môn của bạn:</h6>
            <p className="mb-6 text-gray-700">
                Xác định môn học hoặc kỹ năng mà bạn có chuyên môn và đam mê giảng dạy.
            </p>
            <h6 className="mb-3 text-xl font-semibold text-blue-600">Trình độ học vấn:</h6>
            <p className="mb-6 text-gray-700">
                Có được các bằng cấp giáo dục cần thiết cho cấp độ và loại hướng dẫn mà bạn đang hướng tới. Điều này có thể bao gồm bằng cử nhân.
            </p>
            <div className="mt-8 flex justify-center">
                <img src="https://cdn.vus.edu.vn/webroot/css/images/website/2024/giaovien/EMILIE-SLATER.webp" alt="instructor" className="w-96 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300" />
            </div>
        </div>
    );
};

const StartWithCourses = () => {
    return (
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <p className="mb-6 text-gray-700">
              Trở thành một người hướng dẫn liên quan đến một loạt các bước có thể thay đổi tùy thuộc vào loại hướng dẫn mà bạn quan tâm (ví dụ: giảng dạy học thuật, đào tạo công ty, khóa học trực tuyến). Đây là một hướng dẫn chung để giúp bạn trở thành một người hướng dẫn:
            </p>
            <h6 className="mb-3 text-xl font-semibold text-blue-600">Xác định lĩnh vực chuyên môn của bạn:</h6>
            <p className="mb-6 text-gray-700">
               Xác định môn học hoặc kỹ năng mà bạn có chuyên môn và đam mê giảng dạy.
            </p>
            <h6 className="mb-3 text-xl font-semibold text-blue-600">Trình độ học vấn:</h6>
            <p className="mb-6 text-gray-700">
                 Có được các bằng cấp giáo dục cần thiết cho cấp độ và loại hướng dẫn mà bạn đang hướng tới. Điều này có thể bao gồm bằng cử nhân.
            </p>
            <div className="mt-8 flex justify-center">
                <img src="https://cdn.vus.edu.vn/webroot/css/images/website/2024/giaovien/ARMANDO-DE-CRESCENZO.webp" alt="instructor" className="w-96 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300" />
            </div>
        </div>
    );
};

export default function Main1() {
    const [activeTab, setActiveTab] = useState('home');
    return (
        <>
            {/* becoming instructor area start */}
            <div className="p-8 bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="mb-16">
                    <h2 className="mb-6 text-3xl font-bold text-blue-700">Làm thế nào để trở thành một người hướng dẫn</h2>
                    <p className="text-gray-700 text-lg">
                        Trở thành người hướng dẫn liên quan đến một loạt các bước có thể thay đổi tùy thuộc vào loại hướng dẫn mà bạn quan tâm
                    </p>
                </div>
                <div className="mb-16">
                    <img src="https://cdn.vus.edu.vn/webroot/css/images/website/2024/banner_inside/banner_giaovien.webp" alt="instructor" className="w-full rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300" />
                </div>
            </div>
            {/* becoming instructor area end */}

            {/* become a instructor tabs */}
            <div className="mt-16">
                <ul className="flex border-b">
                    <li className="mr-4">
                        <button
                            className={`inline-block px-6 py-3 text-lg font-semibold ${activeTab === 'home' ? 'text-blue-500 border-b-4 border-blue-500' : 'text-gray-500 hover:text-blue-400'}`}
                            onClick={() => setActiveTab('home')}
                        >
                            <i className="mr-2 fa-regular fa-user"></i>
                            Trở thành một người hướng dẫn
                        </button>
                    </li>
                    <li className="mr-4">
                        <button
                            className={`inline-block px-6 py-3 text-lg font-semibold ${activeTab === 'profile' ? 'text-blue-500 border-b-4 border-blue-500' : 'text-gray-500 hover:text-blue-400'}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <i className="mr-2 fa-light fa-list"></i>
                            Quy tắc hướng dẫn
                        </button>
                    </li>
                    <li className="mr-4">
                        <button
                            className={`inline-block px-6 py-3 text-lg font-semibold ${activeTab === 'contact' ? 'text-blue-500 border-b-4 border-blue-500' : 'text-gray-500 hover:text-blue-400'}`}
                            onClick={() => setActiveTab('contact')}
                        >
                            <i className="mr-2 fa-regular fa-box"></i>
                            Bắt đầu với các khóa học
                        </button>
                    </li>
                </ul>
                <div className="mt-8 tab-content">
                    {activeTab === 'home' && <BecomeInstructor />}
                    {activeTab === 'profile' && <InstructorRules />}
                    {activeTab === 'contact' && <StartWithCourses />}
                </div>
            </div>
            {/* become a instructor tabs end */}
        </>
    );
}