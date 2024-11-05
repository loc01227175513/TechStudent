// JavaScript
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';LoTrinhKhoaHocCon
import LoTrinhKhoaHocCon from './KhoaHocLotrinh';
const cloudName = 'dn7s1su66';
const uploadPreset = 'my_unsigned_preset';

const LoTrinhKhoaHoc = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [loTrinhKhoaHocList, setLoTrinhKhoaHocList] = useState([]);
    const [loTrinhKhoaHocConList, setLoTrinhKhoaHocConList] = useState([]);
    const [isAddLoTrinhVisible, setAddLoTrinhVisible] = useState(false);
    const [isAddKhoaHocLoTrinhVisible, setAddKhoaHocLoTrinhVisible] = useState(false);

    const [courses, setCourses] = useState([]);
    const [selectedLoTrinhKhoaHoc, setSelectedLoTrinhKhoaHoc] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        fetchData();
        fetchCourses();
        fetchDataCon();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/lotrinhkhoahoc');
            const data = await response.json();
            setLoTrinhKhoaHocList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };
    const fetchDataCon = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/lotrinhkhoahoccon');
            const data = await response.json();
            setLoTrinhKhoaHocConList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };
    const fetchCourses = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/Tatcakhoahoc');
            const data = await response.json();
            setCourses(data.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            toast.error('Failed to fetch courses.');
        }
    };

    const handleEditClick = (loTrinhKhoaHoc) => {
        setSelectedLoTrinhKhoaHoc(loTrinhKhoaHoc);
        setEditVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteLoTrinhKhoaHoc/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            if (response.ok) {
                toast.success('Lộ trình khóa học deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete lộ trình khóa học');
            }
        } catch (error) {
            console.error('Error deleting lộ trình khóa học:', error);
            toast.error('Failed to delete lộ trình khóa học');
        }
    };
    
    const handleAddLoTrinhClick = () => {
        setAddLoTrinhVisible(true);
    };

    const handleAddKhoaHocLoTrinhClick = () => {
        setAddKhoaHocLoTrinhVisible(true);
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Lộ trình khóa học</h1>
                <p className="text-gray-400">Danh sách Lộ trình khóa học</p>
                <div className="flex space-x-2">
                    <button onClick={handleAddLoTrinhClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                        Thêm Lộ trình khóa học
                    </button>
                    <button onClick={handleAddKhoaHocLoTrinhClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                        Thêm Khóa học Lộ trình
                    </button>
                </div>
            </section>

            {/* Lo Trinh Khoa Hoc List */}
            <section className="p-4 space-y-4">
                {loTrinhKhoaHocList.map((loTrinhKhoaHoc) => (
                    <div key={loTrinhKhoaHoc.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Tên: {loTrinhKhoaHoc.ten}</p>
                            <p className="text-gray-400">
                                Hình: <img src={loTrinhKhoaHoc.hinh} alt={loTrinhKhoaHoc.ten} className="w-24 h-24 object-cover" />
                            </p>
                            <p className="text-gray-400">Mô tả: {loTrinhKhoaHoc.mota}</p>
                            <p className="text-gray-400">
                                Khóa học: {courses.find(course => course.id === loTrinhKhoaHoc.id_khoahoc)?.ten || loTrinhKhoaHoc.id_khoahoc}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(loTrinhKhoaHoc)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(loTrinhKhoaHoc.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            
            {isEditVisible && selectedLoTrinhKhoaHoc && (
                <EditLotrinh 
                    loTrinhKhoaHoc={selectedLoTrinhKhoaHoc}
                    loTrinhKhoaHocConList={loTrinhKhoaHocConList}
                    csrfToken={csrfToken}
                    courses={courses}
                    onClose={() => {
                        setEditVisible(false);
                        fetchData();
                    }}
                    fetchData={fetchData}
                    loTrinhKhoaHocList={loTrinhKhoaHocList}
                />
            )}

            {isAddLoTrinhVisible && (
                <AddLoTrinhKhoaHoc
                    onClose={() => {
                        setAddLoTrinhVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    courses={courses}
                />
            )}
            {isAddKhoaHocLoTrinhVisible && (
                <AddKhoaHocLoTrinh
                    onClose={() => {
                        setAddKhoaHocLoTrinhVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    courses={courses}
                    loTrinhKhoaHocList={loTrinhKhoaHocList}
                />
            )}
           
            <ToastContainer />
        </>
    )
    };


const EditLotrinh  = ({ loTrinhKhoaHoc, onClose, csrfToken, courses, fetchData, loTrinhKhoaHocList ,loTrinhKhoaHocConList}) => {
  const [view, setView] = useState('LoTrinhKhoaHocForm'); // Initialize with default view

  // Render the appropriate form based on the current view
  const renderView = () => {
    switch (view) {
      case 'LoTrinhKhoaHocForm':
        return <LoTrinhKhoaHocForm initialData={loTrinhKhoaHoc} onSubmit={handleLoTrinhSubmit}  />;
      case 'LoTrinhKhoaHocCon':
        return <LoTrinhKhoaHocCon loTrinhKhoaHoc={loTrinhKhoaHoc} onSubmit={handleKhoaHocSubmit} courses={courses} loTrinhKhoaHocList={loTrinhKhoaHocConList}/>;
      default:
        return null;
    }
  };

  const handleLoTrinhSubmit = async (formData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin-api/updateLoTrinhKhoaHoc/${loTrinhKhoaHoc.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrfToken,
          },
          body: JSON.stringify(formData),
      });

      if (response.ok) {
          toast.success('Lộ trình khóa học updated successfully');
          onClose();
          fetchData();
      } else {
          const resData = await response.json();
          toast.error(resData.error || 'Failed to update lộ trình khóa học');
      }
    } catch (error) {
        console.error('Error updating lộ trình khóa học:', error);
        toast.error('Failed to update lộ trình khóa học');
    }
  };

  const handleKhoaHocSubmit = async (formData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin-api/updateKhoaHocLoTrinh/${loTrinhKhoaHocConList.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrfToken,
          },
          body: JSON.stringify(formData),
      });

      if (response.ok) {
          toast.success('Khóa học Lộ trình updated successfully');
          onClose();
          fetchData();
      } else {
          const resData = await response.json();
          toast.error(resData.error || 'Failed to update Khóa học Lộ trình');
      }
    } catch (error) {
        console.error('Error updating Khóa học Lộ trình:', error);
        toast.error('Failed to update Khóa học Lộ trình');
    }
  };    

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto bg-black rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Chỉnh sửa Lộ trình khóa học</h2>
          <button onClick={onClose} className="text-gray-600">&times;</button>
        </div>
        <div className="space-x-2 mb-4">
          <button onClick={() => setView('LoTrinhKhoaHocForm')} className={`px-4 py-2 rounded ${view === 'LoTrinhKhoaHocForm' ? 'bg-blue-500 text-black' : 'bg-black'}`}>
            Lộ trình khóa học
          </button>
          <button onClick={() => setView('LoTrinhKhoaHocCon')} className={`px-4 py-2 rounded ${view === 'LoTrinhKhoaHocCon' ? 'bg-blue-500 text-black' : 'bg-black'}`}>
            Khóa học Lộ trình
          </button>
        </div>
        {renderView()}
      </div>
    </div>
  );
}
const LoTrinhKhoaHocForm = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState({ ...initialData });
    const [imageSelected, setImageSelected] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageSelected(e.target.files[0]);
            setIsImageUploaded(false);
            setError('');
        }
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
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Image upload error:', error);
            setError("Image upload failed.");
            toast.error('Image upload failed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageSelected && !isImageUploaded) {
            setError("Please upload the selected image.");
            return;
        }
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Failed to submit form.');
        }
    };

    return (
        <form onSubmit={handleSubmit}  >
            <div className="p-4">
                <label className="block text-sm font-medium text-white">Tên</label>
                <input
                    type="text"
                    name="ten"
                    value={formData.ten || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="p-4">
                <label className="block text-sm font-medium text-white">Hình</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block"
                    />
                    <button type="button" onClick={uploadImage} className="bg-purple-500 text-white px-3 py-1 rounded">Upload</button>
                </div>
                {formData.hinh && (
                    <img src={formData.hinh} alt="Uploaded" className="mt-2 w-32 h-32 object-cover" />
                )}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="p-4">
                <label className="block text-sm font-medium text-white">Mô tả</label>
                <textarea
                    name="mota"
                    value={formData.mota || ''}
                    onChange={handleChange}
                    className="mt-1 block bg-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="p-4 flex justify-end space-x-2">
                <button type="button" onClick={handleSubmit} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Hủy</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Cập nhật</button>
            </div>
        </form>
    );
};

const AddLoTrinhKhoaHoc = ({ onClose, csrfToken }) => {
    const [formData, setFormData] = useState({ ten: '', hinh: '', mota: '', id_khoahoc: '' });
    const [imageSelected, setImageSelected] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageSelected(e.target.files[0]);
            setIsImageUploaded(false);
            setError('');
        }
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
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Image upload error:', error);
            setError("Image upload failed.");
            toast.error('Image upload failed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageSelected && !isImageUploaded) {
            setError("Please upload the selected image.");
            return;
        }
        try {
            const payload = { ...formData };

            const addResponse = await fetch('http://127.0.0.1:8000/admin-api/addLoTrinhKhoaHoc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (addResponse.ok) {
                toast.success('Lộ trình khóa học added successfully');
                onClose();
            } else {
                const resData = await addResponse.json();
                toast.error(resData.error || 'Failed to add lộ trình khóa học');
            }
        } catch (error) {
            console.error('Error adding lộ trình khóa học:', error);
            toast.error('Failed to add lộ trình khóa học');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-black">Tên</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten}
                                onChange={handleChange}
                                className="mt-1 block w-full bg-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-black">Hình</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block"
                                />
                                <button type="button" onClick={uploadImage} className="bg-purple-500 text-white px-3 py-1 rounded">Upload</button>
                            </div>
                            {formData.hinh && (
                                <img src={formData.hinh} alt="Uploaded" className="mt-2 w-32 h-32 object-cover" />
                            )}
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-black">Mô tả</label>
                            <textarea
                                name="mota"
                                value={formData.mota}
                                onChange={handleChange}
                                className="mt-1 block bg-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
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

const AddKhoaHocLoTrinh = ({ onClose, csrfToken, courses, loTrinhKhoaHocList }) => {
    const [formData, setFormData] = useState({ id_khoahoc: '', id_lotrinhkhoahoc: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/addLoTrinhKhoaHocCon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Thêm Khóa học Lộ trình thành công');
                onClose();
            } else {
                const resData = await response.json();
                toast.error(resData.error || 'Thêm Khóa học Lộ trình thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Thêm Khóa học Lộ trình thất bại');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-black">Lộ trình khóa học</label>
                            <select
                                name="id_lotrinhkhoahoc"
                                value={formData.id_lotrinhkhoahoc}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-black border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                required
                            >
                                <option value="">Chọn Lộ trình khóa học</option>
                                {loTrinhKhoaHocList.map((loTrinh) => (
                                    <option key={loTrinh.id} value={loTrinh.id}>
                                        {loTrinh.ten}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-black">Khóa học</label>
                            <select
                                name="id_khoahoc"
                                value={formData.id_khoahoc}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-black border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                required
                            >
                                <option value="">Chọn Khóa học</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.ten}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4 flex justify-end space-x-2">
                            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                                Hủy
                            </button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                                Thêm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoTrinhKhoaHoc;