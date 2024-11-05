import React, { useEffect, useState } from 'react';

export default function ChiTietKhoaHoc({ id }) {
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/admin-api/ChiTietKhoaHoc/${id}`);
                const data = await response.json();
                console.log(data);

                setCourse(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const getCsrfToken = () => {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        return token;
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
                window: location.href = '/admin/dashboard'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            // Optionally, you can handle the state update here if needed
            setCourse(null);
        } catch (error) {
            console.error('Error declining course:', error);
            setActionError(error.message);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const calculateProgress = (course) => {
        let soluong = 0;
        const fields = [
            'ten', 'gia', 'giamgia', 'mota', 'hinh',
            'dieukien', 'muctieu', 'id_chude',
            'id_theloaicon', 'id_theloai'
        ];
        fields.forEach(field => {
            if (course[field] !== 0 && course[field] !== null && course[field] !== "0" && course[field] !== "") {
                soluong += 1;
            }
        });
        const tongcactruong = fields.length;
        return (soluong / tongcactruong) * 100;
    };

    const phantram = course ? calculateProgress(course) : 0;

    return (
        <div className='m-5'>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Chi tiết khóa học đang Chờ Duyệt</h1>
                <p className="text-gray-400">Xem thông tin chi tiết về khóa học </p>
            </section>

            <section className="p-4 space-y-6 bg-gray-800 rounded-lg">
                {course && (
                    <div>
                        <h2 className="text-xl font-bold">Tiêu đề khóa học: {course.ten}</h2>
                        <p className="text-gray-400">Người tạo: {course.giangvien.ten}</p>
                        <p className="text-gray-400">Tiến độ: {phantram}%</p>
                        <p className="text-gray-400">Trạng thái: {course.trangthai}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold mb-2">Tiến độ khóa học</label>
                    <div className="w-full bg-gray-600 rounded-full h-4 mb-4">
                        <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${phantram}%` }}></div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Mô tả khóa học</label>
                    <p className="text-gray-300">
                        {course?.mota || 'Không có mô tả'}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Nội dung khóa học</label>
                    <ul className="list-disc pl-5 text-gray-300">
                        {course?.baihocs?.length > 0 ? (
                            course.baihocs.map((baihoc, index) => (
                                <li key={index}>{baihoc.ten}</li>
                            ))
                        ) : (
                            <li>Không có bài học</li>
                        )}
                    </ul>
                </div>

                <div className="flex space-x-4">
                    <button className="bg-red-500 text-black px-6 py-2 rounded-lg font-semibold"
                        onClick={() => handleDecline(course.id)}
                        disabled={actionLoading}
                    >Từ Chối</button>
                </div>

                {actionError && <div className="text-red-500 mt-4">{actionError}</div>}
            </section>
        </div>
    );
}