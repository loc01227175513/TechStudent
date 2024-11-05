'use client';
import React, { useState } from 'react';

export default function Main2() {
    const [formData, setFormData] = useState({
        ten: '',
        email: '',
        id_nguoidung: '',
        password: '',
        passwordConfirm: '',
        acceptTerms: false,
    });

    const data = JSON.parse(localStorage.getItem('data')) || {};
    const id_nguoidung = data.id || '';

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert('Passwords do not match');
            return;
        }
        if (!formData.acceptTerms) {
            alert('You must accept the terms and privacy policy');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/dangkygiangvien', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ten: formData.ten,
                    email: formData.email,
                    id_nguoidung: id_nguoidung,
                    password: formData.password,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                const datanguoidung = JSON.parse(localStorage.getItem('data')) || {};
                datanguoidung.vaitro = 1;
                localStorage.setItem('data', JSON.stringify(datanguoidung));
                alert(result.message);
                window.location.href = '/';
            } else {
                alert(result.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className="px-10 py-10 bg-gray-100 rounded-lg shadow-md becom-an-instructor-form-area rts-section-gapTop">
                <div className="mb-8 text-center title-instructor-wrapper">
                    <h2 className="mb-4 text-3xl font-bold title">Trở thành một người hướng dẫn ngày hôm nay</h2>
                    <p className="text-gray-700 disc">
                      Tham gia thị trường học tập trực tuyến lớn nhất thế giới.Bắt đầu giảng dạy ngay hôm nay.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md instructor-form">
                    <h5 className="mb-4 text-2xl font-semibold title">Đăng ký giảng viên</h5>
                    <p className="mb-6 text-gray-700 disc">
                     Tham gia một mạng lưới hỗ trợ trao quyền cho bạn trên hành trình trở thành một nhà giáo dục trực tuyến hiệu quả và thành công.
                    </p>
                    <div className="mb-4">
                        <input type="text" name="ten" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg" value={formData.ten} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 border border-gray-300 rounded-lg" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <input type="password" name="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <input type="password" name="passwordConfirm" placeholder="Password Confirm" className="w-full p-3 border border-gray-300 rounded-lg" value={formData.passwordConfirm} onChange={handleChange} />
                    </div>
                    <div className="mb-6 single-checkbox-filter">
                        <div className="flex items-center check-box">
                            <input type="checkbox" id="category-1" name="acceptTerms" className="mr-2" checked={formData.acceptTerms} onChange={handleChange} />
                            <label htmlFor="category-1" className="text-gray-700">Chấp nhận các điều khoản và chính sách quyền riêng tư</label>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 mb-4 text-white bg-blue-500 rounded-lg rts-btn btn-primary">Đăng ký làm người hướng dẫn</button>
                    <span className="text-gray-700">Đã có một tài khoản? <a href="#" className="text-blue-500">Đăng nhập</a></span>
                </form>
            </div>
        </>
    );
}