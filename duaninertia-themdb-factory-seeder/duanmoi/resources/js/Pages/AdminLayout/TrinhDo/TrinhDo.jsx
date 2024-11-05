import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrinhDo = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [TrinhDo, setTrinhDo] = useState([]);
    const [khoahoc, setKhoahoc] = useState([]);
    const [giangvien, setGiangvien] = useState([]);
    const [selectedTrinhDo, setSelectedTrinhDo] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [trinhDoResponse, khoahocResponse, giangvienResponse] = await Promise.all([
                fetch('http://127.0.0.1:8000/admin-api/showAllTrinhDo'),
                fetch('http://127.0.0.1:8000/admin-api/Tatcakhoahoc'),
                fetch('http://127.0.0.1:8000/admin-api/showAllGiangVien')
            ]);

            const trinhDoData = await trinhDoResponse.json();
            const khoahocData = await khoahocResponse.json();
            const giangvienData = await giangvienResponse.json();

            setTrinhDo(trinhDoData);
            setKhoahoc(khoahocData.data);
            setGiangvien(giangvienData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };

    const handleEditClick = (trinhDo) => {
        setSelectedTrinhDo(trinhDo);
        setEditVisible(true);
    };

    const handleAddClick = () => {
        setSelectedTrinhDo(null);
        setAddVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteTrinhDo/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            if (response.ok) {
                toast.success('Trình Độ deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete Trình Độ');
            }
        } catch (error) {
            console.error('Error deleting Trình Độ:', error);
            toast.error('Failed to delete Trình Độ');
        }
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Trình Độ</h1>
                <p className="text-gray-400">Danh sách Trình Độ</p>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">Thêm Trình Độ</button>
            </section>

            {/* Courses List */}
            <section className="p-4 space-y-4">
                {TrinhDo.map((trinhDo) => (
                    <div key={trinhDo.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Trình Độ: {trinhDo.id}</p>
                            <p className="text-gray-400">Tên Trình Độ: {trinhDo.ten}</p>
                            {Array.isArray(khoahoc) && khoahoc
                                .filter(kh => kh.id === trinhDo.id_khoahoc)
                                .map((kh) => (
                                    <p key={kh.id} className="text-gray-400">Khóa Học: {kh.ten}</p>
                                ))}
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(trinhDo)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(trinhDo.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedTrinhDo && (
                <EditTrinhDo
                    TrinhDo={selectedTrinhDo}
                    onClose={() => {
                        setEditVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    khoahoc={khoahoc}
                    giangvien={giangvien}
                />
            )}
            {isAddVisible && (
                <AddTrinhDo
                    onClose={() => {
                        setAddVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    khoahoc={khoahoc}
                    giangvien={giangvien}
                />
            )}
            <ToastContainer />
        </>
    );
};

const EditTrinhDo = ({ TrinhDo, onClose, csrfToken, khoahoc, giangvien }) => {
    const [formData, setFormData] = useState({ ...TrinhDo });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/updateTrinhDo/${TrinhDo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success('Trình Độ updated successfully');
                onClose();
            } else {
                toast.error('Failed to update Trình Độ');
            }
        } catch (error) {
            console.error('Error updating Trình Độ:', error);
            toast.error('Failed to update Trình Độ');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Trình Độ</label>
                            <select
                                name="ten"
                                value={formData.ten}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Trình Độ</option>
                                <option value="Trình độ sơ cấp">Trình độ sơ cấp</option>
                                <option value="Trình độ trung cấp">Trình độ trung cấp</option>
                                <option value="Cấp độ chuyên gia">Cấp độ chuyên gia</option>
                                <option value="Tất cả các cấp độ">Tất cả các cấp độ</option>
                            </select>
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
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Giảng Viên</label>
                            <select
                                name="id_giangvien"
                                value={formData.id_giangvien}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Giảng Viên</option>
                                {Array.isArray(giangvien) && giangvien.map((giangvien) => (
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

const AddTrinhDo = ({ onClose, csrfToken, khoahoc, giangvien }) => {
    const [formData, setFormData] = useState({ ten: '', id_giangvien: '', id_khoahoc: '', trinh_do: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/addTrinhDo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success('Trình Độ added successfully');
                onClose();
            } else {
                toast.error('Failed to add Trình Độ');
            }
        } catch (error) {
            console.error('Error adding Trình Độ:', error);
            toast.error('Failed to add Trình Độ');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Trình Độ</label>
                            <select
                                name="ten"
                                value={formData.ten}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Trình Độ</option>
                                <option value="Trình độ sơ cấp">Trình độ sơ cấp</option>
                                <option value="Trình độ trung cấp">Trình độ trung cấp</option>
                                <option value="Cấp độ chuyên gia">Cấp độ chuyên gia</option>
                                <option value="Tất cả các cấp độ">Tất cả các cấp độ</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Giảng Viên</label>
                            <select
                                name="id_giangvien"
                                value={formData.id_giangvien}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Giảng Viên</option>
                                {Array.isArray(giangvien) && giangvien.map((giangvien) => (
                                    <option key={giangvien.id} value={giangvien.id}>{giangvien.ten}</option>
                                ))}
                            </select>
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

export default TrinhDo;