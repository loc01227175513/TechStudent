import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cloudName = 'dn7s1su66';
const uploadPreset = 'my_unsigned_preset';
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const TheLoaiCon = () => {
    const [theLoaiCon, setTheLoaiCon] = useState([]);
    const [theloai, setTheLoai] = useState([]);
    const [selectedTheLoai, setSelectedTheLoai] = useState(null);
    const [formData, setFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for the new modal

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/theloai')
            .then(response => response.json())
            .then(data => {
                setTheLoaiCon(data.data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/admin-api/showAllTheLoai')
            .then(response => response.json())
            .then(data => {
                setTheLoai(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(theloai);

    const handleCloseDetail = () => {
        setSelectedTheLoai(null);
        setFormData({});
        setIsEditModalOpen(false);
    };

    const handleEdit = (item) => {
        setSelectedTheLoai(item);
        setFormData(item);
        setIsEditModalOpen(true);
    };

    const ChinhSuaTheLoai = (id, updatedData) => {
        fetch(`http://127.0.0.1:8000/admin-api/updateTheLoaiCon/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                setTheLoaiCon(prev => prev.map(item => item.id === id ? data : item));
                handleCloseDetail();
                toast.success('Chỉnh sửa Thể Loại Con thành công');
                window.location.reload();
            })
            .catch(error => console.error('Error updating data:', error));
    };

    const ThemTheLoai = (newData) => {
        fetch('http://127.0.0.1:8000/admin-api/addTheLoaiCon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(newData)
        })
            .then(response => response.json())
            .then(data => {
                setTheLoaiCon(prev => [...prev, data]);
                handleCloseDetail();
                toast.success('Thêm Thể Loại Con thành công');
                window.location.reload();
            })
            .catch(error => console.error('Error adding data:', error));
    };

    const XoaTheLoai = (id) => {
        fetch(`http://127.0.0.1:8000/admin-api/deleteTheLoaiCon/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        })
            .then(response => response.json())
            .then(data => {
                setTheLoaiCon(prev => prev.filter(item => item.id !== id));
          
                toast.success('Xóa Thể Loại Con thành công');
                window.location.reload();
            })
            .catch(error => console.error('Error deleting data:', error));
    };

    const handleAddTheLoaiCon = () => {
        setIsAdding(true);
        setFormData({});
        setIsAddModalOpen(true); // Open the new modal
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Thể Loại Con</h1>
                <p className="text-gray-400">Danh sách thể loại con</p>
            </section>

            <section className="p-4 space-y-4">
                <button className="bg-blue-500 text-black px-4 py-2 rounded-lg" onClick={handleAddTheLoaiCon}>Thêm Thể Loại Con</button>
                {theLoaiCon.map((item) => (
                    item.theloaicons.map((subItem) => (
                        <div key={subItem.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                            <div className="flex">
                                <div className="w-1/2">
                                    <p className="text-lg font-semibold">Mã Thể Loại: {subItem.id}</p>
                                    <p className="text-gray-400">Tên Thể Loại Con: {subItem.ten}</p>
                                    <p className="text-gray-400">Thể Loại Cha: {item.ten}</p>
                                </div>
                                <div className="w-1/2">
                                    <img src={subItem.hinh} alt="" className='w-20 m-5 float-end rounded-full' />
                                </div>
                            </div>
                            <div className="space-x-2">
                                <button className="bg-blue-500 text-black px-4 py-2 rounded-lg" onClick={() => handleEdit(subItem)}>Chỉnh sửa</button>
                                <button className="bg-red-500 text-black px-4 py-2 rounded-lg" onClick={() => XoaTheLoai(subItem.id)}>Xóa</button>
                            </div>
                        </div>
                    ))
                ))}
            </section>

            {isEditModalOpen && (
                <EditTheLoaiCon
                    theloaiId={selectedTheLoai ? selectedTheLoai.id : null}
                    formData={formData}
                    setFormData={setFormData}
                    onClose={handleCloseDetail}
                    ChinhSuaTheLoai={ChinhSuaTheLoai}
                    ThemTheLoai={ThemTheLoai}
                    cloudName={cloudName}
                    uploadPreset={uploadPreset}
                    isAdding={isAdding}
                    theLoaiCon={theloai}
                />
            )}

            {isAddModalOpen && (
                <AddTheLoaiCon
                    onClose={() => setIsAddModalOpen(false)}
                    ThemTheLoai={ThemTheLoai}
                    cloudName={cloudName}
                    uploadPreset={uploadPreset}
                    theLoaiCon={theloai}
                />
            )}
             <ToastContainer />
        </>
    );
};


const EditTheLoaiCon = ({ theloaiId, formData, setFormData, onClose, ChinhSuaTheLoai, ThemTheLoai, cloudName, uploadPreset, isAdding, theLoaiCon }) => {
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState(formData.hinh || '');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const uploadImage = async () => {
        if (!imageSelected) return;

        const imageFormData = new FormData();
        imageFormData.append('file', imageSelected);
        imageFormData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: imageFormData,
            });
            const data = await response.json();
            setImageUrl(data.secure_url);
            setFormData((prev) => ({ ...prev, hinh: data.secure_url }));
            setIsImageUploaded(true);
            setImageSelected(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAdding) {
            ThemTheLoai(formData);
        } else {
            ChinhSuaTheLoai(theloaiId, formData);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{isAdding ? 'Thêm Thể Loại Con' : 'Chỉnh Sửa Thể Loại Con'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={formData.ten || ''}
                        onChange={(e) => setFormData({ ...formData, ten: e.target.value })}
                        placeholder="Tên Thể Loại"
                        className="mb-4 p-2 border rounded w-full bg-black"
                    />
                    <input
                        type="file"
                        onChange={(e) => setImageSelected(e.target.files[0])}
                        className="mb-4"
                    />
                    <select
                        value={formData.id_theloai || ''}
                        onChange={(e) => setFormData({ ...formData, id_theloai: e.target.value })}
                        className='bg-black mb-4 p-2 border rounded w-full'
                    >
                        {theLoaiCon.map((item) => (
                            <option key={item.id} className='bg-black' value={item.id}>{item.ten}</option>
                        ))}
                    </select>
                    <button type="button" onClick={uploadImage} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                        {isImageUploaded ? 'Cập nhật Hình' : 'Tải lên Hình'}
                    </button>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                        {isAdding ? 'Thêm' : 'Lưu'}
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Đóng</button>
                </form>
            </div>
        </div>
    );
};

const AddTheLoaiCon = ({ onClose, ThemTheLoai, cloudName, uploadPreset, theLoaiCon }) => {
    const [formData, setFormData] = useState({});
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const uploadImage = async () => {
        if (!imageSelected) return;

        const imageFormData = new FormData();
        imageFormData.append('file', imageSelected);
        imageFormData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: imageFormData,
            });
            const data = await response.json();
            setImageUrl(data.secure_url);
            setFormData((prev) => ({ ...prev, hinh: data.secure_url }));
            setIsImageUploaded(true);
            setImageSelected(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ThemTheLoai(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Thêm Thể Loại Con</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={formData.ten || ''}
                        onChange={(e) => setFormData({ ...formData, ten: e.target.value })}
                        placeholder="Tên Thể Loại"
                        className="mb-4 p-2 border rounded w-full bg-black"
                    />
                    <input
                        type="file"
                        onChange={(e) => setImageSelected(e.target.files[0])}
                        className="mb-4"
                    />
                    <select
                        value={formData.id_theloai || ''}
                        onChange={(e) => setFormData({ ...formData, id_theloai: e.target.value })}
                        className='bg-black mb-4 p-2 border rounded w-full'
                    >
                        {theLoaiCon.map((item) => (
                            <option key={item.id} className='bg-black' value={item.id}>{item.ten}</option>
                        ))}
                    </select>
                    <button type="button" onClick={uploadImage} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                        {isImageUploaded ? 'Cập nhật Hình' : 'Tải lên Hình'}
                    </button>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                        Thêm
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Đóng</button>
                </form>
            </div>
        </div>
    );
};



export default TheLoaiCon;