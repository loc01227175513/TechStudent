import { Link } from '@inertiajs/react';
import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Sortable from 'sortablejs';

const LecturerAddLayout = ({ id, children }) => {
    const [id_khoahoc, setIdKhoaHoc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedId = localStorage.getItem('id_khoahoc');
            setIdKhoaHoc(storedId);
            console.log('ID khóa học từ Local Storage:', storedId);
        }
    }, []);

    const handleSubmit = async () => {
        if (!id_khoahoc) {
            alert('ID khóa học không hợp lệ.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            const response = await fetch('/api/guixemxet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_khoahoc }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setSuccessMessage(data.message); // Hiển thị thông báo thành công
            console.log('Response:', data);
        } catch (error) {
            setError('Lỗi khi gửi yêu cầu xem xét: ' + error.message);
            console.error('Error submitting for review:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Top bar */}
            <header className="fixed top-0 left-0 right-0 bg-white text-gray-800 shadow-sm z-50 border-b border-gray-200">
                <div className="flex justify-between items-center px-6 py-3">
                    <div className="flex items-center space-x-6">
                        <Link href="/Lecturer">
                            <button className="text-gray-600 hover:text-purple-600 flex items-center">
                                <span className="material-icons">arrow_back</span>
                                <span className="ml-2 font-medium">Quay lại khóa học</span>
                            </button>
                        </Link>
                        <span className="text-xl font-semibold">Trang biên tập khóa học</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">BẢN NHÁP</span>
                        <span className="text-sm text-gray-500">0 phút nội dung video đã tải lên</span>
                        <button className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded hover:bg-purple-50">
                            Xem trước
                        </button>
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
                            onClick={handleSubmit} // Gọi hàm khi nhấn nút Lưu
                        >
                            Lưu
                        </button>
                        <Menu as="div" className="relative">
                            <Menu.Button className="h-6 w-6 text-gray-600 hover:text-purple-600">
                                <span className="material-icons">settings</span>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={`${active ? 'bg-gray-100' : ''
                                                        } block px-4 py-2 text-sm text-gray-700`}
                                                >
                                                    Cài đặt
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <div className="lecturer-layout flex mx-auto min-w-full min-h-screen pt-16">
                <aside className="w-64 h-full flex flex-col bg-white text-gray-800 border-r border-gray-200">
                    <div className="flex-1 p-6">
                        {/* Plan your course section */}
                        <Section title="1. Lên kế hoạch cho khóa học của bạn">
                            <SidebarItem
                                href={`/MotaKhoaHoc/${id_khoahoc}`}
                                label="Người học dự định"
                                completed
                            />
                        </Section>

                        {/* Create your content section */}
                        <Section title="2. Tạo nội dung của bạn">
                            <SidebarItem
                                href="/DetailKhoaHoc"
                                label="Chương trình giảng dạy"
                            />
                        </Section>

                        {/* Publish your course section */}
                        <Section title="3. Xuất bản khóa học của bạn">
                            <SidebarItem
                                href="/TrangDichKhoaHoc"
                                label="Trang đích của khóa học"
                            />
                            <SidebarItem
                                href="/TrangGiaKhoaHoc"
                                label="Giá cả"
                            />
                            <SidebarItem
                                label="Khuyến mãi"
                                completed
                            />
                            <SidebarItem
                                label="Tin nhắn khóa học"
                            />
                        </Section>
                    </div>
                    <button
                        type="button"
                        className="m-5 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={handleSubmit} // Gọi hàm khi nhấn nút "Submit for Review"
                    >
                        Submit for Review
                    </button>
                    {loading && <p className="text-center text-blue-500">Đang gửi yêu cầu...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {successMessage && <p className="text-center text-green-500">{successMessage}</p>}
                </aside>

                <main className="flex-1 p-8 bg-gray-50 h-full overflow-auto">
                    {children}
                </main>
            </div>
        </>
    );
};

// Section component
const Section = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="text-sm font-bold mb-4 uppercase text-gray-600">{title}</h3>
        <ul className="space-y-2">{children}</ul>
    </div>
);

// Sidebar item component
const SidebarItem = ({ href, label, completed }) => {
    return (
        <li className="text-sm">
            {href ? (
                <Link href={href}>
                    <a className="flex items-center text-gray-700 hover:text-purple-600">
                        {completed && (
                            <span className="material-icons text-green-500 mr-2">check_circle</span>
                        )}
                        {label}
                    </a>
                </Link>
            ) : (
                <span className="flex items-center text-gray-500">
                    {completed && (
                        <span className="material-icons text-green-500 mr-2">check_circle</span>
                    )}
                    {label}
                </span>
            )}
        </li>
    );
};

export default LecturerAddLayout;
