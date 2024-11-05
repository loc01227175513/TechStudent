import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cloudName = 'dn7s1su66';
const uploadPreset = 'my_unsigned_preset';

const ChuDe = () => {
    const [TheLoaiCon, setTheLoaiCon] = useState([]);
    const [selectedTheLoaiCon, setSelectedTheLoaiCon] = useState(null);
    const [ChuDeNe, setChuDe] = useState([]);
    const [TheLoaiConWhithChuDe, setTheLoaiConWhithChuDe] = useState([]);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [selectedChuDe, setSelectedChuDe] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        const fetchData = async () => {
            try {
                const [chuDeRes, theLoaiConRes] = await Promise.all([
                    fetch('http://127.0.0.1:8000/api/theloai'),
                    fetch('http://127.0.0.1:8000/admin-api/showAllTheLoaiCon'),
                ]);
                const chuDeData = await chuDeRes.json();
                const theLoaiConData = await theLoaiConRes.json();

                const newChuDe = [];
                const newTheLoaiCon = [];

                chuDeData.data.forEach(item => {
                    item.theloaicons.forEach(theloaiCon => {
                        newTheLoaiCon.push(theloaiCon);
                        theloaiCon.chudes.forEach(chude => {
                            newChuDe.push({ ...chude, theLoaiConTen: theloaiCon.ten });
                        });
                    });
                });

                setTheLoaiConWhithChuDe(newTheLoaiCon);
                setChuDe(newChuDe);
                setTheLoaiCon(theLoaiConData);

            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to fetch data.');
            }
        };

        fetchData();
    }, []);

    const handleCloseEditChuDe = () => {
        setSelectedChuDe(null);
        setIsEditVisible(false);
    };

    const handleCloseAddChuDe = () => {
        setIsAddVisible(false);
    };

    const handleEdit = (subItem) => {
        setSelectedChuDe(subItem);
        setIsEditVisible(true);
    };

    const handleAdd = () => {
        setIsAddVisible(true);
    };

    const XoaTheLoai = (id) => {
        fetch(`http://127.0.0.1:8000/admin-api/deleteChuDe/${id}`, {
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

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Chủ Đề</h1>
                <p className="text-gray-400">Danh sách chủ đề</p>
            </section>

            <section className="p-4 space-y-4">
                <button className="bg-blue-500 text-black px-4 py-2 rounded-lg" onClick={handleAdd}>Thêm Chủ đề</button>
                {ChuDeNe.map((subItem) => (
                    <div key={subItem.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex">
                            <div className="w-1/2">
                                <p className="text-lg font-semibold">Mã Chủ Đề: {subItem.id}</p>
                                <p className="text-gray-400">Tên Chủ Đề: {subItem.ten}</p>
                                <p className="text-gray-400">Thể Loại Cha: {subItem.theLoaiConTen}</p>
                            </div>
                            <div className="w-1/2">
                                <img src={subItem.hinh} alt="Đang Tải" className='w-20 m-5 float-end rounded-full' />
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button className="bg-blue-500 text-black px-4 py-2 rounded-lg" onClick={() => handleEdit(subItem)}>Chỉnh sửa</button>
                            <button className="bg-red-500 text-black px-4 py-2 rounded-lg" onClick={() => XoaTheLoai(subItem.id)}>Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && <EditChuDe ChuDeNe={selectedChuDe} TheLoaiCon={TheLoaiCon} onClose={handleCloseEditChuDe} csrfToken={csrfToken} />}
            {isAddVisible && <AddChuDe TheLoaiCon={TheLoaiCon} onClose={handleCloseAddChuDe} csrfToken={csrfToken} />}
            <ToastContainer />
        </>
    );
};
const EditChuDe = ({ TheLoaiCon, onClose, ChuDeNe, csrfToken }) => {
    const [formData, setFormData] = useState({
        ten: ChuDeNe?.ten || '',
        hinh: ChuDeNe?.hinh || '',
        mota: ChuDeNe?.mota || '',
        id_theloaicon: ChuDeNe?.id_theloaicon || ''
    });
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState(ChuDeNe?.hinh || '');

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

        const updatedFormData = { ...formData, hinh: imageUrl || formData.hinh };
        try {
            const response = await fetch(`/admin-api/updateChuDe/${ChuDeNe.id}`, {
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
                            <label className="block text-sm font-medium text-white">Tên Thể Loại</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten}
                                onChange={handleChange}
                                className="mt-1 block w-full border bg-black border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Mô Tả</label>
                            <input
                                type="text"
                                name="mota"
                                value={formData.mota}
                                onChange={handleChange}
                                className='bg-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                required />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Hình</label>
                            <input
                                type="file"
                                name="hinh"
                                onChange={handleFileChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            {imageUrl && <img src={imageUrl} alt="Selected" className="mt-2 w-20 h-20 rounded-full" />}
                            <button type="button" onClick={handleImageUpload} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                                UpLoad hình
                            </button>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Thể Loại Con</label>
                            <select className='bg-black' name="id_theloaicon" value={formData.id_theloaicon} onChange={handleChange}>
                                <option value={formData.id_theloaicon} disabled>{TheLoaiCon.find(item => item.id === formData.id_theloaicon)?.ten || 'Chọn Thể Loại Con'}</option>
                                {TheLoaiCon.map((item) => (
                                    <option key={item.id} value={item.id}>{item.ten}</option>
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

const AddChuDe = ({ TheLoaiCon, onClose, csrfToken }) => {
    const [formData, setFormData] = useState({
        ten: '',
        hinh: '',
        mota: '',
        id_theloaicon: ''
    });
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

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

        const updatedFormData = { ...formData, hinh: imageUrl || formData.hinh };
        try {
            const response = await fetch('/admin-api/createChuDe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(updatedFormData)
            });
            if (response.ok) {
                toast.success('Chủ đề đã được thêm thành công!');

                onClose();
                window.location.reload();
            } else {
                toast.error('Thêm chủ đề thất bại!');
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast.error('Thêm chủ đề thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tên Thể Loại</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten}
                                onChange={handleChange}
                                className="mt-1 block w-full border bg-black border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Mô Tả</label>
                            <input
                                type="text"
                                name="mota"
                                value={formData.mota}
                                onChange={handleChange}
                                className='bg-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                required />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Hình</label>
                            <input
                                type="file"
                                name="hinh"
                                onChange={handleFileChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                            {imageUrl && <img src={imageUrl} alt="Selected" className="mt-2 w-20 h-20 rounded-full" />}
                            <button type="button" onClick={handleImageUpload} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                                UpLoad hình
                            </button>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Thể Loại Con</label>
                            <select className='bg-black' name="id_theloaicon" value={formData.id_theloaicon} onChange={handleChange}>
                                {TheLoaiCon.map((item) => (
                                    <option key={item.id} value={item.id}>{item.ten}</option>
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

export default ChuDe;