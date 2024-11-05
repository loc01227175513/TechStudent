import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const LecturerLayout = ({ children }) => {
    const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
    const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const { url } = usePage();

    // Đóng các dropdown khi click ra ngoài
    const headerDropdownRef = useRef();
    const notificationsDropdownRef = useRef();
    const userDropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                headerDropdownRef.current &&
                !headerDropdownRef.current.contains(event.target)
            ) {
                setIsHeaderDropdownOpen(false);
            }
            if (
                notificationsDropdownRef.current &&
                !notificationsDropdownRef.current.contains(event.target)
            ) {
                setIsNotificationsDropdownOpen(false);
            }
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target)
            ) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Định nghĩa các mục trong thanh điều hướng theo kiểu Udemy
    const menuItems = [
        {
            name: 'Courses',
            href: '/Lecturer',
            icon: (
                <i className="fas fa-bars w-5 h-5 mr-3"></i>
            ),
            current: url === '/instructor/courses',
            notification: false,
        },
        {
            name: 'Communication',
            href: '/instructor/communication/qa/',
            icon: (
                <i className="fas fa-comments w-5 h-5 mr-3"></i>
            ),
            current: url === '/instructor/communication/qa/',
            notification: true,
        },
        {
            name: 'Performance',
            href: '/GiangVienDoanhThu',
            icon: (
                <i className="fas fa-tasks w-5 h-5 mr-3"></i>
            ),
            current: url === '/instructor/performance/overview',
            notification: false,
        },
        {
            name: 'Tools',
            href: '/instructor/tools',
            icon: (
                <i className="fas fa-tools w-5 h-5 mr-3"></i>
            ),
            current: url === '/instructor/tools',
            notification: false,
        },
        {
            name: 'Resources',
            href: '/instructor/help',
            icon: (
                <i className="fas fa-question-circle w-5 h-5 mr-3"></i>
            ),
            current: url === '/instructor/help',
            notification: false,
        },
    ];

    return (
        <div className="lecturer-layout flex bg-gray-800 text-white min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 h-full flex flex-col bg-gray-900">
                {/* Logo Section */}
                <div className="p-4">
                    <Link href="/instructor" className="flex items-center">
                        <img
                            src="/staticx/udemy/images/v7/logo-udemy-inverted.svg"
                            alt="Udemy"
                            className="w-24 h-auto"
                        />
                    </Link>
                </div>

                {/* Primary Menu */}
                <div className="flex-1 px-2 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${item.current
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                            {item.notification && (
                                <span className="ml-auto inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Footer với Dropdown Team và Profile */}

            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-lime-50 overflow-auto">
                {/* Header */}
                <div className="ud-text-sm desktop-header-module--header--a5wri desktop-instructor-header-module--header--JdaD8 
                flex items-center justify-between p-4 
                 shadow mb-4"  style={{ backgroundColor: 'rgba(0, 0, 0, 0.61)' }}>
                    {/* Left Spacer */}
                    <div style={{ flex: '1 1 0%' }}></div>

                    {/* Header Buttons */}
                    <div className="flex items-center space-x-4">
                        {/* Student Dropdown */}
                        <div className="relative" ref={headerDropdownRef}>
                            <button
                                onClick={() => setIsHeaderDropdownOpen(!isHeaderDropdownOpen)}
                                className="ud-btn ud-btn-large ud-btn-ghost ud-heading-md js-header-button desktop-header-module--dropdown-button--ipas9 flex items-center focus:outline-none"
                            >
                                <span className="ud-text-sm desktop-header-module--dropdown-button-text--Sq73l">
                                    Student
                                </span>
                                <i className="fas fa-chevron-down w-4 h-4 ml-1"></i>
                            </button>
                            {isHeaderDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10">
                                    <div className="p-4 text-sm text-gray-700">
                                        Switch to the student view here - get back to the courses you’re taking.
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Notifications Dropdown */}
                        <div className="relative" ref={notificationsDropdownRef}>
                            <button
                                onClick={() => setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen)}
                                className="ud-btn ud-btn-large ud-btn-ghost ud-heading-md ud-btn-icon ud-btn-icon-large js-header-button desktop-header-module--dropdown-button--ipas9 flex items-center focus:outline-none"
                            >
                                <i className="fas fa-bell w-5 h-5 mr-1"></i>
                                <span
                                    data-testid="unread-activity-notifications-badge"
                                    className="ml-1 inline-block w-2 h-2 bg-red-500 rounded-full"
                                    title="14 unread notifications"
                                ></span>
                            </button>
                            {isNotificationsDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-10">
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-lg font-semibold">Notifications</div>
                                            <Link href="/instructor/account/notifications/" className="text-blue-500 text-sm">
                                                Settings
                                            </Link>
                                        </div>
                                        {/* Tabs */}
                                        <div className="flex space-x-4 mb-4">
                                            <button
                                                className={`ud-btn ud-btn-medium ud-btn-ghost ud-heading-sm ${!isNotificationsDropdownOpen ? 'text-blue-500' : 'text-gray-700'
                                                    }`}
                                                onClick={() => {
                                                    // Xử lý khi chọn tab "Instructor"
                                                }}
                                            >
                                                Instructor (10)
                                            </button>
                                            <button
                                                className={`ud-btn ud-btn-medium ud-btn-ghost ud-heading-sm ${isNotificationsDropdownOpen ? 'text-blue-500' : 'text-gray-700'
                                                    }`}
                                                onClick={() => {
                                                    // Xử lý khi chọn tab "Student"
                                                }}
                                            >
                                                Student (4)
                                            </button>
                                        </div>
                                        {/* Notification Items */}
                                        <div className="space-y-4">
                                            {/* Notification Item 1 */}
                                            <div className="flex items-start">
                                                <img
                                                    src="https://img-c.udemycdn.com/user/100x100/636_b1f3_7.jpg"
                                                    alt=""
                                                    className="ud-avatar ud-avatar-image w-16 h-16 rounded-full mr-4"
                                                />
                                                <div>
                                                    <Link href="/course/6210223/manage/curriculum/" className="text-sm font-medium text-blue-600 hover:underline">
                                                        The lectures that you requested to be deleted are now deleted.
                                                    </Link>
                                                    <div className="text-xs text-gray-500">1 day ago</div>
                                                    <span
                                                        data-testid="notification-badge"
                                                        className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1"
                                                        title="This notification is not read"
                                                    ></span>
                                                </div>
                                            </div>
                                            {/* Notification Item 2 */}
                                            <div className="flex items-start">
                                                <img
                                                    src="https://img-c.udemycdn.com/user/100x100/126862730_c3a3_3.jpg"
                                                    alt=""
                                                    className="ud-avatar ud-avatar-image w-16 h-16 rounded-full mr-4"
                                                />
                                                <div>
                                                    <Link href="/course/crear-un-ecommerce-fullstack-con-php-y-mysql/learn/#announcements/10485261/" className="text-sm font-medium text-blue-600 hover:underline">
                                                        desarrollador full stack and 3 others made an announcement: <span className="font-semibold">UNETE A MI GRUPO DE TELEGRAM PARA recibir el codigo fuente https://t.me/Lubutech69</span>
                                                    </Link>
                                                    <div className="text-xs text-gray-500">24 days ago</div>
                                                    <span
                                                        data-testid="notification-badge"
                                                        className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1"
                                                        title="This notification is not read"
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Footer Buttons */}
                                        <div className="mt-4 flex justify-between">
                                            <button
                                                type="button"
                                                className="ud-btn ud-btn-large ud-btn-ghost ud-heading-md"
                                                onClick={() => {
                                                    // Xử lý "Mark all as read"
                                                }}
                                            >
                                                Mark all as read
                                            </button>
                                            <Link href="/instructor/user/view-notifications/" className="ud-btn ud-btn-large ud-btn-secondary ud-heading-md">
                                                See all
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="relative" ref={userDropdownRef}>
                            <button
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                className="ud-btn ud-btn-large ud-btn-ghost ud-heading-md js-header-button desktop-header-module--dropdown-button--ipas9 flex items-center focus:outline-none"
                            >
                                <div
                                    aria-hidden="true"
                                    className="user-profile-dropdown-module--dropdown-button-avatar--CffDQ ud-avatar ud-heading-sm w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white mr-2"
                                >
                                    OI
                                </div>
                                <span
                                    data-testid="profile-badge"
                                    className="inline-block w-2 h-2 bg-red-500 rounded-full"
                                    title="You have alerts"
                                ></span>
                            </button>
                            {isUserDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-10">
                                    <div className="p-4">
                                        {/* User Info */}
                                        <Link href="/instructor/profile/basic-information/" className="flex items-center space-x-4 mb-4">
                                            <div
                                                aria-hidden="true"
                                                className="ud-avatar ud-heading-xl w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center text-white"
                                            >
                                                OI
                                            </div>
                                            <div>
                                                <div className="text-lg font-semibold">Đỗ Đinh</div>
                                                <div className="text-xs text-gray-500">DNDVelogs@gmail.com</div>
                                            </div>
                                        </Link>

                                        {/* Menu Items */}
                                        <ul className="space-y-2">
                                            <li>
                                                <Link href="/" className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                    <i className="fas fa-user mr-2"></i>
                                                    <span className="flex-1">Student</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/instructor/user/view-notifications/" className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                    <i className="fas fa-bell mr-2"></i>
                                                    <span className="flex-1">Notifications</span>
                                                    <span
                                                        data-testid="unread-activity-notifications-badge"
                                                        className="inline-block w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs ml-2"
                                                        title="14 unread notifications"
                                                    >
                                                        9+
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/instructor/account/security/" className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                    <i className="fas fa-lock mr-2"></i>
                                                    <span className="flex-1">Account settings</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/instructor/user/edit-instructor-info/" className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                    <i className="fas fa-dollar-sign mr-2"></i>
                                                    <span className="flex-1">Payout &amp; tax settings</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/user/do-dinh-2/" target="_blank" rel="nofollow noopener noreferrer" className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                    <i className="fas fa-globe mr-2"></i>
                                                    <span className="flex-1">Public profile</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/instructor/profile/basic-information/" className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                    <i className="fas fa-edit mr-2"></i>
                                                    <span className="flex-1">Edit profile</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/support/?type=instructor" target="_blank" rel="noopener noreferrer" className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                    <i className="fas fa-life-ring mr-2"></i>
                                                    <span className="flex-1">Help and Support</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/user/logout/?h=..." className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                                    <i className="fas fa-sign-out-alt mr-2"></i>
                                                    <span className="flex-1">Log out</span>
                                                </Link>
                                            </li>
                                        </ul>

                                        {/* Udemy Business */}
                                        <Link
                                            href="/udemy-business/request-demo-mx/?ref=account-menu&locale=en_US"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center mt-4 p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            <div className="flex-1">
                                                <div className="text-lg font-semibold">Udemy Business</div>
                                                <div className="text-sm text-gray-500">Bring learning to your company</div>
                                            </div>
                                            <i className="fas fa-arrow-right-long text-gray-500 w-5 h-5"></i>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {children}
            </main>
        </div>
    );
};

export default LecturerLayout;
