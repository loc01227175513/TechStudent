import React from 'react';
import { Link } from '@inertiajs/react';

export default function DangTienHanh() {
    return (
        <>
            <nav className="flex justify-center mt-4 space-x-4">
                <Link href='/admin/dashboard'>
                    <button className="text-gray-400 px-4 py-2"> Đang chờ xử lý</button>
                </Link>
                <Link href='/admin/dangtienhanh'>
                    <button className="text-yellow-400 border-b-4 border-yellow-400 px-4 py-2">Trong tiến trình</button>
                </Link>
                <Link href='/admin/hoanthanh'>
                    <button className="text-gray-400 px-4 py-2">Hoàn thành</button>
                </Link>
            </nav>

            <section className="p-4">
                <div className="bg-gray-800 p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold"> Mã khóa học: CR4247535</p>
                            <div className="flex space-x-2">
                                <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg">Thể loại: Tiếp thị </span>
                                <span className="bg-gray-700 px-2 py-1 rounded-lg">12 sinh viên</span>
                                <span className="bg-gray-700 px-2 py-1 rounded-lg">1 phiên</span>
                                <span className="bg-gray-700 px-2 py-1 rounded-lg">2 người hướng dẫn</span>
                            </div>
                            <p className="text-gray-400 mt-2">Được tạo bởi: John Doe |1 giờ trước</p>
                            <p className="text-green-400 mt-1">Thời gian còn lại: 63 phút</p>
                        </div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Bắt đầu khóa học</button>
                    </div>
                </div>
            </section>

            <section className="fixed bottom-16 left-0 right-0 bg-gray-900 flex justify-center p-4">
                <button className="bg-gray-700 px-4 py-2 rounded-lg"> Gói</button>
                <button className="ml-4 bg-gray-700 px-4 py-2 rounded-lg">Loại</button>
            </section>
        </>
    );
}
