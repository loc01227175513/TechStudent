import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        ho: '',
        ten: '',
        tentaikhoan: '',
        email: '',
        dienthoai: '',
        hinh: '',
        tieusu: '',
        matkhau: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/dangky', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                window.location = '/login';
            } else {
                const error = await response.json();
                console.error('Registration failed:', error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 ">
            <div className="w-full max-w-lg p-10 m-5 bg-white shadow-xl rounded-2xl">
                <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Đăng ký</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    {/* <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Họ</label>
                        <input
                            type="text"
                            name="ho"
                            value={formData.ho}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div> */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Tên</label>
                        <input
                            type="text"
                            name="ten"
                            value={formData.ten}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Tên tài khoản</label>
                        <input
                            type="text"
                            name="tentaikhoan"
                            value={formData.tentaikhoan}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div> */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Điện thoại</label>
                        <input
                            type="text"
                            name="dienthoai"
                            value={formData.dienthoai}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Hình</label>
                        <input
                            type="text"
                            name="hinh"
                            value={formData.hinh}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Tiểu sử</label>
                        <input
                            type="text"
                            name="tieusu"
                            value={formData.tieusu}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div> */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            name="matkhau"
                            value={formData.matkhau}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
