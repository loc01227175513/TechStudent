import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

const VideoDaHoc = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [VideoDaHoc, setVideoDaHoc] = useState([]);
    const [Video, setVideo] = useState([]);
    const [Users, setUsers] = useState([]);
    const [selectedVideoDaHoc, setSelectedVideoDaHoc] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [videoDaHocResponse, videoResponse, usersResponse] = await Promise.all([
                fetch('http://127.0.0.1:8000/admin-api/showAllVideoDaHoc'),
                fetch('http://127.0.0.1:8000/admin-api/showAllVideo'),
                fetch('http://127.0.0.1:8000/admin-api/tatcanguoidung')
            ]);

            const videoDaHocData = await videoDaHocResponse.json();
            const videoData = await videoResponse.json();
            const usersData = await usersResponse.json();

            setVideoDaHoc(videoDaHocData);
            setVideo(videoData);
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };

    const handleEditClick = (videoDaHoc) => {
        setSelectedVideoDaHoc(videoDaHoc);
        setEditVisible(true);
    };

    const handleAddClick = () => {
        setSelectedVideoDaHoc(null);
        setAddVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteVideoDaHoc/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            if (response.ok) {
                toast.success('Video đã học deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete Video đã học');
            }
        } catch (error) {
            console.error('Error deleting Video đã học:', error);
            toast.error('Failed to delete Video đã học');
        }
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Video Đã Học</h1>
                <p className="text-gray-400">Danh sách Video Đã Học</p>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">Thêm Video Đã Học</button>
            </section>

            {/* Video Da Hoc List */}
            <section className="p-4 space-y-4">
                {VideoDaHoc.map((videoDaHoc) => (
                    <div key={videoDaHoc.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Video Đã Học: {videoDaHoc.id}</p>
                            <p className="text-gray-400">Trạng Thái: {videoDaHoc.trangthai}</p>
                            {Array.isArray(Video) && Video
                                .filter(v => v.id === videoDaHoc.id_video)
                                .map((v) => (
                                    <p key={v.id} className="text-gray-400">Tên Video: {v.ten}</p>
                                ))}
                            {Array.isArray(Users) && Users
                                .filter(u => u.id === videoDaHoc.id_nguoidung)
                                .map((u) => (
                                    <p key={u.id} className="text-gray-400">Người Dùng: {u.ten}</p>
                                ))}
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(videoDaHoc)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(videoDaHoc.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedVideoDaHoc && (
                <EditVideoDaHoc
                    videoDaHoc={selectedVideoDaHoc}
                    onClose={() => {
                        setEditVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    Video={Video}
                    Users={Users}
                />
            )}
            {isAddVisible && (
                <AddVideoDaHoc
                    onClose={() => {
                        setAddVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    Video={Video}
                    Users={Users}
                />
            )}
            <ToastContainer />
        </>
    );
};

const EditVideoDaHoc = ({ videoDaHoc, onClose, csrfToken, Video, Users }) => {
    const [formData, setFormData] = useState({ ...videoDaHoc });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const response = await fetch(`http://127.0.0.1:8000/admin-api/updateVideoDaHoc/${videoDaHoc.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success('Video đã học updated successfully');
                onClose();
            } else {
                toast.error('Failed to update Video đã học');
            }
        } catch (error) {
            console.error('Error updating Video đã học:', error);
            toast.error('Failed to update Video đã học');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
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
                                <option value="Đã xem">Đã xem</option>
                                <option value="Chưa xem">Chưa xem</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Video</label>
                            <select
                                name="id_video"
                                value={formData.id_video}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Video</option>
                                {Array.isArray(Video) && Video.map((video) => (
                                    <option key={video.id} value={video.id}>{video.ten}</option>
                                ))}
                            </select>
                        </div>
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
                                {Array.isArray(Users) && Users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.ten}</option>
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

const AddVideoDaHoc = ({ onClose, csrfToken, Video, Users }) => {
    const [formData, setFormData] = useState({ trangthai: '', id_video: '', id_nguoidung: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            const addResponse = await fetch('http://127.0.0.1:8000/admin-api/addVideoDaHoc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (addResponse.ok) {
                toast.success('Video đã học added successfully');
                onClose();
            } else {
                toast.error('Failed to add Video đã học');
            }
        } catch (error) {
            console.error('Error adding Video đã học:', error);
            toast.error('Failed to add Video đã học');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
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
                                <option value="Đã xem">Đã xem</option>
                                <option value="Chưa xem">Chưa xem</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">ID Video</label>
                            <select
                                name="id_video"
                                value={formData.id_video}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Video</option>
                                {Array.isArray(Video) && Video.map((video) => (
                                    <option key={video.id} value={video.id}>{video.ten}</option>
                                ))}
                            </select>
                        </div>
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
                                {Array.isArray(Users) && Users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.ten}</option>
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
export default VideoDaHoc;