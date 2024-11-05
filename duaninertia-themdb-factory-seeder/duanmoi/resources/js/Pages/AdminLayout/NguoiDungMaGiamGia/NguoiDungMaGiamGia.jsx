import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NguoiDungMaGiamGia = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [NguoiDungMaGiamGia, setNguoiDungMaGiamGia] = useState([]);
    const [NguoiDung, setNguoiDung] = useState([]);
    const [MaGiamGia, setMaGiamGia] = useState([]);
    const [selectedNguoiDungMaGiamGia, setSelectedNguoiDungMaGiamGia] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        fetchData();
        fetchNguoiDung();
        fetchMaGiamGia();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/showAllNguoiDungMaGiamGia');
            const data = await response.json();
            setNguoiDungMaGiamGia(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };

    const fetchNguoiDung = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/tatcanguoidung');
            const data = await response.json();
            setNguoiDung(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users.');
        }
    };

    const fetchMaGiamGia = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/showAllMaGiamGia');
            const data = await response.json();
            setMaGiamGia(data);
        } catch (error) {
            console.error('Error fetching discount codes:', error);
            toast.error('Failed to fetch discount codes.');
        }
    };

    const handleEditClick = (nguoiDungMaGiamGia) => {
        setSelectedNguoiDungMaGiamGia(nguoiDungMaGiamGia);
        setEditVisible(true);
    };

    const handleAddClick = () => {
        setSelectedNguoiDungMaGiamGia(null);
        setAddVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteNguoiDungMaGiamGia/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            if (response.ok) {
                toast.success('Người Dùng Mã Giảm Giá deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete Người Dùng Mã Giảm Giá');
            }
        } catch (error) {
            console.error('Error deleting Người Dùng Mã Giảm Giá:', error);
            toast.error('Failed to delete Người Dùng Mã Giảm Giá');
        }
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Người Dùng Mã Giảm Giá</h1>
                <p className="text-gray-400">Danh sách Người Dùng Mã Giảm Giá</p>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">Thêm Người Dùng Mã Giảm Giá</button>
            </section>

            {/* Nguoi Dung Ma Giam Gia List */}
            <section className="p-4 space-y-4">
                {NguoiDungMaGiamGia.map((nguoiDungMaGiamGia) => (
                    <div key={nguoiDungMaGiamGia.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">ID Người Dùng: {nguoiDungMaGiamGia.id_nguoidung}</p>
                            <p className="text-gray-400">ID Mã Giảm Giá: {nguoiDungMaGiamGia.id_magiamgia}</p>
                            <p className="text-gray-400">Trạng Thái: {nguoiDungMaGiamGia.trangthai}</p>
                            <p className="text-gray-400">Đã Sử Dụng Hiện Tại: {nguoiDungMaGiamGia.dasudunghientai}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(nguoiDungMaGiamGia)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(nguoiDungMaGiamGia.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedNguoiDungMaGiamGia && (
                <EditNguoiDungMaGiamGia
                    nguoiDungMaGiamGia={selectedNguoiDungMaGiamGia}
                    onClose={() => {
                        setEditVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    NguoiDung={NguoiDung}
                    MaGiamGia={MaGiamGia}
                />
            )}
            {isAddVisible && (
                <AddNguoiDungMaGiamGia
                    onClose={() => {
                        setAddVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    NguoiDung={NguoiDung}
                    MaGiamGia={MaGiamGia}
                />
            )}
            <ToastContainer />
        </>
    );
};

const EditNguoiDungMaGiamGia = ({ nguoiDungMaGiamGia, onClose, csrfToken, NguoiDung, MaGiamGia }) => {
    const [formData, setFormData] = useState({ ...nguoiDungMaGiamGia });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const response = await fetch(`http://127.0.0.1:8000/admin-api/updateNguoiDungMaGiamGia/${nguoiDungMaGiamGia.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success('Người Dùng Mã Giảm Giá updated successfully');
                onClose();
            } else {
                toast.error('Failed to update Người Dùng Mã Giảm Giá');
            }
        } catch (error) {
            console.error('Error updating Người Dùng Mã Giảm Giá:', error);
            toast.error('Failed to update Người Dùng Mã Giảm Giá');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Người Dùng</label>
                            <select
                                name="id_nguoidung"
                                value={formData.id_nguoidung}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Người Dùng</option>
                                {Array.isArray(NguoiDung) && NguoiDung.map((nguoidung) => (
                                    <option key={nguoidung.id} value={nguoidung.id}>{nguoidung.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Mã Giảm Giá</label>
                            <select
                                name="id_magiamgia"
                                value={formData.id_magiamgia}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Mã Giảm Giá</option>
                                {Array.isArray(MaGiamGia) && MaGiamGia.map((magiamgia) => (
                                    <option key={magiamgia.id} value={magiamgia.id}>{magiamgia.maso}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Trạng Thái</label>
                            <select
                                name="trangthai"
                                value={formData.trangthai}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Trạng Thái</option>
                                <option value="Đã sử dụng">Đã sử dụng</option>
                                <option value="Chưa sử dụng">Chưa sử dụng</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Đã Sử Dụng Hiện Tại</label>
                            <input
                                type="text"
                                name="dasudunghientai"
                                value={formData.dasudunghientai || ''}
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

const AddNguoiDungMaGiamGia = ({ onClose, csrfToken, NguoiDung, MaGiamGia }) => {
    const [formData, setFormData] = useState({ id_nguoidung: '', id_magiamgia: '', trangthai: '', dasudunghientai: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const addResponse = await fetch('http://127.0.0.1:8000/admin-api/addNguoiDungMaGiamGia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (addResponse.ok) {
                toast.success('Người Dùng Mã Giảm Giá added successfully');
                onClose();
            } else {
                toast.error('Failed to add Người Dùng Mã Giảm Giá');
            }
        } catch (error) {
            console.error('Error adding Người Dùng Mã Giảm Giá:', error);
            toast.error('Failed to add Người Dùng Mã Giảm Giá');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Người Dùng</label>
                            <select
                                name="id_nguoidung"
                                value={formData.id_nguoidung}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Người Dùng</option>
                                {Array.isArray(NguoiDung) && NguoiDung.map((nguoidung) => (
                                    <option key={nguoidung.id} value={nguoidung.id}>{nguoidung.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Mã Giảm Giá</label>
                            <select
                                name="id_magiamgia"
                                value={formData.id_magiamgia}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Mã Giảm Giá</option>
                                {Array.isArray(MaGiamGia) && MaGiamGia.map((magiamgia) => (
                                    <option key={magiamgia.id} value={magiamgia.id}>{magiamgia.maso}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Trạng Thái</label>
                            <select
                                name="trangthai"
                                value={formData.trangthai}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Trạng Thái</option>
                                <option value="Đã sử dụng">Đã sử dụng</option>
                                <option value="Chưa sử dụng">Chưa sử dụng</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Đã Sử Dụng Hiện Tại</label>
                            <input
                                type="text"
                                name="dasudunghientai"
                                value={formData.dasudunghientai || ''}
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

export default NguoiDungMaGiamGia;