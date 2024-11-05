import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MaGiamGiaKhoaHoc = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [MaGiamGiaKhoaHoc, setMaGiamGiaKhoaHoc] = useState([]);
    const [KhoaHoc, setKhoaHoc] = useState([]);
    const [MaGiamGia, setMaGiamGia] = useState([]);
    const [selectedMaGiamGiaKhoaHoc, setSelectedMaGiamGiaKhoaHoc] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        fetchData();
        fetchKhoaHoc();
        fetchMaGiamGia();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/showAllMaGiamGiaKhoaHoc');
            const data = await response.json();
            setMaGiamGiaKhoaHoc(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };

    const fetchKhoaHoc = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/Tatcakhoahoc');
            const data = await response.json();
            setKhoaHoc(data.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            toast.error('Failed to fetch courses.');
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

    const handleEditClick = (maGiamGiaKhoaHoc) => {
        setSelectedMaGiamGiaKhoaHoc(maGiamGiaKhoaHoc);
        setEditVisible(true);
    };

    const handleAddClick = () => {
        setSelectedMaGiamGiaKhoaHoc(null);
        setAddVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteMaGiamGiaKhoaHoc/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            if (response.ok) {
                toast.success('Mã Giảm Giá Khóa Học deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete Mã Giảm Giá Khóa Học');
            }
        } catch (error) {
            console.error('Error deleting Mã Giảm Giá Khóa Học:', error);
            toast.error('Failed to delete Mã Giảm Giá Khóa Học');
        }
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Mã Giảm Giá Khóa Học</h1>
                <p className="text-gray-400">Danh sách Mã Giảm Giá Khóa Học</p>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">Thêm Mã Giảm Giá Khóa Học</button>
            </section>

            {/* Ma Giam Gia Khoa Hoc List */}
            <section className="p-4 space-y-4">
                {MaGiamGiaKhoaHoc.map((maGiamGiaKhoaHoc) => (
                    <div key={maGiamGiaKhoaHoc.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">ID Khóa Học: {maGiamGiaKhoaHoc.id_khoahoc}</p>
                            <p className="text-gray-400">ID Mã Giảm Giá: {maGiamGiaKhoaHoc.id_magiamgia}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(maGiamGiaKhoaHoc)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(maGiamGiaKhoaHoc.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedMaGiamGiaKhoaHoc && (
                <EditMaGiamGiaKhoaHoc
                    maGiamGiaKhoaHoc={selectedMaGiamGiaKhoaHoc}
                    onClose={() => {
                        setEditVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    KhoaHoc={KhoaHoc}
                    MaGiamGia={MaGiamGia}
                />
            )}
            {isAddVisible && (
                <AddMaGiamGiaKhoaHoc
                    onClose={() => {
                        setAddVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    KhoaHoc={KhoaHoc}
                    MaGiamGia={MaGiamGia}
                />
            )}
            <ToastContainer />
        </>
    );
};

const EditMaGiamGiaKhoaHoc = ({ maGiamGiaKhoaHoc, onClose, csrfToken, KhoaHoc, MaGiamGia }) => {
    const [formData, setFormData] = useState({ ...maGiamGiaKhoaHoc });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const response = await fetch(`http://127.0.0.1:8000/admin-api/updateMaGiamGiaKhoaHoc/${maGiamGiaKhoaHoc.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success('Mã Giảm Giá Khóa Học updated successfully');
                onClose();
            } else {
                toast.error('Failed to update Mã Giảm Giá Khóa Học');
            }
        } catch (error) {
            console.error('Error updating Mã Giảm Giá Khóa Học:', error);
            toast.error('Failed to update Mã Giảm Giá Khóa Học');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Khóa Học</label>
                            <select
                                name="id_khoahoc"
                                value={formData.id_khoahoc}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Khóa Học</option>
                                {Array.isArray(KhoaHoc) && KhoaHoc.map((khoahoc) => (
                                    <option key={khoahoc.id} value={khoahoc.id}>{khoahoc.ten}</option>
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

const AddMaGiamGiaKhoaHoc = ({ onClose, csrfToken, KhoaHoc, MaGiamGia }) => {
    const [formData, setFormData] = useState({ id_khoahoc: '', id_magiamgia: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const addResponse = await fetch('http://127.0.0.1:8000/admin-api/addMaGiamGiaKhoaHoc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (addResponse.ok) {
                toast.success('Mã Giảm Giá Khóa Học added successfully');
                onClose();
            } else {
                toast.error('Failed to add Mã Giảm Giá Khóa Học');
            }
        } catch (error) {
            console.error('Error adding Mã Giảm Giá Khóa Học:', error);
            toast.error('Failed to add Mã Giảm Giá Khóa Học');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Khóa Học</label>
                            <select
                                name="id_khoahoc"
                                value={formData.id_khoahoc}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Khóa Học</option>
                                {Array.isArray(KhoaHoc) && KhoaHoc.map((khoahoc) => (
                                    <option key={khoahoc.id} value={khoahoc.id}>{khoahoc.ten}</option>
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

export default MaGiamGiaKhoaHoc;