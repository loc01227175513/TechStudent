import React, { useState, useEffect } from 'react';
const cloudName = 'dn7s1su66';
const uploadPreset = 'my_unsigned_preset';
import moment from 'moment';




export default function NguoiDung() {
    const [nguoiDung, setNguoiDung] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState(null); // Add state for new user
    const [imageSelected, setImageSelected] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [statusFilter, setStatusFilter] = useState(''); // State for status filter
    const [roleFilter, setRoleFilter] = useState(''); // State for role filter
    const [dateFilter, setDateFilter] = useState(''); // State for date filter
    const [minIdFilter, setMinIdFilter] = useState(''); // State for minimum ID filter
    const [maxIdFilter, setMaxIdFilter] = useState(''); // State for maximum ID filter

    const fetchNguoiDung = async () => {
        try {
            const response = await fetch('/admin-api/tatcanguoidung');
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    };

    useEffect(() => {
        const loadNguoiDung = async () => {
            const data = await fetchNguoiDung();
            setNguoiDung(data);
        };

        loadNguoiDung();
    }, []);

    const uploadImage = async () => {
        if (!imageSelected) {
            console.error("No image selected for upload.");
            return null;
        }
        const imageFormData = new FormData();
        imageFormData.append("file", imageSelected);
        imageFormData.append("upload_preset", uploadPreset);

        try {
            console.log("Uploading image to Cloudinary...");
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: imageFormData,
            });
            const data = await response.json();
            console.log("Cloudinary response:", data);
            if (!data.secure_url) throw new Error('Failed to upload image');
            setIsImageUploaded(true);
            return data.secure_url;
        } catch (error) {
            console.error("Image upload failed:", error);
            return null;
        }
    };

    const handleShowDetail = (khoahoc) => {
        setSelectedCourse(khoahoc);
    };

    const handleCloseDetail = () => {
        setSelectedCourse(null);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleDeleteUser = async (userId) => {
        if (typeof userId !== 'string' && typeof userId !== 'number') {
            console.error('Invalid userId:', userId);
            return;
        }

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const response = await fetch(`/admin-api/deleteUser/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
        });

        if (response.ok) {
            setNguoiDung((prevState) => prevState.filter((user) => user.id !== userId));
        } else {
            console.error('Failed to delete user');
        }
    };

    const handleCloseEdit = () => {
        setEditingUser(null);
        setImageSelected(null);
        setIsImageUploaded(false);
    };

    const handleNewUser = () => {
        setNewUser({ ten: '', email: '', dienthoai: '', hinh: '', matkhau: '' });
    };

    const handleCloseNewUser = () => {
        setNewUser(null);
        setImageSelected(null);
        setIsImageUploaded(false);
    };

    const handleNewUserSubmit = async (event) => {
        event.preventDefault();
        const { ten, email, dienthoai, hinh, matkhau } = newUser;
        const imageUrl = await uploadImage();
        const newUserData = { ten, email, dienthoai, hinh: imageUrl || hinh, matkhau };
        const createdUser = await createNguoiDung(newUserData);
        if (createdUser) {
            setNguoiDung((prevState) => [...prevState, createdUser]);
            handleCloseNewUser();
        }
    };

    const createNguoiDung = async (userData) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch('/admin-api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Error creating user:", error);
            return null;
        }
    };

    const updateNguoiDung = async (userId, updatedData) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch(`/admin-api/updateUser/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        const { id, ten, email, dienthoai, hinh } = editingUser;
        const imageUrl = await uploadImage();
        const updatedData = { ten, email, dienthoai, hinh: imageUrl || hinh };
        const updatedUser = await updateNguoiDung(id, updatedData);
        if (updatedUser) {
            setNguoiDung((prevState) =>
                prevState.map((user) =>
                    user.id === id ? { ...user, ...updatedData } : user
                )
            );
            handleCloseEdit();
        }
    };

    const handleRoleChange = async (event, userId) => {
        const selectedRole = parseInt(event.target.value, 10);
        if (!isNaN(selectedRole)) {
            const updatedUser = await updateNguoiDung(userId, { vaitro: selectedRole });
            if (updatedUser) {
                setNguoiDung((prevState) =>
                    prevState.map((user) =>
                        user.id === userId ? { ...user, vaitro: selectedRole } : user
                    )
                );
            }
        }
    };

    const handleStatusChange = async (event, userId) => {
        const selectedStatus = event.target.value;
        if (selectedStatus !== "#") {
            const updatedUser = await updateNguoiDung(userId, { trangthai: selectedStatus });
            if (updatedUser) {
                setNguoiDung((prevState) =>
                    prevState.map((user) =>
                        user.id === userId ? { ...user, trangthai: selectedStatus } : user
                    )
                );
            }
        }
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleRoleFilterChange = (event) => {
        setRoleFilter(event.target.value);
    };

    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value);
    };

    const handleMinIdFilterChange = (event) => {
        setMinIdFilter(event.target.value);
    };

    const handleMaxIdFilterChange = (event) => {
        setMaxIdFilter(event.target.value);
    };

    const filteredUsers = nguoiDung.filter(user => {
        const userDate = moment(user.created_at);
        const today = moment();
        const startOfWeek = today.clone().startOf('week');
        const startOfMonth = today.clone().startOf('month');
        const startOfYear = today.clone().startOf('year');

        const matchesDateFilter = dateFilter ? (
            dateFilter === 'today' ? userDate.isSame(today, 'day') :
            dateFilter === 'thisWeek' ? userDate.isSameOrAfter(startOfWeek) :
            dateFilter === 'thisMonth' ? userDate.isSameOrAfter(startOfMonth) :
            dateFilter === 'thisYear' ? userDate.isSameOrAfter(startOfYear) :
            true
        ) : true;

        const matchesMinIdFilter = minIdFilter ? user.id >= parseInt(minIdFilter, 10) : true;
        const matchesMaxIdFilter = maxIdFilter ? user.id <= parseInt(maxIdFilter, 10) : true;

        return matchesDateFilter &&
               matchesMinIdFilter &&
               matchesMaxIdFilter &&
               (statusFilter === '' || user.trangthai === statusFilter) &&
               (roleFilter === '' || user.vaitro === parseInt(roleFilter, 10));
    });

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Người Dùng</h1>
                <p className="text-gray-400">Danh sách người dùng</p>
            </section>
            <div className="p-4 m-4 flex space-x-4">
                <select
                    value={statusFilter}
                    className="bg-green-500 text-black px-4 py-2 rounded-lg"
                    onChange={handleStatusFilterChange}
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="active">Hoạt Động</option>
                    <option value="inactive">Vô hiệu hóa</option>
                </select>
                <select
                    value={roleFilter}
                    className="bg-green-500 text-black px-4 py-2 rounded-lg"
                    onChange={handleRoleFilterChange}
                >
                    <option value="">Tất cả vai trò</option>
                    <option value="2">Admin</option>
                    <option value="1">Giáo Viên</option>
                    <option value="0">Học Viên</option>
                </select>
                <select
                    value={dateFilter}
                    className="bg-green-500 text-black px-4 py-2 rounded-lg"
                    onChange={handleDateFilterChange}
                >
                    <option value="">Tất cả ngày</option>
                    <option value="today">Hôm nay</option>
                    <option value="thisWeek">Tuần này</option>
                    <option value="thisMonth">Tháng này</option>
                    <option value="thisYear">Năm này</option>
                </select>
                <input
                    type="number"
                    value={minIdFilter}
                    placeholder="ID nhỏ nhất"
                    className="bg-green-500 text-black px-4 py-2 rounded-lg"
                    onChange={handleMinIdFilterChange}
                />
                <input
                    type="number"
                    value={maxIdFilter}
                    placeholder="ID lớn nhất"
                    className="bg-green-500 text-black px-4 py-2 rounded-lg"
                    onChange={handleMaxIdFilterChange}
                />
                <button
                    className="p-4 bg-blue-700 text-white rounded-lg"
                    onClick={handleNewUser}
                >
                    Tạo Người Dùng
                </button>
            </div>
            <section className="p-4 space-y-4 relative">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <div className="flex p-2">
                                <div className="w-full">
                                    <p className="text-lg font-semibold">Mã Người Dùng: {user.id}</p>
                                    <p className="text-gray-400">Tên: {user.ten}</p>
                                    <p className="text-gray-400">Email: {user.email}</p>
                                    <p className="text-gray-400">Điện Thoại: {user.dienthoai}</p>
                                    <p className="text-gray-400">Ngày Tạo: {user.created_at}</p>
                                    <p className="text-gray-400">Trạng Thái: {user.trangthai}</p>
                                    <p className="text-gray-400">Vai Trò: {user.vaitro}</p>
                                </div>
                                <div className="w-1/2 m-5">
                                    <img src={user.hinh} alt="" className="w-24 float-end rounded-full" />
                                </div>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <select
                                value={user.trangthai}
                                className="bg-green-500 text-black px-4 py-2 rounded-lg"
                                onChange={(event) => handleStatusChange(event, user.id)}
                            >
                                <option value="#">Trạng Thái</option>
                                <option value="active">Hoạt Động</option>
                                <option value="inactive">Vô hiệu hóa</option>
                            </select>
                            <select
                                value={user.vaitro}
                                className="bg-green-500 text-black px-4 py-2 rounded-lg"
                                onChange={(event) => handleRoleChange(event, user.id)}
                            >
                                <option value="#">Vai Trò</option>
                                <option value="2">Admin</option>
                                <option value="1">Giáo Viên</option>
                                <option value="0">Học Viên</option>
                            </select>
                            <button
                                className="px-4 py-2 bg-blue-700 text-white rounded-lg"
                                onClick={() => handleShowDetail(user)}
                            >
                                Xem Chi Tiết
                            </button>
                            <button
                                className="bg-blue-500 text-black px-4 py-2 rounded-lg"
                                onClick={() => handleEditUser(user)}
                            >
                                Chỉnh sửa
                            </button>
                            <button className="bg-red-500 text-black px-4 py-2 rounded-lg" onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {selectedCourse && (
                <ShowDetail course={selectedCourse} onClose={handleCloseDetail} />
            )}
            {editingUser && (
                <EditUserForm
                    user={editingUser}
                    onClose={handleCloseEdit}
                    onSubmit={handleEditSubmit}
                    setUser={setEditingUser}
                    setImageSelected={setImageSelected}
                    uploadImage={uploadImage}
                    isImageUploaded={isImageUploaded}
                />
            )}
            {newUser && (
                <NewUserForm
                    user={newUser}
                    onClose={handleCloseNewUser}
                    onSubmit={handleNewUserSubmit}
                    setUser={setNewUser}
                    setImageSelected={setImageSelected}
                    uploadImage={uploadImage}
                    isImageUploaded={isImageUploaded}
                />
            )}
        </>
    );
}
















const ShowDetail = ({ course, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Chi tiết khóa học: {course.id}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto" onClick={onClose}>
                            <span className="sr-only">Close modal</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        <h2>{course.ten}</h2>
                        <div className="flex">
                            <img src={course.hinh || 'default-image.jpg'} alt={course.name || 'Course Image'} className='w-full rounded-md' />
                        </div>
                        <div className="flex">
                            <div className="w-1/2">
                                <p>Email: {course.email}</p>
                            </div>
                            <div className="w-1/2">
                                <p>Điện Thoại: {course.dienthoai}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <p>Ngày Tạo: {course.created_at}</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg" onClick={onClose}>Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const EditUserForm = ({ user, onClose, onSubmit, setUser, setImageSelected, uploadImage, isImageUploaded }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (event) => {
        setImageSelected(event.target.files[0]);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-gray-800 rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-600">
                        <h3 className="text-xl font-semibold text-white">
                            Chỉnh sửa người dùng: {user.id}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto" onClick={onClose}>
                            <span className="sr-only">Close modal</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={onSubmit} className="p-4 space-y-4">
                        <div className="flex flex-col">
                            <label className="text-gray-300">Tên</label>
                            <input
                                type="text"
                                name="ten"
                                value={user.ten}
                                onChange={handleChange}
                                className="px-4 py-2 border rounded-lg bg-gray-700 text-white"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="px-4 py-2 border rounded-lg bg-gray-700 text-white"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-300">Điện Thoại</label>
                            <input
                                type="text"
                                name="dienthoai"
                                value={user.dienthoai}
                                onChange={handleChange}
                                className="px-4 py-2 border rounded-lg bg-gray-700 text-white"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-300">Ảnh</label>
                            <input
                                type="file"
                                name="hinh"
                                onChange={handleImageChange}
                                className="px-4 py-2 border rounded-lg bg-gray-700 text-white"
                            />
                            <button
                                type="button"
                                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg"
                                onClick={uploadImage}
                                disabled={isImageUploaded}
                            >
                                {isImageUploaded ? "Ảnh đã được tải lên" : "Tải lên ảnh"}
                            </button>
                        </div>
                        <div className="flex items-center p-4 border-t border-gray-600 rounded-b">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">Lưu</button>
                            <button type="button" className="text-white bg-red-700 hover:bg-red-800 px-5 py-2.5 rounded-lg ml-4" onClick={onClose}>Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
const NewUserForm = ({ user, onClose, onSubmit, setUser, setImageSelected, uploadImage, isImageUploaded }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (event) => {
        setImageSelected(event.target.files[0]);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto bg-gray-800 rounded-lg ">

                <form onSubmit={onSubmit} className="p-4 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-white">Tên</label>
                        <input
                            type="text"
                            name="ten"
                            value={user.ten || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-200 text-black"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-200 text-black"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Điện Thoại</label>
                        <input
                            type="text"
                            name="dienthoai"
                            value={user.dienthoai || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-200 text-black"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Mật Khẩu</label>
                        <input
                            type="password"
                            name="matkhau"
                            value={user.matkhau || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-200 text-black"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Ảnh</label>
                        <input
                            type="file"
                            name="hinh"
                            onChange={handleImageChange}
                            className="px-4 py-2 border rounded-lg bg-gray-200 text-black"
                        />
                        <button
                            type="button"
                            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg"
                            onClick={uploadImage}
                            disabled={isImageUploaded}
                        >
                            {isImageUploaded ? "Ảnh đã được tải lên" : "Tải lên ảnh"}
                        </button>
                    </div>
                    <div className="flex items-center p-4 border-t border-gray-300 rounded-b">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">Lưu</button>
                        <button type="button" className="text-white bg-red-700 hover:bg-red-800 px-5 py-2.5 rounded-lg ml-4" onClick={onClose}>Hủy</button>
                    </div>
                </form>

            </div>
        </div>
    );
};