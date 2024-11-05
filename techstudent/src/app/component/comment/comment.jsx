import React, { useEffect, useState } from "react";
import './comment.css';

const Commenthome = () => {
    const [DanhGia, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/danhgia');
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(DanhGia.length / itemsPerPage);
    const displayedComments = DanhGia.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="mb-10">
            <div className="grid gap-8 mx-6 small:grid-cols-1 md:grid-cols-3">
                {displayedComments.map((item, index) => (
                    <div className="p-4 border" key={index}>
                        <div className="flex items-center">
                            <div>
                                <img src={item.nguoi_danh_gia.hinh} alt="" className="rounded-full w-14 h-14" />
                            </div>
                            <div className="ml-3">
                                <h6 className="p-0 m-0">{item.nguoi_danh_gia.ten}</h6>
                                <div className="px-4 text-center bg-teal-100 rounded-md chucvu">
                                    <p className="p-0 m-0">học viên</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <p className="self-start">
                                    {item.noi_dung}
                                    . . . .
                                </p>
                                <a href="" className="self-end">Xem Tiếp</a>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <p>{item.so_sao}</p>
                                {item.so_sao > 0 && item.so_sao <= 5 && (
                                    <div className="startcomment">
                                        <ul className="flex list-none">
                                            {Array.from({ length: item.so_sao }).map((_, index) => (
                                                <li key={index}>
                                                    <i className="fa-sharp fa-solid fa-star" />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p>20/20/2020</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <div className="btn-group">
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page}
                            className={`btn ${page + 1 === currentPage ? 'btn-primary' : 'btn-secondary'} m-1`}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className="xemtiep">
                <a href="">xem tiếp</a>
            </div>
        </div>
    );
};

export { Commenthome };