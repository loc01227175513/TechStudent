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
                const response = await axios.get('/admin-api/hoanthanh'); // Thay đổi URL endpoint API tương ứng
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
                <Link href='/admin/dashboard'>
                    <button className="text-gray-400 px-4 py-2">Chưa giải quyết</button>
                </Link>
                <Link href='/admin/dangtienhanh'>
                    <button className="text-gray-400 px-4 py-2">Trong tiến trình</button>
                </Link>
                <Link href='/admin/hoanthanh'>
                    <button className="text-yellow-400 border-b-4 border-yellow-400 px-4 py-2"> Hoàn thành</button>
                </Link>
            </nav>

            <section className="p-4 space-y-4">
                {courses.map(course => (
                    <div key={course.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">ID khóa học: {course.ten}</h3>
                            <p className="text-gray-400">{course.chude.ten} | {course.theloaicon.ten}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-yellow-400 font-semibold">Hoàn thành</p>
                            <p className="text-gray-400">Hoàn thành {calculateTimeFromNow(course.updated_at)}</p>
                        </div>
                    </div>
                ))}
            </section>

            <button className="fixed bottom-4 right-4 bg-yellow-400 text-gray-900 p-4 rounded-full shadow-lg">
                +
            </button>
        </>
    );
}
