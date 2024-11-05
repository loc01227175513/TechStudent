import React, { useEffect, useState } from 'react';

const AddCourse = ({ close, uploadPreset, cloudName, csrfToken, setTatCaKhoaHoc, setError, setLoading }) => {
    const [imageSelected, setImageSelected] = useState(null);
    const [theLoai, setTheLoai] = useState([]);
    const [subTheLoai, setSubTheLoai] = useState([]);
    const [chudeOptions, setChudeOptions] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const [formData, setFormData] = useState({
        ten: '',
        hinh: '',
        gia: '',
        giamgia: '',
        id_chude: '',
        id_theloai: '',
        id_theloaicon: '',
        id_giangvien: '',
        mota: '',
    });

    useEffect(() => {
        const fetchTheLoai = async () => {
            const response = await fetch('/api/theloai');
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setTheLoai(data.data);
        };

        const fetchLecturers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/admin-api/tatcagiangvien');
                if (!response.ok) throw new Error('Failed to fetch lecturers');
                const data = await response.json();
                setLecturers(data);
            } catch (error) {
                setLecturers([]);
                setError('Failed to fetch lecturers');
            }
        };

        fetchTheLoai();
        fetchLecturers();
    }, [setError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageSelected(file);
        setIsImageUploaded(false);
    };

    const uploadImage = async () => {
        if (!imageSelected) {
            setError("No image selected for upload.");
            return;
        }
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
            setFormData(prevFormData => ({
                ...prevFormData,
                hinh: data.secure_url,
            }));
            setIsImageUploaded(true);
        } catch (error) {
            setError("Image upload failed.");
        }
    };

    const handleTheLoaiChange = (e) => {
        const selectedId = e.target.value;
        setFormData({
            ...formData,
            id_theloai: selectedId,
            id_theloaicon: '',
            id_chude: '',
        });

        const selectedCategory = theLoai.find(item => item.id === Number(selectedId));
        if (selectedCategory) {
            setSubTheLoai(selectedCategory.theloaicons);
            setChudeOptions([]);
        }
    };

    const handleSubTheLoaiChange = (e) => {
        const selectedSubId = e.target.value;
        setFormData({
            ...formData,
            id_theloaicon: selectedSubId,
            id_chude: '', // Reset topic when sub-category changes
        });

        const selectedSubCategory = subTheLoai.find(item => item.id === Number(selectedSubId));
        if (selectedSubCategory) {
            setChudeOptions(selectedSubCategory.chudes);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (imageSelected && !isImageUploaded) await uploadImage();

            const response = await fetch(`http://127.0.0.1:8000/admin-api/addCourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to add course');
            const data = await response.json();
            setTatCaKhoaHoc(data.data);
            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto">
            <div className="relative p-4 flex h-screen scroll-m-0">
                <div className="relative bg-gray-50 rounded-lg shadow dark:bg-gray-800 overflow-y-auto max-h-full">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Thêm khóa học mới
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto" onClick={close}>
                            <span className="sr-only">Close modal</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Tên khóa học</label>
                            <input type="text" name="ten" value={formData.ten} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                        </div>
                        <div className="flex">
                            <div className="w-1/2 p-5">
                                <label className="block text-gray-700 dark:text-gray-400">Giá</label>
                                <input type="text" name="gia" value={formData.gia} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                            </div>
                            <div className="w-1/2 p-5">
                                <label className="block text-gray-700 dark:text-gray-400">Giảm Giá</label>
                                <input type="text" name="giamgia" value={formData.giamgia} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                            </div>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Thể Loại</label>
                            <select name="id_theloai" value={formData.id_theloai} onChange={handleTheLoaiChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option value="">Chọn thể loại</option>
                                {theLoai.map(theLoaiItem => (
                                    <option key={theLoaiItem.id} value={theLoaiItem.id}>{theLoaiItem.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Thể Loại Con</label>
                            <select name="id_theloaicon" value={formData.id_theloaicon} onChange={handleSubTheLoaiChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option value="">Chọn thể loại con</option>
                                {subTheLoai.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Chủ Đề</label>
                            <select name="id_chude" value={formData.id_chude} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option value="">Chọn chủ đề</option>
                                {chudeOptions.map(chudeItem => (
                                    <option key={chudeItem.id} value={chudeItem.id}>{chudeItem.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Giảng Viên</label>
                            <select name="id_giangvien" value={formData.id_giangvien} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <option value="">Chọn giảng viên</option>
                                {lecturers && lecturers.map(lecturer => (
                                    <option key={lecturer.id} value={lecturer.id}>{lecturer.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Mô tả</label>
                            <textarea name="mota" value={formData.mota} onChange={handleChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"></textarea>
                        </div>
                        <div className="p-5">
                            <label className="block text-gray-700 dark:text-gray-400">Hình ảnh</label>
                            <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                            <button type="button" onClick={uploadImage} className="mt-2 text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">Upload Hình</button>
                        </div>
                        <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">Lưu</button>
                            <button type="button" className="text-white bg-gray-700 hover:bg-gray-800 px-5 py-2.5 rounded-lg ml-2" onClick={close}>Đóng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;