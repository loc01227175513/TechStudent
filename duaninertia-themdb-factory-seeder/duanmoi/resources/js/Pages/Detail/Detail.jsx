import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Link } from '@inertiajs/react';

const Detail = ({ id }) => {
    const [Khoahoc, setKhoahoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCourseInCart, setIsCourseInCart] = useState(false);
    const [isCourseRegistered, setIsCourseRegistered] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`/api/Khoahocchitiet/${id}`);
                setKhoahoc(response.data.khoahoc);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (parsedData) {
                try {
                    const response = await Axios.post('/api/showgiohang', { id_nguoidung: parsedData.id });
                    const isCourseInCart = response.data.data.some(item =>
                        item.khoahocs.some(khoahoc => khoahoc.id === Khoahoc.id)
                    );

                    setIsCourseInCart(isCourseInCart);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        if (Khoahoc) {
            fetchCartItems();
        }
    }, [Khoahoc]);

    useEffect(() => {
        const fetchRegisteredCourses = async () => {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (parsedData) {
                try {
                    const response = await Axios.post('/api/khoahocdadangky', { id_nguoidung: parsedData.id });
                    const isCourseRegistered = response.data.data.some(item =>
                        item.khoahocs.some(khoahoc => khoahoc.id === Khoahoc.id)
                    );

                    setIsCourseRegistered(isCourseRegistered);
                } catch (error) {
                    console.error('Error fetching registered courses:', error);
                }
            }
        };

        if (Khoahoc) {
            fetchRegisteredCourses();
        }
    }, [Khoahoc]);

    const handleAddToCart = async () => {
        try {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (!parsedData) {
                alert('User not found. Please log in.');
                return;
            }
            console.log();
            
            const payload = {
                id_nguoidung: parsedData.id,
                id_khoahoc: Khoahoc.id,
            };

            await Axios.post('/api/addcart', payload);
            alert('Course added to cart successfully!');
            window.location.reload();
        } catch (err) {
            console.error('Error adding course to cart:', err.response ? err.response.data : err.message);
            alert('Failed to add course to cart.');
        }
    };

    const handleBuyNow = async () => {
        try {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (!parsedData) {
                alert('User not found. Please log in.');
                return;
            }

            const payload = {
                id_nguoidung: parsedData.id,
                id_khoahoc: Khoahoc.id,
            };

            await Axios.post('/api/addcart', payload);
            alert('Course added to cart successfully!');
            window.location.href = '/thanhtoan';
        } catch (err) {
            console.error('Error adding course to cart:', err.response ? err.response.data : err.message);
            alert('Failed to add course to cart.');
        }
    };

    const openModal = (video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedVideo(null);
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!Khoahoc) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold text-red-500">Error: Data is not available</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl p-6 mx-auto">
            <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-lg lg:flex-row">
                <div className="lg:w-1/3">
                    <img src={`${Khoahoc.hinh}`} alt={Khoahoc.ten} className="object-cover w-full h-96" />
                </div>
                <div className="p-6 lg:w-2/3">
                    <h1 className="text-4xl font-bold text-gray-800">{Khoahoc.ten}</h1>
                    <p className="mt-4 text-lg text-gray-700">Giá: ${Khoahoc.gia}</p>
                    <div className="flex items-center mt-2">
                        <span className="text-gray-600">Giảm giá: {Khoahoc.giamgia || 'N/A'}</span>
                        <span className="ml-4 text-gray-600">Trạng thái: {Khoahoc.trangthai}</span>
                    </div>
                    <div className="mt-2 text-gray-600">
                        <span>Giảng viên: {Khoahoc.giangvien}</span>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold">Mô tả Khóa Học</h2>
                        <p className="mt-2 text-gray-700">{Khoahoc.mota}</p>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold">Thông Tin Khóa Học</h2>
                        <ul className="mt-2 text-gray-700 list-disc list-inside">
                            <li>Chủ đề: {Khoahoc.chude}</li>
                            <li>Thể loại: {Khoahoc.theloai}</li>
                            <li>Thể loại con: {Khoahoc.theloaicon}</li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold">Bài Học</h2>
                        <div className="mt-2 space-y-3">
                            {Khoahoc.baihocs.map((baihoc) => (
                                <div key={baihoc.id}>
                                    <button
                                        onClick={() => openModal(baihoc.video[0])}
                                        className="w-full p-4 text-left transition bg-gray-100 rounded-lg shadow hover:bg-gray-200"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-medium">{baihoc.ten}</span>
                                            <span className="text-sm text-gray-500">{baihoc.video.length} Video</span>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-6 sm:flex-row">
                        {isCourseRegistered ? (
                            <Link href={`/hocbai/${Khoahoc.id}`}>
                                <button className="w-full px-6 py-3 text-white transition bg-green-500 rounded-lg sm:w-auto hover:bg-green-600">
                                    Go to Course
                                </button>
                            </Link>
                        ) : (
                            <>
                                {isCourseInCart ? (
                                    <Link href="/giohang">
                                        <button className="w-full px-6 py-3 text-white transition bg-blue-500 rounded-lg sm:w-auto hover:bg-blue-600">
                                            Go to Cart
                                        </button>
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            className="w-full px-6 py-3 text-white transition bg-blue-500 rounded-lg sm:w-auto hover:bg-blue-600"
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="w-full px-6 py-3 text-white transition bg-red-500 rounded-lg sm:w-auto hover:bg-red-600"
                                            onClick={handleBuyNow}
                                        >
                                            Đăng ký ngay
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-xl">
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold text-black">{selectedVideo.ten}</h2>
                            <p className="mt-2 text-gray-700">Thời lượng: {selectedVideo.thoiluong}</p>
                            <div className="relative mt-4" style={{ paddingTop: '56.25%' }}>
                                <iframe
                                    id="player"
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${selectedVideo.url_link}?enablejsapi=1`}
                                    allowFullScreen
                                    title="YouTube Video"
                                ></iframe>
                            </div>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 mt-4 text-white transition bg-gray-500 rounded hover:bg-gray-600"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;
