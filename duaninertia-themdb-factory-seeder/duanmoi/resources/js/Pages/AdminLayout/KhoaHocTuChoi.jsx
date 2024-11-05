import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'; // Import thư viện moment
import dayjs from 'dayjs';
import { Link } from '@inertiajs/react';

// Example usage
const formattedDate = dayjs().format('YYYY-MM-DD');

export default function KhoaHocTuChoi() {
    const [courses, setCourses] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [priceFilter, setPriceFilter] = useState('all');
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    console.log(courses);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin-api/KhoahocTuChoi');
                console.log(response.data);
                
                setCourses(response.data.khoahoc); // Adjusted data access
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/theloai');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchSubCategories = async () => {
                try {
                    const response = await axios.get(`/api/theloai/${selectedCategory}/subcategories`);
                    setSubCategories(response.data.data);
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                }
            };

            fetchSubCategories();
        } else {
            setSubCategories([]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('/api/chude');
                setTopics(response.data.data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchTopics();
    }, []);

    const calculateTimeFromNow = (updatedAt) => {
        const now = moment(); // Thời điểm hiện tại
        const updatedTime = moment(updatedAt);

        return updatedTime.from(now);
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const handlePriceFilterChange = (e) => {
        setPriceFilter(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
    };

    const handleTopicChange = (e) => {
        setSelectedTopic(e.target.value);
    };

    const filteredCourses = courses.filter(course => {
        const courseDate = moment(course.updated_at);
        const now = moment();

        const matchesDateFilter = (() => {
            switch (filterType) {
                case 'day':
                    return courseDate.isSame(now, 'day');
                case 'week':
                    return courseDate.isSame(now, 'week');
                case 'month':
                    return courseDate.isSame(now, 'month');
                case 'year':
                    return courseDate.isSame(now, 'year');
                default:
                    return true;
            }
        })();

        const matchesPriceFilter = (() => {
            switch (priceFilter) {
                case 'highest':
                    return course.gia === Math.max(...courses.map(c => c.gia));
                case 'lowest':
                    return course.gia === Math.min(...courses.map(c => c.gia));
                default:
                    return true;
            }
        })();

        const matchesCategoryFilter = selectedCategory ? course.theloai.id === parseInt(selectedCategory) : true;
        const matchesSubCategoryFilter = selectedSubCategory ? course.theloaicon.id === parseInt(selectedSubCategory) : true;
        const matchesTopicFilter = selectedTopic ? course.chude.id === parseInt(selectedTopic) : true;

        return matchesDateFilter && matchesPriceFilter && matchesCategoryFilter && matchesSubCategoryFilter && matchesTopicFilter;
    });

    return (
        <>
            <nav className="flex justify-center mt-4 space-x-4">
                <Link href="/admin/khoahocbituchoi" className="text-yellow-400">Khóa Học Bị Từ Chối</Link>
            </nav>

            <div className="flex justify-center mt-4 space-x-4">
                <select value={filterType} onChange={handleFilterChange} className="p-2 border rounded bg-yellow-400 text-gray-900">
                    <option value="all">Tất cả</option>
                    <option value="day">Hôm nay</option>
                    <option value="week">Tuần này</option>
                    <option value="month">Tháng này</option>
                    <option value="year">Năm nay</option>
                </select>
                <select value={priceFilter} onChange={handlePriceFilterChange} className="p-2 border rounded bg-yellow-400 text-gray-900">
                    <option value="all">Tất cả</option>
                    <option value="highest">Giá cao nhất</option>
                    <option value="lowest">Giá thấp nhất</option>
                </select>
                <select value={selectedCategory} onChange={handleCategoryChange} className="p-2 border rounded bg-yellow-400 text-gray-900">
                    <option value="">Chọn thể loại</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.ten}</option>
                    ))}
                </select>
                <select value={selectedTopic} onChange={handleTopicChange} className="p-2 border rounded bg-yellow-400 text-gray-900">
                    <option value="">Chọn chủ đề</option>
                    {topics.map(topic => (
                        <option key={topic.id} value={topic.id}>{topic.ten}</option>
                    ))}
                </select>
            </div>

            <section className="p-4 space-y-4">
                {filteredCourses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className='relative'>
                            <h3 className="text-lg font-semibold">ID khóa học: {course.id}</h3>
                            <p className="text-gray-400">{course.ten}</p>
                            <p className='text-yellow-400'>{course.ten} </p>
                            {course.hinh && <img src={course.hinh} alt="" className='absolute top-0 w-20 rounded-full left-60' />}
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-yellow-400">Hoàn thành</p>
                            <p className="text-gray-400">Completed {calculateTimeFromNow(course.updated_at)}</p>
                        </div>
                    </div>
                ))}
            </section>

            <button className="fixed p-4 text-gray-900 bg-yellow-400 rounded-full shadow-lg bottom-4 right-4">
                +
            </button>
        </>
    );
}