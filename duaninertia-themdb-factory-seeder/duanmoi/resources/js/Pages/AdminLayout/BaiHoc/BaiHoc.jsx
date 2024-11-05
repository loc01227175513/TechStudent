import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BaiHoc = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [BaiHoc, setBaiHoc] = useState([]);
    const [khoahoc, setKhoahoc] = useState([]);
    const [selectedBaiHoc, setSelectedBaiHoc] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [baiHocResponse, khoahocResponse] = await Promise.all([
                fetch('http://127.0.0.1:8000/admin-api/showAllBaiHoc'),
                fetch('http://127.0.0.1:8000/admin-api/Tatcakhoahoc')
            ]);

            const baiHocData = await baiHocResponse.json();
            const khoahocData = await khoahocResponse.json();

            setBaiHoc(baiHocData);
            setKhoahoc(khoahocData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };

    const handleEditClick = (baiHoc) => {
        setSelectedBaiHoc(baiHoc);
        setEditVisible(true);
    };

    const handleAddClick = () => {
        setSelectedBaiHoc(null);
        setAddVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteBaiHoc/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            if (response.ok) {
                toast.success('Bài Học deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete Bài Học');
            }
        } catch (error) {
            console.error('Error deleting Bài Học:', error);
            toast.error('Failed to delete Bài Học');
        }
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Bài Học</h1>
                <p className="text-gray-400">Danh sách Bài Học</p>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">Thêm Bài Học</button>
            </section>

            {/* Courses List */}
            <section className="p-4 space-y-4">
                {BaiHoc.map((baiHoc) => (
                    <div key={baiHoc.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Bài Học: {baiHoc.id}</p>
                            <p className="text-gray-400">Tên Bài Học: {baiHoc.ten}</p>
                            <p className="text-gray-400">Mô Tả Bài Học: {baiHoc.mota}</p>
                            {Array.isArray(khoahoc) && khoahoc
                                .filter(kh => kh.id === baiHoc.id_khoahoc)
                                .map((kh) => (
                                    <p key={kh.id} className="text-gray-400">Khóa Học: {kh.ten}</p>
                                ))}
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(baiHoc)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(baiHoc.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedBaiHoc && (
                <EditBaiHoc
                    BaiHoc={selectedBaiHoc}
                    onClose={() => {
                        setEditVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    khoahoc={khoahoc}
                />
            )}
            {isAddVisible && (
                <AddBaiHoc
                    onClose={() => {
                        setAddVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    khoahoc={khoahoc}
                />
            )}
            <ToastContainer />
        </>
    );
};

const EditBaiHoc = ({ BaiHoc, onClose, csrfToken, khoahoc }) => {
    const [formData, setFormData] = useState({ ...BaiHoc });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/updateBaiHoc/${BaiHoc.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success('Bài Học updated successfully');
                onClose();
            } else {
                toast.error('Failed to update Bài Học');
            }
        } catch (error) {
            console.error('Error updating Bài Học:', error);
            toast.error('Failed to update Bài Học');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Tên</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Mô Tả</label>
                            <input
                                type="text"
                                name="mota"
                                value={formData.mota}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Khóa Học</label>
                            <select
                                name="id_khoahoc"
                                value={formData.khoahoc_id}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Khóa Học</option>
                                {Array.isArray(khoahoc) && khoahoc.map((khoahoc) => (
                                    <option key={khoahoc.id} value={khoahoc.id}>{khoahoc.ten}</option>
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

const AddBaiHoc = ({ onClose, csrfToken, khoahoc }) => {
    const [formData, setFormData] = useState({ ten: '', mota: '', id_khoahoc: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/addBaiHoc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success('Bài Học added successfully');
                onClose();
            } else {
                toast.error('Failed to add Bài Học');
            }
        } catch (error) {
            console.error('Error adding Bài Học:', error);
            toast.error('Failed to add Bài Học');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Tên</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Mô Tả</label>
                            <input
                                type="text"
                                name="mota"
                                value={formData.mota}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Khóa Học</label>
                            <select
                                name="id_khoahoc"
                                value={formData.id_khoahoc}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Khóa Học</option>
                                {Array.isArray(khoahoc) && khoahoc.map((khoahoc) => (
                                    <option key={khoahoc.id} value={khoahoc.id}>{khoahoc.ten}</option>
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

export default BaiHoc;