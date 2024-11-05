// DonHang.jsx

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonHang = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [donHang, setDonHang] = useState([]);
    const [nguoidung, setNguoiDung] = useState([]);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [selectedDonHang, setSelectedDonHang] = useState(null);
    const [newDonHang, setNewDonHang] = useState({
        tong: '',
        trangthai: '',
        phuongthucthanhtoan: '',
        id_nguoidung: ''
    });

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

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
            const response = await fetch(`/admin-api/deleteDonHang/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            if (response.ok) {
                setDonHang(prev => prev.filter(item => item.id !== id));
                toast.success('Đơn hàng đã được xóa thành công!');
            } else {
                toast.error('Xóa đơn hàng thất bại!');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa đơn hàng thất bại!');
        }
    };

    const handleAddClick = () => {
        setIsAddVisible(true);
    };

    const handleCloseAddDonHang = () => {
        setIsAddVisible(false);
        setNewDonHang({
            tong: '',
            trangthai: '',
            phuongthucthanhtoan: '',
            id_nguoidung: ''
        });
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewDonHang(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/addDonHang`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(newDonHang)
            });
            if (response.ok) {
                const addedDonHang = await response.json();
                setDonHang(prev => [...prev, addedDonHang]);
                toast.success('Thêm đơn hàng thành công!');
                handleCloseAddDonHang();
                window.location.reload();
            } else {
                toast.error('Thêm đơn hàng thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm đơn hàng thất bại!');
        }
    };

    const handleEditClick = (item) => {
        setSelectedDonHang(item);
        setIsEditVisible(true);
    };

    const handleCloseEditDonHang = () => {
        setSelectedDonHang(null);
        setIsEditVisible(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/updateDonHang/${selectedDonHang.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(selectedDonHang)
            });
            if (response.ok) {
                const updatedDonHang = await response.json();
                setDonHang(prev => prev.map(item => item.id === updatedDonHang.id ? updatedDonHang : item));
                toast.success('Cập nhật đơn hàng thành công!');
                handleCloseEditDonHang();
                window.location.reload();
            } else {
                toast.error('Cập nhật đơn hàng thất bại!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Cập nhật đơn hàng thất bại!');
        }
    };

    return (
        <>
            <section className="p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý Đơn Hàng</h1>
                    <p className="text-gray-400">Danh sách Đơn Hàng</p>
                </div>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Thêm Đơn Hàng
                </button>
            </section>

            <section className="p-4 space-y-4">
                {donHang.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Đơn Hàng: {item.id}</p>
                            <p className="text-gray-400">Người Dùng: {item.nguoidung.ten}</p>
                            <p className="text-gray-400">Trạng Thái: {item.trangthai}</p>
                            <p className="text-gray-400">Phương Thức Thanh Toán: {item.phuongthucthanhtoan}</p>
                            <p className="text-gray-400">Tổng: {item.tong}</p>
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
                <AddDonHang
                    onClose={handleCloseAddDonHang}
                    nguoidung={nguoidung}
                    csrfToken={csrfToken}
                    formData={newDonHang}
                    onChange={handleAddChange}
                    onSubmit={handleAddSubmit}
                />
            )}

            {isEditVisible && selectedDonHang && (
                <EditDonHang
                    onClose={handleCloseEditDonHang}
                    donHang={selectedDonHang}
                    nguoidung={nguoidung}
                    csrfToken={csrfToken}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setSelectedDonHang(prev => ({
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

const AddDonHang = ({ onClose, nguoidung, csrfToken, formData, onChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={onSubmit}>
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
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Phương Thức Thanh Toán:</label>
                            <select
                                name="phuongthucthanhtoan"
                                value={formData.phuongthucthanhtoan}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn phương thức thanh toán</option>
                                <option value="Chuyển Khoản">Chuyển Khoản</option>
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

const EditDonHang = ({ onClose, donHang, nguoidung, csrfToken, onChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={onSubmit}>
                        <div className="p-4">
                            <label className="block text-white">Người Dùng:</label>
                            <select
                                name="id_nguoidung"
                                value={donHang.id_nguoidung}
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
                                value={donHang.trangthai}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn trạng thái</option>
                                <option value="Đã Thanh Toán">Đã Thanh Toán</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Phương Thức Thanh Toán:</label>
                            <select
                                name="phuongthucthanhtoan"
                                value={donHang.phuongthucthanhtoan}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn phương thức thanh toán</option>
                                <option value="Chuyển Khoản">Chuyển Khoản</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Tổng:</label>
                            <input
                                type="text"
                                name="tong"
                                value={donHang.tong}
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

export default DonHang;