import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result);
                localStorage.setItem('data', JSON.stringify(result.data));
                window.location = '/';
            } else {
                const error = await response.json();
                console.error('Login failed:', error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-md">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Đăng nhập vào Udemy</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Địa chỉ Email
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="janesmith@gmail.com"
                                autoComplete="email"
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Nhập địa chỉ email của bạn.
                            </p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Mật khẩu"
                                autoComplete="current-password"
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Mật khẩu của bạn phải có ít nhất 8 ký tự.
                            </p>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Bạn chưa có tài khoản?{' '}
                        <Link href="/dangky" className="text-indigo-600 hover:underline">
                            Đăng ký
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
