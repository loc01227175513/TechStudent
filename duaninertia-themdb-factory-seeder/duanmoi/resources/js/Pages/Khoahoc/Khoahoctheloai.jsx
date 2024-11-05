import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from '@inertiajs/react';

// StarRating Component
const StarRating = ({ rating }) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <svg
                key={i}
                className={`w-5 h-5 ${i <= roundedRating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.172c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.377 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.98 9.397c-.783-.57-.38-1.81.588-1.81h4.172a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
        );
    }
    return <div className="flex">{stars}</div>;
};

// Accordion Component
const Accordion = ({ isOpen, toggleOpen, title, children }) => (
    <div className="accordion-panel mb-4">
        <button
            type="button"
            onClick={toggleOpen}
            className="w-full flex justify-between items-center p-3 bg-gray-100 rounded-md focus:outline-none"
            aria-expanded={isOpen}
        >
            <span className="text-lg font-semibold">{title}</span>
            <svg
                className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                aria-hidden="true"
            >
                <use xlinkHref="#icon-expand" />
            </svg>
        </button>
        {isOpen && <div className="mt-2 pl-4">{children}</div>}
    </div>
);

export default function Khoahoctheloai({ id }) {
    // State variables for accordion panels
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [isDurationOpen, setIsDurationOpen] = useState(false);
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const [isLevelOpen, setIsLevelOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);

    // State variables for filter selections
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);

    const [khoahoc, setKhoahoc] = useState([]);
    const [theloai, setTheloai] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [errorCategories, setErrorCategories] = useState(null);
    const [errorCourses, setErrorCourses] = useState(null);

    // Fetch categories (theloai)
    useEffect(() => {
        const fetchTheloai = async () => {
            try {
                const response = await Axios.get('/api/chude');
                if (response.data && Array.isArray(response.data.data)) {
                    setTheloai(response.data.data);
                } else {
                    throw new Error('Invalid data format for categories.');
                }
            } catch (err) {
                setErrorCategories(err.message);
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchTheloai();
    }, []);

    // Fetch courses (khoahoc)
    useEffect(() => {
        const fetchKhoahoc = async () => {
            try {
                const response = await Axios.get(`/api/Khoahoctheloai/${id}`);
                if (response.data && Array.isArray(response.data.data)) {
                    setKhoahoc(response.data.data);
                } else if (Array.isArray(response.data)) {
                    setKhoahoc(response.data);
                } else {
                    throw new Error('Invalid data format for courses.');
                }
            } catch (err) {
                setErrorCourses(err.message);
            } finally {
                setLoadingCourses(false);
            }
        };

        if (id) {
            fetchKhoahoc();
        } else {
            setKhoahoc([]);
            setLoadingCourses(false);
        }
    }, [id]);

    if (loadingCategories || loadingCourses) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold text-gray-700">Loading...</div>
            </div>
        );
    }

    if (errorCategories || errorCourses) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                {errorCategories && <div className="text-red-500 text-lg">Error loading categories: {errorCategories}</div>}
                {errorCourses && <div className="text-red-500 text-lg">Error loading courses: {errorCourses}</div>}
            </div>
        );
    }

    const popularTopics = theloai;
    const activeCourses = khoahoc.filter(course => course.trangthai === 'active');

    // Define filter options
    const ratingOptions = [
        { value: 4.5, label: 'Từ 4.5 trở lên' },
        { value: 4.0, label: 'Từ 4.0 trở lên' },
        { value: 3.5, label: 'Từ 3.5 trở lên' },
    ];

    const durationOptions = [
        { value: 'extraShort', label: '0-1 giờ', min: 0, max: 1 * 3600 },
        { value: 'short', label: '1-3 giờ', min: 1 * 3600, max: 3 * 3600 },
        { value: 'medium', label: '3-6 giờ', min: 3 * 3600, max: 6 * 3600 },
        { value: 'long', label: '6-17 giờ', min: 6 * 3600, max: 17 * 3600 },
        { value: 'extraLong', label: '17 giờ trở lên', min: 17 * 3600, max: Infinity },
    ];

    const priceOptions = [
        { value: 'paid', label: 'Có trả phí' },
        { value: 'free', label: 'Miễn phí' },
    ];

    // Extract unique levels from courses
    const levelOptions = [
        ...new Set(activeCourses.map(course => course.trinhdo).filter(trinhdo => trinhdo)),
    ];

    // Filter courses based on selected filters
    const filteredCourses = activeCourses.filter(course => {
        let isMatch = true;

        // Filter by rating
        const averageRating = course.danhgia.length > 0
            ? course.danhgia.reduce((acc, curr) => acc + parseFloat(curr.danhgia), 0) / course.danhgia.length
            : 0;
        if (selectedRating && averageRating < selectedRating) {
            isMatch = false;
        }

        // Filter by duration
        if (selectedDurations.length > 0) {
            const totalSeconds = course.video.reduce((acc, video) => {
                const timeParts = video.thoiluong.split(':').map(part => parseInt(part, 10));
                let seconds = 0;
                if (timeParts.length === 3) {
                    seconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
                } else if (timeParts.length === 2) {
                    seconds = timeParts[0] * 60 + timeParts[1];
                } else if (timeParts.length === 1) {
                    seconds = timeParts[0];
                }
                return acc + seconds;
            }, 0);

            const matchesDuration = selectedDurations.some(durationValue => {
                const option = durationOptions.find(d => d.value === durationValue);
                return totalSeconds >= option.min && totalSeconds < option.max;
            });
            if (!matchesDuration) {
                isMatch = false;
            }
        }

        // Filter by level
        if (selectedLevels.length > 0) {
            if (!selectedLevels.includes(course.trinhdo)) {
                isMatch = false;
            }
        }

        // Filter by price
        if (selectedPrices.length > 0) {
            const isPaid = course.gia > 0;
            if (selectedPrices.includes('paid') && !isPaid) {
                isMatch = false;
            }
            if (selectedPrices.includes('free') && isPaid) {
                isMatch = false;
            }
        }

        return isMatch;
    });

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="w-1/4 p-4">
                <aside>
                    <div className="filter-panel-sidebar">
                        <form id="filter-form" aria-label="Các thay đổi sẽ được áp dụng khi bạn chọn/bỏ chọn.">
                            {/* Rating Filter */}
                            <Accordion isOpen={isRatingOpen} toggleOpen={() => setIsRatingOpen(!isRatingOpen)} title="Xếp hạng">
                                {ratingOptions.map(option => (
                                    <label key={option.value} className="flex items-center text-sm">
                                        <input
                                            type="radio"
                                            name="ratings"
                                            value={option.value}
                                            className="form-radio h-4 w-4 text-blue-600"
                                            checked={selectedRating === option.value}
                                            onChange={(e) => setSelectedRating(parseFloat(e.target.value))}
                                        />
                                        <span className="ml-2">{option.label}</span>
                                    </label>
                                ))}
                            </Accordion>

                            {/* Duration Filter */}
                            <Accordion isOpen={isDurationOpen} toggleOpen={() => setIsDurationOpen(!isDurationOpen)} title="Thời lượng video">
                                {durationOptions.map(option => (
                                    <label key={option.value} className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            name="duration"
                                            value={option.value}
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                            checked={selectedDurations.includes(option.value)}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSelectedDurations(prev => {
                                                    if (e.target.checked) {
                                                        return [...prev, value];
                                                    } else {
                                                        return prev.filter(v => v !== value);
                                                    }
                                                });
                                            }}
                                        />
                                        <span className="ml-2">{option.label}</span>
                                    </label>
                                ))}
                            </Accordion>

                            {/* Level Filter */}
                            <Accordion isOpen={isLevelOpen} toggleOpen={() => setIsLevelOpen(!isLevelOpen)} title="Cấp độ">
                                {levelOptions.map(option => (
                                    <label key={option} className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            name="level"
                                            value={option}
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                            checked={selectedLevels.includes(option)}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSelectedLevels(prev => {
                                                    if (e.target.checked) {
                                                        return [...prev, value];
                                                    } else {
                                                        return prev.filter(v => v !== value);
                                                    }
                                                });
                                            }}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </Accordion>

                            {/* Price Filter */}
                            <Accordion isOpen={isPriceOpen} toggleOpen={() => setIsPriceOpen(!isPriceOpen)} title="Giá">
                                {priceOptions.map(option => (
                                    <label key={option.value} className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            name="price"
                                            value={option.value}
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                            checked={selectedPrices.includes(option.value)}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSelectedPrices(prev => {
                                                    if (e.target.checked) {
                                                        return [...prev, value];
                                                    } else {
                                                        return prev.filter(v => v !== value);
                                                    }
                                                });
                                            }}
                                        />
                                        <span className="ml-2">{option.label}</span>
                                    </label>
                                ))}
                            </Accordion>
                        </form>
                    </div>
                </aside>
            </div>

            <div className="w-3/4 p-4">
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Chủ đề phổ biến</h2>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                        {popularTopics.length > 0 ? (
                            popularTopics.map((topic) => (
                                <Link
                                    key={topic.id}
                                    href={`/KhoahocChude/${topic.id}`}
                                    className="transform hover:scale-105 transition duration-300"
                                >
                                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl">
                                        <div className="w-16 h-16 mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                                            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9H5v2h2V9zm4 0h-2v2h2V9zm4 0h-2v2h2V9z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-700 text-center">{topic.ten}</h3>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">No topics available.</div>
                        )}
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mt-16 mb-8">Khoá học theo chủ đề</h2>
                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredCourses.map((course) => {
                                const averageRating = course.danhgia.length > 0
                                    ? (course.danhgia.reduce((acc, curr) => acc + parseFloat(curr.danhgia), 0) / course.danhgia.length).toFixed(1)
                                    : 0;

                                // Calculate total duration
                                let sum = 0;
                                for (let i = 0; i < course.video.length; i++) {
                                    const timeParts = course.video[i].thoiluong.split(':');
                                    let hours = 0, minutes = 0, seconds = 0;
                                    if (timeParts.length === 3) {
                                        hours = parseInt(timeParts[0], 10);
                                        minutes = parseInt(timeParts[1], 10);
                                        seconds = parseInt(timeParts[2], 10);
                                    } else if (timeParts.length === 2) {
                                        minutes = parseInt(timeParts[0], 10);
                                        seconds = parseInt(timeParts[1], 10);
                                    } else if (timeParts.length === 1) {
                                        seconds = parseInt(timeParts[0], 10);
                                    }
                                    sum += (hours * 3600) + (minutes * 60) + seconds;
                                }
                                const totalHours = Math.floor(sum / 3600);
                                const totalMinutes = Math.floor((sum % 3600) / 60);
                                const totalSeconds = sum % 60;
                                const formattedDuration = `${totalHours}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;

                                return (
                                    <Link
                                        key={course.id}
                                        href={`/Khoahoc/${course.id}`}
                                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 group"
                                    >
                                        <div className="overflow-hidden rounded-t-lg">
                                            <img
                                                alt={course.ten}
                                                src={course.hinh}
                                                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-800">{course.ten}</h3>
                                            <p className="mt-2 text-gray-600">${course.gia}</p>
                                            <p className="mt-2 text-gray-600">Tổng thời gian: {formattedDuration}</p>
                                            <p className="mt-2 text-gray-600">Trình độ: {course.trinhdo || 'N/A'}</p>

                                            <div className="mt-4 flex items-center relative group">
                                                <StarRating rating={averageRating} />
                                                {course.danhgia.length > 0 && (
                                                    <div className="absolute top-0 left-full ml-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                        <div className="p-2 text-gray-700">
                                                            <h4 className="text-sm font-semibold">Đánh giá:</h4>
                                                        </div>
                                                        {course.danhgia.map((rating, index) => (
                                                            <div key={index} className="p-2 border-t border-gray-200">
                                                                {rating.binhluan}
                                                                <StarRating rating={parseFloat(rating.danhgia)} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">No courses match the selected filters.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
