"use strict";
import React, { useEffect, useState } from 'react';

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/showBanner');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBannerData(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = bannerData.filter((banner) => banner.trangthai !== 1);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="banner-area-one shape-move">
            <div className="container">
                <div className="row">
                    {filteredData.map((banner) => (
                        <div key={banner.id} className="order-2 col-lg-6 order-xl-1 order-lg-1 order-sm-2">
                            <div className="banner-content-one">
                                <div className="inner">
                                    <div className="pre-title-banner">
                                        <i className="mr-4 bi bi-lightbulb" style={{ color: '#32ADE6' }}></i>
                                        <span>Cổng vào Học tập suốt đời</span>
                                    </div>
                                    <h1 className="title-banner">
                                        {banner.tieude} <br />
                                        <span>việc học trực tuyến</span>
                                    </h1>
                                    <p className="disc">
                                        {banner.mota}
                                    </p>
                                    <div className="banner-btn-author-wrapper">
                                        <a href="course-five.html" className="rts-btn btn-primary with-arrow">
                                            Xem tất cả khóa học <i className="fa-regular fa-arrow-right" />
                                        </a>
                                        <div className="sm-image-wrapper">
                                            <div className="images-wrap">
                                                {/* Use banner.hinhanh for dynamic image rendering */}
                                                {Array(3).fill().map((_, index) => (
                                                    <img
                                                        key={index}
                                                        src={banner.hinh}
                                                        alt="banner"
                                                        className="w-20 h-20 p-1 bg-white rounded-full"
                                                    />
                                                ))}
                                            </div>
                                            <div className="info">
                                                <h6 className="title">2000+ sinh viên</h6>
                                                <span>Tham gia lớp học trực tuyến của chúng tôi</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="order-1 col-lg-6 order--xl-2 order-lg-2 order-sm-1">
                        {filteredData.length > 0 && (
                            <div className="banner-right-img">
                                <img src={filteredData[0].hinh} alt="banner" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="review-thumb">
                <div className="review-single">
                    <i className="flex items-center justify-center w-32 h-16 text-3xl text-black rounded-lg bi bi-backpack4" style={{ backgroundColor: '#32ADE6' }}></i>
                    <div className="info-right">
                        <h6 className="title">4.5</h6>
                        <span>(2.4k Review)</span>
                    </div>
                </div>
                <div className="review-single two">
                    <i className="flex items-center justify-center w-32 h-16 text-3xl text-black rounded-lg bi bi-buildings-fill" style={{ backgroundColor: '#32ADE6' }}></i>
                    <div className="info-right">
                        <h6 className="title">100+</h6>
                        <span>Online Course</span>
                    </div>
                </div>
            </div>
            <div className="shape-image">
                <div className="shape one" data-speed="0.04" data-revert="true"></div>
                <div className="shape two" data-speed="0.04"></div>
                <div className="shape three" data-speed="0.04"></div>
            </div>
        </div>
    );
}

export { Banner };
