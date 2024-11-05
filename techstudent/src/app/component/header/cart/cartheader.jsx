import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
const Cart = ({ onAction }) => {








    const router = useRouter();
    const openCart = () => {
        router.push('/page/cart');
    };
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const userData = localStorage.getItem('data');

        if (userData) {
            try {
                const parsedData = JSON.parse(userData);

                axios.post('http://127.0.0.1:8000/api/showgiohang', { id_nguoidung: parsedData.id })
                    .then(response => {
                        setCartItems(response.data.data);

                        // Calculate total discounted price
                        const totalDiscountedPrice = response.data.data.reduce((sum, item) => {
                            return sum + item.khoahocs.reduce((itemSum, khoahoc) => itemSum + khoahoc.giamgia, 0);
                        }, 0);
                        setTotalPrice(totalDiscountedPrice);
                    })
                    .catch(() => {
                        // Do nothing
                    });
            } catch {
                // Do nothing
            }
        } else {
            // Do nothing
        }
    }, []);

    const xoagiohang = async (id) => {
        try {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (!parsedData) {
                return null;
            }

            const payload = {
                id_khoahoc: id,
                id_nguoidung: parsedData.id,
            };
            toast.error('Xóa khóa học thành công');
            await axios.post('http://127.0.0.1:8000/api/xoasanphamadd', payload);
            window.location.href = '/';
        } catch {
            // Do nothing
        }
    };
    const userData = localStorage.getItem('data');

    console.log('cartItems', cartItems);































    return (
        <div className='poputcart'>
            <div className='trong' onClick={onAction}></div>
            <div className='cart'>
                <div className='flex justify-between p-2 mt-4 border-b border-orange-300'>
                    <h6 className='ml-10'>Giỏ hàng của tôi</h6>
                    <i className='mr-10 text-4xl bi bi-x-circle hover:cursor-pointer' onClick={onAction}></i>
                </div>
                <div className='overflow-x-hidden overflow-y-scroll cart-detail' style={{ height: '90vh' }}>
                    <ul className='list-none'>
                        {cartItems.map((item, index) => (
                            item.khoahocs.map((khoahoc, subIndex) => (
                                <li key={`${index}-${subIndex}`} className='py-4 border-b'>
                                    <div className='flex justify-between cart-detail-item'>

                                        <div className='image-product'>

                                            <img src={khoahoc.hinh} alt='' className='w-40' />

                                        </div>
                                        <div className='ml-5 infor-product'>
                                            <h6>{khoahoc.ten}</h6>
                                            <p className='p-1 text-xl bg-orange-200 rounded-md hover:text-orange-600 hover:cursor-pointer'>{khoahoc.tenGiangVien}</p>
                                            <div className='flex p-2'>
                                                <p className='m-2 line-through text-slate-300'>{khoahoc.gia}đ</p>
                                                <p className='m-2 font-bold'>{khoahoc.giamgia}đ</p>
                                            </div>
                                        </div>

                                        <div className='mr-3'>
                                            <div className='flex justify-around gap-4 mt-3'>
                                                <a href={`/page/course-detail?id=${khoahoc.id}`}>
                                                    <i className='bi bi-pencil-square hover:cursor-pointer'></i>
                                                </a>
                                                <i onClick={() => xoagiohang(khoahoc.id)} className='bi bi-trash3 hover:cursor-pointer'></i>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ))}
                    </ul>
                    <div className='mx-4'>
                        <div className='flex justify-between items-center m-4'>
                            <h6 className='text-lg font-semibold'>Tổng cộng</h6>
                            <p className='text-lg font-semibold '>{totalPrice} đ</p>
                        </div>
                        <div className='w-full'>
                            {userData ? (
                                <>
                                    <a href="/page/checkout"><button className='btn-thanhtoan'>tiến hành thanh toán</button></a>
                                    <button className='btn-cart' onClick={() => openCart()}>xem giỏ hàng</button>
                                </>
                            ) : (
                                <a href="/page/login"><button className='btn-login'>Đăng nhập</button></a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export { Cart };