import React from 'react'

export default function SinhVien() {
    return (
        <>
            <nav className="flex justify-center mt-4 space-x-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg">Khóa học A </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Khóa học b</button>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg">Khóa học c</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Khóa học d </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Khóa học e</button>
            </nav>

            <div className="p-4">
                <input type="text" placeholder="Search by student name..." className="p-2 w-full bg-gray-700 text-white rounded-lg" />
            </div>

            <section className="p-4 space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Học sinh: John Doe</p>
                            <p className="text-gray-400">Course: Web Development Basics</p>
                            <p className="text-gray-400">Start Date: 2024-09-01</p>
                            <p className="text-gray-400">End Date: 2024-09-30</p>
                            <p className="text-green-400 mt-1">Status: On Track</p>
                        </div>
                        <p className="text-yellow-500 font-bold">Ready to Complete</p>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Student: Jane Smith</p>
                            <p className="text-gray-400">Course: Advanced Graphic Design</p>
                            <p className="text-gray-400">Start Date: 2024-08-25</p>
                            <p className="text-gray-400">End Date: 2024-09-25</p>
                            <p className="text-red-500 mt-1">Status: Behind Schedule</p>
                        </div>
                        <p className="text-yellow-500 font-bold">Ready to Complete</p>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Student: Mike Johnson</p>
                            <p className="text-gray-400">Course: Digital Marketing Essentials</p>
                            <p className="text-gray-400">Start Date: 2024-09-05</p>
                            <p className="text-gray-400">End Date: 2024-10-05</p>
                            <p className="text-green-400 mt-1">Status: On Track</p>
                        </div>
                        <p className="text-yellow-500 font-bold">Ready to Complete</p>
                    </div>
                </div>
            </section>
        </>
    )
}
