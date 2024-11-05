// SoLuongDangKy.jsx

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SoLuongDangKy = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [soLuongDangKy, setSoLuongDangKy] = useState([]);
    const [giangvien, setGiangVien] = useState([]);
    const [khoahoc, setKhoaHoc] = useState([]);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [selectedSoLuongDangKy, setSelectedSoLuongDangKy] = useState(null);
    const [newSoLuongDangKy, setNewSoLuongDangKy] = useState({
        soluong: '',
        id_khoahoc: '',
        id_giangvien: ''
    });

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

    useEffect(() => {
        if (csrfToken) {
            fetch(`http://127.0.0.1:8000/admin-api/showAllSoLuongDangKy`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setSoLuongDangKy(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [csrfToken]);

    useEffect(() => {
        if (csrfToken) {
            fetch(`http://127.0.0.1:8000/admin-api/showAllGiangVien`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    setGiangVien(data);
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
            const response = await fetch(`/admin-api/deleteSoLuongDangKy/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            if (response.ok) {
                setSoLuongDangKy(prev => prev.filter(item => item.id !== id));
                toast.success('Số lượng đăng ký đã được xóa thành công!');
            } else {
                toast.error('Xóa số lượng đăng ký thất bại!');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa số lượng đăng ký thất bại!');
        }
    };

    const handleAddClick = () => {
        setIsAddVisible(true);
    };

    const handleCloseAddSoLuongDangKy = () => {
        setIsAddVisible(false);
        setNewSoLuongDangKy({
            soluong: '',
            id_khoahoc: '',
            id_giangvien: ''
        });
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewSoLuongDangKy(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/addSoLuongDangKy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(newSoLuongDangKy)
            });
            if (response.ok) {
                const addedSoLuongDangKy = await response.json();
                setSoLuongDangKy(prev => [...prev, addedSoLuongDangKy]);
                toast.success('Thêm số lượng đăng ký thành công!');
                handleCloseAddSoLuongDangKy();
                window.location.reload();
            } else {
                toast.error('Thêm số lượng đăng ký thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm số lượng đăng ký thất bại!');
        }
    };

    const handleEditClick = (item) => {
        setSelectedSoLuongDangKy(item);
        setIsEditVisible(true);
    };

    const handleCloseEditSoLuongDangKy = () => {
        setSelectedSoLuongDangKy(null);
        setIsEditVisible(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/admin-api/updateSoLuongDangKy/${selectedSoLuongDangKy.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(selectedSoLuongDangKy)
            });
            if (response.ok) {
                const updatedSoLuongDangKy = await response.json();
                setSoLuongDangKy(prev => prev.map(item => item.id === updatedSoLuongDangKy.id ? updatedSoLuongDangKy : item));
                toast.success('Cập nhật số lượng đăng ký thành công!');
                handleCloseEditSoLuongDangKy();
                window.location.reload();
            } else {
                toast.error('Cập nhật số lượng đăng ký thất bại!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Cập nhật số lượng đăng ký thất bại!');
        }
    };

    return (
        <>
            <section className="p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý Số Lượng Đăng Ký</h1>
                    <p className="text-gray-400">Danh sách Số Lượng Đăng Ký</p>
                </div>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Thêm Số Lượng Đăng Ký
                </button>
            </section>

            <section className="p-4 space-y-4">
                {soLuongDangKy.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Số Lượng Đăng Ký: {item.soluong}</p>
                            <p className="text-gray-400">Khóa Học: {item.khoahocs.ten}</p>
                            <p className="text-gray-400">Giảng Viên: {item.giangvien.ten}</p>
                        </div>
                        <div className="space-x-2 p-2 flex">
                            <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>

            {isAddVisible && (
                <AddSoLuongDangKy
                    onClose={handleCloseAddSoLuongDangKy}
                    giangvien={giangvien}
                    khoahoc={khoahoc}
                    csrfToken={csrfToken}
                    formData={newSoLuongDangKy}
                    onChange={handleAddChange}
                    onSubmit={handleAddSubmit}
                />
            )}

            {isEditVisible && selectedSoLuongDangKy && (
                <EditSoLuongDangKy
                    onClose={handleCloseEditSoLuongDangKy}
                    soLuongDangKy={selectedSoLuongDangKy}
                    giangvien={giangvien}
                    khoahoc={khoahoc}
                    csrfToken={csrfToken}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setSelectedSoLuongDangKy(prev => ({
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

const AddSoLuongDangKy = ({ onClose, giangvien, khoahoc, csrfToken, formData, onChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={onSubmit}>
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
                            <label className="block text-white">Giảng Viên:</label>
                            <select
                                name="id_giangvien"
                                value={formData.id_giangvien}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn giảng viên</option>
                                {giangvien.map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>{teacher.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Số Lượng:</label>
                            <input
                                type="number"
                                name="soluong"
                                value={formData.soluong}
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

const EditSoLuongDangKy = ({ onClose, soLuongDangKy, giangvien, khoahoc, csrfToken, onChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={onSubmit}>
                        <div className="p-4">
                            <label className="block text-white">Khóa Học:</label>
                            <select
                                name="id_khoahoc"
                                value={soLuongDangKy.id_khoahoc}
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
                            <label className="block text-white">Giảng Viên:</label>
                            <select
                                name="id_giangvien"
                                value={soLuongDangKy.id_giangvien}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-800"
                                required
                            >
                                <option value="">Chọn giảng viên</option>
                                {giangvien.map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>{teacher.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Số Lượng:</label>
                            <input
                                type="number"
                                name="soluong"
                                value={soLuongDangKy.soluong}
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

export default SoLuongDangKy;