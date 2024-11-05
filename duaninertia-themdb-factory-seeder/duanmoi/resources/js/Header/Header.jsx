import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Header() {
    const [theloai, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const data = JSON.parse(localStorage.getItem('data'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('/api/theloai');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || !Array.isArray(theloai.data)) return null;

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <ApplicationLogo className="h-8 w-8" />
                        </Link>
                        <div className="ml-4 relative">
                            <div className="group inline-block">
                                <button className="flex items-center focus:outline-none">
                                    <span>Danh mục</span>
                                    <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <div className="absolute left-0 mt-2 w-56 bg-white text-black shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                                    {theloai.data.map((item) => (item.theloaicons.length > 0 && (
                                        <div key={item.id} className="relative group">
                                            <Link href={`/Khoahoctheloai/${item.id}`} className="block px-4 py-2 hover:bg-gray-100">
                                                {item.ten}
                                            </Link>
                                            {item.theloaicons && item.theloaicons.length > 0 && (
                                                <div className="absolute left-full top-0 mt-0 ml-0 w-56 bg-white text-black shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 group-hover:block hidden">
                                                    {item.theloaicons.map((subItem) => (
                                                        <div key={subItem.id} className="relative group">
                                                            <Link href={`/Khoahoctheloaicon/${subItem.id}`} className="block px-4 py-2 hover:bg-gray-100">
                                                                {subItem.ten}
                                                            </Link>
                                                            {subItem.chudes && subItem.chudes.length > 0 && (
                                                                <div className="absolute left-full top-0 mt-0 ml-0 w-56 bg-white text-black shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 group-hover:block hidden">
                                                                    {subItem.chudes.map((chude) => (
                                                                        <Link
                                                                            href={`/KhoahocChude/${chude.id}`}
                                                                            key={chude.id}
                                                                            className="block px-4 py-2 hover:bg-gray-100"
                                                                        >
                                                                            {chude.ten}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                    ))}
                                                </div>
                                            )}
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden sm:block">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2"
                            />
                        </div>
                        <Link
                            href={data && data.vaitro === 1 ? "/Lecturer" : "/chuyendoi"}
                            className="ml-4 hover:text-gray-300"
                        >
                            Giảng Viên
                        </Link>
                        <Link href="/giohang" className="ml-4 hover:text-gray-300">
                            Giỏ hàng
                        </Link>
                        <Link href="/baihoccuatoi" className="ml-4 hover:text-gray-300">
                            Bài học của tôi
                        </Link>
                        {localStorage.getItem('data') ? (
                            <button
                                className="ml-4 hover:text-gray-300"
                                onClick={() => {
                                    localStorage.removeItem('lecturerId');
                                    localStorage.removeItem('data');
                                    window.location.reload();
                                }}
                            >
                                Đăng xuất
                            </button>
                        ) : (
                            <Link href="/login" className="ml-4 hover:text-gray-300">
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
