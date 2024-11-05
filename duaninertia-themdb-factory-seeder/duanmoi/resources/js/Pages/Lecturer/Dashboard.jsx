import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from '@inertiajs/react';

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [data, setData] = useState([]);
    const [giangvien, setGiangvien] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegisteredCourses = async () => {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (parsedData) {
                try {
                    const response = await Axios.post('/api/kiemtragiangvien', { id_nguoidung: parsedData.id });
                    localStorage.setItem('lecturerId', JSON.stringify(response.data.data));
                    if (!localStorage.getItem('reloaded')) {
                        localStorage.setItem('reloaded', 'true');
                        window.location.reload();
                    } else {
                        localStorage.removeItem('reloaded');
                    }
                } catch (error) {
                    console.error('Error fetching registered courses:', error);
                }
            }
        };

        fetchRegisteredCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = localStorage.getItem('lecturerId');
        const parsedlecturer = JSON.parse(userData);
        console.log('Title:', title);
        console.log('Chủ đề:', category);

        if (parsedlecturer) {
            try {
                const response = await Axios.post('/api/taokhoahoc', {
                    id_giangvien: parsedlecturer.giangvien,
                    ten: title,
                    id_chude: category
                });
                console.log(response.data);
                localStorage.setItem('lecturerId', JSON.stringify(response.data.data));
                window.location.reload();
            } catch (error) {
                console.error('Error fetching registered courses:', error);
            }
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`/api/theloai`);
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const userData = localStorage.getItem('lecturerId');
                if (!userData) {
                    console.error('No lecturerId found in localStorage');
                    return;
                }

                const parsedLecturer = JSON.parse(userData);
                if (parsedLecturer) {
                    try {
                        const response = await Axios.post('/api/laykhoahocdanglam', { id_giangvien: parsedLecturer.giangvien });
                        console.log("khoahoc giang vien", response.data.data);
                        setGiangvien(response.data.data);
                    } catch (error) {
                        console.error('Error fetching registered courses:', error);
                    }
                }
            } catch (error) {
                console.error('Error parsing lecturerId:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <>
            <div className="p-6 bg-white shadow-md rounded-lg">
                <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out m-5 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => setIsOpen(true)}
                >
                    Tạo khóa học
                </button>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Danh sách Khóa Học</h2>

                            {loading && <p className="text-center text-gray-500">Đang tải dữ liệu...</p>}
                            {error && <p className="text-center text-red-500">Lỗi: {error}</p>}

                            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {giangvien && giangvien.map((callout) => {
                                    const gia = Number(callout.gia);
                                    const giamgia = Number(callout.giamgia);
                                    const hinh = Number(callout.hinh);

                                    let nonZeroCount = 3; // Initially assume all three values are non-zero
                                    let totalPercentage = 0;

                                    if (gia === 0) {
                                        nonZeroCount -= 1;
                                    }
                                    if (giamgia === 0) {
                                        nonZeroCount -= 1;
                                    }
                                    if (hinh === 0) {
                                        nonZeroCount -= 1;
                                    }
                                    const total = 100 / 3 * nonZeroCount;

                                    let widthPercentage = 0;
                                    if (nonZeroCount > 0) {
                                        widthPercentage = total;
                                    }

                                    return (
                                        <div key={callout.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                            <Link href={`/MotaKhoaHoc/${callout.id}`}>
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        alt={callout.ten}
                                                        src={`${callout.hinh}`}
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                        {callout.ten}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mb-4">{callout.trangthai}</p>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                        <div
                                                            className="bg-blue-600 h-2.5 rounded-full"
                                                            style={{
                                                                width: `${widthPercentage}%`,
                                                            }}
                                                            title={`Progress: ${widthPercentage}%`}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full relative">
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 border-b">
                                <h2 className="text-2xl font-semibold text-black">Tạo Khóa Học Mới</h2>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-black mb-4">
                                    Không sao nếu bạn không thể nghĩ ra một tiêu đề hay ngay bây giờ. Bạn có thể thay đổi nó sau.
                                </p>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-black mb-1">Tiêu đề</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Đặt tiêu đề cho khóa học"
                                        maxLength="60"
                                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-black mb-1">Chủ đề</label>
                                    <select
                                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Chọn một chủ đề</option>
                                        {data.data.map((category) => (
                                            <React.Fragment key={category.id}>
                                                <option className="bg-gray-100 font-semibold" value="" disabled>
                                                    {category.ten}
                                                </option>
                                                {category.theloaicons && category.theloaicons.map((subcategory) => (
                                                    <React.Fragment key={subcategory.id}>
                                                        <option className="bg-gray-50" value="" disabled>
                                                            &nbsp;&nbsp;{subcategory.ten}
                                                        </option>
                                                        {subcategory.chudes && subcategory.chudes.map((subSubcategory) => (
                                                            <option className="bg-white" key={subSubcategory.id} value={subSubcategory.id}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;{subSubcategory.ten}
                                                            </option>
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="p-4 border-t flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>



            )}
        </>
    );
}

export default Dashboard;
