"use client";
import React, { useState, useEffect } from 'react';
import { GiangVienKhoaHocHienThi } from '../../../service/course/course.service';
import { TheoDoiGiangVien, DanhSachTheoDoi } from '../../../service/Follow/Follow';
import Link from 'next/link';

export const Profileinsructor = () => {
    const [data, setData] = useState([]);
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        GiangVienKhoaHocHienThi().then((res) => {
            const dataWithSocialLinks = res.data.map((item) => {
                const socialLinks = res.MangXaHoi.filter(
                    (social) => social.id_giangvien === item.giangVien.id
                );
                return {
                    ...item,
                    giangVien: {
                        ...item.giangVien,
                        MangXaHoi: socialLinks,
                    },
                };
            });
            setData(dataWithSocialLinks);
        });
    }, []);
    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const res = await DanhSachTheoDoi();
                console.log(res, "res");
                
                const urlParams = new URLSearchParams(window.location.search);
                const id_giangvien = urlParams.get('id');

                if (id_giangvien) {
                    const isFollowing = res.some(
                        (item) => String(item.id_giangvien) === id_giangvien
                    );
                    setFollow(isFollowing);
                } else {
                    console.warn('id_giangvien not found in URL');
                }
            } catch (error) {
                console.error('Error fetching follow status:', error);
            }
        };

        fetchFollowStatus();
    }, []);
    console.log(follow, "follow");


    const TongBaiHoc = data
        .map((item) => item.baihoc.length)
        .reduce((a, b) => a + b, 0);
    const TongHocVien = data
        .map((item) => item.ThanhToan.length)
        .reduce((a, b) => a + b, 0);

    const renderStars = (rating) => {
        rating = parseFloat(rating);
        rating = Math.max(0, Math.min(rating, 5));
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fa-solid fa-star" />
                ))}
                {halfStar && <i className="fa-solid fa-star-half" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="fa-regular fa-star" />
                ))}
            </>
        );
    }

    const DanhGia = (rate) => {
        if (rate.length === 0) return 0;
        const ratings = rate.map((r) => parseFloat(r.danhgia));
        const total = ratings.reduce((sum, r) => sum + r, 0);
        return (total / ratings.length).toFixed(1);
    };

    const overallAverageRating = () => {
        const allRatings = data.flatMap(course => course.danhgia.map(r => parseFloat(r.danhgia)));
        if (allRatings.length === 0) return 0;
        const total = allRatings.reduce((sum, r) => sum + r, 0);
        return (total / allRatings.length).toFixed(1);
    };
    const handleFollow = async () => {
        try {
            await TheoDoiGiangVien();
            setFollow(true);
            alert('Theo dõi thành công');
        } catch (error) {
            alert('Theo dõi thất bại');
        }
    }


    return (
        <div className="container">
            <div className="dashboard-banner-area-wrapper">
                <div className="container">
                    <div className="row">
                        {data.slice(0, 1).map((item) => (
                            <div className="col-lg-12" key={item.giangVien.id}>
                                <div className="dashboard-banner-area-start bg_image">
                                    <div className="rating-area-banner-dashboard">
                                        <div className="stars">
                                            <span>{overallAverageRating()}</span>
                                            {renderStars(overallAverageRating())}
                                        </div>
                                        <p>Giảng viên tiếp thị kỹ thuật số</p>
                                        <button onClick={handleFollow} className="create-btn" disabled={follow}>
                                            <i className="fa-regular fa-circle-plus" /> {follow ? 'Đã Theo Dõi' : 'Theo Dõi'}
                                        </button>
                                    </div>
                                    <div className="author-profile-image-and-name flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.giangVien.hinh}
                                                className="w-24 h-24 rounded-full object-cover"
                                                alt="dashboard"
                                            />
                                        </div>
                                        <div>
                                            <h1 className="title text-3xl font-extrabold text-black">
                                                {item.giangVien.ten}
                                            </h1>
                                            <div className="course-video mt-2">
                                                <div className="single flex items-center space-x-2 text-black">
                                                    <i className="fa-regular fa-video" />
                                                    <span className="text-lg font-semibold">
                                                        {TongBaiHoc} Bài Học
                                                    </span>
                                                </div>
                                                <div className="single flex items-center space-x-2 text-black mt-1">
                                                    <i className="fa-light fa-users" />
                                                    <span className="text-lg font-semibold">
                                                        {TongHocVien} Sinh viên
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="rts-instructor-profile rts-section-gapBottom pt-12">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-9">
                            <div className="instructor-profile-right-area-start">
                                <div className="bio-graphyarea">
                                    <h5 className="title">Tiểu sử</h5>
                                    {data.slice(0, 1).map((item) => (
                                        <div key={item.giangVien.id}>
                                            <p className="disc">
                                                {item.giangVien.tieusu}
                                            </p>
                                            <div className="social-area-dashboard-footer">
                                                <ul>
                                                    {item.giangVien.MangXaHoi.map((social) => (
                                                        <li key={social.id}>
                                                            <a href={social.url}>
                                                                <i className={`fa-brands fa-${social.nentang}`} />
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="row g-5 mt-8">
                                    {data.map((item) => (
                                        <div
                                            className="col-lg-4 col-md-6 col-sm-12"
                                            key={item.id}
                                        >
                                            <Link href={`/page/course-detail?id=${item.id}`}>
                                                <div className="rts-single-course">
                                                    <a className="thumbnail">
                                                        <img
                                                            src={item.hinh}
                                                            alt="course"
                                                        />
                                                    </a>
                                                    <div
                                                        className="save-icon"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal-login"
                                                    >
                                                        <i className="fa-sharp fa-light fa-bookmark" />
                                                    </div>
                                                    <div className="tags-area-wrapper">
                                                        <div className="single-tag">
                                                            <span>{item.theLoaiCon.ten}</span>
                                                        </div>
                                                        <div className="single-tag">
                                                            <span>{item.chuDe.ten}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lesson-studente">
                                                        <div className="lesson">
                                                            <i className="fa-light fa-calendar-lines-pen" />
                                                            <span>{item.baihoc.length} Lessons</span>
                                                        </div>
                                                        <div className="lesson">
                                                            <i className="fa-light fa-user-group" />
                                                            <span>{item.ThanhToan.length} Students</span>
                                                        </div>
                                                    </div>
                                                    <h5 className="title">{item.ten}</h5>
                                                    <p className="teacher">{item.giangVien.ten}</p>
                                                    <div className="rating-and-price">
                                                        <div className="stars">
                                                            <span>{DanhGia(item.danhgia)}</span>
                                                            {renderStars(DanhGia(item.danhgia))}
                                                        </div>
                                                        <div className="price-area">
                                                            {item.gia === 0 || item.giamgia === 0 ? (
                                                                <div className="price text-white bg-cyan-500 p-1 rounded-md">Miễn Phí</div>
                                                            ) : (
                                                                <>
                                                                    <div className="not price line-through text-gray-500 mr-2">${item.gia}</div>
                                                                    <div className="price text-red-500 font-semibold">${item.giamgia}</div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}