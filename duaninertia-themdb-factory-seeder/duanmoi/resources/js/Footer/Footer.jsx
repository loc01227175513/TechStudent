import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                    <div className="col-span-1">
                        <h4 className="font-bold mb-4">Udemy Business</h4>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:underline">Teach on Udemy</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Get the app</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">About us</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Contact us</a></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Help and Support</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Affiliate</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Investors</a></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h4 className="font-bold mb-4">Terms</h4>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:underline">Terms</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Privacy policy</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Cookie settings</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Sitemap</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Accessibility statement</a></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white">
                                {/* Facebook Icon */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    {/* ... */}
                                </svg>
                            </a>
                            <a href="#" className="hover:text-white">
                                {/* Twitter Icon */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    {/* ... */}
                                </svg>
                            </a>
                            <a href="#" className="hover:text-white">
                                {/* Instagram Icon */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    {/* ... */}
                                </svg>
                            </a>
                            <a href="#" className="hover:text-white">
                                {/* LinkedIn Icon */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    {/* ... */}
                                </svg>
                            </a>
                        </div>
                        <div className="mt-6">
                            <button className="border border-gray-500 text-gray-200 px-4 py-2 rounded flex items-center hover:bg-gray-800">
                                {/* Globe Icon */}
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    {/* ... */}
                                </svg>
                                English
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-2 flex items-center justify-end">
                        <a href="#" className="text-2xl font-bold text-white">Your Logo</a>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4">
                    <div className="flex flex-col md:flex-row md:justify-between items-center">
                        <div className="text-sm text-gray-400">
                            &copy; 2024 Your Company, Inc.
                        </div>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy policy</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie settings</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Sitemap</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Accessibility statement</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
