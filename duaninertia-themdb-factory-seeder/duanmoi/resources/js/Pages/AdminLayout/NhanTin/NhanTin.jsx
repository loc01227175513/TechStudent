
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NhanTin = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [giangVien, setGiangVien] = useState([]);
    const [nguoiDung, setNguoiDung] = useState([]);
    const [nhantin, setNhanTin] = useState([]);
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [selectedTinNhan, setSelectedTinNhan] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

    useEffect(() => {
        if (csrfToken) {
            fetchData(`http://127.0.0.1:8000/admin-api/showAllNhanTin`, setNhanTin);
            fetchData(`http://127.0.0.1:8000/admin-api/showAllGiangVien`, setGiangVien);
            fetchData(`http://127.0.0.1:8000/admin-api/tatcanguoidung`, setNguoiDung);
        }
    }, [csrfToken]);

    const fetchData = async (url, setter) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            const data = await response.json();
            setter(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const HandleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteNhanTin/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            if (response.ok) {
                toast.success('Xóa thành công!');
                setNhanTin(nhantin.filter(item => item.id !== id));
            } else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Xóa thất bại!');
        }
    };

    return (
        <>
            <section className="p-4 max-w-6xl mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Quản lý Tin Nhắn</h1>
                    <p className="text-gray-400">Danh sách tin nhắn</p>
                </div>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    onClick={() => setAddVisible(true)}
                >
                    Thêm Tin Nhắn
                </button>
            </section>

            <section className="p-4 max-w-6xl mx-auto space-y-4">
                {nhantin.map((item) => {
                    const messages = JSON.parse(item.noidung);

                    const senderName = item.nguoidung?.ten || item.giangvien?.ten || 'Không xác định';
                    const receiverName = item.giangvien?.ten || item.nguoidung?.ten || 'Không xác định';

                    return (
                        <div key={item.id} className="bg-gray-800 p-6 rounded-lg flex flex-col">
                            <p className="text-lg font-semibold text-white">Mã Tin Nhắn: {item.id}</p>
                            <p className="text-gray-400 mt-2">Người Gửi: {senderName}</p>
                            <p className="text-gray-400">Người Nhận: {receiverName}</p>

                            <div className="flex flex-col space-y-2 mt-2">
                                {messages.map((msg, index) => {
                                    const isUserSender = msg.sender_type === 'nguoidung';
                                    const isLecturerSender = msg.sender_type === 'giangvien';

                                    // Xác định tên người gửi
                                    let msgSenderName = 'Không xác định';

                                    if (msg.sender_type === 'nguoidung') {
                                        const user = nguoiDung.find(u => u.id === msg.sender_id);
                                        msgSenderName = user?.ten || 'Người dùng không xác định';
                                    } else if (msg.sender_type === 'giangvien') {
                                        const lecturer = giangVien.find(gv => gv.id === msg.sender_id);
                                        msgSenderName = lecturer?.ten || 'Giảng viên không xác định';
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className={`p-2 rounded max-w-md ${
                                                isUserSender
                                                    ? 'bg-blue-600 self-start'
                                                    : isLecturerSender
                                                    ? 'bg-green-600 self-end'
                                                    : 'bg-gray-600'
                                            }`}
                                        >
                                            <p className="text-gray-200 font-bold">{msgSenderName}</p>
                                            <p className="text-gray-300">{msg.content}</p>
                                            <p className="text-gray-400 text-sm">{msg.timestamp}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col space-y-2 m-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    onClick={() => {
                                        setSelectedTinNhan(item);
                                        setEditVisible(true);
                                    }}
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => HandleDelete(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    );
                })}
            </section>

            {isEditVisible && selectedTinNhan && (
                <EditTinNhan
                    onClose={() => setEditVisible(false)}
                    selectedTinNhan={selectedTinNhan}
                    csrfToken={csrfToken}
                    giangVien={giangVien}
                    nguoiDung={nguoiDung}
                />
            )}

            {isAddVisible && (
                <AddTinNhan
                    onClose={() => setAddVisible(false)}
                    csrfToken={csrfToken}
                    giangVien={giangVien}
                    nguoiDung={nguoiDung}
                    refreshData={() => fetchData(`http://127.0.0.1:8000/admin-api/showAllNhanTin`, setNhanTin)}
                />
            )}

            <ToastContainer />
        </>
    );
};





const EditTinNhan = ({ onClose, selectedTinNhan, csrfToken, giangVien, nguoiDung }) => {
    const [activeTab, setActiveTab] = useState('nguoidung');

    const [userFormData, setUserFormData] = useState({
        noidung: '',
        id_nguoidung: '',
        id_giangvien: '',
    });

    const [lecturerFormData, setLecturerFormData] = useState({
        noidung: '',
        id_nguoidung: '',
        id_giangvien: '',
    });

    useEffect(() => {
        if (selectedTinNhan) {
            const messages = JSON.parse(selectedTinNhan.noidung);
            const lastMessage = messages[messages.length - 1];
            const senderType = lastMessage.sender_type;

            if (senderType === 'nguoidung') {
                setActiveTab('nguoidung');
                setUserFormData({
                    noidung: messages.map(msg => msg.content).join('\n'),
                    id_nguoidung: selectedTinNhan.id_nguoidung || '',
                    id_giangvien: selectedTinNhan.id_giangvien || '',
                });
            } else if (senderType === 'giangvien') {
                setActiveTab('giangvien');
                setLecturerFormData({
                    noidung: messages.map(msg => msg.content).join('\n'),
                    id_nguoidung: selectedTinNhan.id_nguoidung || '',
                    id_giangvien: selectedTinNhan.id_giangvien || '',
                });
            }
        }
    }, [selectedTinNhan]);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLecturerChange = (e) => {
        const { name, value } = e.target;
        setLecturerFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateUserForm = () => {
        if (!userFormData.noidung || !userFormData.id_nguoidung || !userFormData.id_giangvien) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
        return true;
    };

    const validateLecturerForm = () => {
        if (!lecturerFormData.noidung || !lecturerFormData.id_nguoidung || !lecturerFormData.id_giangvien) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
        return true;
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        if (!validateUserForm()) return;

        const updatedFormData = {
            noidung: JSON.stringify([
                {
                    sender_id: parseInt(userFormData.id_nguoidung, 10),
                    receiver_id: parseInt(userFormData.id_giangvien, 10),
                    content: userFormData.noidung,
                    timestamp: new Date().toISOString(),
                    sender_type: 'nguoidung',
                },
            ]),
            id_nguoidung: parseInt(userFormData.id_nguoidung, 10),
            id_giangvien: parseInt(userFormData.id_giangvien, 10),
        };

        try {
            const response = await fetch(`/admin-api/updateNhanTin/${selectedTinNhan.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(updatedFormData),
            });
            if (response.ok) {
                toast.success('Cập nhật tin nhắn thành công từ Người dùng!');
                onClose();
                window.location.reload();
            } else {
                toast.error('Cập nhật tin nhắn thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
            toast.error('Cập nhật tin nhắn thất bại!');
        }
    };

    const handleLecturerSubmit = async (e) => {
        e.preventDefault();

        if (!validateLecturerForm()) return;

        const updatedFormData = {
            noidung: JSON.stringify([
                {
                    sender_id: parseInt(lecturerFormData.id_giangvien, 10),
                    receiver_id: parseInt(lecturerFormData.id_nguoidung, 10),
                    content: lecturerFormData.noidung,
                    timestamp: new Date().toISOString(),
                    sender_type: 'giangvien',
                },
            ]),
            id_nguoidung: parseInt(lecturerFormData.id_nguoidung, 10),
            id_giangvien: parseInt(lecturerFormData.id_giangvien, 10),
        };

        try {
            const response = await fetch(`/admin-api/updateNhanTin/${selectedTinNhan.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(updatedFormData),
            });
            if (response.ok) {
                toast.success('Cập nhật tin nhắn thành công từ Giảng viên!');
                onClose();
                window.location.reload();
            } else {
                toast.error('Cập nhật tin nhắn thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
            toast.error('Cập nhật tin nhắn thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-gray-900 rounded-lg shadow">
                    <div className="p-4">
                        <h2 className="text-white text-xl mb-4">Chỉnh sửa Tin Nhắn</h2>
                        <div className="flex space-x-4 mb-4">
                            <button
                                className={`px-4 py-2 rounded-lg ${
                                    activeTab === 'nguoidung' ? 'bg-blue-700' : 'bg-blue-500'
                                } text-white`}
                                onClick={() => setActiveTab('nguoidung')}
                            >
                                Người dùng
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg ${
                                    activeTab === 'giangvien' ? 'bg-blue-700' : 'bg-blue-500'
                                } text-white`}
                                onClick={() => setActiveTab('giangvien')}
                            >
                                Giảng viên
                            </button>
                        </div>
                    </div>

                    {activeTab === 'nguoidung' && (
                        <form onSubmit={handleUserSubmit}>
                            <div className="p-4">
                                <label className="block text-white">Người dùng:</label>
                                <select
                                    name="id_nguoidung"
                                    value={userFormData.id_nguoidung}
                                    onChange={handleUserChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                    required
                                >
                                    <option value="">Chọn người dùng</option>
                                    {nguoiDung.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.ten}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="p-4">
                                <label className="block text-white">Giảng viên:</label>
                                <select
                                    name="id_giangvien"
                                    value={userFormData.id_giangvien}
                                    onChange={handleUserChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
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

                            <div className="p-4">
                                <label className="block text-white">Nội dung:</label>
                                <textarea
                                    name="noidung"
                                    value={userFormData.noidung}
                                    onChange={handleUserChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                    required
                                />
                            </div>

                            <div className="p-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Cập nhật từ Người dùng
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'giangvien' && (
                        <form onSubmit={handleLecturerSubmit}>
                            <div className="p-4">
                                <label className="block text-white">Giảng viên:</label>
                                <select
                                    name="id_giangvien"
                                    value={lecturerFormData.id_giangvien}
                                    onChange={handleLecturerChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
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

                            <div className="p-4">
                                <label className="block text-white">Người dùng:</label>
                                <select
                                    name="id_nguoidung"
                                    value={lecturerFormData.id_nguoidung}
                                    onChange={handleLecturerChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                    required
                                >
                                    <option value="">Chọn người dùng</option>
                                    {nguoiDung.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.ten}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="p-4">
                                <label className="block text-white">Nội dung:</label>
                                <textarea
                                    name="noidung"
                                    value={lecturerFormData.noidung}
                                    onChange={handleLecturerChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                    required
                                />
                            </div>

                            <div className="p-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Cập nhật từ Giảng viên
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};











const AddTinNhan = ({ onClose, csrfToken, giangVien, nguoiDung, refreshData }) => {
    const [activeTab, setActiveTab] = useState('nguoidung');

    const [userFormData, setUserFormData] = useState({
        noidung: '',
        id_giangvien: '',
        id_nguoidung: '',
    });

    const [lecturerFormData, setLecturerFormData] = useState({
        noidung: '',
        id_giangvien: '',
        id_nguoidung: '',
    });

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLecturerChange = (e) => {
        const { name, value } = e.target;
        setLecturerFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateUserForm = () => {
        if (!userFormData.noidung || !userFormData.id_giangvien || !userFormData.id_nguoidung) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
        return true;
    };

    const validateLecturerForm = () => {
        if (!lecturerFormData.noidung || !lecturerFormData.id_nguoidung || !lecturerFormData.id_giangvien) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
        return true;
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        if (!validateUserForm()) return;

        const giangvienId = parseInt(userFormData.id_giangvien, 10);
        const nguoidungId = parseInt(userFormData.id_nguoidung, 10);

        const newFormData = {
            noidung: [
                {
                    sender_id: nguoidungId,
                    receiver_id: giangvienId,
                    content: userFormData.noidung,
                    timestamp: new Date().toISOString(),
                    sender_type: 'nguoidung',
                },
            ],
            id_nguoidung: nguoidungId,
            id_giangvien: giangvienId,
        };

        try {
            const response = await fetch(`/admin-api/addNhanTin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(newFormData),
            });
            if (response.ok) {
                toast.success('Thêm tin nhắn thành công từ Người dùng!');
                onClose();
                refreshData();
            } else {
                toast.error('Thêm tin nhắn thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu:', error);
            toast.error('Thêm tin nhắn thất bại!');
        }
    };

    const handleLecturerSubmit = async (e) => {
        e.preventDefault();

        if (!validateLecturerForm()) return;

        const giangvienId = parseInt(lecturerFormData.id_giangvien, 10);
        const nguoidungId = parseInt(lecturerFormData.id_nguoidung, 10);

        const newFormData = {
            noidung: [
                {
                    sender_id: giangvienId,
                    receiver_id: nguoidungId,
                    content: lecturerFormData.noidung,
                    timestamp: new Date().toISOString(),
                    sender_type: 'giangvien',
                },
            ],
            id_nguoidung: nguoidungId,
            id_giangvien: giangvienId,
        };

        try {
            const response = await fetch(`/admin-api/addNhanTin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(newFormData),
            });
            if (response.ok) {
                toast.success('Thêm tin nhắn thành công từ Giảng viên!');
                onClose();
                refreshData();
            } else {
                toast.error('Thêm tin nhắn thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu:', error);
            toast.error('Thêm tin nhắn thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-gray-900 rounded-lg shadow">
                    <div className="p-4">
                        <h2 className="text-white text-xl mb-4">Thêm Tin Nhắn</h2>
                        <div className="flex space-x-4 mb-4">
                            <button
                                className={`px-4 py-2 rounded-lg ${
                                    activeTab === 'nguoidung' ? 'bg-blue-700' : 'bg-blue-500'
                                } text-white`}
                                onClick={() => setActiveTab('nguoidung')}
                            >
                                Người dùng
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg ${
                                    activeTab === 'giangvien' ? 'bg-blue-700' : 'bg-blue-500'
                                } text-white`}
                                onClick={() => setActiveTab('giangvien')}
                            >
                                Giảng viên
                            </button>
                        </div>
                    </div>

                    {activeTab === 'nguoidung' && (
                        <form onSubmit={handleUserSubmit}>
                            <div className="p-4">
                                <label className="block text-white">Người dùng:</label>
                                <select
                                    name="id_nguoidung"
                                    value={userFormData.id_nguoidung}
                                    onChange={handleUserChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                    required
                                >
                                    <option value="">Chọn người dùng</option>
                                    {nguoiDung.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.ten}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="p-4">
                                <label className="block text-white">Giảng viên:</label>
                                <select
                                    name="id_giangvien"
                                    value={userFormData.id_giangvien}
                                    onChange={handleUserChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
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

                            <div className="p-4">
                                <label className="block text-white">Nội dung:</label>
                                <textarea
                                    name="noidung"
                                    value={userFormData.noidung}
                                    onChange={handleUserChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                    required
                                />
                            </div>

                            <div className="p-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Thêm từ Người dùng
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'giangvien' && (
                        <form onSubmit={handleLecturerSubmit}>
                            <div className="p-4">
                                <label className="block text-white">Giảng viên:</label>
                                <select
                                    name="id_giangvien"
                                    value={lecturerFormData.id_giangvien}
                                    onChange={handleLecturerChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
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

                            <div className="p-4">
                                <label className="block text-white">Người dùng:</label>
                                <select
                                    name="id_nguoidung"
                                    value={lecturerFormData.id_nguoidung}
                                    onChange={handleLecturerChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                    required
                                >
                                    <option value="">Chọn người dùng</option>
                                    {nguoiDung.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.ten}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="p-4">
                                <label className="block text-white">Nội dung:</label>
                                <textarea
                                    name="noidung"
                                    value={lecturerFormData.noidung}
                                    onChange={handleLecturerChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700"
                                    required
                                />
                            </div>

                            <div className="p-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Thêm từ Giảng viên
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};



export default NhanTin;