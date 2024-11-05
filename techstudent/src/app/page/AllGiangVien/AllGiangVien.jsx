"use client";
import React, { useEffect, useState } from 'react';
import { TatCaGiangVien } from '../../../service/Lecture/Lecture';
import Link from 'next/link';

export const AllGiangVien = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchInstructors = async () => {
            const data = await TatCaGiangVien();
            if (data) {
                setInstructors(data);
            }
        };
        fetchInstructors();
    }, []);

    return (
        <div>
            {/* bread crumb area */}
            <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title">Người hướng dẫn</h1>
                                {/* breadcrumb pagination area */}
                                <div className="pagination-wrapper">
                                    <a href="index.html">Trang chủ</a>
                                    <i className="fa-regular fa-chevron-right" />
                                    <a className="active" href="Instructor-2.html">Tất cả người hướng dẫn</a>
                                </div>
                                {/* breadcrumb pagination area end */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* bread crumb area end */}
            <div className="instrustor-area rts-section-gap">
                <div className="container">
                    <div className="row g-5">
                        {instructors.map((instructor) => (
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={instructor.id}>

                                <div className="single-instructor">

                                    <div className="thumbnail-img">
                                        <Link href={`/page/Profile-insructor?id=${instructor.id}`}>

                                            <img src={instructor.hinh} alt="instructor" />

                                        </Link>
                                        <div className="social-img-instructor">
                                            <ul>
                                                {instructor.mangxahoi && instructor.mangxahoi.length > 0 ? (
                                                    instructor.mangxahoi.map((social) => (
                                                        <li key={social.id} className='m-2'>
                                                            <a href={social.url}>
                                                                <i className={`fa-brands fa-${social.nentang}`} />
                                                            </a>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No social links available</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <a href="#">
                                        <h5 className="title">{instructor.ten}</h5>
                                    </a>
                                    <p>{instructor.tieusu}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};