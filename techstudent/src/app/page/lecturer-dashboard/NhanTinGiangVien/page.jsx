// FILE: NhanTin.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DanhSachTinNhanGiangVien, GiangVienHientai, ShowAllNguoiDung } from '../../../../service/NhanTin/NhanTin';

const NhanTin = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [giangVien, setGiangVien] = useState([]);
    const [nguoiDung, setNguoiDung] = useState([]);
    const [nhantin, setNhanTin] = useState([]);
    const [isAddVisible, setAddVisible] = useState(false);

    const fetchMessages = () => {
        DanhSachTinNhanGiangVien().then((data) => {
            setNhanTin(data);
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Lỗi khi lấy dữ liệu!');
        });
    };

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        GiangVienHientai().then((data) => {
            setGiangVien(data);
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Lỗi khi lấy dữ liệu!');
        });
    }, []);

    useEffect(() => {
        ShowAllNguoiDung().then((data) => {
            setNguoiDung(data || []);
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Lỗi khi lấy dữ liệu!');
        });
    }, []);

    return (
        <> 
         <div className="overflow-y-scroll col-lg-9 h-lvh">
         <div className="right-sidebar-dashboard">
   
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
                    let messages = [];
                    try {
                        messages = JSON.parse(item.noidung);
                    } catch (e) {
                        console.error('Error parsing messages:', e);
                    }

                    const senderName = nguoiDung.find(nd => nd.id === item.id_nguoidung)?.ten 
                                       || giangVien.find(gv => gv.id === item.id_giangvien)?.ten 
                                       || 'Không xác định';
                    const receiverName = giangVien.find(gv => gv.id === item.id_giangvien)?.ten 
                                         || nguoiDung.find(nd => nd.id === item.id_nguoidung)?.ten 
                                         || 'Không xác định';

                    return (
                        <div key={item.id} className="bg-gray-800 p-6 rounded-lg flex flex-col">
                            <p className="text-lg font-semibold text-white">Mã Tin Nhắn: {item.id}</p>

                            <div className="flex flex-col space-y-2 mt-2">
                                {messages.map((msg, index) => {
                                    const isUserSender = msg.sender_type === 'nguoidung';
                                    const isLecturerSender = msg.sender_type === 'giangvien';

                                    let msgSenderName = 'Không xác định';

                                    if (isUserSender) {
                                        msgSenderName = nguoiDung.find(nd => nd.id === msg.sender_id)?.ten || 'Người dùng không xác định';
                                    } else if (isLecturerSender) {
                                        msgSenderName = giangVien.find(gv => gv.id === msg.sender_id)?.ten || 'Giảng viên không xác định';
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className={`p-2 rounded max-w-md ${isUserSender
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
                        </div>
                    );
                })}
            </section>
            {isAddVisible && (
                <AddTinNhan
                    onClose={() => setAddVisible(false)}
                    csrfToken={csrfToken}
                    giangVien={giangVien}
                    nguoiDung={nguoiDung}
                    refreshData={fetchMessages}
                />
            )}

            <ToastContainer />
        </div>
    </div>

        </>

    );

};

const AddTinNhan = ({ onClose, csrfToken, giangVien, nguoiDung, refreshData }) => {
    const [activeTab, setActiveTab] = useState('giangvien');

    const [lecturerFormData, setLecturerFormData] = useState({
        noidung: '',
        id_nguoidung: '',
    });

    const handleLecturerChange = (e) => {
        const { name, value } = e.target;
        setLecturerFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateLecturerForm = () => {
        if (!lecturerFormData.noidung || !lecturerFormData.id_nguoidung) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
        return true;
    };

    const handleLecturerSubmit = async (e) => {
        e.preventDefault();

        if (!validateLecturerForm()) return;

        const giangvienId = giangVien[0]?.id || '';
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
            const response = await fetch(`http://127.0.0.1:8000/api/addNhanTin`, {
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
                                className={`px-4 py-2 rounded-lg ${activeTab === 'giangvien' ? 'bg-green-700' : 'bg-green-500'} text-white`}
                                onClick={() => setActiveTab('giangvien')}
                            >
                                Giảng viên
                            </button>
                        </div>
                    </div>
                    {activeTab === 'giangvien' && (
                        <form onSubmit={handleLecturerSubmit}>
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
                                    {nguoiDung.map((nd) => (
                                        <option key={nd.id} value={nd.id}>
                                            {nd.ten}
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
    )
};

export default NhanTin;