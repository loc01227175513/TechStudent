import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cloudName = 'dn7s1su66';
const uploadPreset = 'my_unsigned_preset';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const TheLoai = () => {
    const [theloai, setTheloai] = useState([]);
    const [selectedTheLoai, setSelectedTheLoai] = useState(null);
    const [formData, setFormData] = useState({ ten: '', hinh: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/theloai')
            .then(response => response.json())
            .then(data => {
                setTheloai(data.data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(theloai);

    const handleEditClick = (item) => {
        setSelectedTheLoai(item);
        setFormData({ ten: item.ten, hinh: item.hinh });
    };

    const handleAddClick = () => {
        setIsAdding(true);
        setFormData({ ten: '', hinh: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isAdding) {
            ThemTheLoai(formData);
        } else {
            ChinhSuaTheLoai(selectedTheLoai.id, formData);
        }
    };

    const handleCloseDetail = () => {
        setSelectedTheLoai(null);
        setIsAdding(false);
    };

    const ChinhSuaTheLoai = (theloaiId, formData) => {
        fetch(`http://127.0.0.1:8000/admin-api/updateTheLoai/${theloaiId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setTheloai(prevState => prevState.map(item => item.id === theloaiId ? data.data : item));
                setSelectedTheLoai(null);
                toast.success('Chỉnh sửa thành công');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Có lỗi xảy ra');
            });
    };

    const ThemTheLoai = (formData) => {
        fetch('http://127.0.0.1:8000/admin-api/addTheLoai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setTheloai(prevState => [...prevState, data.data]);
                setIsAdding(false);
                toast.success('Thêm thể loại thành công');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Có lỗi xảy ra');
            });
    };

    const XoaTheLoai = (theloaiId) => {
        fetch(`http://127.0.0.1:8000/admin-api/deleteTheLoai/${theloaiId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setTheloai(prevState => prevState.filter(item => item.id !== theloaiId));
                toast.success('Xóa thể loại thành công');
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Có lỗi xảy ra');
            });
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Thể Loại</h1>
                <p className="text-gray-400">Danh sách thể loại</p>
            </section>

            <section className="p-4 space-y-4">
                <button onClick={handleAddClick} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Thêm Thể Loại</button>
                {theloai.map((item, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <div className="flex">
                                <div className="w-1/2">
                                    <p className="text-lg font-semibold">Mã Thể Loại: {item.id}</p>
                                    <p className="text-gray-400">Tên Thể Loại : {item.ten}</p>
                                </div>
                                <div className="w-1/2">
                                    <img src={item.hinh} alt="" className='w-20 m-5 float-end rounded-full' />
                                </div>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => XoaTheLoai(item.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {(selectedTheLoai || isAdding) && (
                <EditCourseForm
                    theloaiId={selectedTheLoai ? selectedTheLoai.id : null}
                    formData={formData}
                    setFormData={setFormData}
                    onClose={handleCloseDetail}
                    ChinhSuaTheLoai={ChinhSuaTheLoai}
                    ThemTheLoai={ThemTheLoai}
                    cloudName={cloudName}
                    uploadPreset={uploadPreset}
                    isAdding={isAdding}
                />
            )}
            <ToastContainer />
        </>
    );
};

const EditCourseForm = ({ theloaiId, formData, setFormData, onClose, ChinhSuaTheLoai, ThemTheLoai, cloudName, uploadPreset, isAdding }) => {
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState(formData.hinh || '');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageSelected(file);
    };

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
            if (isAdding) {
                ThemTheLoai({ ...formData, hinh: data.secure_url });
            } else {
                ChinhSuaTheLoai(theloaiId, { ...formData, hinh: data.secure_url });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (imageSelected) {
            uploadImage();
        } else {
            if (isAdding) {
                ThemTheLoai(formData);
            } else {
                ChinhSuaTheLoai(theloaiId, formData);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-700">Tên Thể Loại</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten}
                                onChange={handleChange}
                                className="mt-1 block w-full border bg-black border-gray-300 rounded-md shadow-sm"
                            />
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
                        </div>
                        <div className="p-4 flex justify-end space-x-2">
                            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Hủy</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TheLoai;