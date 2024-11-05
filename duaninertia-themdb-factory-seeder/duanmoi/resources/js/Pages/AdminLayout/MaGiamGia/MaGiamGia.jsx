import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MaGiamGia = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [MaGiamGia, setMaGiamGia] = useState([]);
    const [GiangVien, setGiangVien] = useState([]);
    const [selectedMaGiamGia, setSelectedMaGiamGia] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        fetchData();
        fetchGiangVien();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/showAllMaGiamGia');
            const data = await response.json();
            setMaGiamGia(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };
    const fetchGiangVien = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/showAllGiangVien');
            const data = await response.json();
            setGiangVien(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch lecturers.');
        }
    };
    console.log(GiangVien);
    

    const handleEditClick = (maGiamGia) => {
        setSelectedMaGiamGia(maGiamGia);
        setEditVisible(true);
    };

    const handleAddClick = () => {
        setSelectedMaGiamGia(null);
        setAddVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteMaGiamGia/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            if (response.ok) {
                toast.success('Mã Giảm Giá deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete Mã Giảm Giá');
            }
        } catch (error) {
            console.error('Error deleting Mã Giảm Giá:', error);
            toast.error('Failed to delete Mã Giảm Giá');
        }
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Mã Giảm Giá</h1>
                <p className="text-gray-400">Danh sách Mã Giảm Giá</p>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">Thêm Mã Giảm Giá</button>
            </section>

            {/* Ma Giam Gia List */}
            <section className="p-4 space-y-4">
                {MaGiamGia.map((maGiamGia) => (
                    <div key={maGiamGia.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Giảm Giá: {maGiamGia.maso}</p>
                            <p className="text-gray-400">Giảm Giá: {maGiamGia.giamgia}</p>
                            <p className="text-gray-400">Lượt Sử Dụng: {maGiamGia.luotsudung}</p>
                            <p className="text-gray-400">Sử Dụng Hiện Tại: {maGiamGia.sudunghientai}</p>
                            <p className="text-gray-400">Trạng Thái: {maGiamGia.trangthai}</p>
                            <p className="text-gray-400">Ngày Bắt Đầu: {maGiamGia.ngaybatdau}</p>
                            <p className="text-gray-400">Ngày Kết Thúc: {maGiamGia.ngayketthuc}</p>
                            <p className="text-gray-400">ID Giảng Viên: {maGiamGia.id_giangvien}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(maGiamGia)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(maGiamGia.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedMaGiamGia && (
               <EditMaGiamGia
               maGiamGia={selectedMaGiamGia}
               onClose={() => {
                   setEditVisible(false);
                   fetchData();
               }}
               csrfToken={csrfToken}
               GiangVien={GiangVien}
           />
            )}
            {isAddVisible && (
                <AddMaGiamGia
                onClose={() => {
                    setAddVisible(false);
                    fetchData();
                }}
                csrfToken={csrfToken}
                GiangVien={GiangVien}
            />
            )}
            <ToastContainer />
        </>
    );
};

const EditMaGiamGia = ({ maGiamGia, onClose, csrfToken , GiangVien }) => {
    const [formData, setFormData] = useState({ ...maGiamGia });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const response = await fetch(`http://127.0.0.1:8000/admin-api/updateMaGiamGia/${maGiamGia.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success('Mã Giảm Giá updated successfully');
                onClose();
            } else {
                toast.error('Failed to update Mã Giảm Giá');
            }
        } catch (error) {
            console.error('Error updating Mã Giảm Giá:', error);
            toast.error('Failed to update Mã Giảm Giá');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Mã Số</label>
                            <input
                                type="text"
                                name="maso"
                                value={formData.maso || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Giảm Giá</label>
                            <input
                                type="text"
                                name="giamgia"
                                value={formData.giamgia || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Lượt Sử Dụng</label>
                            <input
                                type="text"
                                name="luotsudung"
                                value={formData.luotsudung || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Sử Dụng Hiện Tại</label>
                            <input
                                type="text"
                                name="sudunghientai"
                                value={formData.sudunghientai || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
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
                                <option value="Đợi Duyệt">Đợi Duyệt</option>
                                <option value="Đã Duyệt">Đã Duyệt</option>
                                <option value="Chưa Duyệt">Chưa Duyệt</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Ngày Bắt Đầu</label>
                            <input
                                type="text"
                                name="ngaybatdau"
                                value={formData.ngaybatdau || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Ngày Kết Thúc</label>
                            <input
                                type="text"
                                name="ngayketthuc"
                                value={formData.ngayketthuc || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Giảng Viên</label>
                            <select
                                name="id_giangvien"
                                value={formData.id_giangvien}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Giảng Viên</option>
                                {Array.isArray(GiangVien) && GiangVien.map((giangvien) => (
                                    <option key={giangvien.id} value={giangvien.id}>{giangvien.ten}</option>
                                ))}
                            </select>
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












const AddMaGiamGia = ({ onClose, csrfToken, GiangVien }) => {
    const [formData, setFormData] = useState({ maso: '', giamgia: '', luotsudung: '', sudunghientai: '', trangthai: '', ngaybatdau: '', ngayketthuc: '', id_giangvien: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const addResponse = await fetch('http://127.0.0.1:8000/admin-api/addMaGiamGia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (addResponse.ok) {
                toast.success('Mã Giảm Giá added successfully');
                onClose();
            } else {
                toast.error('Failed to add Mã Giảm Giá');
            }
        } catch (error) {
            console.error('Error adding Mã Giảm Giá:', error);
            toast.error('Failed to add Mã Giảm Giá');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Mã Số</label>
                            <input
                                type="text"
                                name="maso"
                                value={formData.maso || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Giảm Giá</label>
                            <input
                                type="text"
                                name="giamgia"
                                value={formData.giamgia || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Lượt Sử Dụng</label>
                            <input
                                type="text"
                                name="luotsudung"
                                value={formData.luotsudung || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Sử Dụng Hiện Tại</label>
                            <input
                                type="text"
                                name="sudunghientai"
                                value={formData.sudunghientai || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
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
                                <option value="Đợi Duyệt">Đợi Duyệt</option>
                                <option value="Đã Duyệt">Đã Duyệt</option>
                                <option value="Chưa Duyệt">Chưa Duyệt</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Ngày Bắt Đầu</label>
                            <input
                                type="date"
                                name="ngaybatdau"
                                value={formData.ngaybatdau || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Ngày Kết Thúc</label>
                            <input
                                type="date"
                                name="ngayketthuc"
                                value={formData.ngayketthuc || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Giảng Viên</label>
                            <select
                                name="id_giangvien"
                                value={formData.id_giangvien}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Giảng Viên</option>
                                {Array.isArray(GiangVien) && GiangVien.map((giangvien) => (
                                    <option key={giangvien.id} value={giangvien.id}>{giangvien.ten}</option>
                                ))}
                            </select>
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













export default MaGiamGia;