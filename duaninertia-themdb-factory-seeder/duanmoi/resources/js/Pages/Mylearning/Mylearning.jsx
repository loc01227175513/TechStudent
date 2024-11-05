import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from '@inertiajs/react';

export default function Example() {
    const [response, setResponse] = useState([]);
    const [filter, setFilter] = useState({
        price: 'all',
        status: 'all',
        search: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (parsedData) {
                try {
                    const res = await Axios.post('http://127.0.0.1:8000/api/khoahocdanghoc', { id_nguoidung: parsedData.id });
                    setResponse(res.data);
                } catch (error) {
                    console.error('Error fetching registered courses:', error);
                }
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const filteredResponse = response.filter(product => {
        let priceMatch = true;
        let statusMatch = true;
        let searchMatch = true;

        if (filter.price !== 'all') {
            priceMatch = filter.price === 'free' ? product.gia === 0 : product.gia > 0;
        }

        if (filter.status !== 'all') {
            statusMatch = product.trangthai === filter.status;
        }

        if (filter.search.trim() !== '') {
            searchMatch = product.ten.toLowerCase().includes(filter.search.toLowerCase());
        }

        return priceMatch && statusMatch && searchMatch;
    });

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Khóa học của tôi</h2>

                <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <div className="w-full sm:w-1/4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá</label>
                        <select
                            id="price"
                            name="price"
                            value={filter.price}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="all">Tất cả</option>
                            <option value="free">Miễn phí</option>
                            <option value="paid">Có phí</option>
                        </select>
                    </div>
                    <div className="w-full sm:w-1/4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            value={filter.status}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="all">Tất cả</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Tìm kiếm</label>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Tìm khóa học..."
                            value={filter.search}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredResponse.length > 0 ? (
                        filteredResponse.map((product) => (
                            <Link key={product.id} href={`hocbai/${product.id}`} className="bg-white shadow-md border border-gray-300 rounded-lg p-4 hover:shadow-lg transition transform hover:-translate-y-1">
                                <div className="aspect-w-1 aspect-h-1 w-full h-48 overflow-hidden rounded-lg bg-gray-200">
                                    <img
                                        alt={product.ten}
                                        src={product.hinh}
                                        className="h-full w-full object-cover object-center transition-transform duration-200 transform group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-700 text-center">{product.ten}</h3>
                                    <p className="mt-2 text-lg font-medium text-gray-900 text-center">{product.gia}$</p>
                                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${product.TongTongHoanthanhphantram}%` }}></div>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 text-center">{product.TongTongHoanthanhphantram}% hoàn thành</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">Bạn chưa đăng ký khóa học nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
