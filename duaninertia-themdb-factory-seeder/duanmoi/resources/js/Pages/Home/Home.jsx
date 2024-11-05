import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function Home({ khoahocs }) {
  const [response, setResponse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({
    price: 'all',
    status: 'all',
    search: '',
  });
  const [loading, setLoading] = useState(true);

  // Fetch Registered Courses
  useEffect(() => {
    const fetchCourses = async () => {
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

    fetchCourses();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await Axios.get('/api/theloai');
        setCategories(res.data.data); // Assuming the API returns { data: [...] }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setLoading(false);
      }
    };

    fetchCategories();
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
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Khóa học của tôi</h2>

        {/* Categories Navigation */}
        {!loading && categories.length > 0 && (
          <div className="mb-6">
            <ul className="flex space-x-6 justify-center">
              {categories.map(category => (
                category.theloaicons.length > 0 && (
                <li key={category.id} className="relative group">
                  <button className="text-lg font-medium text-gray-700 hover:text-blue-600 focus:outline-none">
                    {category.ten}
                  </button>
                  {category.theloaicons && category.theloaicons.length > 0 && (
                    <ul className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      {category.theloaicons.map(theloaicon => (
                        <li key={theloaicon.id} className="relative group">
                          <Link
                            href={`/theloai/${theloaicon.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {theloaicon.ten}
                          </Link>
                          {theloaicon.chudes && theloaicon.chudes.length > 0 && (
                            <ul className="absolute top-0 left-full mt-0 ml-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                              {theloaicon.chudes.map(chude => (
                                <li key={chude.id}>
                                  <Link
                                    href={`/chude/${chude.id}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    {chude.ten}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  </li>
                )
              ))}
            </ul>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center mb-6">
            <p className="text-gray-500">Đang tải các thể loại...</p>
          </div>
        )}

        {/* Filters */}
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

        {/* My Courses */}
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

        {/* Recommended Courses */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Khóa học được đề xuất</h2>
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {khoahocs
              .filter(product => product.trangthai === 'active')
              .map((product) => (
                <Link key={product.id} href={`/KhoahocChiTiet/${product.id}`} className="bg-white shadow-md border border-gray-300 rounded-lg p-4 flex-shrink-0 w-64 hover:shadow-lg transition">
                  <div className="aspect-w-1 aspect-h-1 w-full h-40 overflow-hidden rounded-lg bg-gray-200">
                    <img
                      alt={product.hinh}
                      src={product.hinh}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700">{product.ten}</h3>
                    <p className="mt-1 text-xs text-gray-500">{product.trangthai}</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">{product.gia}$</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
