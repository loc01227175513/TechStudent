// DoanhThu.jsx

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoanhThu = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [doanhThu, setDoanhThu] = useState([]);
    const [giangvien, setGiangVien] = useState([]);
    const [khoahoc, setKhoaHoc] = useState([]);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [selectedDoanhThu, setSelectedDoanhThu] = useState(null);
    const [newDoanhThu, setNewDoanhThu] = useState({
        tong: '',
        trangthai: '',
        id_giangvien: '',
        id_khoahoc: '',
        gia: '',
        giamgia: ''
    });

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

    useEffect(() => {
        if (csrfToken) {
            fetch(`/admin-api/showAllDoanhThu`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setDoanhThu(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [csrfToken]);

    useEffect(() => {
        if (csrfToken) {
            fetch(`/admin-api/showAllGiangVien`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setGiangVien(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [csrfToken]);

    useEffect(() => {
        if (csrfToken) {
            fetch(`/admin-api/Tatcakhoahoc`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setKhoaHoc(data.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [csrfToken]);

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`/admin-api/deleteDoanhThu/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            if (response.ok) {
                setDoanhThu(prev => prev.filter(item => item.id !== id));
                toast.success('Doanh thu đã được xóa thành công!');
            } else {
                toast.error('Xóa doanh thu thất bại!');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa doanh thu thất bại!');
        }
    };

    const handleAddClick = () => {
        setIsAddVisible(true);
    };

    const handleCloseAddDoanhThu = () => {
        setIsAddVisible(false);
        setNewDoanhThu({
            tong: '',
            trangthai: '',
            id_giangvien: '',
            id_khoahoc: '',
            gia: '',
            giamgia: ''
        });
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewDoanhThu(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        const doanhThuData = {
            tong: newDoanhThu.tong,
            trangthai: newDoanhThu.trangthai,
            id_giangvien: newDoanhThu.id_giangvien,
            id_khoahoc: newDoanhThu.id_khoahoc,
            gia: newDoanhThu.gia,
            giamgia: newDoanhThu.giamgia
        };

        try {
            const response = await fetch(`/admin-api/addDoanhThu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(doanhThuData)
            });
            if (response.ok) {
                const addedDoanhThu = await response.json();
                setDoanhThu(prev => [...prev, addedDoanhThu]);
                toast.success('Thêm doanh thu thành công!');
                handleCloseAddDoanhThu();
                window.location.reload();
            } else {
                toast.error('Thêm doanh thu thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm doanh thu thất bại!');
        }
    };

    const handleEditClick = (item) => {
        setSelectedDoanhThu(item);
        setIsEditVisible(true);
    };

    const handleCloseEditDoanhThu = () => {
        setSelectedDoanhThu(null);
        setIsEditVisible(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/updateDoanhThu/${selectedDoanhThu.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(selectedDoanhThu)
            });
            if (response.ok) {
                const updatedDoanhThu = await response.json();
                setDoanhThu(prev => prev.map(item => item.id === updatedDoanhThu.id ? updatedDoanhThu : item));
                toast.success('Cập nhật doanh thu thành công!');
                handleCloseEditDoanhThu();
                window.location.reload();
            } else {
                toast.error('Cập nhật doanh thu thất bại!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Cập nhật doanh thu thất bại!');
        }
    };

    return (
        <>
            <section className="p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý Doanh Thu</h1>
                    <p className="text-gray-400">Danh sách Doanh Thu</p>
                </div>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Thêm Doanh Thu
                </button>
            </section>

            <section className="p-4 space-y-4">
                {doanhThu.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Tổng: {item.tong}</p>
                            <p className="text-gray-400">Giá: {item.gia}</p>
                            <p className="text-gray-400">Giảm Giá: {item.giamgia}</p>
                            <p className="text-gray-400">Trạng Thái: {item.trangthai}</p>
                            <p className="text-gray-400">Giảng Viên: {item.giangvien.ten}</p>
                            <p className="text-gray-400">Khóa Học: {item.khoahocs.ten}</p>
                        </div>
                        <div className="space-x-2 p-2 flex">
                            <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>

            {isAddVisible && (
                <AddDoanhThu
                    onClose={handleCloseAddDoanhThu}
                    giangvien={giangvien}
                    khoahoc={khoahoc}
                    csrfToken={csrfToken}
                    formData={newDoanhThu}
                    onChange={handleAddChange}
                    onSubmit={handleAddSubmit}
                />
            )}

            {isEditVisible && selectedDoanhThu && (
                <EditDoanhThu
                    onClose={handleCloseEditDoanhThu}
                    doanhThu={selectedDoanhThu}
                    giangvien={giangvien}
                    khoahoc={khoahoc}
                    csrfToken={csrfToken}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setSelectedDoanhThu(prev => ({
                            ...prev,
                            [name]: value
                        }));
                    }}
                    onSubmit={handleEditSubmit}
                />
            )}

            <ToastContainer />
        </>
    );
};

const AddDoanhThu = ({ onClose, giangvien, khoahoc, csrfToken, formData, onChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={onSubmit}>
                        <div className="p-4">
                            <label className="block text-white">Tổng:</label>
                            <input
                                type="text"
                                name="tong"
                                value={formData.tong}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Trạng Thái:</label>
                            <select
                                name="trangthai"
                                value={formData.trangthai}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn trạng thái</option>
                                <option value="Đã Thanh Toán">Đã Thanh Toán</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Giảng Viên:</label>
                            <select
                                name="id_giangvien"
                                value={formData.id_giangvien}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn giảng viên</option>
                                {giangvien.map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>{teacher.ten}</option>
                                ))}
                            </select>
                        </div>
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
                                {khoahoc.map(course => (
                                    <option key={course.id} value={course.id}>{course.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Giá:</label>
                            <input
                                type="text"
                                name="gia"
                                value={formData.gia}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Giảm Giá:</label>
                            <input
                                type="text"
                                name="giamgia"
                                value={formData.giamgia}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            />
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

const EditDoanhThu = ({ onClose, doanhThu, giangvien, khoahoc, csrfToken, onChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={onSubmit}>
                        <div className="p-4">
                            <label className="block text-white">Tổng:</label>
                            <input
                                type="text"
                                name="tong"
                                value={doanhThu.tong}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Giá:</label>
                            <input
                                type="text"
                                name="gia"
                                value={doanhThu.gia}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Giảm Giá:</label>
                            <input
                                type="text"
                                name="giamgia"
                                value={doanhThu.giamgia}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Trạng Thái:</label>
                            <select
                                name="trangthai"
                                value={doanhThu.trangthai}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn trạng thái</option>
                                <option value="Đã Thanh Toán">Đã Thanh Toán</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Giảng Viên:</label>
                            <select
                                name="id_giangvien"
                                value={doanhThu.id_giangvien}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn giảng viên</option>
                                {giangvien.map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>{teacher.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Khóa Học:</label>
                            <select
                                name="id_khoahoc"
                                value={doanhThu.id_khoahoc}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn khóa học</option>
                                {khoahoc.map(course => (
                                    <option key={course.id} value={course.id}>{course.ten}</option>
                                ))}
                            </select>
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

export default DoanhThu;