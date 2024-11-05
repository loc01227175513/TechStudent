import React, { useState, useEffect } from 'react';

const TestApi = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        if (selectedRequest) {
            const fetchData = async () => {
                let response;
                if (selectedRequest === '/api/showgiohang' || selectedRequest === '/api/khoahocdanghoc' ) {
                    response = await fetch(selectedRequest, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id_nguoidung: 2 }), // Example payload
                    });
                }  else if (selectedRequest === '/api/ShowSubBaiHoc') {
                    response = await fetch(selectedRequest, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id_baihoc: 2 }), // Example payload
                    }); 
                } else if (selectedRequest === '/api/ShowTrangDichKhoaHoc' || selectedRequest === '/api/showgiaKhoaHoc') {
                    response = await fetch(selectedRequest, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id_khoahoc: 3 }), // Example payload
                    }); 
                } else {
                    response = await fetch(selectedRequest);
                }
                const data = await response.json();
                setFetchedData(data);
                console.log(data);
            };
            fetchData();
        }
    }, [selectedRequest]);

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
    };

    return (
        <div>
            <div className="bg-gray-800 p-4 rounded-md mb-4">
                <div className="flex items-center mb-2">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="font-bold">Untitled Request</span>
                </div>
                <select
                    className="bg-gray-700 border border-gray-600 text-gray-300 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 rounded-md"
                    onChange={(e) => handleRequestClick(e.target.value)}
                >
                    <option value="">Select an option</option>
                    <option value="/api/theloai">Thể Loại</option>
                    <option value="/api/chude">Chủ Đề</option>
                    <option value="/api/KhoahocChude/2">Khóa Học Chủ Đề</option>
                    <option value="/api/Khoahoctheloai/7">Khóa Học Thể Loại</option>
                    <option value="/api/Khoahoctheloaicon/4">Khóa Học Thể Loại Con</option>
                    <option value="/api/giangvien">Giảng Viên</option>
                    <option value="/api/Khoahocchitiet/3">Khóa Học Chi Tiết</option>
                    <option value="/api/showgiohang">Show Giỏ Hàng</option>
                    <option value="/api/kiemtravidedahoc">Video Đã Học</option>
                    <option value="/api/khoahocdanghoc">Khóa Học đã Đăng Ký</option>
                    <option value="/api/motaKhoaHoc/3">Mô tả Khóa học </option>
                    <option value="/api/ShowSubBaiHoc"> Show tiêu đề Video </option>
                    <option value="/api/ShowTrangDichKhoaHoc"> Show Trang Đích Khóa Học </option>
                    <option value="/api/showgiaKhoaHoc"> Show Giá khóa Học  </option>

                </select>
            </div>

            {fetchedData && (
                <div className="bg-gray-800 p-4 rounded-md mb-4">
                    <h2 className="font-bold text-lg mb-2">Fetched Data</h2>
                    <textarea
                        className="bg-gray-700 p-2 rounded-md text-gray-300 w-full"
                        rows="10"
                        readOnly
                        value={JSON.stringify(fetchedData, null, 2)}
                    />
                </div>
            )}
        </div>
    );
};

export default TestApi;