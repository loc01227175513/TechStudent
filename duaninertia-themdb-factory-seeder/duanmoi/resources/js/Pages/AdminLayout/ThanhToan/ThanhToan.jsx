// ThanhToan.jsx

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThanhToan = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [thanhToan, setThanhToan] = useState([]);
    const [khoahoc, setKhoaHoc] = useState([]);
    const [nguoidung, setNguoiDung] = useState([]);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [selectedThanhToan, setSelectedThanhToan] = useState(null);
    const [newThanhToan, setNewThanhToan] = useState({
        tong: '',
        trangthai: '',
        id_khoahoc: '',
        id_nguoidung: ''
    });

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

    useEffect(() => {
        if (csrfToken) {
            fetch(`http://127.0.0.1:8000/admin-api/showAllThanhToan`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setThanhToan(data);
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
                    setKhoaHoc(data.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [csrfToken]);
    console.log(khoahoc);
    
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

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`/admin-api/deleteThanhToan/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            if (response.ok) {
                setThanhToan(prev => prev.filter(item => item.id !== id));
                toast.success('Thanh toán đã được xóa thành công!');
            } else {
                toast.error('Xóa thanh toán thất bại!');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa thanh toán thất bại!');
        }
    };

    const handleAddClick = () => {
        setIsAddVisible(true);
    };

    const handleCloseAddThanhToan = () => {
        setIsAddVisible(false);
        setNewThanhToan({
            tong: '',
            trangthai: '',
            id_khoahoc: '',
            id_nguoidung: ''
        });
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewThanhToan(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/addThanhToan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(newThanhToan)
            });
            if (response.ok) {
                const addedThanhToan = await response.json();
                setThanhToan(prev => [...prev, addedThanhToan]);
                toast.success('Thêm thanh toán thành công!');
                handleCloseAddThanhToan();
                window.location.reload();
            } else {
                toast.error('Thêm thanh toán thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm thanh toán thất bại!');
        }
    };

    const handleEditClick = (item) => {
        setSelectedThanhToan(item);
        setIsEditVisible(true);
    };

    const handleCloseEditThanhToan = () => {
        setSelectedThanhToan(null);
        setIsEditVisible(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/updateThanhToan/${selectedThanhToan.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(selectedThanhToan)
            });
            if (response.ok) {
                const updatedThanhToan = await response.json();
                setThanhToan(prev => prev.map(item => item.id === updatedThanhToan.id ? updatedThanhToan : item));
                toast.success('Cập nhật thanh toán thành công!');
                handleCloseEditThanhToan();
                window.location.reload();
            } else {
                toast.error('Cập nhật thanh toán thất bại!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Cập nhật thanh toán thất bại!');
        }
    };

    return (
        <>
            <section className="p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý Thanh Toán</h1>
                    <p className="text-gray-400">Danh sách Thanh Toán</p>
                </div>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Thêm Thanh Toán
                </button>
            </section>

            <section className="p-4 space-y-4">
                {thanhToan.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Thanh Toán: {item.id}</p>
                            <p className="text-gray-400">Khóa Học: {item.khoahocs.ten}</p>
                            <p className="text-gray-400">Trạng Thái: {item.trangthai}</p>
                            <p className="text-gray-400">Tổng: {item.tong}</p>
                            <p className="text-gray-400">Người Dùng: {item.nguoidungs.ten}</p>
                            <p className="text-gray-400">Ngày Tạo: {item.created_at}</p>
                        </div>
                        <div className="space-x-2 p-2 flex">
                            <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>

            {isAddVisible && (
                <AddThanhToan
                    onClose={handleCloseAddThanhToan}
                    nguoidung={nguoidung}
                    khoahoc={khoahoc}
                    csrfToken={csrfToken}
                    formData={newThanhToan}
                    onChange={handleAddChange}
                    onSubmit={handleAddSubmit}
                />
            )}

            {isEditVisible && selectedThanhToan && (
                <EditThanhToan
                    onClose={handleCloseEditThanhToan}
                    thanhToan={selectedThanhToan}
                    nguoidung={nguoidung}
                    khoahoc={khoahoc}
                    csrfToken={csrfToken}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setSelectedThanhToan(prev => ({
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

const AddThanhToan = ({ onClose, nguoidung, khoahoc, csrfToken, formData, onChange, onSubmit }) => {
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
                                {khoahoc.map(course => (
                                    <option key={course.id} value={course.id}>{course.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Người Dùng:</label>
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
                                <option value="Đã Hoàn Tiền">Đã Hoàn Tiền</option>
                            </select>
                        </div>
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

const EditThanhToan = ({ onClose, thanhToan, nguoidung, khoahoc, csrfToken, onChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={onSubmit}>
                        <div className="p-4">
                            <label className="block text-white">Khóa Học:</label>
                            <select
                                name="id_khoahoc"
                                value={thanhToan.id_khoahoc}
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
                            <label className="block text-white">Người Dùng:</label>
                            <select
                                name="id_nguoidung"
                                value={thanhToan.id_nguoidung}
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
                            <label className="block text-white">Trạng Thái:</label>
                            <select
                                name="trangthai"
                                value={thanhToan.trangthai}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn trạng thái</option>
                                <option value="Đã Thanh Toán">Đã Thanh Toán</option>
                                <option value="Đã Hoàn Tiền">Đã Hoàn Tiền</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Tổng:</label>
                            <input
                                type="text"
                                name="tong"
                                value={thanhToan.tong}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            />
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

export default ThanhToan;