// GiangVien.jsx

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cloudName = 'dn7s1su66';
const uploadPreset = 'my_unsigned_preset';

const GiangVien = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [GiangVien, setGiangVien] = useState([]);
    const [NguoiDung, setNguoiDung] = useState([]);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [selectedGiangVien, setSelectedGiangVien] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

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
            const response = await fetch(`/admin-api/deleteGiangVien/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            if (response.ok) {
                setGiangVien(prev => prev.filter(item => item.id !== id));
                toast.success('Giảng viên đã được xóa thành công!');
            } else {
                toast.error('Xóa giảng viên thất bại!');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Xóa giảng viên thất bại!');
        }
    };

    const handleEditClick = (item) => {
        setSelectedGiangVien(item);
        setIsEditVisible(true);
    };

    const handleCloseEditGiangVien = () => {
        setSelectedGiangVien(null);
        setIsEditVisible(false);
    };

    const handleAddClick = () => {
        setIsAddVisible(true);
    };

    const handleCloseAddGiangVien = () => {
        setIsAddVisible(false);
        setNewGiangVien({
            ten: '',
            email: '',
            dienthoai: '',
            id_nguoidung: '',
            password: '',
            tieusu: '',
            hinh: '',
            tongdoanhthu: '',
            sodukhadung: ''
        });
        setImageSelected(null);
        setImageUrl('');
    };

    const [newGiangVien, setNewGiangVien] = useState({
        ten: '',
        email: '',
        dienthoai: '',
        id_nguoidung: '',
        password: '',
        tieusu: '',
        hinh: '',
        tongdoanhthu: '',
        sodukhadung: ''
    });
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewGiangVien(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImageSelected(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!imageSelected) return '';

        const imageFormData = new FormData();
        imageFormData.append("file", imageSelected);
        imageFormData.append("upload_preset", uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: imageFormData,
            });
            const data = await response.json();
            if (!data.secure_url) throw new Error('Failed to upload image');
            setImageUrl(data.secure_url);
            toast.success('Image uploaded successfully!');
            return data.secure_url;
        } catch (error) {
            console.error("Image upload failed:", error);
            toast.error('Failed to upload image.');
            return '';
        }
    };

    const validateAddForm = () => {
        const { ten, email, dienthoai, id_nguoidung, tieusu, tongdoanhthu, sodukhadung } = newGiangVien;
        if (!ten || ten.length > 255) {
            toast.error('Tên phải được điền và không vượt quá 255 ký tự.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Email không hợp lệ.');
            return false;
        }
        if (!dienthoai) {
            toast.error('Điện thoại là bắt buộc.');
            return false;
        }
        if (!id_nguoidung) {
            toast.error('Người dùng là bắt buộc.');
            return false;
        }
        if (!tieusu) {
            toast.error('Tiểu sử là bắt buộc.');
            return false;
        }
        if (!tongdoanhthu || isNaN(tongdoanhthu) || Number(tongdoanhthu) < 0) {
            toast.error('Tổng doanh thu phải là số không âm.');
            return false;
        }
        if (!sodukhadung || isNaN(sodukhadung) || Number(sodukhadung) < 0) {
            toast.error('Số dư khả dụng phải là số không âm.');
            return false;
        }
        return true;
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        if (!validateAddForm()) return;

        const uploadedImageUrl = await handleImageUpload();

        const formDataToSubmit = {
            ...newGiangVien,
            hinh: uploadedImageUrl
        };

        try {
            const response = await fetch(`/admin-api/addGiangVien`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(formDataToSubmit)
            });
            if (response.ok) {
                const addedGiangVien = await response.json();
                setGiangVien(prev => [...prev, addedGiangVien]);
                toast.success('Thêm giảng viên thành công!');
                handleCloseAddGiangVien();
            } else {
                toast.error('Thêm giảng viên thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm giảng viên thất bại!');
        }
    };

    return (
        <>
            <section className="p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý Giảng Viên</h1>
                    <p className="text-gray-400">Danh sách giảng viên</p>
                </div>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Thêm Giảng Viên</button>
            </section>

            <section className="p-4 space-y-4">
                {GiangVien.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img src={item.hinh} alt={item.ten} className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <p className="text-lg font-semibold">Tên: {item.ten}</p>
                                <p className="text-gray-400">Email: {item.email}</p>
                                <p className="text-gray-400">Điện thoại: {item.dienthoai}</p>
                                <p className="text-gray-400">Tổng doanh thu: ${item.tongdoanhthu}</p>
                                <p className="text-gray-400">Số dư khả dụng: ${item.sodukhadung}</p>
                                <p className="text-gray-400">Trạng thái: {item.trangthai || 'Đang hoạt động'}</p>
                                <p className="text-gray-400">Ngày tạo: {new Date(item.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedGiangVien && (
                <EditGiangVien
                    giangVien={selectedGiangVien}
                    onClose={handleCloseEditGiangVien}
                    nguoiDung={NguoiDung}
                    csrfToken={csrfToken}
                />
            )}
            {isAddVisible && (
                <AddGiangVien
                    onClose={handleCloseAddGiangVien}
                    nguoiDung={NguoiDung}
                    csrfToken={csrfToken}
                    newGiangVien={newGiangVien}
                    onChange={handleAddChange}
                    onImageChange={handleImageChange}
                    imageSelected={imageSelected}
                    imageUrl={imageUrl}
                    onSubmit={handleAddSubmit}
                />
            )}
            <ToastContainer />
        </>
    );

};

const EditGiangVien = ({ onClose, giangVien, csrfToken, nguoiDung }) => {
    const [formData, setFormData] = useState({
        ten: giangVien.ten || '',
        email: giangVien.email || '',
        dienthoai: giangVien.dienthoai || '',
        id_nguoidung: giangVien.id_nguoidung || '',
        password: '', // Leave empty for security
        tieusu: giangVien.tieusu || '',
        hinh: giangVien.hinh || '',
        tongdoanhthu: giangVien.tongdoanhthu || '',
        sodukhadung: giangVien.sodukhadung || ''
    });
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState(giangVien.hinh || '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImageSelected(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!imageSelected) return imageUrl;

        const imageFormData = new FormData();
        imageFormData.append("file", imageSelected);
        imageFormData.append("upload_preset", uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: imageFormData,
            });
            const data = await response.json();
            if (!data.secure_url) throw new Error('Failed to upload image');
            setImageUrl(data.secure_url);
            toast.success('Image uploaded successfully!');
            return data.secure_url;
        } catch (error) {
            console.error("Image upload failed:", error);
            toast.error('Failed to upload image.');
            return imageUrl;
        }
    };

    const validateForm = () => {
        if (!formData.ten || formData.ten.length > 255) {
            toast.error('Tên phải được điền và không vượt quá 255 ký tự.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Email không hợp lệ.');
            return false;
        }
        if (!formData.dienthoai) {
            toast.error('Điện thoại là bắt buộc.');
            return false;
        }
        if (!formData.id_nguoidung) {
            toast.error('Người dùng là bắt buộc.');
            return false;
        }
        if (!formData.tieusu) {
            toast.error('Tiểu sử là bắt buộc.');
            return false;
        }
        if (!formData.tongdoanhthu || isNaN(formData.tongdoanhthu) || Number(formData.tongdoanhthu) < 0) {
            toast.error('Tổng doanh thu phải là số không âm.');
            return false;
        }
        if (!formData.sodukhadung || isNaN(formData.sodukhadung) || Number(formData.sodukhadung) < 0) {
            toast.error('Số dư khả dụng phải là số không âm.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const uploadedImageUrl = await handleImageUpload();

        const updatedFormData = {
            ...formData,
            hinh: uploadedImageUrl
        };

        try {
            const response = await fetch(`/admin-api/updateGiangVien/${giangVien.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(updatedFormData)
            });
            if (response.ok) {
                toast.success('Cập nhật giảng viên thành công!');
                onClose();
                window.location.reload();
            } else {
                toast.error('Cập nhật giảng viên thất bại!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Cập nhật giảng viên thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-gray-900 rounded-lg shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-white">Tên:</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                                maxLength={255}
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Điện thoại:</label>
                            <input
                                type="text"
                                name="dienthoai"
                                value={formData.dienthoai}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Người dùng:</label>
                            <select
                                name="id_nguoidung"
                                value={formData.id_nguoidung}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                            >
                                <option value="">Chọn người dùng</option>
                                {nguoiDung.map(user => (
                                    <option key={user.id} value={user.id}>{user.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Mật khẩu:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                            />
                            <p className="text-gray-400 text-sm">Để trống nếu không muốn thay đổi mật khẩu.</p>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Tiểu sử:</label>
                            <textarea
                                name="tieusu"
                                value={formData.tieusu}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Hình ảnh:</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-white bg-gray-700"
                            />
                            {imageUrl && <img src={imageUrl} alt="Hình giảng viên" className="mt-2 w-32 h-32 rounded-full object-cover" />}
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Tổng doanh thu:</label>
                            <input
                                type="number"
                                name="tongdoanhthu"
                                value={formData.tongdoanhthu}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Số dư khả dụng:</label>
                            <input
                                type="number"
                                name="sodukhadung"
                                value={formData.sodukhadung}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                                min="0"
                                step="0.01"
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

const AddGiangVien = ({ onClose, nguoiDung, csrfToken, newGiangVien, onChange, onImageChange, imageSelected, imageUrl, onSubmit }) => {
    const handleImageUpload = async () => {
        if (!imageSelected) return '';

        const imageFormData = new FormData();
        imageFormData.append("file", imageSelected);
        imageFormData.append("upload_preset", uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: imageFormData,
            });
            const data = await response.json();
            if (!data.secure_url) throw new Error('Failed to upload image');
            return data.secure_url;
        } catch (error) {
            console.error("Image upload failed:", error);
            toast.error('Failed to upload image.');
            return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { ten, email, dienthoai, id_nguoidung, tieusu, tongdoanhthu, sodukhadung } = newGiangVien;

        if (!ten || ten.length > 255) {
            toast.error('Tên phải được điền và không vượt quá 255 ký tự.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Email không hợp lệ.');
            return;
        }
        if (!dienthoai) {
            toast.error('Điện thoại là bắt buộc.');
            return;
        }
        if (!id_nguoidung) {
            toast.error('Người dùng là bắt buộc.');
            return;
        }
        if (!tieusu) {
            toast.error('Tiểu sử là bắt buộc.');
            return;
        }
        if (!tongdoanhthu || isNaN(tongdoanhthu) || Number(tongdoanhthu) < 0) {
            toast.error('Tổng doanh thu phải là số không âm.');
            return;
        }
        if (!sodukhadung || isNaN(sodukhadung) || Number(sodukhadung) < 0) {
            toast.error('Số dư khả dụng phải là số không âm.');
            return;
        }

        const uploadedImageUrl = await handleImageUpload();

        const formDataToSubmit = {
            ...newGiangVien,
            hinh: uploadedImageUrl
        };

        try {
            const response = await fetch(`/admin-api/addGiangVien`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(formDataToSubmit)
            });
            if (response.ok) {
                const addedGiangVien = await response.json();
                toast.success('Thêm giảng viên thành công!');
                onClose();
            } else {
                toast.error('Thêm giảng viên thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm giảng viên thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-gray-900 rounded-lg shadow">
                    <form onSubmit={onSubmit}>
                        <div className="p-4">
                            <label className="block text-white">Tên:</label>
                            <input
                                type="text"
                                name="ten"
                                value={newGiangVien.ten}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                                maxLength={255}
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={newGiangVien.email}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Điện thoại:</label>
                            <input
                                type="text"
                                name="dienthoai"
                                value={newGiangVien.dienthoai}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Người dùng:</label>
                            <select
                                name="id_nguoidung"
                                value={newGiangVien.id_nguoidung}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                            >
                                <option value="">Chọn người dùng</option>
                                {nguoiDung.map(user => (
                                    <option key={user.id} value={user.id}>{user.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Mật khẩu:</label>
                            <input
                                type="password"
                                name="password"
                                value={newGiangVien.password}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Tiểu sử:</label>
                            <textarea
                                name="tieusu"
                                value={newGiangVien.tieusu}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Hình ảnh:</label>
                            <input
                                type="file"
                                onChange={onImageChange}
                                className="mt-1 block w-full text-white bg-gray-700"
                            />
                            {imageUrl && <img src={imageUrl} alt="Hình giảng viên" className="mt-2 w-32 h-32 rounded-full object-cover" />}
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Tổng doanh thu:</label>
                            <input
                                type="number"
                                name="tongdoanhthu"
                                value={newGiangVien.tongdoanhthu}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-white">Số dư khả dụng:</label>
                            <input
                                type="number"
                                name="sodukhadung"
                                value={newGiangVien.sodukhadung}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                required
                                min="0"
                                step="0.01"
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

export default GiangVien;