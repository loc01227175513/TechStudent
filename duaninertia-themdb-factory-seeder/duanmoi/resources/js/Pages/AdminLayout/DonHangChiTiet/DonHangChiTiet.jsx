// DonHangChiTiet.jsx

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonHangChiTiet = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [donHangChiTiet, setDonHangChiTiet] = useState([]);
    const [donHang, setDonHang] = useState([]);
    const [khoahoc, setKhoaHoc] = useState([]);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [selectedDonHangChiTiet, setSelectedDonHangChiTiet] = useState(null);
    const [newDonHangChiTiet, setNewDonHangChiTiet] = useState({
        gia: '',
        giamgia: '',
        id_donhang: '',
        id_khoahoc: ''
    });

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);
   
    useEffect(() => {
        if (csrfToken) {
            fetch(`http://127.0.0.1:8000/admin-api/showAllDonHangChiTiet`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setDonHangChiTiet(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [csrfToken]);
    console.log(donHangChiTiet);
    useEffect(() => {
        if (csrfToken) {
            fetch(`http://127.0.0.1:8000/admin-api/showAllDonHang`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setDonHang(data);
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

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`/admin-api/deleteDonHangChiTiet/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            if (response.ok) {
                setDonHangChiTiet(prev => prev.filter(item => item.id !== id));
                toast.success('Đơn hàng chi tiết đã được xóa thành công!');
            } else {
                toast.error('Xóa đơn hàng chi tiết thất bại!');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa đơn hàng chi tiết thất bại!');
        }
    };

    const handleAddClick = () => {
        setIsAddVisible(true);
    };

    const handleCloseAddDonHangChiTiet = () => {
        setIsAddVisible(false);
        setNewDonHangChiTiet({
            gia: '',
            giamgia: '',
            id_donhang: '',
            id_khoahoc: ''
        });
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewDonHangChiTiet(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/addDonHangChiTiet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(newDonHangChiTiet)
            });
            if (response.ok) {
                const addedDonHangChiTiet = await response.json();
                setDonHangChiTiet(prev => [...prev, addedDonHangChiTiet]);
                toast.success('Thêm đơn hàng chi tiết thành công!');
                handleCloseAddDonHangChiTiet();
                window.location.reload();
            } else {
                toast.error('Thêm đơn hàng chi tiết thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm đơn hàng chi tiết thất bại!');
        }
    };

    const handleEditClick = (item) => {
        setSelectedDonHangChiTiet(item);
        setIsEditVisible(true);
    };

    const handleCloseEditDonHangChiTiet = () => {
        setSelectedDonHangChiTiet(null);
        setIsEditVisible(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/updateDonHangChiTiet/${selectedDonHangChiTiet.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(selectedDonHangChiTiet)
            });
            if (response.ok) {
                const updatedDonHangChiTiet = await response.json();
                setDonHangChiTiet(prev => prev.map(item => item.id === updatedDonHangChiTiet.id ? updatedDonHangChiTiet : item));
                toast.success('Cập nhật đơn hàng chi tiết thành công!');
                handleCloseEditDonHangChiTiet();
                window.location.reload();
            } else {
                toast.error('Cập nhật đơn hàng chi tiết thất bại!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Cập nhật đơn hàng chi tiết thất bại!');
        }
    };

    return (
        <>
            <section className="p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý Đơn Hàng Chi Tiết</h1>
                    <p className="text-gray-400">Danh sách Đơn Hàng Chi Tiết</p>
                </div>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Thêm Đơn Hàng Chi Tiết
                </button>
            </section>

            <section className="p-4 space-y-4">
                {donHangChiTiet.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Đơn Hàng Chi Tiết: {item.id}</p>
                            <p className="text-gray-400">Đơn Hàng ID: {item.donhang.id}</p>
                            <p className="text-gray-400">Khóa Học: {item.khoahoc.ten}</p>
                            <p className="text-gray-400">Giảm Giá: {item.giamgia}</p>
                            <p className="text-gray-400">Giá: {item.gia}</p>
                        </div>
                        <div className="space-x-2 p-2 flex">
                            <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>

            {isAddVisible && (
                <AddDonHangChiTiet
                    onClose={handleCloseAddDonHangChiTiet}
                    donHang={donHang}
                    khoahoc={khoahoc}
                    csrfToken={csrfToken}
                    formData={newDonHangChiTiet}
                    onChange={handleAddChange}
                    onSubmit={handleAddSubmit}
                />
            )}

            {isEditVisible && selectedDonHangChiTiet && (
                <EditDonHangChiTiet
                    onClose={handleCloseEditDonHangChiTiet}
                    donHangChiTiet={selectedDonHangChiTiet}
                    donHang={donHang}
                    khoahoc={khoahoc}
                    csrfToken={csrfToken}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setSelectedDonHangChiTiet(prev => ({
                            ...prev,
                            [name]: value
                        }));
                    }}
                    onSubmit={handleEditSubmit}
                />
            )}

            <ToastContainer />
        </>
    )
    };

const AddDonHangChiTiet = ({ onClose, donHang, khoahoc, csrfToken, formData, onChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={onSubmit}>
                        <div className="p-4">
                            <label className="block text-white">Đơn Hàng:</label>
                            <select
                                name="id_donhang"
                                value={formData.id_donhang}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn đơn hàng</option>
                                {donHang.map(order => (
                                    <option key={order.id} value={order.id}>{`ID: ${order.id} - Người Dùng: ${order.nguoidung.ten}`}</option>
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

const EditDonHangChiTiet = ({ onClose, donHangChiTiet, donHang, khoahoc, csrfToken, onChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={onSubmit}>
                        <div className="p-4">
                            <label className="block text-white">Đơn Hàng:</label>
                            <select
                                name="id_donhang"
                                value={donHangChiTiet.id_donhang}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn đơn hàng</option>
                                {donHang.map(order => (
                                    <option key={order.id} value={order.id}>{`ID: ${order.id} - Người Dùng: ${order.nguoidung.ten}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Khóa Học:</label>
                            <select
                                name="id_khoahoc"
                                value={donHangChiTiet.id_khoahoc}
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
                            <label className="block text-white">Mã Giảm Giá:</label>
                            <input
                                type="text"
                                name="giamgia"
                                value={donHangChiTiet.giamgia}
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
                                value={donHangChiTiet.gia}
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

export default DonHangChiTiet;