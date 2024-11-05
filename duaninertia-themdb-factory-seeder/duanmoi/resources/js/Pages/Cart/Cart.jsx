import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const userData = localStorage.getItem('data');
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                axios.post('/api/showgiohang', { id_nguoidung: parsedData.id })
                    .then(response => {
                        setCartItems(response.data.data);
                        const total = response.data.data.reduce((sum, item) => {
                            return sum + item.khoahocs.reduce((itemSum, khoahoc) => itemSum + khoahoc.gia, 0);
                        }, 0);
                        setTotalPrice(total);
                    })
                    .catch(error => {
                        console.error('There was an error fetching the cart items!', error);
                    });
            } catch (error) {
                console.error('Error parsing user data from localStorage', error);
            }
        } else {
            console.error('No user data found in localStorage');
        }
    }, []);

    const xoagiohang = async (id) => {
        try {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (!parsedData) {
                alert('User not found. Please log in.');
                return;
            }

            const payload = {
                id_khoahoc: id,
                id_nguoidung: parsedData.id,
            };

            await axios.post('/api/xoasanphamadd', payload);
            alert('Course removed from cart successfully!');
            window.location.href = '/giohang';
        } catch (err) {
            console.error('Error removing course from cart:', err.response ? err.response.data : err.message);
            alert('Failed to remove course from cart.');
        }
    };

    return (
        <div className="min-h-screen py-10 bg-gray-100">
            <div className="max-w-6xl px-4 mx-auto">
                <h1 className="mb-6 text-3xl font-bold text-gray-800">Giỏ Hàng Của Bạn</h1>
                {cartItems.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-lg shadow-md">
                        <p className="text-lg text-gray-700">Giỏ hàng của bạn đang trống.</p>
                    </div>
                ) : (
                    <div className="flex flex-col -mx-4 lg:flex-row">
                        <div className="w-full px-4 lg:w-2/3">
                            <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
                                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Các khóa học trong giỏ hàng</h2>
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        item.khoahocs.map(khoahoc => (
                                            <div key={khoahoc.id} className="flex items-center pb-4 border-b">
                                                <img src={khoahoc.hinh} alt={khoahoc.ten} className="object-cover w-24 h-24 mr-4 rounded-md" />
                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-medium text-gray-800">{khoahoc.ten}</h3>
                                                    <p className="text-gray-600">Giảng viên: {khoahoc.tenGiangVien}</p>
                                                    <p className="text-gray-600">Giá: <span className="font-semibold text-red-500">${khoahoc.gia}</span></p>
                                                </div>
                                                <button onClick={() => xoagiohang(khoahoc.id)} className="text-red-500 hover:text-red-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 lg:w-1/3">
                            <div className="p-6 bg-white rounded-lg shadow-md">
                                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Tóm Tắt Đơn Hàng</h2>
                                <div className="pb-4 border-b">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Tổng cộng:</span>
                                        <span className="font-semibold text-gray-800">${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Giảm giá:</span>
                                        <span className="font-semibold text-gray-800">$0</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Thành tiền:</span>
                                        <span className="font-semibold text-gray-800">${totalPrice}</span>
                                    </div>
                                </div>
                                <Link href="/thanhtoan">
                                    <button className="w-full py-3 mt-6 text-white transition duration-200 bg-purple-600 rounded-md hover:bg-purple-700">
                                        Tiến Hành Thanh Toán
                                    </button>
                                </Link>
                            </div>
                            <div className="mt-6 text-center">
                                <Link href="/" className="text-purple-600 hover:underline">Tiếp tục mua sắm</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
