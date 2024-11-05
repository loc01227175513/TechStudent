// DanhGia.jsx

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DanhGia = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [danhGia, setDanhGia] = useState([]);
    const [nguoidung, setNguoiDung] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [selectedDanhGia, setSelectedDanhGia] = useState(null);
    const [newDanhGia, setNewDanhGia] = useState({
        id_khoahoc: '',
        id_nguoidung: '',
        danhgia: 1,
        binhluan: ''
    });

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

    useEffect(() => {
        if (csrfToken) {
            fetch(`http://127.0.0.1:8000/admin-api/showAllDanhGia`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setDanhGia(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [csrfToken]);

    useEffect(() => {
        if (csrfToken) {
            fetch(`http://127.0.0.1:8000/admin-api/tatcanguoidung`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setNguoiDung(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [csrfToken]);

    useEffect(() => {
        if (csrfToken) {
            fetch(`http://127.0.0.1:8000/admin-api/Tatcakhoahoc`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCourses(data.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [csrfToken]);

    const generateStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

    const handleEditClick = (item) => {
        setSelectedDanhGia(item);
        setIsEditVisible(true);
    };

    const handleCloseEditDanhGia = () => {
        setSelectedDanhGia(null);
        setIsEditVisible(false);
    };
    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`/admin-api/deleteDanhGia/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            if (response.ok) {
                setDanhGia(prev => prev.filter(item => item.id !== id));
                toast.success('Đánh giá đã được xóa thành công!');
            } else {
                toast.error('Xóa đánh giá thất bại!');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa đánh giá thất bại!');
        }
    };

    const handleAddClick = () => {
        setIsAddVisible(true);
    };

    const handleCloseAddDanhGia = () => {
        setIsAddVisible(false);
        setNewDanhGia({
            id_khoahoc: '',
            id_nguoidung: '',
            danhgia: 1,
            binhluan: ''
        });
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewDanhGia(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/addDanhGia`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(newDanhGia)
            });
            if (response.ok) {
                const addedDanhGia = await response.json();
                setDanhGia(prev => [...prev, addedDanhGia]);
                toast.success('Thêm đánh giá thành công!');
                handleCloseAddDanhGia();
                window.location.reload();
            } else {
                toast.error('Thêm đánh giá thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm đánh giá thất bại!');
        }
    };

    return (
        <>
            <section className="p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý Đánh Giá</h1>
                    <p className="text-gray-400">Danh sách Đánh Giá</p>
                </div>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Thêm Đánh Giá
                </button>
            </section>

            <section className="p-4 space-y-4">
                {danhGia.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Đánh Giá: {item.id}</p>
                            <p className="text-gray-400">Khóa Học: {item.khoahoc.ten}</p>
                            <p className="text-yellow-500">Đánh Giá: {generateStars(Number(item.danhgia))}</p>
                            <p className="text-gray-400">Bình luận: {item.binhluan}</p>
                            <p className="text-gray-400">Người Bình Luận: {item.nguoidung.ten}</p>
                            <p className="text-gray-400">Ngày Tạo: {item.created_at}</p>
                        </div>
                        <div className="space-x-2 p-2 flex">
                            <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>

            {isEditVisible && selectedDanhGia && (
                <EditMota
                    danhGia={selectedDanhGia}
                    onClose={handleCloseEditDanhGia}
                    nguoidung={nguoidung}
                    Tatcakhoahoc={courses}
                    csrfToken={csrfToken}
                />
            )}

            {isAddVisible && (
                <AddMota
                    onClose={handleCloseAddDanhGia}
                    nguoidung={nguoidung}
                    Tatcakhoahoc={courses}
                    csrfToken={csrfToken}
                    formData={newDanhGia}
                    onChange={handleAddChange}
                    onSubmit={handleAddSubmit}
                />
            )}

            <ToastContainer />
        </>
    );
    };

    const EditMota = ({ onClose, danhGia, csrfToken, nguoidung, Tatcakhoahoc }) => {
        const [formData, setFormData] = useState({
            id_khoahoc: danhGia.id_khoahoc || '',
            id_nguoidung: danhGia.id_nguoidung || '',
            danhgia: danhGia.danhgia || 1,
            binhluan: danhGia.binhluan || ''
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await fetch(`/admin-api/updateDanhGia/${danhGia.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    toast.success('Cập nhật đánh giá thành công!');
                    onClose();
                    window.location.reload();
                } else {
                    toast.error('Cập nhật đánh giá thất bại!');
                }
            } catch (error) {
                console.error('Error updating data:', error);
                toast.error('Cập nhật đánh giá thất bại!');
            }
        };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                    <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                        <form onSubmit={handleSubmit}>
                            <div className="p-4">
                                <label className="block text-white">Khóa Học:</label>
                                <select
                                    name="id_khoahoc"
                                    value={formData.id_khoahoc}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                    required
                                >
                                    <option value="">Chọn khóa học</option>
                                    {Tatcakhoahoc.map(course => (
                                        <option key={course.id} value={course.id}>{course.ten}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-4">
                                <label className="block text-white">Người Bình Luận:</label>
                                <select
                                    name="id_nguoidung"
                                    value={formData.id_nguoidung}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                    required
                                >
                                    <option value="">Chọn người dùng</option>
                                    {nguoidung.map(user => (
                                        <option key={user.id} value={user.id}>{user.ten}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-4">
                                <label className="block text-white">Đánh Giá:</label>
                                <select
                                    name="danhgia"
                                    value={formData.danhgia}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                    required
                                >
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <option key={num} value={num}>{num} Star{num > 1 && 's'}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-4">
                                <label className="block text-white">Bình luận:</label>
                                <textarea
                                    name="binhluan"
                                    value={formData.binhluan}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                    rows={4}
                                    required
                                ></textarea>
                            </div>
                            <div className="p-4 flex justify-end space-x-2">
                                <button type="button" onClick={onClose} className="bg-gray-700 text-white px-4 py-2 rounded-lg">Hủy</button>
                                <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    const AddMota = ({ onClose, nguoidung, Tatcakhoahoc, csrfToken, formData, onChange, onSubmit }) => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                    <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                        <form onSubmit={onSubmit}>
                            <div className="p-4">
                                <label className="block text-white">Khóa Học:</label>
                                <select
                                    name="id_khoahoc"
                                    value={formData.id_khoahoc}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                    required
                                >
                                    <option value="">Chọn khóa học</option>
                                    {Tatcakhoahoc.map(course => (
                                        <option key={course.id} value={course.id}>{course.ten}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-4">
                                <label className="block text-white">Người Bình Luận:</label>
                                <select
                                    name="id_nguoidung"
                                    value={formData.id_nguoidung}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                    required
                                >
                                    <option value="">Chọn người dùng</option>
                                    {nguoidung.map(user => (
                                        <option key={user.id} value={user.id}>{user.ten}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-4">
                                <label className="block text-white">Đánh Giá:</label>
                                <select
                                    name="danhgia"
                                    value={formData.danhgia}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                    required
                                >
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <option key={num} value={num}>{num} Star{num > 1 && 's'}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-4">
                                <label className="block text-white">Bình luận:</label>
                                <textarea
                                    name="binhluan"
                                    value={formData.binhluan}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                    rows={4}
                                    required
                                ></textarea>
                            </div>
                            <div className="p-4 flex justify-end space-x-2">
                                <button type="button" onClick={onClose} className="bg-gray-700 text-white px-4 py-2 rounded-lg">Hủy</button>
                                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-lg">Thêm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    export default DanhGia;