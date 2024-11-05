// File path: src/components/AdminCourse.js

import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AddCourse from "./Addcourse";
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const cloudName = 'dn7s1su66';
const uploadPreset = 'my_unsigned_preset';













const AdminCourse = () => {
    const [TatCaKhoaHoc, setTatCaKhoaHoc] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedEditCourse, setSelectedEditCourse] = useState(null);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [TheLoai, setTheLoai] = useState([]);
    const [SubCategories, setSubCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [filterMinPrice, setFilterMinPrice] = useState('');
    const [filterMaxPrice, setFilterMaxPrice] = useState('');
    const [filterCategoryId, setFilterCategoryId] = useState('');
    const [filterSubCategoryId, setFilterSubCategoryId] = useState('');
    const [filterMinId, setFilterMinId] = useState('');
    const [filterMaxId, setFilterMaxId] = useState('');
    const [filterIdType, setFilterIdType] = useState('');
    const [filterDateType, setFilterDateType] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');


    const [csrfToken, setCsrfToken] = useState('');


    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/admin-api/Tatcakhoahoc');
                if (!response.ok) throw new Error('Failed to fetch course data');
                const data = await response.json();
                setTatCaKhoaHoc(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/theloai');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setTheLoai(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (filterCategoryId) {
            const selectedCategory = TheLoai.find(category => category.id === parseInt(filterCategoryId));
            if (selectedCategory) {
                setSubCategories(selectedCategory.theloaicons);
            } else {
                setSubCategories([]);
            }
        } else {
            setSubCategories([]);
        }
    }, [filterCategoryId, TheLoai]);

    const renderStatusText = (trangthai) => {
        switch (trangthai) {
            case "active":
                return <p className="text-green-500">Đã được xuất bản</p>;
            case "Notyet":
                return <p className="text-yellow-500">Khóa học chưa được xuất bản</p>;
            case "Progress":
                return <p className="text-blue-500">Khóa Học đã Hoàn tất</p>;
            case "Decline":
                return <p className="text-red-500">Khóa học đã từ chối</p>;
            case "Pending":
                return <p className="text-yellow-500">Khóa học đang đợi duyệt</p>;
            default:
                return <p className="text-gray-500">Tình trạng không xác định</p>;
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    const handleShowDetail = (khoahoc) => {
        setSelectedCourse(khoahoc);
    };
    const handleShowEditDetail = (khoahoc) => {
        setSelectedEditCourse(khoahoc);
    };
    const handleCloseDetailEdit = () => {
        setSelectedEditCourse(null);
    };

    const handleCloseDetail = () => {
        setSelectedCourse(null);
    };
    const handleShowAddCourse = () => {
        setShowAddCourse(true);
    };
    const handleHideAddCourse = () => {
        setShowAddCourse(false);
    };

    const handleFilterMinPriceChange = (e) => {
        setFilterMinPrice(e.target.value);
    };

    const handleFilterMaxPriceChange = (e) => {
        setFilterMaxPrice(e.target.value);
    };

    const handleFilterCategoryIdChange = (e) => {
        setFilterCategoryId(e.target.value);
    };

    const handleFilterSubCategoryIdChange = (e) => {
        setFilterSubCategoryId(e.target.value);
    };

    const handleFilterMinIdChange = (e) => {
        setFilterMinId(e.target.value);
    };

    const handleFilterMaxIdChange = (e) => {
        setFilterMaxId(e.target.value);
    };

    const handleFilterIdTypeChange = (e) => {
        setFilterIdType(e.target.value);
    };

    const handleFilterDateTypeChange = (e) => {
        setFilterDateType(e.target.value);
    };

    const handleFilterStartDateChange = (e) => {
        setFilterStartDate(e.target.value);
    };

    const handleFilterEndDateChange = (e) => {
        setFilterEndDate(e.target.value);
    };

    const handleFilterStatusChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleClearAllFilters = () => {
        setFilterMinPrice('');
        setFilterMaxPrice('');
        setFilterCategoryId('');
        setFilterSubCategoryId('');
        setFilterMinId('');
        setFilterMaxId('');
        setFilterIdType('');
        setFilterDateType('');
        setFilterStartDate('');
        setFilterEndDate('');
        setFilterStatus('');
    };

    const handleDeleteAllCourses = async () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả khóa học?")) {
            try {
                const response = await fetch('/admin-api/deleteAllCourses', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken,
                    },
                });
                if (!response.ok) throw new Error('Failed to delete all courses');
                setTatCaKhoaHoc([]);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const filteredCourses = TatCaKhoaHoc.filter((khoahoc) => {
        const matchesMinPrice = filterMinPrice ? khoahoc.gia >= filterMinPrice : true;
        const matchesMaxPrice = filterMaxPrice ? khoahoc.gia <= filterMaxPrice : true;
        const matchesCategory = filterCategoryId ? khoahoc.id_theloai === parseInt(filterCategoryId) : true;
        const matchesSubCategory = filterSubCategoryId ? khoahoc.id_theloaicon === parseInt(filterSubCategoryId) : true;
        const matchesMinId = filterMinId ? khoahoc.id >= parseInt(filterMinId) : true;
        const matchesMaxId = filterMaxId ? khoahoc.id <= parseInt(filterMaxId) : true;
        const matchesIdType = filterIdType ? (
            filterIdType === 'first' ? khoahoc.id === Math.min(...TatCaKhoaHoc.map(k => k.id)) :
                filterIdType === 'last' ? khoahoc.id === Math.max(...TatCaKhoaHoc.map(k => k.id)) :
                    filterIdType === 'middle' ? khoahoc.id === Math.floor((Math.min(...TatCaKhoaHoc.map(k => k.id)) + Math.max(...TatCaKhoaHoc.map(k => k.id))) / 2) :
                        true
        ) : true;
        const matchesDateType = filterDateType ? (
            filterDateType === 'today' ? new Date(khoahoc.created_at).toDateString() === new Date().toDateString() :
                filterDateType === 'lastMonth' ? new Date(khoahoc.created_at) >= new Date(new Date().setMonth(new Date().getMonth() - 1)) :
                    filterDateType === 'thisYear' ? new Date(khoahoc.created_at).getFullYear() === new Date().getFullYear() :
                        true
        ) : true;
        const matchesStartDate = filterStartDate ? new Date(khoahoc.created_at) >= new Date(filterStartDate) : true;
        const matchesEndDate = filterEndDate ? new Date(khoahoc.created_at) <= new Date(filterEndDate) : true;
        const matchesStatus = filterStatus ? khoahoc.trangthai === filterStatus : true;
        return matchesMinPrice && matchesMaxPrice && matchesCategory && matchesSubCategory && matchesMinId && matchesMaxId && matchesIdType && matchesDateType && matchesStartDate && matchesEndDate && matchesStatus;
    });

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Xuất bản các khóa học</h1>
            </section>
            <div className="flex space-x-4 m-4">
                <button onClick={handleShowAddCourse} className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">
                    Thêm khóa học mới
                </button>
                <button onClick={handleDeleteAllCourses} className="text-white bg-red-700 hover:bg-red-800 px-5 py-2.5 rounded-lg">
                    Xóa Tất Cả Sản Phẩm
                </button>
            </div>
            {showAddCourse && (
                <AddCourse
                    close={handleHideAddCourse}
                    csrfToken={csrfToken}
                    uploadPreset={uploadPreset}
                    cloudName={cloudName}
                    setTatCaKhoaHoc={setTatCaKhoaHoc}
                    setError={setError}
                    setLoading={setLoading}
                />
            )}

            <section className="p-4 space-y-4">
                <div className="flex space-x-4">
                    <div>
                        <label className="block text-gray-700">Lọc theo giá tối thiểu</label>
                        <select
                            value={filterMinPrice}
                            onChange={handleFilterMinPriceChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn giá tối thiểu</option>
                            <option value="0">0</option>
                            <option value="100000">100,000</option>
                            <option value="200000">200,000</option>
                            <option value="300000">300,000</option>
                            <option value="400000">400,000</option>
                            <option value="500000">500,000</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo giá tối đa</label>
                        <select
                            value={filterMaxPrice}
                            onChange={handleFilterMaxPriceChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn giá tối đa</option>
                            <option value="100000">100,000</option>
                            <option value="200000">200,000</option>
                            <option value="300000">300,000</option>
                            <option value="400,000">400,000</option>
                            <option value="500,000">500,000</option>
                            <option value="1000000">1,000,000</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo thể loại</label>
                        <select
                            value={filterCategoryId}
                            onChange={handleFilterCategoryIdChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn thể loại</option>
                            {TheLoai.map((category) => (
                                <option key={category.id} value={category.id}>{category.ten}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo thể loại con</label>
                        <select
                            value={filterSubCategoryId}
                            onChange={handleFilterSubCategoryIdChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn thể loại con</option>
                            {SubCategories.map((subCategory) => (
                                <option key={subCategory.id} value={subCategory.id}>{subCategory.ten}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo ID thấp nhất</label>
                        <input
                            type="number"
                            value={filterMinId}
                            onChange={handleFilterMinIdChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                            placeholder="Nhập ID thấp nhất"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo ID cao nhất</label>
                        <input
                            type="number"
                            value={filterMaxId}
                            onChange={handleFilterMaxIdChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                            placeholder="Nhập ID cao nhất"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo loại ID</label>
                        <select
                            value={filterIdType}
                            onChange={handleFilterIdTypeChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn loại ID</option>
                            <option value="first">ID đầu tiên</option>
                            <option value="last">ID cuối cùng</option>
                            <option value="middle">ID giữa</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo ngày tạo</label>
                        <select
                            value={filterDateType}
                            onChange={handleFilterDateTypeChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn ngày tạo</option>
                            <option value="today">Hôm nay</option>
                            <option value="lastMonth">Trong vòng 1 tháng</option>
                            <option value="thisYear">Trong năm nay</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo ngày bắt đầu</label>
                        <input
                            type="date"
                            value={filterStartDate}
                            onChange={handleFilterStartDateChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo ngày kết thúc</label>
                        <input
                            type="date"
                            value={filterEndDate}
                            onChange={handleFilterEndDateChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo trạng thái</label>
                        <select
                            value={filterStatus}
                            onChange={handleFilterStatusChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn trạng thái</option>
                            <option value="active">Đã được xuất bản</option>
                            <option value="Notyet">Chưa được xuất bản</option>
                            <option value="Progress">Đã Hoàn tất</option>
                            <option value="Decline">Đã từ chối</option>
                            <option value="Pending">Đang đợi duyệt</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleClearAllFilters}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Xóa Tất Cả
                        </button>
                    </div>
                </div>

                {filteredCourses.map((khoahoc) => {
                    const isPublished = khoahoc.trangthai === "active";
                    const isPublishable = ["Progress", "Pending", "Notyet"].includes(khoahoc.trangthai);

                    return (
                        <div key={khoahoc.id} className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold">Mã khóa học: {khoahoc.id}</p>
                                    <p className="text-gray-400">Tình trạng:</p>
                                    {renderStatusText(khoahoc.trangthai)}
                                    <p className="text-gray-400">Được tạo bởi: {khoahoc.giangvien || "N/A"}</p>
                                    <p className="text-gray-400">Được tạo vào ngày: {khoahoc.created_at || "N/A"}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="px-4 py-2 bg-blue-700 text-white rounded-lg"
                                        onClick={() => handleShowEditDetail(khoahoc)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-black rounded-lg"
                                        onClick={() => handleDelete(khoahoc.id)}
                                    >
                                        Xóa khóa học
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-700 text-white rounded-lg"
                                        onClick={() => handleShowDetail(khoahoc)}
                                    >
                                        Xem Chi Tiết
                                    </button>
                                    {isPublished ? (
                                        <button
                                            className="px-4 py-2 rounded-lg bg-red-500 text-black"
                                            onClick={() => handleHide(khoahoc.id)}
                                        >
                                            Ẩn khóa học
                                        </button>
                                    ) : (
                                        <button
                                            className={`px-4 py-2 rounded-lg ${isPublishable ? 'bg-green-500 text-black' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                                            disabled={!isPublishable}
                                            onClick={() => isPublishable && handlePublish(khoahoc.id)}
                                        >
                                            Xuất bản
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {selectedCourse && (
                <ShowDetail course={selectedCourse} onClose={handleCloseDetail} />
            )}
            {selectedEditCourse && (
                <EditCourseForm course={selectedEditCourse} onClose={handleCloseDetailEdit} />
            )}
        </>
    );
};






















const ShowDetail = ({ course, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Chi tiết khóa học: {course.id}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto" onClick={onClose}>
                            <span className="sr-only">Close modal</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        <h2>{course.ten}</h2>
                        <div className="flex">
                            <img src={course.hinh || 'default-image.jpg'} alt={course.name || 'Course Image'} className='w-full rounded-md' />
                        </div>
                        <div className="flex">
                            <div className="w-1/2">
                                <p>Giá: {course.gia}</p>
                            </div>
                            <div className="w-1/2">
                                <p>Giảm Giá: {course.giamgia}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2">
                                <p>Chủ Đề: {course.chude}</p>
                            </div>
                            <div className="w-1/2">
                                <p>Thể Loại: {course.theloai}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <p>Giảng Viên: {course.giangvien}</p>
                        </div>
                        <div className="flex">
                            <p className="text-gray-400">Mô tả: {course.mota}</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg" onClick={onClose}>Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}











const EditCourseForm = ({ course, onClose }) => {
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState(course.hinh || '');
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [theLoai, setTheLoai] = useState([]);
    const [subTheLoai, setSubTheLoai] = useState([]);
    const [chudeOptions, setChudeOptions] = useState([]);

    const [formData, setFormData] = useState({
        ten: course.ten,
        hinh: course.hinh,
        gia: course.gia,
        giamgia: course.giamgia,
        id_chude: course.id_chude, // Use id_chude instead of chude
        id_theloai: course.id_theloai,
        id_theloaicon: course.id_theloaicon,
        giangvien: course.giangvien,
        mota: course.mota,
    });

    useEffect(() => {
        setFormData({
            ten: course.ten,
            hinh: course.hinh,
            gia: course.gia,
            giamgia: course.giamgia,
            id_chude: course.id_chude, // Use id_chude instead of chude
            id_theloai: course.id_theloai,
            id_theloaicon: course.id_theloaicon,
            giangvien: course.giangvien,
            mota: course.mota,
        });
    }, [course]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/theloai');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setTheLoai(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageSelected(file);
    };

    const uploadImage = async () => {
        if (!imageSelected) return;

        const imageFormData = new FormData();
        imageFormData.append('file', imageSelected);
        imageFormData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: imageFormData,
            });
            const data = await response.json();
            setImageUrl(data.secure_url);
            setFormData((prev) => ({ ...prev, hinh: data.secure_url }));
            setIsImageUploaded(true);
            setImageSelected(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTheLoaiChange = (e) => {
        const selectedId = e.target.value;
        setFormData((prev) => ({ ...prev, id_theloai: selectedId, id_chude: '' }));

        const selectedCategory = theLoai.find((item) => item.id === Number(selectedId));
        if (selectedCategory) {
            setSubTheLoai(selectedCategory.theloaicons);
            setChudeOptions([]);
        }
    };

    const handleSubTheLoaiChange = (e) => {
        const selectedSubId = e.target.value;
        setFormData((prev) => ({ ...prev, id_theloaicon: selectedSubId, id_chude: '' }));

        const selectedSubCategory = subTheLoai.find((item) => item.id === Number(selectedSubId));
        if (selectedSubCategory) {
            setChudeOptions(selectedSubCategory.chudes || []);
            setFormData((prev) => ({ ...prev, id_chude: '' }));
        } else {
            setChudeOptions([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageSelected && !isImageUploaded) {
            await uploadImage();
        }
        try {
            const response = await fetch(`/admin-api/updateCourse/${course.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to update course data');
            const data = await response.json();
            setTatCaKhoaHoc(data.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Chỉnh sửa khóa học: {course.id}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto" onClick={onClose}>
                            <span className="sr-only">Close modal</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Tên khóa học</label>
                            <input type="text" name="ten" value={formData.ten} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                        </div>
                        <div className="flex">
                            <div className="w-1/2 p-5">
                                <label className="block text-gray-700 dark:text-gray-400">Giá</label>
                                <input type="text" name="gia" value={formData.gia} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                            </div>
                            <div className="w-1/2 p-5">
                                <label className="block text-gray-700 dark:text-gray-400">Giảm Giá</label>
                                <input type="text" name="giamgia" value={formData.giamgia} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                            </div>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Thể Loại</label>
                            <select name="theloai" value={formData.id_theloai} onChange={handleTheLoaiChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option value="">Chọn thể loại</option>
                                {theLoai.map(theLoaiItem => (
                                    <option key={theLoaiItem.id} value={theLoaiItem.id}>{theLoaiItem.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Thể Loại Con</label>
                            <select name="subtheloai" value={formData.id_theloaicon} onChange={handleSubTheLoaiChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option value="">Chọn thể loại con</option>
                                {subTheLoai.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Chủ Đề</label>
                            <select name="id_chude" value={formData.id_chude} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option value="">Chọn chủ đề</option>
                                {chudeOptions.map(chudeItem => (
                                    <option key={chudeItem.id} value={chudeItem.id}>{chudeItem.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Giảng Viên</label>
                            <input type="text" name="giangvien" value={formData.giangvien} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Mô tả</label>
                            <textarea name="mota" value={formData.mota} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"></textarea>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Hình ảnh</label>
                            <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                            <button type="button" onClick={uploadImage} className="mt-2 text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">Upload Hình</button>
                        </div>
                        <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">Lưu</button>
                            <button type="button" className="text-white bg-gray-700 hover:bg-gray-800 px-5 py-2.5 rounded-lg ml-2" onClick={onClose}>Đóng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};







// CSRF token and handlers

const handlePublish = async (courseId) => {
    try {
        const response = await fetch(`/admin-api/publishCourse/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        });
        if (!response.ok) throw new Error('Publish failed');
        alert('Course published successfully!');
        window.location.reload();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
};

const handleHide = async (courseId) => {
    try {
        const response = await fetch(`/admin-api/hideCourse/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        });
        if (!response.ok) throw new Error('Hide failed');
        alert('Course hidden successfully!');
        window.location.reload();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
};

const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
        try {
            const response = await fetch(`/admin-api/deleteCourse/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            if (!response.ok) throw new Error('Delete failed');
            alert('Course deleted successfully!');
            window.location.reload();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
};






export default AdminCourse;