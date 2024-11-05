import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);
    const [filterDateType, setFilterDateType] = useState('');
    const [filterPriceType, setFilterPriceType] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSubCategory, setFilterSubCategory] = useState('');
    const [filterTopic, setFilterTopic] = useState('');

    console.log(courses);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/admin-api/dashboard', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': getCsrfToken(),
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCourses(data.khoahoc); // Adjust according to your API response structure
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getCsrfToken = () => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        return token ? token.content : '';
    };

    const handleDecline = async (id) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await fetch('/admin-api/tuchoi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            // Optionally, you can fetch the updated courses list instead of filtering
            setCourses(courses.filter(course => course.id !== id));
        } catch (error) {
            console.error('Error declining course:', error);
            setActionError(error.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleApprove = async (id) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await fetch('/admin-api/chapnhan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            // Optionally, you can fetch the updated courses list instead of filtering
            setCourses(courses.filter(course => course.id !== id));
        } catch (error) {
            console.error('Error approving course:', error);
            setActionError(error.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleFilterDateTypeChange = (e) => {
        setFilterDateType(e.target.value);
    };

    const handleFilterPriceTypeChange = (e) => {
        setFilterPriceType(e.target.value);
    };

    const handleFilterCategoryChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const handleFilterSubCategoryChange = (e) => {
        setFilterSubCategory(e.target.value);
    };

    const handleFilterTopicChange = (e) => {
        setFilterTopic(e.target.value);
    };

    const filteredCourses = courses.filter((course) => {
        const courseDate = new Date(course.created_at);
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        const matchesDateType = filterDateType ? (
            filterDateType === 'today' ? courseDate.toDateString() === new Date().toDateString() :
            filterDateType === 'thisWeek' ? courseDate >= startOfWeek :
            filterDateType === 'thisMonth' ? courseDate >= startOfMonth :
            filterDateType === 'thisYear' ? courseDate >= startOfYear :
            true
        ) : true;

        const matchesPriceType = filterPriceType ? (
            filterPriceType === 'highest' ? course.gia === Math.max(...courses.map(c => c.gia)) :
            filterPriceType === 'lowest' ? course.gia === Math.min(...courses.map(c => c.gia)) :
            true
        ) : true;

        const matchesCategory = filterCategory ? course.theloai.id === parseInt(filterCategory) : true;
        const matchesSubCategory = filterSubCategory ? course.theloaicon.id === parseInt(filterSubCategory) : true;
        const matchesTopic = filterTopic ? course.chude.id === parseInt(filterTopic) : true;

        return matchesDateType && matchesPriceType && matchesCategory && matchesSubCategory && matchesTopic;
    });

    return (
        <>
            {/* Tab Navigation */}
            <nav className="flex justify-center mt-4 space-x-4">
                <Link href='/admin/dashboard'>
                    <button className="text-yellow-400 border-b-4 border-yellow-400 px-4 py-2">Chưa giải quyết</button>
                </Link>
                <Link href='/admin/dangtienhanh'>
                    <button className="text-gray-400 px-4 py-2">Trong tiến trình</button>
                </Link>
                <Link href='/admin/hoanthanh'>
                    <button className="text-gray-400 px-4 py-2">Hoàn thành</button>
                </Link>
            </nav>

            <section className="p-4 space-y-4">
                <div className="flex space-x-4">
                    <div>
                        <label className="block text-gray-700">Lọc theo ngày tạo</label>
                        <select
                            value={filterDateType}
                            onChange={handleFilterDateTypeChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn ngày tạo</option>
                            <option value="today">Hôm nay</option>
                            <option value="thisWeek">Tuần này</option>
                            <option value="thisMonth">Tháng này</option>
                            <option value="thisYear">Năm nay</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo giá</label>
                        <select
                            value={filterPriceType}
                            onChange={handleFilterPriceTypeChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn giá</option>
                            <option value="highest">Giá cao nhất</option>
                            <option value="lowest">Giá thấp nhất</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo thể loại</label>
                        <select
                            value={filterCategory}
                            onChange={handleFilterCategoryChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn thể loại</option>
                            {/* Add options dynamically based on available categories */}
                            {courses.map(course => (
                                <option key={course.theloai.id} value={course.theloai.id}>{course.theloai.ten}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo thể loại con</label>
                        <select
                            value={filterSubCategory}
                            onChange={handleFilterSubCategoryChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn thể loại con</option>
                            {/* Add options dynamically based on available subcategories */}
                            {courses.map(course => (
                                <option key={course.theloaicon.id} value={course.theloaicon.id}>{course.theloaicon.ten}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Lọc theo chủ đề</label>
                        <select
                            value={filterTopic}
                            onChange={handleFilterTopicChange}
                            className="w-full p-2 border rounded bg-white text-gray-900"
                        >
                            <option value="">Chọn chủ đề</option>
                            {/* Add options dynamically based on available topics */}
                            {courses.map(course => (
                                <option key={course.chude.id} value={course.chude.id}>{course.chude.ten}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading && <p>Loading courses...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {actionError && <p className="text-red-500">Lỗi hành động: {actionError}</p>}
                {!loading && !error && filteredCourses.length === 0 && <p>Không tìm thấy khóa học.</p>}
                {!loading &&
                    !error &&
                    filteredCourses.map((course) => (
                        <div key={course.id} className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex justify-between">
                                <div>
                                    <Link href={`/admin/khoahocdangtienhanh/${course.id}`}>
                                        <p className="text-lg font-semibold">ID khóa học: {course.id}</p>
                                        <p className="text-gray-400">Trạng thái: {course.trangthai}</p>
                                        <p className="text-gray-400">
                                            Được tạo bởi: {course.giangvien.ho} {course.giangvien.ten}
                                        </p>

                                        {/* Display the topic (chude) */}
                                        {course.chude && (
                                            <p className="text-gray-400">Đề tài: {course.chude.ten}</p>
                                        )}

                                        {/* Display the subcategory (theloaicon) */}
                                        {course.theloaicon && (
                                            <p className="text-gray-400">
                                                Tiểu loại: {course.theloaicon.ten}
                                            </p>
                                        )}

                                        {/* Display the category (theloaicon.theloai) */}
                                        {course.theloaicon && course.theloaicon.theloai && (
                                            <p className="text-gray-400">
                                                Category: {course.theloaicon.theloai.ten}
                                            </p>
                                        )}
                                    </Link>
                                </div>

                                <div className="space-x-2">
                                    <button
                                        className={`bg-blue-500 text-black px-4 py-2 rounded-lg ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        onClick={() => handleDecline(course.id)}
                                        disabled={actionLoading}
                                    >
                                        Sự suy sụp
                                    </button>
                                    <button
                                        className={`bg-green-500 text-black px-4 py-2 rounded-lg ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        onClick={() => handleApprove(course.id)}
                                        disabled={actionLoading}
                                    >
                                        Chấp thuận
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
            <button className="fixed bottom-4 right-4 bg-yellow-400 text-gray-900 p-4 rounded-full shadow-lg">
                +
            </button>
        </>
    );
}