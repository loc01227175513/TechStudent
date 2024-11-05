import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'; // Import thư viện moment
import dayjs from 'dayjs';
import { Link } from '@inertiajs/react';
// Example usage
const formattedDate = dayjs().format('YYYY-MM-DD');
export default function HoanThanh() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin-api/khoahocdahoanthanh');
                console.log(response.data.data);
                
                setCourses(response.data.data); // Lưu ý: Thay đổi phần truy cập vào dữ liệu nếu cần
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    // Hàm để tính thời gian từ updated_at đến hiện tại
    const calculateTimeFromNow = (updatedAt) => {
        const now = moment(); // Thời điểm hiện tại
        const updatedTime = moment(updatedAt); // Thời gian cập nhật từ API

        return updatedTime.from(now); // Trả về thời gian từ updated_at đến hiện tại (ví dụ: "3 hours ago")
    };

    return (
        <>
            <nav className="flex justify-center mt-4 space-x-4">
                <Link href="/admin/khoahocdahoanthanh" className="text-yellow-400">Hoàn thành các khóa học</Link>
            </nav>

            <section className="p-4 space-y-4">
                {courses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className='relative'>
                            <h3 className="text-lg font-semibold">ID khóa học: {course.id}</h3>
                            {/* <p className="text-gray-400">{course.khoahoc.map(item => (
                                item.ten
                            ))}</p> */}
                            <p className='text-yellow-400'>{course.khoahoc.ten} </p>
                            {course.khoahoc.hinh && <img src={course.khoahoc.hinh} alt="" className='absolute top-0 w-20 rounded-full left-60' />}
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-yellow-400">Hoàn thành</p>
                            <p className="text-gray-400">Completed {calculateTimeFromNow(course.updated_at)}</p>
                        </div>
                    </div>
                ))}
            </section>

            <button className="fixed p-4 text-gray-900 bg-yellow-400 rounded-full shadow-lg bottom-4 right-4">
                +
            </button>
        </>
    );
}
