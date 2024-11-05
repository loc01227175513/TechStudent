import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const DoanhThu = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalEnrollments, setTotalEnrollments] = useState(0);
    const [instructorRating, setInstructorRating] = useState(0);
    const [timeRange, setTimeRange] = useState('12 tháng trước');

    useEffect(() => {
        const fetchData = async () => {
            const userData = localStorage.getItem('lecturerId');
            const parsedData = JSON.parse(userData);

            const revenueResponse = await Axios.post('/api/DoanhThuGiangVien', { id_giangvien: parsedData.giangvien });
            if (revenueResponse.status === 200 && revenueResponse.data && revenueResponse.data.data) {
                const { tongdoanhthu } = revenueResponse.data.data;
                setTotalRevenue(tongdoanhthu);
            } else {
                console.error('Unexpected response structure:', revenueResponse);
            }

            const enrollmentsResponse = await Axios.post('/api/TongSoDangKy', { id_giangvien: parsedData.giangvien });
            if (enrollmentsResponse.status === 200 && enrollmentsResponse.data && enrollmentsResponse.data.data) {
                setTotalEnrollments(enrollmentsResponse.data.data.length);
                console.log(enrollmentsResponse.data.data.length);
            } else {
                console.error('Unexpected response structure:', enrollmentsResponse);
            }

            const ratingResponse = await Axios.post('/api/InstructorRating', { id_giangvien: parsedData.giangvien });
            if (ratingResponse.status === 200 && ratingResponse.data) {
                setInstructorRating(ratingResponse.data.rating);
            } else {
                console.error('Unexpected response structure:', ratingResponse);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['14 thg 9, 2024', '19 thg 9, 2024', '23 thg 9, 2024', '28 thg 9, 2024', '2 thg 10, 2024', '7 thg 10, 2024', '11 thg 10, 2024'],
                datasets: [{
                    label: 'Số lượt xem',
                    data: [0, 0, 0, 2, 0, 1, 0],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 3
                    }
                }
            }
        });
    }, []);

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'rgba(0, 0, 0, 0.61)' }}>
            <div className="container p-6 mx-auto">
                <h1 className="mb-6 text-2xl font-bold text-white">Tổng quan Tất cả khóa học</h1>
                <p className="mb-4 text-gray-400">Xem thông tin chi tiết hàng đầu về hiệu suất của bạn</p>
                <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                    <div className="flex justify-between mb-4">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-white">Tổng doanh thu</h2>
                            <p className="text-lg text-white">US$ {totalRevenue}</p>
                            <p className="text-gray-400">US$ {totalRevenue} tháng này</p>
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-white">Tổng số lượt ghi danh</h2>
                            <p className="text-lg text-white">
                                {totalEnrollments} tháng này
                            </p>
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-white">Xếp hạng giảng viên</h2>
                            <p className="text-lg text-white">{instructorRating}</p>
                            <p className="text-gray-400">{instructorRating} xếp hạng tháng này</p>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <canvas id="myChart" width="400" height="200"></canvas>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="time-range" className="block text-sm font-medium text-gray-400">Phạm vi ngày:</label>
                        <select
                            id="time-range"
                            className="block w-full mt-1 text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option>12 tháng trước</option>
                            <option>6 tháng trước</option>
                            <option>3 tháng trước</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoanhThu;