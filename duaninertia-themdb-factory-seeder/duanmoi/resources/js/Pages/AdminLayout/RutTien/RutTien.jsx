import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RutTien = () => {
    const [RutTien, setRutTien] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [selectedChuDe, setSelectedChuDe] = useState(null);
    const [theNganHang, setTheNganHang] = useState([]);
    const [giangVien, setGiangVien] = useState([]);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        const fetchTheNganHang = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/admin-api/showAllTheNganHang');
                const data = await response.json();
                setTheNganHang(data);
            } catch (error) {
                console.error('Error fetching TheNganHang data:', error);
                toast.error('Failed to fetch TheNganHang data.');
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

        const fetchRutTien = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/admin-api/showAllRutTien');
                const data = await response.json();
                setRutTien(data);
            } catch (error) {
                console.error('Error fetching RutTien data:', error);
                toast.error('Failed to fetch RutTien data.');
            }
        };

        fetchTheNganHang();
        fetchGiangVien();
        fetchRutTien();
    }, []);

    console.log(RutTien);

    const handleEdit = (chuDe) => {
        setSelectedChuDe(chuDe);
        setEditVisible(true);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`/admin-api/updateRutTien/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({ trangthai: newStatus })
            });
            if (response.ok) {
                toast.success('Trạng thái đã được cập nhật thành công!');
                setRutTien(prevState => prevState.map(item => item.id === id ? { ...item, trangthai: newStatus } : item));
            } else {
                toast.error('Cập nhật trạng thái thất bại!');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Cập nhật trạng thái thất bại!');
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteRutTien/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
    
            if (response.ok) {
                setRutTien(prevState => prevState.filter(item => item.id !== id));
                toast.success('Xóa rút tiền thành công!');
            } else {
                toast.error('Xóa rút tiền thất bại!');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa rút tiền thất bại!');
        }
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Người Dùng</h1>
                <p className="text-gray-400">Danh sách người dùng</p>
                <button
                    onClick={() => setAddVisible(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    Thêm Rút Tiền
                </button>
            </section>

            {/* Users List */}
            <section className="p-4 space-y-4">
                {RutTien.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Rút Tiền: {item.id}</p>
                            <p className="text-gray-400">Giảng viên : {item.giangvien?.ten || 'N/A'}</p>
                            <p className="text-gray-400">Email: {item.giangvien?.email || 'N/A'}</p>
                            <p className="text-gray-400">Thẻ Ngân Hàng: {item.thenganhang?.tenthe || 'N/A'}</p>
                            <p className="text-gray-400">Tổng Tiền: {item.tong}</p>
                            <p className="text-gray-400">Ngày Rút Tiền: {new Date(item.updated_at).toLocaleDateString()}</p>
                            <p className="text-gray-400">Trạng Thái: {item.trangthai}</p>
                        </div>
                        <div className="space-x-2">
                            <select
                                value={item.trangthai}
                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                className="bg-blue-500 text-black px-4 py-2 rounded-lg"
                            >
                                <option value="choxuly">Chờ xử lý</option>
                                <option value="daxuly">Đã xử lý</option>
                                <option value="tuchoi">Từ Chối</option>
                            </select>
                            <button
                                onClick={() => handleEdit(item)}
                                className="bg-blue-500 text-black px-4 py-2 rounded-lg"
                            >
                                Chỉnh sửa
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedChuDe && (
                <EditNguoiDung
                    selectedChuDe={selectedChuDe}
                    onClose={() => setEditVisible(false)}
                    csrfToken={csrfToken}
                    theNganHang={theNganHang}
                    giangVien={giangVien}
                />
            )}
            {isAddVisible && (
                <AddRutTien
                    onClose={() => setAddVisible(false)}
                    csrfToken={csrfToken}
                    theNganHang={theNganHang}
                    giangVien={giangVien}
                />
            )}
            <ToastContainer />
        </>
    );
};

const EditNguoiDung = ({ selectedChuDe, onClose, csrfToken, theNganHang, giangVien }) => {
    const [formData, setFormData] = useState(selectedChuDe);
    const [imageSelected, setImageSelected] = useState(null);

    useEffect(() => {
        setFormData(selectedChuDe);
    }, [selectedChuDe]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFormData = { ...formData, hinh: imageSelected || formData.hinh };
        try {
            const response = await fetch(`/admin-api/updateRutTien/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(updatedFormData)
            });
            if (response.ok) {
                toast.success('Chủ đề đã được cập nhật thành công!');
                onClose();
                window.location.reload();
            } else {
                toast.error('Cập nhật chủ đề thất bại!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Cập nhật chủ đề thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Giảng viên</label>
                            <select
                                name="id_giangvien"
                                value={formData.giangvien?.id || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            >
                                <option value="">Chọn giảng viên</option>
                                {giangVien.map((gv) => (
                                    <option key={gv.id} value={gv.id}>
                                        {gv.ten}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.giangvien?.email || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Thẻ Ngân Hàng</label>
                            <select
                                name="id_thenganhang"
                                value={formData.thenganhang?.id || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            >
                                <option value="">Chọn thẻ ngân hàng</option>
                                {theNganHang.map((tnh) => (
                                    <option key={tnh.id} value={tnh.id}>
                                        {tnh.tenthe}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Tổng Tiền</label>
                            <input
                                type="number"
                                name="tong"
                                value={formData.tong || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Trạng Thái</label>
                            <select
                                name="trangthai"
                                value={formData.trangthai}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            >
                                <option value="choxuly">Chờ xử lý</option>
                                <option value="daxuly">Đã xử lý</option>
                                <option value="tuchoi">Từ Chối</option>
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

const AddRutTien = ({ onClose, csrfToken, theNganHang, giangVien }) => {
    const [formData, setFormData] = useState({
        id_giangvien: '',
        email: '',
        id_thenganhang: '',
        tong: '',
        trangthai: 'choxuly'
    });
    const [imageSelected, setImageSelected] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newFormData = { ...formData, hinh: imageSelected };
        try {
            const response = await fetch('/admin-api/addRutTien', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(newFormData)
            });
            if (response.ok) {
                toast.success('Rút tiền đã được thêm thành công!');
                onClose();
                window.location.reload();
            } else {
                toast.error('Thêm rút tiền thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm rút tiền thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Giảng viên</label>
                            <select
                                name="id_giangvien"
                                value={formData.id_giangvien}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            >
                                <option value="">Chọn giảng viên</option>
                                {giangVien.map((gv) => (
                                    <option key={gv.id} value={gv.id}>
                                        {gv.ten}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Thẻ Ngân Hàng</label>
                            <select
                                name="id_thenganhang"
                                value={formData.id_thenganhang}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            >
                                <option value="">Chọn thẻ ngân hàng</option>
                                {theNganHang.map((tnh) => (
                                    <option key={tnh.id} value={tnh.id}>
                                        {tnh.tenthe}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tổng Tiền</label>
                            <input
                                type="number"
                                name="tong"
                                value={formData.tong}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Trạng Thái</label>
                            <select
                                name="trangthai"
                                value={formData.trangthai}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                            >
                                <option value="choxuly">Chờ xử lý</option>
                                <option value="daxuly">Đã xử lý</option>
                                <option value="tuchoi">Từ Chối</option>
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

export default RutTien;