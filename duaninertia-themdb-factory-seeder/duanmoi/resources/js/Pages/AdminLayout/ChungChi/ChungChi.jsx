import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cloudName = 'dn7s1su66';
const uploadPreset = 'my_unsigned_preset';

const ChungChi = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [chungChiList, setChungChiList] = useState([]);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [selectedChungChi, setSelectedChungChi] = useState(null);
    const [isAddVisible, setIsAddVisible] = useState(false);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
        fetch(`http://127.0.0.1:8000/admin-api/showAllChungChi`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setChungChiList(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [csrfToken]);

    const handleEditClick = (chungChi) => {
        setSelectedChungChi(chungChi);
        setIsEditVisible(true);
    };

    const handleCloseEditChungChi = () => {
        setIsEditVisible(false);
        setSelectedChungChi(null);
    };

    const handleAddClick = () => {
        setIsAddVisible(true);
    };

    const handleCloseAddChungChi = () => {
        setIsAddVisible(false);
    };

    const handleDeleteClick = (id) => {
        fetch(`http://127.0.0.1:8000/admin-api/deleteChungChi/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        })
            .then(response => response.json())
            .then(data => {
                setChungChiList(prev => prev.filter(item => item.id !== id));
                toast.success('Xóa chứng chỉ thành công');
            })
            .catch(error => {
                console.error('Error deleting data:', error);
                toast.error('Có lỗi xảy ra khi xóa chứng chỉ.');
            });
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Người Dùng</h1>
                <p className="text-gray-400">Danh sách người dùng</p>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Thêm Chứng Chỉ</button>
            </section>

            <section className="p-4 space-y-4">
                {chungChiList.map((item) => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div className='flex w-[600px]'>
                            <div className="w-1/2 space-y-2">
                                <p className="text-lg font-semibold text-white">Mã Chứng Chỉ: {item.id}</p>
                                <p className="text-gray-400">Tên Giấy Chứng Nhận: {item.ten}</p>
                                <p className="text-gray-400">Phát Hành Bởi: {item.phathanhboi}</p>
                                <p className="text-gray-400">Hiệu Lực: {item.hieuluc}</p>
                                <p className="text-gray-400">Loại: {item.loai}</p>
                                <p className="text-gray-400">Ngày Tạo: {item.created_at}</p>
                            </div>
                            <div className="w-1/2 flex justify-center items-center">
                                <img src={item.giaychungnhan} className='w-20 h-20 object-cover rounded-full' alt="Giấy chứng nhận" />
                            </div>
                        </div>
                        <div className="space-x-2 p-2 flex">
                            <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>

            {isEditVisible && <EditChungChi chungChi={selectedChungChi} onClose={handleCloseEditChungChi} csrfToken={csrfToken} />}

            {isAddVisible && <AddChungChi onClose={handleCloseAddChungChi} csrfToken={csrfToken} />}

            <ToastContainer />
        </>
    );
};

const AddChungChi = ({ onClose, csrfToken }) => {
    const [formData, setFormData] = useState({
        ten: '',
        phathanhboi: '',
        hieuluc: '',
        loai: '',
        giaychungnhan: ''
    });
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageSelected(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!imageSelected) return null;

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
            return null;
        }
    };

    const handleAddChungChi = async (e) => {
        e.preventDefault();
        const uploadedImageUrl = await handleImageUpload();
        if (!uploadedImageUrl) return;

        const newChungChi = { ...formData, giaychungnhan: uploadedImageUrl };

        fetch(`http://127.0.0.1:8000/admin-api/addChungChi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(newChungChi)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                toast.success('Chứng chỉ đã được thêm thành công!');
                onClose();
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Có lỗi xảy ra khi thêm chứng chỉ.');
            });
    };


    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-slate-700 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Thêm Chứng Chỉ</h2>
                <form onSubmit={handleAddChungChi}>
                    <div className="mb-4">
                        <label className="block   text-white">Tên Giấy Chứng Nhận</label>
                        <input type="text" name="ten" value={formData.ten} onChange={handleInputChange} className="w-full p-2 bg-black border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Phát Hành Bởi</label>
                        <input type="text" name="phathanhboi" value={formData.phathanhboi} onChange={handleInputChange} className="w-full bg-black p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Hiệu Lực</label>
                        <input
                            type="date"
                            name="hieuluc"
                            value={formData.hieuluc}
                            onChange={handleInputChange}
                            className="w-full bg-black p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            name="loai"
                            value={formData.loai}
                            onChange={handleInputChange}
                            className="w-full bg-black p-2 border rounded text-white"
                            required
                        >
                            <option value="" disabled>Chọn loại</option>
                            <option value="landscape">Landscape</option>
                            <option value="portrait">Portrait</option>
                        </select>


                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Giấy Chứng Nhận</label>
                        <input type="file" name="giaychungnhan" onChange={handleFileChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Hủy</button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const EditChungChi = ({ onClose, chungChi, csrfToken }) => {
    const [formData, setFormData] = useState({
        ten: chungChi?.ten || '',
        phathanhboi: chungChi?.phathanhboi || '',
        hieuluc: chungChi?.hieuluc || '',
        giaychungnhan: chungChi?.giaychungnhan || '',
        id_khoahoc: chungChi?.id_khoahoc || '',
        id_nguoidung: chungChi?.id_nguoidung || '',
        id_chungchi: chungChi?.id_chungchi || '',
        loai: chungChi?.loai || ''
    });
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState(chungChi?.giaychungnhan || '');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageSelected(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!imageSelected) return null;

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
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFormData = { ...formData, giaychungnhan: imageUrl || formData.giaychungnhan };
        try {
            const response = await fetch(`/admin-api/updateChungChi/${chungChi.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(updatedFormData)
            });
            if (response.ok) {
                toast.success('Chứng chỉ đã được cập nhật thành công!');
                onClose();
                window.location.reload();
            } else {
                toast.error('Cập nhật chứng chỉ thất bại!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Cập nhật chứng chỉ thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tên Chứng Chỉ</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten}
                                onChange={handleChange}
                                className="mt-1 block w-full border bg-black border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Phát Hành Bởi</label>
                            <input
                                type="text"
                                name="phathanhboi"
                                value={formData.phathanhboi}
                                onChange={handleChange}
                                className='bg-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                required />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Hiệu Lực</label>
                            <input
                                type="date"
                                name="hieuluc"
                                value={formData.hieuluc}
                                onChange={handleChange}
                                className='bg-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                required />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Loại</label>
                            <select
                                name="loai"
                                value={formData.loai}
                                onChange={handleChange}
                                className="w-full bg-black p-2 border rounded text-white"
                                required
                            >
                                <option value="" disabled>Chọn loại</option>
                                <option value="landscape">Landscape</option>
                                <option value="portrait">Portrait</option>
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Giấy Chứng Nhận</label>
                            <input
                                type="file"
                                name="giaychungnhan"
                                onChange={handleFileChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            {imageUrl && <img src={imageUrl} alt="Selected" className="mt-2 w-20 h-20 rounded-full" />}
                            <button type="button" onClick={handleImageUpload} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                                Upload hình
                            </button>
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


export default ChungChi;