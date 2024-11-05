import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BangCap = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [BangCap, setBangCap] = useState([]);
    const [filteredBangCap, setFilteredBangCap] = useState([]);
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [selectedChuDe, setSelectedChuDe] = useState(null);
    const [giangVien, setGiangVien] = useState([]);
    const [filter, setFilter] = useState('');
    console.log(BangCap);
    
    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        const fetchBangCap = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/admin-api/showAllBangCap');
                const data = await response.json();
                setBangCap(data);
                setFilteredBangCap(data);
            } catch (error) {
                console.error('Error fetching BangCap data:', error);
                toast.error('Failed to fetch BangCap data.');
            }
        };

        const fetchGiangVien = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/admin-api/showAllGiangVien');
                const data = await response.json();
                setGiangVien(data);
            } catch (error) {
                console.error('Error fetching GiangVien data:', error);
                toast.error('Failed to fetch GiangVien data.');
            }
        };

        fetchGiangVien();
        fetchBangCap();
    }, []);

    const handleEdit = (item) => {
        setSelectedChuDe(item);
        setEditVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteBangCap/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });

            if (response.ok) {
                setBangCap(prevState => prevState.filter(item => item.id !== id));
                setFilteredBangCap(prevState => prevState.filter(item => item.id !== id));
                toast.success('Xóa bằng cấp thành công!');
            } else {
                toast.error('Xóa bằng cấp thất bại!');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa bằng cấp thất bại!');
        }
    };

    const handleDeleteAll = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa tất cả bằng cấp?')) {
            return;
        }
        try {
            const idsToDelete = filteredBangCap.map(item => item.id);
            const response = await fetch('http://127.0.0.1:8000/admin-api/deleteAllBangCap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({ ids: idsToDelete })
            });

            if (response.ok) {
                setBangCap(prevState => prevState.filter(item => !idsToDelete.includes(item.id)));
                setFilteredBangCap([]);
                toast.success('Xóa tất cả bằng cấp thành công!');
            } else {
                const errorData = await response.json();
                toast.error(`Xóa tất cả bằng cấp thất bại: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa tất cả bằng cấp thất bại!');
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        setFilteredBangCap(BangCap.filter(item => item.ten.toLowerCase().includes(value.toLowerCase())));
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Người Dùng</h1>
                <p className="text-gray-400">Danh sách người dùng</p>
                <input
                    type="text"
                    value={filter}
                    onChange={handleFilterChange}
                    placeholder="Lọc theo tên"
                    className="mt-2 p-2 border bg-black border-gray-300 rounded-md"
                />
                <button
                    onClick={handleDeleteAll}
                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Xóa tất cả
                </button>
                <button
                    onClick={() => setAddVisible(true)}
                    className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    Thêm mới
                </button>
            </section>

            {/* Courses List */}
            <section className="p-4 space-y-4">
                {filteredBangCap.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã bằng cấp: {item.id}</p>
                            <p className="text-gray-400">Tên: {item.ten}</p>
                            <p className="text-gray-400">URL: {item.url}</p>
                            <p className="text-gray-400">Tổ chức: {item.tochuc}</p>
                            <p className="text-gray-400">Năm: {item.nam}</p>
                            <p className="text-gray-400">Giảng viên: {item.giangvien?.ten || 'N/A'}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(item)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedChuDe && (
                <EditBangCap
                    selectedChuDe={selectedChuDe}
                    onClose={() => setEditVisible(false)}
                    csrfToken={csrfToken}
                    giangVien={giangVien}
                />
            )}
            {isAddVisible && (
                <AddBangCap
                    onClose={() => setAddVisible(false)}
                    csrfToken={csrfToken}
                    giangVien={giangVien}
                    setBangCap={setBangCap}
                    setFilteredBangCap={setFilteredBangCap}
                />
            )}
            <ToastContainer />
        </>
    );
};

const EditBangCap = ({ selectedChuDe, onClose, csrfToken, giangVien }) => {
    const [formData, setFormData] = useState(selectedChuDe);

    useEffect(() => {
        setFormData(selectedChuDe);
    }, [selectedChuDe]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/updateBangCap/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                toast.success('Bằng cấp đã được cập nhật thành công!');
                onClose();
                window.location.reload();
            } else {
                toast.error('Cập nhật bằng cấp thất bại!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Cập nhật bằng cấp thất bại!');
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
                            <label className="block text-sm font-medium text-gray-700">URL</label>
                            <input
                                type="text"
                                name="url"
                                value={formData.url || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Tổ chức</label>
                            <input
                                type="text"
                                name="tochuc"
                                value={formData.tochuc || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Năm</label>
                            <input
                                type="date"
                                name="nam"
                                value={formData.nam || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Giảng viên</label>
                            <select
                                name="id_giangvien"
                                value={formData.id_giangvien || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn giảng viên</option>
                                {giangVien.map((gv) => (
                                    <option key={gv.id} value={gv.id}>
                                        {gv.ten}
                                    </option>
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

const AddBangCap = ({ onClose, csrfToken, giangVien, setBangCap, setFilteredBangCap }) => {
    const [formData, setFormData] = useState({
        ten: '',
        url: '',
        tochuc: '',
        nam: '', // Ensure this is a string
        id_giangvien: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/admin-api/addBangCap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const newBangCap = await response.json();
                setBangCap(prevState => [...prevState, newBangCap]);
                setFilteredBangCap(prevState => [...prevState, newBangCap]);
                toast.success('Bằng cấp đã được thêm thành công!');
                onClose();
            } else {
                toast.error('Thêm bằng cấp thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm bằng cấp thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Tên</label>
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">URL</label>
                            <input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Tổ chức</label>
                            <input
                                type="text"
                                name="tochuc"
                                value={formData.tochuc}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Năm</label>
                            <input
                                type="date"
                                name="nam"
                                value={formData.nam}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Giảng viên</label>
                            <select
                                name="id_giangvien"
                                value={formData.id_giangvien}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn giảng viên</option>
                                {giangVien.map((gv) => (
                                    <option key={gv.id} value={gv.id}>
                                        {gv.ten}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4 flex justify-end space-x-2">
                            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Hủy</button>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Thêm mới</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default BangCap;