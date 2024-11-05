import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TheNganHang = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [TheNganHang, setTheNganHang] = useState([]);
    const [selectedTheNganHang, setSelectedTheNganHang] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/showAllTheNganHang');
            const data = await response.json();
            setTheNganHang(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };

    const handleEditClick = (theNganHang) => {
        setSelectedTheNganHang(theNganHang);
        setEditVisible(true);
    };

    const handleAddClick = () => {
        setSelectedTheNganHang(null);
        setAddVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteTheNganHang/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            if (response.ok) {
                toast.success('Thẻ Ngân Hàng deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete Thẻ Ngân Hàng');
            }
        } catch (error) {
            console.error('Error deleting Thẻ Ngân Hàng:', error);
            toast.error('Failed to delete Thẻ Ngân Hàng');
        }
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Thẻ Ngân Hàng</h1>
                <p className="text-gray-400">Danh sách Thẻ Ngân Hàng</p>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">Thêm Thẻ Ngân Hàng</button>
            </section>

            {/* The Ngan Hang List */}
            <section className="p-4 space-y-4">
                {TheNganHang.map((theNganHang) => (
                    <div key={theNganHang.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Thẻ: {theNganHang.id}</p>
                            <p className="text-gray-400">Tên Thẻ: {theNganHang.tenthe}</p>
                            <p className="text-gray-400">Số Thẻ: {theNganHang.sothe}</p>
                            <p className="text-gray-400">Tháng: {theNganHang.thang}</p>
                            <p className="text-gray-400">Năm: {theNganHang.nam}</p>
                            <p className="text-gray-400">Mã Bảo Mật: {theNganHang.mabaomat}</p>
                            <p className="text-gray-400">Tiền: {theNganHang.tien}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(theNganHang)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(theNganHang.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedTheNganHang && (
                <EditTheNganHang
                    theNganHang={selectedTheNganHang}
                    onClose={() => {
                        setEditVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                />
            )}
            {isAddVisible && (
                <AddTheNganHang
                    onClose={() => {
                        setAddVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                />
            )}
            <ToastContainer />
        </>
    );
};

const EditTheNganHang = ({ theNganHang, onClose, csrfToken }) => {
    const [formData, setFormData] = useState({ ...theNganHang });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const response = await fetch(`http://127.0.0.1:8000/admin-api/updateTheNganHang/${theNganHang.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success('Thẻ Ngân Hàng updated successfully');
                onClose();
            } else {
                toast.error('Failed to update Thẻ Ngân Hàng');
            }
        } catch (error) {
            console.error('Error updating Thẻ Ngân Hàng:', error);
            toast.error('Failed to update Thẻ Ngân Hàng');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tên Thẻ</label>
                            <input
                                type="text"
                                name="tenthe"
                                value={formData.tenthe || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Số Thẻ</label>
                            <input
                                type="text"
                                name="sothe"
                                value={formData.sothe || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tháng</label>
                            <input
                                type="text"
                                name="thang"
                                value={formData.thang || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Năm</label>
                            <input
                                type="text"
                                name="nam"
                                value={formData.nam || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Mã Bảo Mật</label>
                            <input
                                type="text"
                                name="mabaomat"
                                value={formData.mabaomat || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tiền</label>
                            <input
                                type="text"
                                name="tien"
                                value={formData.tien || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4 flex justify-end space-x-2">
                            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Hủy</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const AddTheNganHang = ({ onClose, csrfToken }) => {
    const [formData, setFormData] = useState({ tenthe: '', sothe: '', thang: '', nam: '', mabaomat: '', tien: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const addResponse = await fetch('http://127.0.0.1:8000/admin-api/addTheNganHang', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (addResponse.ok) {
                toast.success('Thẻ Ngân Hàng added successfully');
                onClose();
            } else {
                toast.error('Failed to add Thẻ Ngân Hàng');
            }
        } catch (error) {
            console.error('Error adding Thẻ Ngân Hàng:', error);
            toast.error('Failed to add Thẻ Ngân Hàng');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tên Thẻ</label>
                            <input
                                type="text"
                                name="tenthe"
                                value={formData.tenthe || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Số Thẻ</label>
                            <input
                                type="text"
                                name="sothe"
                                value={formData.sothe || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tháng</label>
                            <input
                                type="text"
                                name="thang"
                                value={formData.thang || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Năm</label>
                            <input
                                type="text"
                                name="nam"
                                value={formData.nam || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Mã Bảo Mật</label>
                            <input
                                type="text"
                                name="mabaomat"
                                value={formData.mabaomat || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tiền</label>
                            <input
                                type="text"
                                name="tien"
                                value={formData.tien || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4 flex justify-end space-x-2">
                            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Hủy</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TheNganHang;