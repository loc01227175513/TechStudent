import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoTrinhKhoaHocCon = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [loTrinhKhoaHocConList, setLoTrinhKhoaHocConList] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedLoTrinhKhoaHoc, setSelectedLoTrinhKhoaHoc] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
        fetchCourses();
        fetchDataCon();
    }, []);

    const fetchDataCon = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/lotrinhkhoahoccon');
            if (!response.ok) throw new Error('Network response was not ok');
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
            if (!response.ok) throw new Error('Network response was not ok');
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
                fetchDataCon();
            } else {
                toast.error('Failed to delete lộ trình khóa học');
            }
        } catch (error) {
            console.error('Error deleting lộ trình khóa học:', error);
            toast.error('Failed to delete lộ trình khóa học');
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            const id = selectedLoTrinhKhoaHoc.id;
            const response = await fetch(`http://127.0.0.1:8000/admin-api/updateKhoaHocLoTrinh/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success('Cập nhật thành công');
                setEditVisible(false);
                fetchDataCon();
            } else {
                toast.error('Cập nhật thất bại');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Failed to update data.');
        }
    };

    return (
        <>
            <section className="p-4 space-y-4">
                {loTrinhKhoaHocConList.map((loTrinhKhoaHoc) => (
                    <div key={loTrinhKhoaHoc.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            {loTrinhKhoaHoc.lotrinhkhoahoc.ten}
                            <p className="text-gray-400">
                                Khóa học: {courses.find(course => course.id === loTrinhKhoaHoc.id_khoahoc)?.ten || loTrinhKhoaHoc.id_khoahoc}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEditClick(loTrinhKhoaHoc)}
                                className="bg-blue-500 text-black px-4 py-2 rounded-lg"
                            >
                                Chỉnh sửa
                            </button>
                            <button
                                onClick={() => handleDeleteClick(loTrinhKhoaHoc.id)}
                                className="bg-red-500 text-black px-4 py-2 rounded-lg"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </section>
            
            {isEditVisible && selectedLoTrinhKhoaHoc && (
                <KhoaHocLoTrinhForm
                    loTrinhKhoaHoc={selectedLoTrinhKhoaHoc}
                    csrfToken={csrfToken}
                    courses={courses}
                    onSubmit={handleFormSubmit}
                    onClose={() => setEditVisible(false)}
                    loTrinhKhoaHocList={loTrinhKhoaHocConList}
                />
            )}
           
            <ToastContainer />
        </>
    );
};

const KhoaHocLoTrinhForm = ({ loTrinhKhoaHoc, onSubmit, onClose, courses, highlightedCourseId }) => {
    // Initialize formData with both id_lotrinhkhoahoc and id_khoahoc
    const [formData, setFormData] = useState({
        id_lotrinhkhoahoc: loTrinhKhoaHoc.id_lotrinhkhoahoc || '',
        id_khoahoc: loTrinhKhoaHoc.id_khoahoc || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleFormSubmit} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 p-6 rounded-lg w-96">
                <div className="p-4">
                    <label className="block text-sm font-medium text-white">Khóa học</label>
                    <select
                        name="id_khoahoc"
                        value={formData.id_khoahoc}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-black border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                        required
                    >
                        <option value="">Chọn Khóa học</option>
                        {courses.map((course) => (
                            <option
                                key={course.id}
                                value={course.id}
                                className={course.id === highlightedCourseId ? 'bg-yellow-500' : ''}
                            >
                                {course.ten || 'N/A'}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Removed the hidden input since id_lotrinhkhoahoc is now part of formData */}
                <div className="p-4 flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </form>
    );
};



export default LoTrinhKhoaHocCon;