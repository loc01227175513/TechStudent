"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DanhSachYeuThich, XoaKhoaHocYeuThich } from '../../../../service/YeuThich/YeuThich';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VoucherPage() {
    const [love, setLove] = useState([]);

    useEffect(() => {
        const fetchLove = async () => {
            try {
                const response = await DanhSachYeuThich();
                setLove(response.khoahoc);
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error("Failed to fetch vouchers.");
            }
        };

        fetchLove();
    }, []);

    const deleteFavorite = async (id) => {
        try {
            await XoaKhoaHocYeuThich(id);
            setLove(prevLove => prevLove.filter(item => item.khoahoc.id !== id));
            toast.success("Deleted successfully.");
            window.location.reload();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error("Failed to delete the course.");
        }
    };
    console.log(love);
    

    return (
        <div className="overflow-y-scroll col-lg-9 h-lvh" style={{ backgroundColor: '#f5f5f5' }}>
            <ToastContainer />
            <div className="exrolled-course-wrapper-dashed">
                <div className="row g-5">
                    {love.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="single-course-style-three enroll-course">
                                <Link href={`/page/course-detail?id=${item.khoahoc.id}`} className="thumbnail">
                                    <img src={item.khoahoc.hinh} alt="course" />
                                    {/* <div className="tag-thumb">
                                        <span>{item.khoahoc.chuDe}</span>
                                    </div> */}
                                </Link>
                                <div className="body-area">
                                    <div className="course-top">
                                        <div className="tags">Bán tốt nhất</div>
                                        <div className="price">
                                            {item.khoahoc.gia === 0 && item.khoahoc.giamgia === 0 ? 'Miễn phí' : `$ ${item.khoahoc.gia}`}
                                        </div>
                                        {item.khoahoc.gia !== 0 || item.khoahoc.giamgia !== 0 ? (
                                            <div className="line-through price">
                                                $ {item.khoahoc.giamgia}
                                            </div>
                                        ) : null}
                                    </div>
                                    <Link href={`/page/course-detail?id=${item.khoahoc.id}`}>
                                        <h5 className="title">{item.khoahoc.ten}</h5>
                                    </Link>
                                    <div className="teacher-stars">
                                        <div className="teacher">
                                            <span>{item.khoahoc.tenGiangVien}</span>
                                        </div>
                                        <ul className="stars">
                                            <li className="span">4.5</li>
                                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                                            <li><i className="fa-sharp fa-regular fa-star" /></li>
                                        </ul>
                                    </div>
                                    <div className="leasson-students">
                                        <div className="lesson">
                                            <i className="fa-light fa-calendar-lines-pen" />
                                            <span>{item.baihoc.length || 0} Bài học</span>
                                        </div>
                                        <div className="students">
                                            <i className="fa-light fa-users" />
                                            <span>{item.thanhtoan.length || 0} Học sinh</span>
                                        </div>
                                    </div>
                                    
                                    <button className="rts-btn btn-border">
                                        <Link href={`/page/course-detail?id=${item.khoahoc.id}`}>
                                            Xem Chi Tiết
                                        </Link>
                                    </button>
                                    <button className="rts-btn btn-border" onClick={() => deleteFavorite(item.id)}>
                                        <i className="fa-sharp fa-solid fa-trash" /> Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}